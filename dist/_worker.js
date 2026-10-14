const json = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), {
  status, headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra}
});
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/contact') return env.ASSETS.fetch(request);
    const ready=!!(env.RESEND_API_KEY&&env.CONTACT_TO&&env.CONTACT_FROM&&env.TURNSTILE_SECRET_KEY&&env.TURNSTILE_SITE_KEY);
    if(request.method==='GET')return json({ready,siteKey:ready?env.TURNSTILE_SITE_KEY:null});
    if (request.method !== 'POST') return json({error:'Bitte verwenden Sie das Kontaktformular.'},405,{'Allow':'GET, POST'});
    if (request.headers.get('Origin') !== url.origin) return json({error:'Diese Anfrage ist nicht erlaubt.'},403);
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'Ungültiges Anfrageformat.'},415);
    // Bound the streamed body as well as the declared length.
    if (Number(request.headers.get('Content-Length')) > 20000) return json({error:'Die Nachricht ist zu lang.'},413);
    let data;
    try {
      const reader=request.body?.getReader();
      if (!reader) return json({error:'Die Anfrage ist leer.'},400);
      const chunks=[];let length=0;
      while (true) {
        const {done,value}=await reader.read();if(done)break;
        length+=value.byteLength;
        if(length>20000){await reader.cancel();return json({error:'Die Nachricht ist zu lang.'},413);}
        chunks.push(value);
      }
      const bytes=new Uint8Array(length);let offset=0;
      for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
      data=JSON.parse(new TextDecoder().decode(bytes));
    } catch {return json({error:'Die Anfrage konnte nicht gelesen werden.'},400);}
    if (!data || typeof data !== 'object' || Array.isArray(data)) return json({error:'Ungültige Anfrage.'},400);
    if (typeof data.website === 'string' && data.website.trim()) return json({error:'Die Anfrage konnte nicht verarbeitet werden.'},400);
    const name=typeof data.name==='string'?data.name.trim():'';
    const email=typeof data.email==='string'?data.email.trim():'';
    const message=typeof data.message==='string'?data.message.trim():'';
    if(name.length<2||name.length>100||/[\r\n]/.test(name)||email.length>254||!emailPattern.test(email)||message.length<10||message.length>5000){
      return json({error:'Bitte prüfen Sie Name, E-Mail und Nachricht (10–5.000 Zeichen).'},400);
    }
    if (!ready) {
      return json({error:'Der Formularversand ist noch nicht freigeschaltet. Bitte versuchen Sie es später erneut.'},503);
    }
    if(typeof data.requestId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId))return json({error:'Bitte laden Sie das Formular neu und versuchen Sie es erneut.'},400);
    try {
      const token=data['cf-turnstile-response'];
      if(typeof token!=='string'||!token||token.length>2048)return json({error:'Bitte schließen Sie die Sicherheitsprüfung ab.'},400);
      const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:request.headers.get('CF-Connecting-IP')||undefined}),
        signal:AbortSignal.timeout(5000)
      });
      const verification=await check.json().catch(()=>null);
      if(!check.ok||!verification?.success||verification.hostname!==url.hostname||verification.action!=='contact')return json({error:'Die Sicherheitsprüfung ist abgelaufen oder ungültig. Bitte versuchen Sie es erneut.'},400);
      const response=await fetch('https://api.resend.com/emails',{
        method:'POST',
        headers:{'Authorization':`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`portfolio/${data.requestId}`},
        body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],reply_to:email,
          subject:'Neue Anfrage über das Portfolio',text:`Name: ${name}\nE-Mail: ${email}\n\n${message}`}),
        signal:AbortSignal.timeout(10000)
      });
      const result=await response.json().catch(()=>null);
      if(!response.ok||!result?.id)return json({error:'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'},502);
      return json({ok:true});
    }catch{return json({error:'Der Versand ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.'},502);}
  }
};
