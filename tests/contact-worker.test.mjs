import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {test} from 'node:test';
const source=await readFile(new URL('../dist/_worker.js',import.meta.url),'utf8');
const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const url='https://portfolio.example/api/contact';
const payload={name:'Test Person',email:'test@example.org',message:'Eine Anfrage für eine passende App.',website:'','cf-turnstile-response':'test-token',requestId:'0aba4367-3cd3-4a71-aec4-5221fb30e6cf'};
const env={RESEND_API_KEY:'test-secret',CONTACT_TO:'owner@example.org',CONTACT_FROM:'Portfolio <sender@example.org>',TURNSTILE_SECRET_KEY:'test-turnstile-secret',TURNSTILE_SITE_KEY:'test-sitekey'};
const request=(body=payload,origin='https://portfolio.example')=>new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});

test('static routes delegate to ASSETS',async()=>{
  const response=await worker.fetch(new Request('https://portfolio.example/index.html'),{ASSETS:{fetch:async()=>new Response('HTML')}});
  assert.equal(await response.text(),'HTML');
});
test('configuration never exposes secrets and reports unavailable without credentials',async()=>{
  assert.deepEqual(await (await worker.fetch(new Request(url),{})).json(),{ready:false,siteKey:null});
  assert.deepEqual(await (await worker.fetch(new Request(url),env)).json(),{ready:true,siteKey:'test-sitekey'});
  assert.equal((await worker.fetch(request(),{})).status,503);
});
test('rejects cross-origin, invalid fields, honeypot and oversize bodies',async()=>{
  assert.equal((await worker.fetch(request(payload,'https://other.example'),env)).status,403);
  for(const data of [{...payload,email:'invalid'},{...payload,message:'short'},{...payload,name:'A\nB'},{...payload,website:'spam'},{...payload,message:'a'.repeat(5001)}])assert.equal((await worker.fetch(request(data),env)).status,400);
  assert.equal((await worker.fetch(request({...payload,message:'a'.repeat(21000)}),env)).status,413);
});
test('validates challenge before sending and uses fixed sender with reply_to',async t=>{
  const calls=[];
  t.mock.method(globalThis,'fetch',async(target,options)=>{
    calls.push({target,body:JSON.parse(options.body),headers:options.headers});
    return Response.json(target.includes('siteverify')?{success:true,hostname:'portfolio.example',action:'contact'}:{id:'test-email-id'});
  });
  const response=await worker.fetch(request(),env);
  assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});
  assert.equal(calls.length,2);assert.match(calls[0].target,/siteverify/);
  assert.equal(calls[1].body.from,env.CONTACT_FROM);assert.deepEqual(calls[1].body.to,[env.CONTACT_TO]);assert.equal(calls[1].body.reply_to,payload.email);
  assert.ok(calls[1].body.text.includes(payload.message));assert.equal(calls[1].body.html,undefined);
  assert.equal(calls[1].headers['Idempotency-Key'],`portfolio/${payload.requestId}`);
});
test('missing challenge and invalid request IDs cannot trigger provider calls',async t=>{
  let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({});});
  assert.equal((await worker.fetch(request({...payload,requestId:'bad'}),env)).status,400);
  assert.equal((await worker.fetch(request({...payload,'cf-turnstile-response':''}),env)).status,400);
  assert.equal(calls,0);
});
test('rejects oversized streamed bodies without a declared content length',async()=>{
  const stream=new ReadableStream({start(controller){controller.enqueue(new TextEncoder().encode('a'.repeat(20001)));controller.close();}});
  const req=new Request(url,{method:'POST',duplex:'half',headers:{Origin:'https://portfolio.example','Content-Type':'application/json'},body:stream});
  assert.equal((await worker.fetch(req,env)).status,413);
});
test('invalid challenge cannot trigger an email',async t=>{
  let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({success:false});});
  assert.equal((await worker.fetch(request(),env)).status,400);assert.equal(calls,1);
});
test('wrong challenge hostname and action are rejected',async t=>{
  t.mock.method(globalThis,'fetch',async()=>Response.json({success:true,hostname:'other.example',action:'contact'}));
  assert.equal((await worker.fetch(request(),env)).status,400);
});
test('provider rejection returns error, never a success message or provider secrets',async t=>{
  t.mock.method(globalThis,'fetch',async target=>target.includes('siteverify')?Response.json({success:true,hostname:'portfolio.example',action:'contact'}):Response.json({message:'internal-secret'},{status:401}));
  const response=await worker.fetch(request(),env);assert.equal(response.status,502);assert.ok(!(await response.text()).includes('internal-secret'));
});
test('network failures return a recoverable error',async t=>{
  t.mock.method(globalThis,'fetch',async()=>{throw new Error('offline');});
  assert.equal((await worker.fetch(request(),env)).status,502);
});
