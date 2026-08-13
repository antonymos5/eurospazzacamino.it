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

  function consensoDato() {
    try { return localStorage.getItem(CONSENT_KEY) === 'all'; } catch (e) { return false; }
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

  function agganciaBanner() {
    var accettaOrig = window.accettaCookie;
    var rifiutaOrig = window.rifiutaCookie;

    window.accettaCookie = function () {
      if (typeof accettaOrig === 'function') { accettaOrig.apply(this, arguments); }
      else { try { localStorage.setItem(CONSENT_KEY, 'all'); } catch (e) {}
             var b1 = document.getElementById('cookie-banner'); if (b1) b1.style.display = 'none'; }
      concediConsenso();
    };

    window.rifiutaCookie = function () {
      if (typeof rifiutaOrig === 'function') { rifiutaOrig.apply(this, arguments); }
      else { try { localStorage.setItem(CONSENT_KEY, 'necessary'); } catch (e) {}
             var b2 = document.getElementById('cookie-banner'); if (b2) b2.style.display = 'none'; }
      negaConsenso();
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
