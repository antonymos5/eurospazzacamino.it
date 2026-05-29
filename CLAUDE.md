# CLAUDE.md — eurospazzacamino.it

## Descrizione e scopo

Sito web ufficiale di **Eurospazzacamino**, servizio professionale di spazzacamino abilitato Regione Lombardia. Offre pulizia canna fumaria, videoispezione, assistenza stufe e camini per privati e condomini.  
Il sito è un **sito di lead generation locale** basato su HTML/CSS statici, pubblicato via GitHub Pages.

**Dominio:** https://www.eurospazzacamino.it  
**Repository:** https://github.com/antonymos5/eurospazzacamino.it

---

## Brand

- **Azienda:** Verde Oliva S.r.l.s.
- **P.IVA:** IT10927440965
- **Telefono:** 333 645 3219
- **Indirizzo:** Via Colombera 2, 26831 Casalmaiocco (LO)
- **Colori brand:** Verde oliva `#1a7a2e`, verde scuro `#145e23`, verde profondo `#0e4419`
- **Font:** Oswald (titoli) + Source Sans 3 (corpo)

---

## Struttura cartelle

```
eurospazzacamino.it/
├── index.html                  # Homepage principale
├── privacy.html                # Privacy policy
├── cookie.html                 # Cookie policy
├── robots.txt                  # Direttive crawler
├── sitemap.xml                 # Mappa del sito
├── logo.png                    # Logo principale
├── google2a5f68fcbab4234d.html # Verifica Google Search Console
├── CNAME                       # Dominio custom GitHub Pages
├── blog/                       # Sezione blog editoriale
│   ├── index.html
│   ├── ogni-quanto-pulire-canna-fumaria.html
│   ├── pulizia-vs-videoispezione-canna-fumaria.html
│   └── quanto-costa-spazzacamino-lodi-2025.html
├── lodi/                       # Pagine geo-localizzate per comune
├── casalmaiocco/               # (struttura: index.html per ogni comune)
├── sant-angelo-lodigiano/
├── codogno/
├── [altri ~60 comuni]/         # Una cartella per comune servito
└── ...
```

---

## Zone geografiche target

Lodi (capoluogo), **Casalmaiocco** (sede operativa), e tutto il **Lodigiano**:  
Sant'Angelo Lodigiano, Codogno, Lodi Vecchio, San Martino in Strada, Tavazzano con Villavesco, Sordio, Massalengo, Marudo, Livraga, Brembio, Graffignana, San Colombano al Lambro, Secugnago, Turano Lodigiano, Valera Fratta, Borghetto Lodigiano, e comuni limitrofi della provincia di Milano (San Donato, San Giuliano, Paullo, Segrate, Pioltello, ecc.).

---

## Regole SEO specifiche

### Pagine geo (cartelle comuni)
- Ogni cartella-comune contiene un `index.html` con `<title>` nel formato:  
  `Spazzacamino [Comune] | Eurospazzacamino – Pulizia Canna Fumaria`
- La `<meta name="description">` deve includere comune, servizio principale e telefono.
- Canonical: `<link rel="canonical" href="https://www.eurospazzacamino.it/[comune]/"/>`
- Schema.org `LocalBusiness` obbligatorio su ogni pagina con `areaServed` al comune specifico.
- Il keyword primario è: `spazzacamino [comune]` — usarlo in H1, primo paragrafo, alt immagini.

### Homepage
- Keyword principale: `spazzacamino Lodi`
- H1 unico, presenza di keyword geo nel primo paragrafo.
- Structured data: `LocalBusiness` + `Service`.
- Tag `hreflang` non necessari (solo italiano).

### Blog
- URL formato: `/blog/[slug-articolo].html`
- Schema: `Article` o `BlogPosting` su ogni post.
- Keyword long-tail: es. "ogni quanto pulire canna fumaria", "costo spazzacamino Lodi 2025".
- Interlink obbligatorio: ogni articolo deve linkare almeno 2 pagine interne (homepage o pagine comune).

### Regole generali
- `robots.txt`: `Allow: /` — nessuna pagina esclusa salvo privacy/cookie.
- `sitemap.xml`: aggiornare `<lastmod>` a ogni modifica rilevante.
- Immagini: sempre `alt` descrittivo con keyword geo. Formato WebP quando possibile.
- Mai duplicare content tra pagine comuni: ogni pagina deve avere almeno 60% testo unico.
- Velocità: CSS inline o minificato, no JS pesante, Google Fonts con `display=swap`.

---

## Workflow GitHub

```bash
# Staging delle modifiche
git add <file>            # aggiungi file specifici
# oppure
git add .                 # aggiungi tutto (usa con cautela)

# Commit con messaggio descrittivo
git commit -m "descrizione della modifica"

# Pubblicazione (GitHub Pages si aggiorna automaticamente)
git push origin main
```

**Convenzioni commit:**
- `feat: aggiungi pagina [comune]`
- `fix: correggi canonical pagina lodi`
- `seo: aggiorna meta description homepage`
- `blog: aggiungi articolo [titolo]`
- `style: aggiorna colori header`

---

## Note operative

- Il sito è servito da **GitHub Pages** — ogni push su `main` pubblica automaticamente.
- Non usare framework JS pesanti: il sito è HTML/CSS puro per massima velocità.
- Il numero di telefono **333 645 3219** deve essere sempre cliccabile: `<a href="tel:+393336453219">`.
- Abilitazione Regione Lombardia è un elemento differenziante: mantenerla visibile in hero e footer.
- La pagina `google2a5f68fcbab4234d.html` non va mai eliminata (verifica Search Console).
