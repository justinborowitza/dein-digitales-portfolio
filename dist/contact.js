const form = document.querySelector('#contact-form');
if (form) {
  const status = document.querySelector('#contact-status');
  const button = form.querySelector('button[type="submit"]');
  let widget;
  let lastSubmission;
  async function initialize() {
    try {
      const response=await fetch('/api/contact',{signal:AbortSignal.timeout(8000)});
      const config=await response.json();
      if(!response.ok||!config.ready||!config.siteKey)throw new Error('unconfigured');
      window.onContactTurnstileReady=()=>{
        widget=window.turnstile.render('#contact-challenge',{
          sitekey:config.siteKey,action:'contact',theme:'dark',size:'flexible',
          callback:()=>{button.disabled=false;if(!status.dataset.state)status.textContent='';},
          'expired-callback':()=>{button.disabled=true;},
          'error-callback':()=>{button.disabled=true;status.textContent='Die Sicherheitsprüfung ist gerade nicht erreichbar. Sie können mir direkt per E-Mail schreiben.';}
        });
      };
      const script=document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onContactTurnstileReady&render=explicit';
      script.async=true;
      script.onerror=()=>{status.textContent='Die Sicherheitsprüfung konnte nicht geladen werden. Bitte schreiben Sie mir direkt per E-Mail.';};
      document.head.append(script);
    }catch{
      status.textContent='Der Formularversand wird noch eingerichtet. Schreiben Sie mir gerne direkt per E-Mail.';
      button.disabled=true;
    }
  }
  initialize();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    button.disabled = true;
    button.textContent = 'Wird gesendet …';
    status.textContent = '';
    status.removeAttribute('data-state');
    try {
      const fields = new FormData(form);
      const payload = Object.fromEntries(fields);
      const signature = JSON.stringify([payload.name, payload.email, payload.message]);
      if (!lastSubmission || lastSubmission.signature !== signature) {
        lastSubmission = {signature, requestId: crypto.randomUUID()};
      }
      payload.requestId = lastSubmission.requestId;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.');
      }
      status.textContent = 'Vielen Dank! Ihre Nachricht wurde versendet.';
      status.dataset.state = 'success';
      form.reset();
      lastSubmission = null;
    } catch (error) {
      status.textContent = error.name === 'TimeoutError' || error.name === 'TypeError'
        ? 'Der Versand ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.'
        : error.message;
      status.dataset.state = 'error';
    } finally {
      button.disabled = true;
      if(widget!==undefined)window.turnstile.reset(widget);
      button.innerHTML = 'Nachricht senden <span aria-hidden="true">↗</span>';
    }
  });
}
