/* ============================================================
   Misurazione conversioni Google Ads - Verde Oliva S.r.l.s.
   File unico: modificare SOLO qui per tutto il sito.
   Consenso cookie: il tag non scrive nulla finche' l'utente
   non accetta (Consent Mode v2, default "denied").
   ============================================================ */
(function () {
  'use strict';

  var AW_ID    = 'AW-959116144';                 // ID conversione Google Ads
  var AW_LABEL = 'Xe28CKGa9eAcEPDmq8kD';         // Etichetta "Click-to-call"
  var CONSENT_KEY = 'cookie_consent';            // chiave usata dal banner del sito

  // 23/11/2026: le 126 pagine dei comuni salvano la scelta in 'cc' ('all' / 'min'), la homepage in
  // 'cookie_consent' ('all' / 'necessary'): valgono entrambe (prima 'cc' veniva ignorata e su quelle
  // pagine il consenso a Google Ads non risultava mai dato).
  function consensoDato() {
    try { return localStorage.getItem(CONSENT_KEY) === 'all' || localStorage.getItem('cc') === 'all'; }
    catch (e) { return false; }
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var stato = consensoDato() ? 'granted' : 'denied';
  gtag('consent', 'default', {
    ad_storage: stato,
    ad_user_data: stato,
    ad_personalization: stato,
    analytics_storage: stato,
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  gtag('js', new Date());
  gtag('config', AW_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + AW_ID;
  document.head.appendChild(s);

  function concediConsenso() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
  function negaConsenso() {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  }

  function registraChiamata() {
    if (!consensoDato()) return;
    gtag('event', 'conversion', {
      send_to: AW_ID + '/' + AW_LABEL,
      value: 1.0,
      currency: 'EUR'
    });
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="tel:"]') : null;
    if (a) registraChiamata();
  }, true);

  /* ------------------------------------------------------------
     Statistiche visitatori - PostHog (server UE, Francoforte)
     Prima del consenso: nessun cookie e niente localStorage
     (persistenza solo in memoria), niente registrazioni.
     Dopo "Accetta tutti": persistenza completa e registrazione
     anonima delle sessioni (campi dei moduli sempre oscurati).
     ------------------------------------------------------------ */
  var PH_KEY  = 'phc_xwgNdg8zvgPNdEJ2VSZgLV9mXKF9Zzf7QrL3xPFANzVC';   // progetto PostHog 365160 (EU), org Verde Oliva
  var PH_HOST = 'https://eu.i.posthog.com';

  function caricaPosthog() {
    if (window.posthog && window.posthog.__loaded) return;
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    var ok = consensoDato();
    window.posthog.init(PH_KEY, {
      api_host: PH_HOST,
      person_profiles: 'identified_only',
      persistence: ok ? 'localStorage+cookie' : 'memory',
      disable_session_recording: !ok,
      session_recording: { maskAllInputs: true },
      capture_pageview: true,
      capture_pageleave: true
    });
  }
  function posthogConsenso(si) {
    if (!window.posthog || typeof window.posthog.set_config !== 'function') return;
    if (si) {
      window.posthog.set_config({ persistence: 'localStorage+cookie', disable_session_recording: false });
      window.posthog.startSessionRecording();
    } else {
      window.posthog.set_config({ persistence: 'memory', disable_session_recording: true });
      window.posthog.stopSessionRecording();
    }
  }
  if (PH_KEY.indexOf('phc_') === 0) caricaPosthog();

  // contatti: chiamate e WhatsApp come eventi PostHog (anonimi)
  document.addEventListener('click', function (ev) {
    if (!window.posthog || !ev.target || !ev.target.closest) return;
    var a = ev.target.closest('a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]');
    if (!a) return;
    var tel = /^tel:/.test(a.getAttribute('href'));
    window.posthog.capture(tel ? 'chiamata' : 'whatsapp', { pagina: location.pathname });
  }, true);

  // pulsanti del banner su QUALSIASI pagina (anche quelle dei comuni, che usano a() e r()):
  // dopo il clic la scelta e gia salvata, la si applica subito senza aspettare la pagina dopo
  document.addEventListener('click', function (ev) {
    var b = ev.target && ev.target.closest ? ev.target.closest('#cookie-banner .cb-ok, #cookie-banner .cb-no') : null;
    if (!b) return;
    setTimeout(function () {
      if (consensoDato()) { concediConsenso(); posthogConsenso(true); }
      else { negaConsenso(); posthogConsenso(false); }
    }, 0);
  });

  function agganciaBanner() {
    var accettaOrig = window.accettaCookie;
    var rifiutaOrig = window.rifiutaCookie;

    window.accettaCookie = function () {
      if (typeof accettaOrig === 'function') { accettaOrig.apply(this, arguments); }
      else { try { localStorage.setItem(CONSENT_KEY, 'all'); } catch (e) {}
             var b1 = document.getElementById('cookie-banner'); if (b1) b1.style.display = 'none'; }
      concediConsenso();
      posthogConsenso(true);
    };

    window.rifiutaCookie = function () {
      if (typeof rifiutaOrig === 'function') { rifiutaOrig.apply(this, arguments); }
      else { try { localStorage.setItem(CONSENT_KEY, 'necessary'); } catch (e) {}
             var b2 = document.getElementById('cookie-banner'); if (b2) b2.style.display = 'none'; }
      negaConsenso();
      posthogConsenso(false);
    };

    var p = document.querySelector('#cookie-banner p');
    if (p && !/marketing/i.test(p.textContent)) {
      var linkPrivacy = p.querySelector('a[href*="privacy"]');
      var linkCookie  = p.querySelector('a[href*="cookie"]');
      var hrefPrivacy = linkPrivacy ? linkPrivacy.getAttribute('href') : 'privacy.html';
      var hrefCookie  = linkCookie  ? linkCookie.getAttribute('href')  : 'cookie.html';
      p.innerHTML = 'Questo sito utilizza cookie tecnici necessari e, previo tuo consenso, ' +
                    'cookie analitici e di <strong>marketing</strong> di Google, usati per ' +
                    'misurare le richieste di contatto provenienti dalla pubblicita. ' +
                    'Leggi la <a href="' + hrefPrivacy + '">Privacy Policy</a> e la ' +
                    '<a href="' + hrefCookie + '">Cookie Policy</a>.';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', agganciaBanner);
  } else {
    agganciaBanner();
  }
})();
