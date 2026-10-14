# Kontaktformular freischalten

Das Kontaktformular ist mit Resend und Cloudflare Turnstile verbunden. Die fünf Konfigurationswerte sind als Secrets im Worker und im Pages-Projekt hinterlegt. Die lokale `.dev.vars` ist von Git ausgeschlossen. Der Resend-Schlüssel hat ausschließlich Sending Access. Ein Turnstile-Widget schützt die beiden Produktionshosts.

Vorläufiger Empfänger (vom Nutzer bestätigt): `justin.maretic@gmail.com`. Absender: `Justin Portfolio <onboarding@resend.dev>`. Ohne eigene Domain kann dieser Testabsender nur an die E-Mail-Adresse des Resend-Kontos senden. Die öffentliche Kontaktadresse bleibt `justinborowitza99@gmail.com`. Für einen anderen Empfänger muss später die Absenderdomain verifiziert oder die Resend-Konto-Adresse entsprechend geändert werden.

## Einrichtung

1. Resend-Konto einrichten. Eine eigene Absenderdomain in Resend verifizieren und die dafür angegebenen DNS-Einträge setzen. Die Gmail-Adresse ist der Empfänger, keine verifizierte Absenderdomain. Resends Testabsender nicht als dauerhaften öffentlichen Absender verwenden.
2. Einen Resend-API-Schlüssel mit Sendeberechtigung für die Absenderdomain erstellen.
3. In Cloudflare Turnstile ein Widget für die tatsächlichen Produktionshosts erstellen (Pages-Domain sowie ggf. eigene Domain und Worker-Domain). Site-Key und Secret-Key bereitstellen. Action im Formular ist `contact`; das Backend prüft Action und Hostname.
4. In den Einstellungen des Cloudflare-Pages-Projekts für Produktion folgende Variablen/Secrets hinterlegen:
   - `RESEND_API_KEY` als Secret
   - `CONTACT_TO`: aktuell `justin.maretic@gmail.com`
   - `CONTACT_FROM`: `Justin Borowitza <kontakt@VERIFIZIERTE-DOMAIN>`
   - `TURNSTILE_SITE_KEY`: öffentlicher Site-Key
   - `TURNSTILE_SECRET_KEY` als Secret
5. Hosting- und Versandverträge, Übermittlungsgrundlagen sowie die Löschpraxis prüfen; Datenschutzerklärung entsprechend abschließen. Anschließend neu deployen.
6. Bei Änderungen ein echtes Formular-Testereignis durchführen und Zustellung prüfen.

Bei separatem Workers-Deployment gelten dieselben Variablen. Secrets mit `npx wrangler secret put RESEND_API_KEY` und `npx wrangler secret put TURNSTILE_SECRET_KEY` setzen; nicht in Git speichern. Die übrigen Werte in der Worker-Konfiguration bzw. im Dashboard hinterlegen. Für die lokale Vorschau `.dev.vars.example` nach `.dev.vars` kopieren, konfigurieren und `npx wrangler dev --local --port 8878` starten. Die lokale Testdomain muss zum Turnstile-Widget passen; für Entwicklung können Cloudflares dokumentierte Testschlüssel verwendet werden. Keine Testschlüssel in Produktion verwenden.

## Aufbau und Prüfung

- `dist/_worker.js`: Cloudflare Pages im Advanced Mode; statische Inhalte via `env.ASSETS`. Derselbe Worker wird über `wrangler.jsonc` für Workers eingesetzt.
- `dist/_routes.json`: Pages führt den Worker nur für `/api/contact` aus.
- `GET /api/contact`: meldet Freischaltungsstatus und ggf. den öffentlichen Turnstile-Site-Key; gibt keine Secrets aus.
- `POST /api/contact`: prüft Herkunft, Body-Größe, Feldlängen, Honeypot und Turnstile, dann Versand via Resend. Empfänger und Absender kommen ausschließlich aus der Serverkonfiguration, die Besuchermail wird als `reply_to` gesetzt.
- Versandversuche derselben Nachricht verwenden einen Idempotency-Key; Resend kann dadurch wiederholte Anfragen innerhalb seiner Idempotenzfrist ohne doppelte Zustellung beantworten.
- Anfrageinhalte werden nicht in einer Datenbank oder in Anwendungslogs gespeichert. Erfolgreich versandte Nachrichten liegen beim Versanddienst und im Empfängerpostfach; deren Aufbewahrung ist gesondert zu regeln.
- `node --test tests/contact-worker.test.mjs`: Tests mit simulierten Providerantworten, ohne echte E-Mails zu verschicken.
- Formularkontrollen für gültige/ungültige Eingaben, Erfolgs-/Fehleranzeige und Erhalt der Nachricht bei Fehlern wurden zusätzlich im Browser mit simuliertem Versand geprüft.

## Quellen

- [Cloudflare Pages Advanced Mode](https://developers.cloudflare.com/pages/functions/advanced-mode/)
- [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email)
- [Turnstile Servervalidierung](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Informationspflichten nach § 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html)

Die Schriftarten Geist und Geist Mono werden lokal unter `dist/assets/fonts` ausgeliefert. Die SIL-OFL-Lizenzdateien liegen dort bei. Die veröffentlichten Portfolio- und Projektseiten laden kein Google-Fonts-CSS.
