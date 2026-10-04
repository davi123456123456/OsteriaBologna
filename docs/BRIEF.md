# BRIEF DI PROGETTO — Sito web "Osteria Bologna"

Sei un senior web designer e front-end developer con vent'anni di esperienza su siti per la ristorazione di alto livello. Devi progettare e sviluppare il sito one-page di **Osteria Bologna**, trattoria di cucina tradizionale bolognese. Leggi tutto questo documento prima di scrivere codice: contiene decisioni di design già prese, la mappatura di ogni file fornito, i testi definitivi e i criteri di accettazione.

---

## 0. Regole d'oro (valgono sempre)

1. **Riferimento, non copia.** I file `DESIGN.md`, `tokens.json`, `variables.css`, `theme.css` descrivono il linguaggio visivo del sito di Amrit Palace. Usali come riferimento per tipografia, ritmo, geometria e atmosfera. Non copiare testi, nomi, logo, immagini o layout pixel-per-pixel di Amrit Palace e non nominarlo nel codice.
2. **La palette cambia.** Lo sfondo deve essere un beige più chiaro di quello di Amrit Palace (`#D8CBB8`). Usa esclusivamente i token della sezione 4: sostituiscono quelli dei file forniti.
3. **Nessun prezzo**, né nel menù né nella carta dei vini. La voce "Fascia: Media/Alta" presente nella carta dei vini è un indicatore di prezzo: **non va mostrata**.
4. **Nessun fatto inventato.** Non inventare anno di fondazione, storia, nomi dello chef, premi, recensioni, orari o indirizzo. Dove manca un dato usa i segnaposto della sezione 12 e rendili facili da trovare.
5. **Lingua:** tutto il sito è in italiano (`<html lang="it">`). Titoli in maiuscolo come da design system; testi correnti in frase normale.
6. **Restrizione:** un solo accento cromatico, geometria netta, nessuna ombra. L'audacia si spende in pochi momenti di motion ben orchestrati (sezione 5), non in effetti sparsi.

---

## 1. Concept

**"Sfoglia, brodo e brace."** Il sito è una trattoria bolognese messa in pagina come un menù stampato: tela beige chiara, titoli serif leggerissimi in maiuscolo a dimensioni enormi, fotografia calda e scura a fare da quinta teatrale.

Il motivo visivo distintivo è la **tovaglia a quadretti** che si vede nella foto della sala: compare come transizione a scacchiera all'apertura della hero e quando la si lascia scorrendo. È l'unico momento "rumoroso" del sito; tutto il resto è silenzioso e disciplinato.

Alternanza delle superfici, dall'alto in basso:

```
HERO (scuro, video)
  ↓ transizione "tovaglia"
MARQUEE + LA TRATTORIA (pergamena chiara)
LA SFOGLIA (lino)
IL MENÙ (pergamena chiara)
LA CARTA DEI VINI (cantina, scuro)
PRENOTA / CONTATTI (pergamena chiara + foto)
FOOTER (cantina, scuro, wordmark gigante)
```

---

## 2. Asset forniti: inventario, mappatura, preparazione

### 2.1 Come riconoscere i file

I nomi dei file che ricevi potrebbero essere diversi da quelli qui sotto. **Identifica ogni file per contenuto e dimensioni**, non per nome. Attenzione: i suffissi `169` e `916` nei nomi dei video sono **sbagliati** (vedi colonna "Formato reale").

**Video**

| Nome originale | Formato reale | Durata | Contenuto | Uso |
|---|---|---|---|---|
| `video_carne_alla_bracie_916.mp4` | 736×414, **orizzontale 16:9**, con audio | 25,9 s | Bistecche sollevate con la pinza, griglia con fiamme, legna che brucia; 15,3–20,6 s braccio che gira il volantino della griglia | Hero desktop |
| `video_pasta_169.mp4` | 720×1280, **verticale 9:16**, con audio | 17,3 s | 0–6,8 s pasta in padella e tagliatelle; 6,8–11,4 s pizza e altri piatti **non in menù**; 11,4 s–fine crostini con prosciutto e burrata | Hero mobile, La sfoglia, Antipasti |
| `Video_vino169.mp4` | 720×1440, **verticale 1:2** | 4,2 s | Bottiglia scura con etichetta oro, fondo nero puro | Carta dei vini |

**Immagini**

| Nome originale | Dimensioni | Contenuto | Nuovo nome | Uso |
|---|---|---|---|---|
| `1790877306945_image.png` | 735×413 | Sala vista dalla porta: tavoli con tovaglie a quadretti, lampade industriali | `sala.jpg` | La trattoria (reveal "porta") |
| `1790877401425_image.png` | 1152×2048 | Bianco e nero, cuoco con grembiule che impiatta da un pentolino | `cucina-bn.jpg` | Prenota / Contatti |
| `1790877847579_image.png` | 1200×795 | Bistecca con l'osso tagliata su tagliere, sale grosso, vista dall'alto | `carne-tagliere.jpg` | Menù → Secondi |
| `1790878081738_image.png` | 736×920 | Pasta all'uovo mantecata sollevata con la pinza | `pasta-mantecata.jpg` | Menù → Primi |
| `1790878090696_image.png` | 736×920 | Pasta in crema con lamelle di tartufo | `pasta-piatto.jpg` | La sfoglia, pannello 05 |
| `1790878114484_image.png` | 736×920 | Rotella che taglia la sfoglia accanto al mattarello | `sfoglia-taglio.jpg` | La sfoglia, pannello 02 |
| `1790878128149_image.png` | 736×920 | Sfoglia che esce dalla sfogliatrice, giacca da cuoco | `sfoglia-rulli.jpg` | La sfoglia, pannello 01 |
| `1790878147825_image.png` | 736×920 | Mani che srotolano le tagliatelle | `tagliatelle-nastri.jpg` | La sfoglia, pannello 03 |
| `1790925620736_image.png` | 1062×1359 | Vigneti visti dall'alto | `vigna-aerea.jpg` | Carta dei vini, step 01 |
| `1790925839819_image.png` | 1200×800 | Botti di rovere in cantina | `cantina-botti.jpg` | Carta dei vini, step 02 |
| `1790925970032_image.png` | 735×563 | Collage: a sinistra un piatto di pasta al sugo, a destra cuochi con grembiuli col logo di un altro ristorante | `primo-ragu.jpg` (**solo metà sinistra**) | Menù → Primi, inserto piccolo |

### 2.2 Vincoli sugli asset (importanti)

- **Immagine collage (735×563):** usa **solo la metà sinistra** (piatto), ritagliando `x 0–366`. La metà destra mostra il logo di un altro ristorante sui grembiuli e persone reali: non deve mai comparire.
- **Foto della sala (735×413):** ha una firma del fotografo in basso a destra. Non rimuoverla e non mascherarla. Inserisci nel footer la riga crediti `Foto sala: © Suppapapa` finché il cliente non fornisce un originale con diritti chiari (segnaposto `[FOTO_SALA_ORIGINALE]`).
- **Risoluzione bassa:** la foto della sala e il video della brace sono larghi circa 735 px. Non mostrare mai un asset a più di circa 1,4 volte la sua larghezza naturale in pixel CSS: la sala resta contenuta (max 880 px di larghezza), il video della brace va a tutto schermo solo dietro overlay scuro e grana (sezione 7.2), che nascondono la morbidezza. Lascia nel codice un commento `// TODO: sostituire con sorgente ≥1920px` su questi due asset.
- **Immagini 736×920:** larghezza massima di visualizzazione 560 px CSS.
- **Pasta col tartufo:** il tartufo non è in menù. Usa la foto solo come immagine d'atmosfera, con didascalia e alt generici (mai "tagliatelle al tartufo").
- **Video pasta:** il tratto 6,8–11,4 s (pizza e piatti non in carta) **non deve comparire** in nessun punto del sito.

### 2.3 Pipeline media

Metti i file originali in `/_source-assets/` (fuori da `public`, non versionati se pesanti) e crea `scripts/prepare-media.sh`, che genera tutto in `public/media/`. Questi comandi sono già stati provati sui file reali:

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC=_source-assets
OUT=public/media
mkdir -p $OUT/video $OUT/img

# HERO DESKTOP — brace: 0–15,3 s + 20,56 s–fine (via il volantino), senza audio
ffmpeg -y -i "$SRC/video_carne_alla_bracie_916.mp4" -filter_complex \
 "[0:v]trim=0:15.3,setpts=PTS-STARTPTS[a];[0:v]trim=20.56:25.9,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0,format=yuv420p[v]" \
 -map "[v]" -an -c:v libx264 -crf 24 -preset slow -movflags +faststart $OUT/video/hero-brace.mp4

# HERO MOBILE + LA SFOGLIA — pasta in padella 0–6,8 s
ffmpeg -y -ss 0 -t 6.8 -i "$SRC/video_pasta_169.mp4" -an -c:v libx264 -crf 24 -preset slow \
 -pix_fmt yuv420p -movflags +faststart $OUT/video/sfoglia-padella.mp4

# ANTIPASTI — crostini e prosciutto 11,4 s–fine
ffmpeg -y -ss 11.4 -i "$SRC/video_pasta_169.mp4" -an -c:v libx264 -crf 24 -preset slow \
 -pix_fmt yuv420p -movflags +faststart $OUT/video/antipasti-crostini.mp4

# VINO — loop "boomerang" (avanti + indietro) per evitare lo stacco a fine clip
ffmpeg -y -i "$SRC/Video_vino169.mp4" -filter_complex \
 "[0:v]split[f][r0];[r0]reverse[r];[f][r]concat=n=2:v=1:a=0,format=yuv420p[v]" \
 -map "[v]" -an -c:v libx264 -crf 22 -preset slow -movflags +faststart $OUT/video/vino-calice.mp4

# POSTER (fotogrammi già verificati)
ffmpeg -y -ss 6.5 -i $OUT/video/hero-brace.mp4        -frames:v 1 -q:v 2 $OUT/video/hero-brace-poster.jpg
ffmpeg -y -ss 3.5 -i $OUT/video/sfoglia-padella.mp4   -frames:v 1 -q:v 2 $OUT/video/sfoglia-padella-poster.jpg
ffmpeg -y -ss 3   -i $OUT/video/antipasti-crostini.mp4 -frames:v 1 -q:v 2 $OUT/video/antipasti-crostini-poster.jpg
ffmpeg -y -ss 2   -i $OUT/video/vino-calice.mp4       -frames:v 1 -q:v 2 $OUT/video/vino-calice-poster.jpg

# IMMAGINI — PNG → JPG di alta qualità (next/image poi genera AVIF/WebP)
ffmpeg -y -i "$SRC/1790877306945_image.png" -q:v 2 $OUT/img/sala.jpg
ffmpeg -y -i "$SRC/1790877401425_image.png" -q:v 2 $OUT/img/cucina-bn.jpg
ffmpeg -y -i "$SRC/1790877847579_image.png" -q:v 2 $OUT/img/carne-tagliere.jpg
ffmpeg -y -i "$SRC/1790878081738_image.png" -q:v 2 $OUT/img/pasta-mantecata.jpg
ffmpeg -y -i "$SRC/1790878090696_image.png" -q:v 2 $OUT/img/pasta-piatto.jpg
ffmpeg -y -i "$SRC/1790878114484_image.png" -q:v 2 $OUT/img/sfoglia-taglio.jpg
ffmpeg -y -i "$SRC/1790878128149_image.png" -q:v 2 $OUT/img/sfoglia-rulli.jpg
ffmpeg -y -i "$SRC/1790878147825_image.png" -q:v 2 $OUT/img/tagliatelle-nastri.jpg
ffmpeg -y -i "$SRC/1790925620736_image.png" -q:v 2 $OUT/img/vigna-aerea.jpg
ffmpeg -y -i "$SRC/1790925839819_image.png" -q:v 2 $OUT/img/cantina-botti.jpg
# Collage: SOLO metà sinistra (il divisorio è a x=367)
ffmpeg -y -i "$SRC/1790925970032_image.png" -vf "crop=366:563:0:0" -q:v 2 $OUT/img/primo-ragu.jpg
```

Adatta i nomi di input se i file ricevuti si chiamano diversamente. Pesi attesi: hero-brace ≈ 2,6 MB, sfoglia-padella ≈ 1,3 MB, antipasti ≈ 1 MB, vino ≈ 1,4 MB.

### 2.4 Testi alternativi (alt)

| File | Alt |
|---|---|
| sala.jpg | "La sala dell'osteria: tavoli apparecchiati con tovaglie a quadretti e lampade a sospensione" |
| cucina-bn.jpg | "In cucina, un cuoco impiatta da un pentolino" |
| carne-tagliere.jpg | "Bistecca con l'osso alla brace, tagliata su un tagliere di legno" |
| pasta-mantecata.jpg | "Pasta fresca all'uovo mantecata, servita con la pinza" |
| pasta-piatto.jpg | "Un piatto di pasta fresca appena servito" |
| sfoglia-taglio.jpg | "La sfoglia tagliata a mano con la rotella, accanto al mattarello" |
| sfoglia-rulli.jpg | "La sfoglia all'uovo che esce dalla sfogliatrice" |
| tagliatelle-nastri.jpg | "Mani che srotolano le tagliatelle appena tagliate" |
| vigna-aerea.jpg | "Filari di vigna visti dall'alto" |
| cantina-botti.jpg | "Botti di rovere allineate in cantina" |
| primo-ragu.jpg | "Un primo di pasta al sugo in un piatto fondo bianco" |

I video sono decorativi: `aria-hidden="true"`, nessun alt.

---

## 3. Stack e struttura

- **Next.js** (ultima versione stabile, App Router, TypeScript), deploy su **Vercel**.
- **Tailwind CSS v4** con i token in `@theme` (sezione 4).
- **GSAP** con **ScrollTrigger** e **SplitText** (tutti i plugin GSAP sono gratuiti), integrazione React con `@gsap/react` (`useGSAP`), responsive motion con `gsap.matchMedia()`.
- **Lenis** per lo smooth scroll, sincronizzato con ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` e `gsap.ticker`). Disattivato con `prefers-reduced-motion`.
- **Font self-hosted** (nessuna chiamata a server esterni a runtime, utile anche per il GDPR):
  - Display: **TT Ramillas** è un font a pagamento. Se in `/_source-assets/fonts/` trovi file TT Ramillas con licenza, usali con `next/font/local`. Altrimenti usa **Fraunces** (variabile, da `next/font/google`, assi `opsz`, `SOFT`, `WONK`), impostato a peso 300, `"SOFT" 50, "WONK" 0`, optical sizing automatico. Rispetto ad altri sostituti ha un calore "da menù stampato" più adatto a un'osteria.
  - Testo: **Satoshi** (gratuito, Fontshare). Scarica i pesi 500 e 700 in woff2, mettili in `src/fonts/` e caricali con `next/font/local`. Solo se il download non è possibile, ripiega su **Inter**.
- Analytics: Vercel Web Analytics (senza cookie). Nessun embed di terze parti (niente iframe di Google Maps: vedi 7.9).

Struttura cartelle:

```
src/
  app/
    layout.tsx            // font, metadata, JSON-LD, script anti-flash classe "js"
    page.tsx              // composizione sezioni
    privacy/page.tsx
    cookie/page.tsx
    opengraph-image.tsx   // OG 1200×630 generata con next/og
    sitemap.ts  robots.ts  not-found.tsx
    globals.css           // @import "tailwindcss"; @theme; base; utility
  components/
    Nav.tsx  MobileMenu.tsx
    Hero.tsx  Tovaglia.tsx
    Marquee.tsx
    Trattoria.tsx
    Sfoglia.tsx
    menu/MenuSection.tsx  menu/MenuCategory.tsx  menu/Dish.tsx
    vini/ViniSection.tsx  vini/WineStory.tsx  vini/WineList.tsx  vini/Wine.tsx
    Contatti.tsx  Footer.tsx
    ui/GhostButton.tsx  ui/TextLink.tsx  ui/Caption.tsx  ui/DisplayHeading.tsx
    ui/LazyVideo.tsx  ui/Grain.tsx  ui/Hairline.tsx  ui/CategoryNav.tsx
  data/
    site.ts  menu.ts  vini.ts
  lib/
    motion.ts             // easing, durate, helper
    smooth-scroll.ts      // Lenis + ScrollTrigger
    slug.ts
scripts/prepare-media.sh
_source-assets/           // originali
```

---

## 4. Design system

### 4.1 Palette (sostituisce quella di Amrit Palace)

Stessa tonalità calda del riferimento (circa 35°), ma la tela è più chiara: luminosità 88% contro 78%. Rapporti di contrasto già verificati.

| Token | Hex | Ruolo | Contrasto |
|---|---|---|---|
| `pergamena` | `#EBE3D5` | Tela di pagina, superficie principale | — |
| `lino` | `#DED3C4` | Superficie secondaria (sezione La sfoglia, celle della tovaglia) | — |
| `filo` | `#C6BAA9` | Hairline 1px e divisori su chiaro | decorativo |
| `noce` | `#6B6257` | Testo secondario e didascalie su pergamena | 4,7:1 ✔ AA |
| `espresso` | `#615B53` | Descrizioni dei piatti, testo secondario su lino | 5,3:1 su pergamena, 4,5:1 su lino ✔ |
| `onice` | `#2C2C2C` | Testo primario, titoli, nav su chiaro | 11:1 ✔ |
| `cantina` | `#292622` | Superfici scure (vini, footer), overlay foto | — |
| `noce-chiaro` | `#A39A8C` | Testo secondario su cantina | 5,4:1 ✔ |
| `zafferano` | `#D49653` | **Unico accento**, solo decorativo (mai per testo) | 2:1, non usare per testo |

Hairline su scuro: `rgba(235, 227, 213, 0.16)`. Testo su scuro: `pergamena` (11,8:1 su cantina).

Lo **zafferano** compare solo in: separatori del marquee, indicatore della categoria attiva (menù e vini), barra di avanzamento della sezione La sfoglia, evidenziazione temporanea dei collegamenti menù↔vini. Massimo 2–3 presenze per schermata. Mai bottoni pieni colorati, mai nero puro `#000` per il testo.

### 4.2 `globals.css`

Nota: nei file forniti `--section-gap: 120-160px` e `--element-gap: 12-16px` non sono CSS valido. Qui sono stati sostituiti con `clamp()`.

```css
@import "tailwindcss";

@theme inline {
  /* Colori */
  --color-pergamena: #EBE3D5;
  --color-lino: #DED3C4;
  --color-filo: #C6BAA9;
  --color-noce: #6B6257;
  --color-espresso: #615B53;
  --color-onice: #2C2C2C;
  --color-cantina: #292622;
  --color-noce-chiaro: #A39A8C;
  --color-zafferano: #D49653;
  --color-filo-scuro: rgb(235 227 213 / 0.16);

  /* Font (le variabili arrivano da next/font) */
  --font-display: var(--font-fraunces), "TT Ramillas Variable", Georgia, serif;
  --font-sans: var(--font-satoshi), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  /* Scala tipografica fluida (valore massimo = misura del riferimento) */
  --text-wordmark: clamp(4rem, 13.8vw, 12.4375rem);     /* 199px, Satoshi 500 */
  --text-display: clamp(3.25rem, 8vw, 7.1875rem);       /* 115px, serif 300 */
  --text-heading-lg: clamp(2.5rem, 4.8vw, 4.3125rem);   /* 69px */
  --text-heading: clamp(2.375rem, 4.5vw, 4.0625rem);    /* 65px */
  --text-heading-sm: clamp(2rem, 3.5vw, 3.125rem);      /* 50px */
  --text-subheading: clamp(1.75rem, 2.9vw, 2.625rem);   /* 42px, Satoshi 500 */
  --text-body-lg: clamp(1.25rem, 1.8vw, 1.625rem);      /* 26px */
  --text-item: clamp(1.375rem, 1.8vw, 1.625rem);        /* 22–26px, nomi piatti/vini */
  --text-body: 0.9375rem;                               /* 15px */
  --text-caption: 0.8125rem;                            /* 13px */
  --text-micro: 0.75rem;                                /* 12px */

  /* Spaziatura */
  --spacing-gutter: clamp(1.25rem, 3vw, 2.625rem);      /* 20–42px */
  --spacing-section: clamp(5rem, 10vw, 10rem);          /* 80–160px */
  --spacing-element: clamp(0.75rem, 1vw, 1rem);         /* 12–16px */
  --spacing-card: 1.75rem;                              /* 28px */

  /* Raggi */
  --radius-ui: 3px;       /* solo bottoni, tag, controlli */
  --radius-none: 0px;     /* card, immagini, sezioni */

  /* Motion */
  --ease-editorial: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-reveal: cubic-bezier(0.77, 0, 0.175, 1);
  --duration-hover: 400ms;
}
```

Mantieni anche la scala di spaziature del riferimento (4, 5, 6, 7, 8, 10, 12, 16, 17, 20, 24, 28, 32, 42, 92, 206 px) come utility.

### 4.3 Tipografia

| Ruolo | Famiglia | Peso | Dimensione | Interlinea | Tracking | Note |
|---|---|---|---|---|---|---|
| Wordmark hero e footer | Satoshi | 500 | `--text-wordmark` | 0.8 | -0.016em | Maiuscolo |
| Display (titoli di sezione) | Serif display | 300 | `--text-display` | 0.8 | -0.04em | Maiuscolo, mai in grassetto |
| Titolo categoria | Serif display | 300 | `--text-heading-lg` | 0.9 | -0.04em | Maiuscolo |
| Titolo step / pannello | Serif display | 300 | `--text-heading-sm` | 0.9 | -0.03em | Maiuscolo |
| Nome piatto / vino | Serif display | 300 | `--text-item` | 1.15 | -0.006em | Maiuscolo |
| Numero di telefono | Satoshi | 500 | `--text-subheading` | 1 | -0.04em | |
| Lead | Satoshi | 500 | `--text-body-lg` | 1.2 | -0.006em | Frase normale, max 32ch |
| Testo | Satoshi | 500 | 15px | 1.5 | -0.01em | Max 60ch, sempre allineato a sinistra |
| Nav, bottoni | Satoshi | 500 | 14px | 1 | -0.01em | Maiuscolo |
| Didascalie, meta | Satoshi | 500 | 12–13px | 1.3 | -0.012em | Maiuscolo |
| Enfasi | Satoshi | 700 | — | — | — | Mai grassetto sul serif |

Il serif non scende mai sotto i 22px. Il sans non supera i 42px, tranne il wordmark.

**Accenti in maiuscolo:** con interlinea 0.8–0.9 e maschere `overflow: hidden` per le animazioni, le lettere accentate maiuscole (MENÙ, È, À) vengono tagliate in alto. Su ogni maschera di riga aggiungi `padding-top: 0.14em; margin-top: -0.14em;` e verifica a schermo la parola "MENÙ".

### 4.4 Griglia e layout

- Griglia a 12 colonne, a tutta larghezza (niente contenitore centrato), margini laterali `--spacing-gutter`, gap tra colonne 24px (16px su mobile).
- Sopra i 1920px il contenuto si ferma a 1760px e resta centrato; gli sfondi continuano a tutta larghezza.
- Spazio verticale tra sezioni: `--spacing-section`.
- Tutto allineato a sinistra. Niente paragrafi centrati.

### 4.5 Componenti

- **GhostButton:** sfondo trasparente, bordo 1px (`pergamena` su scuro, `onice` su chiaro), Satoshi 500 14px maiuscolo, padding 20px × 28px, raggio 3px. Al passaggio del mouse uno pseudo-elemento sale dal basso (`scaleY 0→1`, 400ms, `--ease-editorial`) riempiendo il bottone col colore del bordo; il testo inverte colore. Focus: outline 1px del colore del testo, offset 3px.
- **TextLink:** maiuscolo 13–14px, sottolineatura 1px che si estende da sinistra al passaggio del mouse (`background-size 0→100%`). Nessuna freccia dopo il testo.
- **Caption:** Satoshi 500 12px maiuscolo, colore `noce` (o `noce-chiaro` su scuro). Usala con parsimonia: solo dove porta informazione (meta della hero, didascalie foto, produttore e regione dei vini, numerazione degli step). **Niente occhielli sopra ogni titolo.**
- **Hairline:** 1px `filo` (o `filo-scuro`), a tutta larghezza della colonna. Si usa come regola tipografica tra le voci, non come cornice.
- **Immagini:** raggio 0, nessuna ombra, nessun bordo. `object-fit: cover` con `object-position` dichiarato per ogni immagine.
- **Grain:** overlay di rumore SVG (`feTurbulence`, data-URI, statico), `opacity: 0.06`, `mix-blend-mode: overlay`, `pointer-events: none`. Solo su hero, sezione vini e foto della sala.
- **LazyVideo:** `muted playsinline loop`, `preload="none"`, `src` assegnato quando l'elemento entra a 200px dal viewport (IntersectionObserver). Va in play quando è visibile almeno al 25%, in pausa quando esce. Ha sempre un poster. Con `prefers-reduced-motion` o `navigator.connection.saveData` mostra solo il poster. Ogni video ha un piccolo bottone testuale "Pausa" / "Riproduci" (Caption, angolo in basso a destra, `aria-pressed`): è richiesto dalla WCAG 2.2.2 per contenuti in movimento oltre i 5 secondi.

---

## 5. Sistema di motion

**Principio:** pochi momenti orchestrati e riconoscibili; il resto della pagina deve sembrare carta stampata. **Niente** fade-in-su generici sulle sezioni, niente animazioni sui paragrafi, niente hover su elementi non cliccabili, niente cursore personalizzato, niente parallax decorativo.

| # | Momento | Trigger | Specifica |
|---|---|---|---|
| M1 | Intro hero "la tovaglia si toglie" | caricamento | 7.2.3 |
| M2 | Uscita hero "la tovaglia si stende" | scroll, scrub | 7.2.4 |
| M3 | Cambio tema della nav | scroll | 7.1 |
| M4 | Marquee dei piatti | continuo, 27s lineare | 7.3 |
| M5 | Rivelazione a righe dei titoli display | entrata nel viewport, una volta sola | sotto |
| M6 | La sala "porta socchiusa" | scroll, scrub | 7.4 |
| M7 | La sfoglia, binario orizzontale | scroll, pin + scrub (desktop) | 7.5 |
| M8 | Media del menù, scopertura dal basso | entrata, una volta sola | 7.6 |
| M9 | Vigna → cantina → calice | scroll, a step | 7.7 |
| M10 | Evidenziazione collegamento menù↔vini | click | 7.6.4 |
| M11 | Menu mobile, apertura e chiusura | click | 7.1 |

**M5, titoli display:** solo i titoli in `--text-display` e `--text-heading-lg`. SplitText per righe con maschera (`mask: "lines"`, padding per gli accenti come in 4.3), `yPercent 105 → 0`, durata 0.9s, `expo.out`, stagger 0.08s, partenza a `top 85%`, una sola volta. Rilancia lo split al resize (`autoSplit`) e solo dopo `document.fonts.ready`.

**Easing:** hover e micro-interazioni `cubic-bezier(0.25,0.46,0.45,0.94)` a 0.4s. Scoperture con clip-path `cubic-bezier(0.77,0,0.175,1)` a 1.1–1.2s. Testi `expo.out`. Tutto ciò che è legato allo scroll: `scrub: 0.8`, `ease: "none"`.

**Riduzione del movimento:** con `prefers-reduced-motion: reduce` nessun pin, nessuno scrub, nessuno split. Il contenuto compare con un semplice fade di 0.3s, il marquee è fermo, i video mostrano il poster, la tovaglia non esiste. Il layout deve restare completo e bello anche così.

**Mobile:** `ScrollTrigger.config({ ignoreMobileResize: true })` e unità `svh` per le altezze fisse, così la barra degli indirizzi non fa saltare i pin.

---

## 6. Architettura della pagina

```
#top        Nav (fissa)
#hero       Hero + Tovaglia                       [scuro]
            Marquee piatti                        [pergamena]
#trattoria  La trattoria                          [pergamena]
#sfoglia    La sfoglia                            [lino]
#menu       Il menù (5 categorie)                 [pergamena]
#vini       La carta dei vini (racconto + lista)  [cantina]
#contatti   Prenota un tavolo                     [pergamena + foto]
            Footer                                [cantina]
/privacy    /cookie                               pagine semplici
```

Ogni sezione dichiara `data-theme="dark|light"` per il cambio di colore della nav.

---

## 7. Sezioni in dettaglio

### 7.1 Navigazione

```
┌───────────────────────────────────────────────────────────────────────┐
│ OSTERIA BOLOGNA      MENÙ   VINI   LA TRATTORIA   CONTATTI   [PRENOTA] │
└───────────────────────────────────────────────────────────────────────┘
```

- Fissa in alto, altezza 72px (60px su mobile), padding laterale `--spacing-gutter`.
- Sinistra: logotipo testuale "OSTERIA BOLOGNA" in Satoshi 500 14px maiuscolo (`[LOGO]` sostituibile con SVG del cliente).
- Centro-sinistra: link alle ancore. Destra: GhostButton "Prenota". Su dispositivi touch (`pointer: coarse`) è un link `tel:+393701388515`; su desktop porta a `#contatti`, dove il numero è grande e leggibile (su desktop `tel:` aprirebbe app di chiamata indesiderate).
- **M3, cambio tema:** sopra le sezioni `dark` la nav è trasparente con testo `pergamena`. Sopra le sezioni `light` ha sfondo `pergamena` al 92% con `backdrop-filter: blur(8px)`, testo `onice` e hairline inferiore `filo`. Transizione 400ms. Rilevamento con IntersectionObserver (o ScrollTrigger) su una linea alta quanto la nav.
- Link attivo (sezione corrente): sottolineatura 1px `zafferano`.
- **Mobile (<1024px):** logotipo a sinistra; a destra "Prenota" (tel) e "Menu" testuale che apre l'overlay.
- **M11, overlay mobile:** pannello a tutto schermo `cantina` che entra con `clip-path inset(0 0 100% 0) → inset(0)` in 0.6s `--ease-reveal`. Le voci sono in serif 300 maiuscolo da 48px e salgono con stagger 0.06s. In basso: telefono e P.IVA in Caption. Si chiude con "Chiudi" o Esc; focus intrappolato nel pannello, `aria-expanded` sul bottone, scroll della pagina bloccato.

### 7.2 Hero

#### 7.2.1 Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│ nav                                                                  │
│                                                                      │
│                                                                      │
│ TRATTORIA BOLOGNESE ──────────────────────────────────────── BOLOGNA │ ← meta + hairline
│ OSTERIA                                                              │
│ BOLOGNA                                                              │ ← wordmark Satoshi 199px
│                                                                      │
│ La tradizione bolognese,            [CHIAMA PER PRENOTARE] [GUARDA IL MENÙ]
│ dalla sfoglia alla brace.                               PAUSA   SCORRI│
└──────────────────────────────────────────────────────────────────────┘
```

- Altezza `100svh`, contenuto ancorato in basso a sinistra, padding inferiore 42px.
- **Meta:** Caption a sinistra "Trattoria bolognese", a destra "Bologna" (oppure "Dal [ANNO]" se `site.annoApertura` è valorizzato), separate da una hairline `filo-scuro` che riempie lo spazio.
- **Wordmark:** "OSTERIA" / "BOLOGNA" su due righe, Satoshi 500, `--text-wordmark`, interlinea 0.8, colore `pergamena`. È l'elemento LCP: deve essere testo reale renderizzato lato server.
- **Lead:** "La tradizione bolognese, dalla sfoglia alla brace." in `--text-body-lg`, `pergamena` all'85%, max 32ch.
- **CTA:** GhostButton chiari "Chiama per prenotare" (`tel:`) e "Guarda il menù" (`#menu`).
- In basso a destra: bottone "Pausa" del video e la Caption "Scorri" con una lineetta verticale di 24px che scorre in loop (fermo con reduced-motion).

#### 7.2.2 Media

- **Desktop o finestra orizzontale (aspect ≥ 1):** `hero-brace.mp4`, `object-position: 50% 55%`.
- **Mobile o finestra verticale (aspect < 1):** `sfoglia-padella.mp4` (nativo 9:16, nitido su telefono).
- Sotto il video c'è un `<picture>` con i due poster in art direction (`media="(min-aspect-ratio: 1/1)"`), così il primo paint è subito corretto. Il JS sceglie la sorgente video giusta con `matchMedia` e la carica solo una volta.
- **Overlay:** `linear-gradient(180deg, rgb(41 38 34 / .45) 0%, rgb(41 38 34 / .15) 35%, rgb(41 38 34 / .80) 100%)`. È l'unico gradiente del sito ed è ammesso perché scurisce la fotografia.
- **Grain** sopra l'overlay.

#### 7.2.3 M1 — Intro "la tovaglia si toglie" (≈1.8s)

Preparazione: uno script inline nell'`<head>`, eseguito prima del paint, aggiunge `html.js`. Solo con `html.js` la tovaglia parte coprendo la hero; senza JavaScript la hero è subito visibile.

La **tovaglia** (`Tovaglia.tsx`) è una griglia di celle quadrate che copre la hero:
- Celle: desktop 12 colonne (circa 120px a 1440px), tablet 8, mobile 5. Le righe sono calcolate per coprire `100svh` più una riga. Ricalcolo al resize con debounce.
- Parità a scacchiera: le celle **A** (`(riga + colonna) % 2 === 0`) sono color `lino`, le celle **B** sono color `pergamena`. A schermo intero sembra una tovaglia a quadretti beige.
- Le celle si animano solo con `transform: scale()`. A scala piena usa `scale(1.02)` per evitare fessure di sub-pixel. `transform-origin: center`, `will-change: transform` solo durante l'animazione.

Timeline (GSAP, parte dopo `document.fonts.ready` con timeout di 1.2s):

| t (s) | Azione |
|---|---|
| 0.00 | Stato iniziale: tutte le celle a scala 1.02, video `opacity 0, scale 1.12`, testi nascosti |
| 0.05 → 0.65 | Celle **B** scala 1.02 → 0, stagger `{ each: 0.012, from: "random" }`, `power3.inOut` |
| 0.35 → 0.95 | Celle **A** scala 1.02 → 0, stesso stagger |
| 0.50 → 2.30 | Video `opacity 0 → 1`, `scale 1.12 → 1`, `power2.out` (parte sotto le celle) |
| 0.80 → 1.70 | Wordmark: SplitText per caratteri con maschera, `yPercent 110 → 0`, stagger 0.035s, `expo.out`. "BOLOGNA" parte 0.12s dopo "OSTERIA" |
| 1.10 → 1.60 | Hairline della meta `scaleX 0 → 1` (origine a sinistra), meta `y 12 → 0` e `opacity 0 → 1` |
| 1.25 → 1.80 | Lead e CTA in fade; voci della nav `y -12 → 0` con stagger 0.05s |
| 1.80 | Compare l'indicatore "Scorri" |

- L'intro va **una volta sola per sessione** (`sessionStorage` `ob-intro`); nelle visite successive c'è solo un fade di 0.3s.
- Con reduced-motion: niente tovaglia, solo fade di 0.3s.
- Il video inizia a scaricare subito (`preload="auto"` solo sulla hero), ma l'intro non lo aspetta: se non è pronto, si vede il poster.

#### 7.2.4 M2 — Uscita "la tovaglia si stende" (scroll)

Struttura:

```html
<section id="hero" data-theme="dark" class="relative h-[200svh]">
  <div class="sticky top-0 h-[100svh] overflow-hidden"> … media, overlay, contenuto, tovaglia … </div>
</section>
```

Una sola timeline ScrollTrigger su `#hero`, `start: "top top"`, `end: "bottom bottom"`, `scrub: 0.8`:

| Avanzamento | Azione |
|---|---|
| 0.00 → 0.20 | Meta, lead, CTA, "Scorri": `opacity 1 → 0` |
| 0.00 → 0.40 | Wordmark `yPercent 0 → -14`; video `scale 1 → 1.06`; overlay più scuro (+0.2) |
| 0.15 → 0.60 | Celle **A** (`lino`) `scale 0 → 1.02`, stagger casuale |
| 0.45 → 0.90 | Celle **B** (`pergamena`) `scale 0 → 1.02`, stagger casuale. A metà percorso si vede una tovaglia a quadretti sopra la brace |
| 0.85 → 1.00 | Celle **A**: colore `lino → pergamena`. La hero diventa interamente pergamena |
| 0.80 | La nav passa al tema chiaro |

Alla fine la hero è una superficie `pergamena` piena. Quando lo sticky si sblocca, sale senza nessuno stacco visibile nella sezione successiva, anch'essa `pergamena`.

Con reduced-motion la sezione è alta `100svh`, non c'è sticky né tovaglia.

### 7.3 Marquee dei piatti (M4)

- Fascia `pergamena` alta circa 120px tra due hairline `filo`.
- Testo in serif 300 maiuscolo, `--text-heading-sm`, colore `onice`: TAGLIATELLE AL RAGÙ ◆ TORTELLINI IN BRODO ◆ GNOCCO FRITTO ◆ COTOLETTA ALLA BOLOGNESE ◆ PASSATELLI ◆ ZUPPA INGLESE ◆ TORTA DI RISO ◆
- Separatore ◆: un quadratino di 6px ruotato di 45° in `zafferano` (elemento CSS, non carattere), margini orizzontali 32px.
- Animazione CSS `translateX(0 → -50%)` su contenuto duplicato, 27s lineare, infinita. Si mette in pausa al passaggio del mouse. È `aria-hidden` (i piatti sono già nel menù). Con reduced-motion resta fermo.

### 7.4 La trattoria (`#trattoria`)

```
┌────────────────────────────────────────────────────────────────────┐
│ SFOGLIA,                       │                                   │
│ BRODO                          │   [ foto sala, reveal "porta" ]   │
│ E BRACE.                       │   16:9, max 880px                 │
│                                │   LA SALA (caption)               │
│ Testo (col 1–5)                │   (col 6–12)                      │
└────────────────────────────────────────────────────────────────────┘
```

- **Titolo display (M5):** "SFOGLIA, / BRODO / E BRACE."
- **Testo:**
  > Osteria Bologna è una trattoria nel senso più vero: tovaglie a quadretti, pasta fresca, il brodo di cappone dei tortellini e la brace accesa per la carne. Una cucina che non insegue le mode e parla la lingua della tradizione bolognese.
  >
  > In tavola arrivano i piatti di sempre, dalle tagliatelle al ragù alla cotoletta alla bolognese, fino alla zuppa inglese. Ad accompagnarli c'è una carta dei vini che parte dai Colli Bolognesi e attraversa l'Italia.
- Sotto il testo: TextLink "Scopri il menù" → `#menu`.
- **Foto `sala.jpg`**, colonna 6–12, rapporto 16:9, larghezza massima 880px, `object-position: 50% 50%`, con grain. Caption sotto: "La sala".
- **M6, "porta socchiusa":** il contenitore parte con `clip-path: inset(0 41% 0 41%)` (una fessura verticale, come una porta socchiusa) e si apre a `inset(0 0 0 0)`; l'immagine interna fa `scale 1.25 → 1`. ScrollTrigger da `top 80%` a `center 55%`, `scrub: 0.8`. La foto è inquadrata dagli stipiti della porta: l'effetto racconta "entrare in sala".
- **Mobile:** titolo, testo, poi foto a tutta larghezza (resta ≤ 735px CSS). Il reveal parte da `inset(0 30% 0 30%)`.

### 7.5 La sfoglia (`#sfoglia`), M7

È un **processo in sequenza**, quindi qui la numerazione 01–05 è giustificata. Superficie `lino`.

**Desktop (≥1024px):** sezione fissata (pin) che scorre in orizzontale.

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ LA SFOGLIA      │ [img 4:5]      │ [img 4:5]      │ [img 4:5]      │ [video 9:16] │ [img 4:5] │
│ Testo intro     │ 01             │ 02             │ 03             │ 04           │ 05        │
│                 │ LA SFOGLIA     │ IL TAGLIO      │ LE TAGLIATELLE │ IN PADELLA   │ AL PIATTO │
│                 │ una riga       │ una riga       │ una riga       │ una riga     │ una riga  │
├───────────────────────────────────────────────────────────────────────────────┤
│ ━━━━━━━━━━━━━━━━━━━━━━──────────────────────────────── (avanzamento)   02 / 05 │
└───────────────────────────────────────────────────────────────────────────────┘
```

- Pannello introduttivo (larghezza 34vw): titolo display "LA SFOGLIA" e testo "Uova, farina e mani esperte. La pasta fresca nasce qui, ogni giorno, prima di arrivare in tavola." `[VERIFICARE "ogni giorno" col cliente; in alternativa: "La pasta fresca nasce qui, prima di arrivare in tavola."]`
- Pannelli media: altezza 66svh, larghezza secondo il rapporto (4:5 per le foto, 9:16 per il video), gap 4vw. Sotto ogni media: numero (Caption), titolo (serif 300, `--text-heading-sm`), una riga di testo (15px, `espresso`, max 34ch).

| # | Media | Titolo | Testo |
|---|---|---|---|
| 01 | `sfoglia-rulli.jpg` | La sfoglia | Uova e farina, lavorate fino a una sfoglia sottile e uniforme. |
| 02 | `sfoglia-taglio.jpg` | Il taglio | La sfoglia si taglia a mano, con la rotella, accanto al mattarello. |
| 03 | `tagliatelle-nastri.jpg` | Le tagliatelle | Si srotolano i nastri: larghi, ruvidi, pronti per il ragù. |
| 04 | `sfoglia-padella.mp4` (LazyVideo) | In padella | Mantecate al momento, perché il condimento abbracci la pasta. |
| 05 | `pasta-piatto.jpg` | Al piatto | Poi in tavola, ancora fumanti. |

- Movimento: il binario fa `x: 0 → -(larghezzaBinario - viewport + gutter)`, `scrub: 1`, `pin: true`, `end: "+=" + distanza`, `invalidateOnRefresh: true`. Le immagini interne fanno un leggero `xPercent -6 → 6` legato all'avanzamento del binario (`containerAnimation`), per dare profondità.
- Barra di avanzamento: hairline `filo` con riempimento `zafferano` 1px che cresce con lo scroll; contatore "02 / 05" (Caption) aggiornato sul pannello più vicino al centro.
- **Mobile/tablet (<1024px):** niente pin. Elenco verticale: media a tutta larghezza (4:5; il video 9:16 alto al massimo 80svh), numero, titolo, testo. Hairline tra i pannelli.
- **Accessibilità:** il DOM resta in ordine logico; con la tastiera il focus segue l'ordine visivo e ogni pannello è `<figure>` con `<figcaption>`.

### 7.6 Il menù (`#menu`)

#### 7.6.1 Testata

- Titolo display (M5): "IL MENÙ" (verifica che l'accento non venga tagliato).
- Lead (`--text-body-lg`, max 32ch): "La cucina della tradizione bolognese, dalla sfoglia alla brace."
- **Navigazione categorie** (`CategoryNav`, sticky sotto la nav, sfondo `pergamena`, hairline inferiore): ANTIPASTI · PRIMI · SECONDI · CONTORNI · DOLCI, in Satoshi 500 13px maiuscolo (separati da spazio, non da puntini). La categoria attiva ha una sottolineatura `zafferano` 1px che scivola tra le voci (FLIP o transizione `left/width`, 400ms). Il click scorre con Lenis tenendo conto dell'altezza di nav e sottonav. Su mobile la barra scorre in orizzontale e la voce attiva si centra da sola.

#### 7.6.2 Layout delle categorie con media (desktop)

```
┌───────────────────────────────┬────────────────────────────────────────┐
│ [media, sticky top 160px]      │ ANTIPASTI                              │
│                                │ ────────────────────────────────────── │
│                                │ TAGLIERE DELLA TRATTORIA               │
│                                │ Salumi artigianali stagionati, …       │
│                                │ Nel calice: Pignoletto Spumante Brut   │
│ didascalia                     │ ────────────────────────────────────── │
│ (col 1–5)                      │ … (col 7–12)                           │
└───────────────────────────────┴────────────────────────────────────────┘
```

- Il media sta a sinistra per Antipasti e Secondi e a destra per Primi, per dare ritmo editoriale.
- Titolo categoria: serif 300 maiuscolo `--text-heading-lg` (M5). Sotto, eventuale sottotitolo in Caption (es. "Pasta fresca").
- **Voce piatto:** nome in serif 300 maiuscolo `--text-item`, `onice`; descrizione Satoshi 500 15px `espresso`, max 46ch; eventuale riga "Nel calice:" in Caption `noce` seguita dal nome del vino come TextLink (vedi 7.6.4). Padding verticale 28px, hairline `filo` tra le voci. **Nessun prezzo, nessun numero, nessun hover** (i piatti non sono cliccabili).
- **M8, media:** alla prima entrata, `clip-path inset(100% 0 0 0) → inset(0)` in 1.2s `--ease-reveal`; l'immagine interna fa `scale 1.15 → 1`. Una volta sola.

| Categoria | Media | Rapporto | Note |
|---|---|---|---|
| Antipasti | `antipasti-crostini.mp4` (LazyVideo) | 4:5 | Didascalia "Crostini e salumi" |
| Primi | `pasta-mantecata.jpg` + inserto `primo-ragu.jpg` | 4:5 | Inserto largo il 38% della colonna, ancorato in basso a sinistra, sporge del 12% fuori dalla foto principale, con passe-partout `pergamena` di 8px. Nella foto principale `object-position: 45% 50%` |
| Secondi | `carne-tagliere.jpg` | **3:2** | `object-position: 50% 50%`, didascalia "Alla brace" |
| Contorni | nessuno | — | Layout tipografico (7.6.3) |
| Dolci | nessuno | — | Layout tipografico (7.6.3) |

#### 7.6.3 Categorie senza media (Contorni, Dolci)

Layout solo tipografico: titolo categoria nelle colonne 1–4 (sticky); voci in due colonne nelle colonne 5–12, con hairline tra le voci. Sotto il titolo "DOLCI" la Caption "Fatti in casa". Questo stacco tipografico è voluto: fa respirare la sequenza.

#### 7.6.4 Collegamenti menù ↔ vini (M10)

Gli abbinamenti vengono **dalla carta dei vini del cliente** (non sono inventati) e sono nei dati (`pairing`). Nel menù: "Nel calice: [nome vino]" è un link a `#vino-<slug>`. Nella carta: "Abbinamento: [piatto]" è un link a `#piatto-<slug>`. Al click: scroll con Lenis, poi la voce di destinazione mostra una hairline verticale `zafferano` di 2px a sinistra (`scaleY 0 → 1` in 0.4s), che si dissolve dopo 1.6s. Il focus si sposta sulla voce (`tabindex="-1"`). È l'unico modo in cui lo zafferano tocca le liste.

#### 7.6.5 Nota obbligatoria

In fondo alla sezione, Caption `noce`: "Per informazioni su allergeni e intolleranze rivolgiti al nostro personale." (Reg. UE 1169/2011). Sotto, facoltativa: "Il menù può variare secondo stagione." `[CONFERMARE col cliente]`

#### 7.6.6 Mobile

La CategoryNav diventa una barra a scorrimento orizzontale. Per ogni categoria: titolo, media a tutta larghezza (4:5 o 3:2, l'inserto Primi al 42% della larghezza), elenco a una colonna.

### 7.7 La carta dei vini (`#vini`), M9

Superficie `cantina`, testo `pergamena`, hairline `filo-scuro`, grain. È la "cantina" del sito: il passaggio dal chiaro allo scuro è un taglio netto con una hairline.

#### 7.7.1 Testata

Titolo display "LA CARTA / DEI VINI" (M5). Lead: "Dai Colli Bolognesi ai grandi rossi d'Italia, scelti per stare a tavola con la nostra cucina."

#### 7.7.2 Racconto "dalla vigna al calice" (scrollytelling)

È una sequenza reale, quindi i numeri sono giustificati. Due colonne, desktop:

```
┌──────────────────────────────┬───────────────────────────────────────┐
│ [CORNICE MEDIA 4:5, sticky]  │ 01  LA VIGNA                          │  ← step (min-height 80svh)
│  vigna → botti → bottiglia   │     testo                             │
│                              │ 02  LA CANTINA                        │
│ 01 / 03   LA VIGNA (caption) │     testo                             │
│ (col 1–5)                    │ 03  IL CALICE   (col 7–12)            │
└──────────────────────────────┴───────────────────────────────────────┘
```

| Step | Media nella cornice | Titolo | Testo |
|---|---|---|---|
| 01 | `vigna-aerea.jpg` (`object-position: 40% 50%`) | La vigna | Si parte da casa: i Colli Bolognesi e la Romagna, con Pignoletto, Albana, Lambrusco e Sangiovese. |
| 02 | `cantina-botti.jpg` (`object-position: 55% 50%`) | La cantina | Poi l'Italia dei grandi rossi, dal Barolo al Brunello, dall'Amarone a Bolgheri, e le bollicine di Franciacorta, Trento e Champagne. |
| 03 | `vino-calice.mp4` (LazyVideo, `object-position: 50% 45%`) | Il calice | Ogni vino ha il suo piatto. Trovi l'abbinamento accanto a ogni etichetta, oppure chiedilo a noi. |

- La cornice è larga `clamp(280px, 34vw, 520px)` con rapporto 4:5, sticky e centrata verticalmente. Il fondo nero del video sta dentro una cornice netta, quindi non serve sfumarlo.
- **Cambio media:** quando uno step attraversa il centro del viewport (`top center`), il media nuovo entra **sopra** il precedente con `clip-path inset(100% 0 0 0) → inset(0)` in 1.1s `--ease-reveal`, mentre quello sotto fa `scale 1 → 1.06`. Tornando indietro l'animazione si inverte. Contatore "01 / 03" e Caption del media aggiornati con un cambio a maschera di 0.4s.
- **La cornice resta sticky anche durante la lista vini:** dopo lo step 03 la bottiglia continua ad accompagnare tutta la lista (7.7.3), che sta nella stessa colonna destra. Lo sticky finisce con la sezione.
- **Mobile:** niente sticky. Ogni step ha il suo media inline (4:5) sopra il testo. La bottiglia compare una volta prima della lista come banda alta 60svh, con il video centrato nel suo rapporto naturale 1:2 su fondo nero `#000` (unico punto con nero puro, ed è solo il fondo del video).

#### 7.7.3 Lista vini

- **CategoryNav** sticky (stessa logica del menù, versione scura): BOLLICINE · BIANCHI · ROSSI · DESSERT E MEDITAZIONE.
- Titolo categoria in serif 300 `--text-heading-lg`, con sottotitolo in Caption `noce-chiaro` dove presente ("Metodo Classico e Charmat", "Il cuore della trattoria").
- **Voce vino** (`id="vino-<slug>"`), padding verticale 28px, hairline `filo-scuro`:
  1. Nome: serif 300 maiuscolo `--text-item`, `pergamena`.
  2. Produttore e regione: Caption `noce-chiaro`, nel formato "Ca' del Bosco, Lombardia".
  3. Uvaggio: Satoshi 500 13px `noce-chiaro`, "Uvaggio: Chardonnay, Pinot Nero, Pinot Bianco". **Nel documento originale c'è scritto "Uvage": va corretto in "Uvaggio".**
  4. Note: Satoshi 500 15px, `pergamena` all'85%, max 52ch.
  5. Eventuale "Abbinamento: [piatto]" (Caption + TextLink verso il piatto).
- **Non mostrare la "Fascia"** (Media / Media-Alta / Alta).
- In fondo, Caption: "Disponibilità e annate possono variare: chiedi al personale." `[CONFERMARE]`

### 7.8 Prenota un tavolo (`#contatti`)

```
┌─────────────────────────────────────┬──────────────────────────────────┐
│ PRENOTA                              │                                  │
│ UN TAVOLO                            │   [cucina-bn.jpg, 50vw × 100svh]  │
│                                      │                                  │
│ +39 370 138 8515  (subheading, tel)  │                                  │
│ ─────────────────────────            │                                  │
│ INDIRIZZO  [INDIRIZZO]               │                                  │
│ ORARI      [ORARI]                   │                                  │
│ ─────────────────────────            │                                  │
│ [CHIAMA ORA] [INDICAZIONI STRADALI]  │                                  │
└─────────────────────────────────────┴──────────────────────────────────┘
```

- Lato sinistro `pergamena`: titolo display "PRENOTA / UN TAVOLO" (M5); testo "Per prenotare o per qualsiasi richiesta, chiamaci."; numero `+39 370 138 8515` in Satoshi 500 `--text-subheading`, link `tel:+393701388515`.
- Tabella informazioni (`<dl>`), etichette in Caption `noce`, valori 15px `onice`: Indirizzo `[INDIRIZZO]`, Orari `[ORARI]` (righe giorno-orario), Telefono.
- CTA: GhostButton "Chiama ora" (`tel:`) e "Indicazioni stradali" (link esterno a `https://www.google.com/maps/search/?api=1&query=<indirizzo codificato>`, `target="_blank" rel="noopener"`). **Niente iframe di Google Maps**: eviterebbe il cookie banner e un carico pesante.
- Lato destro: `cucina-bn.jpg` a tutta altezza, `object-position: 50% 38%`, nessun overlay (la foto è già in bianco e nero, dà un respiro grafico prima del footer scuro).
- **Mobile:** foto in alto (4:5, a tutta larghezza), poi il contenuto.

### 7.9 Footer

- Superficie `cantina`, testo `pergamena`.
- Tre colonne: **Osteria Bologna** (`[INDIRIZZO]`), **Orari** (`[ORARI]`), **Contatti** (telefono; email e social solo se forniti).
- Riga legale in Caption `noce-chiaro`: `© {anno corrente} [RAGIONE SOCIALE]`, `P.IVA 04411271200`, link a Privacy e Cookie, `Foto sala: © Suppapapa`, `[CREDITO STUDIO]`. Elementi separati da spazi ampi, non da puntini. La P.IVA nel footer di ogni pagina è un obbligo di legge in Italia.
- In fondo, il wordmark "OSTERIA BOLOGNA" in Satoshi 500 `--text-wordmark`, su una riga se c'è spazio (altrimenti due), tagliato in basso dal bordo della pagina per circa il 18% della sua altezza (`overflow: hidden` sul contenitore). Chiude la pagina come la hero l'ha aperta.

### 7.10 Pagine legali e 404

- `/privacy` e `/cookie`: stessa nav e footer, titolo display, corpo a una colonna max 68ch, con segnaposto `[TESTO PRIVACY POLICY — da fornire]` e `[TESTO COOKIE POLICY — da fornire]`. **Non scrivere tu testi legali.**
- 404: titolo display "PAGINA NON TROVATA", testo "La pagina che cerchi non esiste o è stata spostata.", GhostButton "Torna alla home".

---

## 8. Contenuti (dati definitivi)

I testi sono quelli del cliente, accorciati dove erano lunghi e corretti dove serviva. Usali così come sono.

### 8.1 `src/data/site.ts`

```ts
export const site = {
  nome: "Osteria Bologna",
  telefonoDisplay: "+39 370 138 8515",
  telefonoHref: "tel:+393701388515",
  piva: "04411271200",
  ragioneSociale: "[RAGIONE SOCIALE]",
  indirizzo: "[INDIRIZZO COMPLETO]",          // es. "Via …, 40100 Bologna BO"
  orari: [["[GIORNI]", "[ORARI]"]] as [string, string][],
  email: null as string | null,
  instagram: null as string | null,
  facebook: null as string | null,
  annoApertura: null as number | null,       // se valorizzato, la hero mostra "Dal {anno}"
  dominio: "https://[DOMINIO]",
  creditoStudio: "[CREDITO STUDIO]",
};
```

### 8.2 `src/data/menu.ts`

```ts
export type Dish = { slug: string; nome: string; descrizione: string; pairing?: string }; // pairing = slug vino
export type MenuCategory = { slug: string; titolo: string; sottotitolo?: string; pairingCategoria?: string; piatti: Dish[] };

export const menu: MenuCategory[] = [
  { slug: "antipasti", titolo: "Antipasti", piatti: [
    { slug: "tagliere-della-trattoria", nome: "Tagliere della Trattoria",
      descrizione: "Salumi artigianali stagionati, crostini caldi e giardiniera di verdure dell'orto.",
      pairing: "pignoletto-spumante-brut" },
    { slug: "gnocco-fritto-caldo", nome: "Gnocco Fritto Caldo",
      descrizione: "Con mortadella IGP e scaglie di Parmigiano Reggiano 24 mesi.",
      pairing: "lambrusco-di-sorbara-le-radici" },
    { slug: "tortino-di-verdure", nome: "Tortino di Verdure di Stagione",
      descrizione: "Su fonduta cremosa di Parmigiano Reggiano, con gocce di aceto balsamico." },
  ]},
  { slug: "primi", titolo: "Primi", sottotitolo: "Pasta fresca",
    pairingCategoria: "pignoletto-classico-vigna-tassinaia", // "Ideale con i primi di pasta fresca"
    piatti: [
    { slug: "tagliatelle-al-ragu", nome: "Tagliatelle al Ragù Tradizionale",
      descrizione: "Sfoglia tirata a mattarello, condita con ragù di carne a cottura lenta." },
    { slug: "tortellini-in-brodo", nome: "Tortellini in Brodo di Cappone",
      descrizione: "Piccoli capolavori ripieni di carne, serviti nel loro brodo limpido e saporito.",
      pairing: "lambrusco-di-sorbara-le-radici" },
    { slug: "garganelli-salsiccia-porcini", nome: "Garganelli con Salsiccia e Funghi Porcini",
      descrizione: "Pasta corta rigata saltata con salsiccia fresca, porcini e un pizzico di prezzemolo." },
    { slug: "passatelli-asciutti", nome: "Passatelli Asciutti",
      descrizione: "Con speck croccante, noci tostate e pomodorini confit." },
  ]},
  { slug: "secondi", titolo: "Secondi", sottotitolo: "Carne e altro", piatti: [
    { slug: "cotoletta-alla-bolognese", nome: "Cotoletta alla Bolognese",
      descrizione: "Lombata di vitello fritta nello strutto, glassata al brodo, con prosciutto crudo e Parmigiano fuso.",
      pairing: "valpolicella-ripasso-superiore" },
    { slug: "tagliata-di-scottona", nome: "Tagliata di Manzo Scottona",
      descrizione: "Con scaglie di Grana Padano, rucola fresca e riduzione di aceto balsamico di Modena.",
      pairing: "brunello-di-montalcino" },
    { slug: "guancia-brasata-al-sangiovese", nome: "Guancia di Manzo Brasata al Sangiovese",
      descrizione: "Cotta a lungo nel vino rosso fino a diventare tenerissima, servita con il suo fondo.",
      pairing: "barolo-bussia" },
    { slug: "grigliata-mista", nome: "Grigliata Mista della Trattoria",
      descrizione: "Costine di maiale, salsiccia artigianale e pollo alla brace.",
      pairing: "brunello-di-montalcino" },
  ]},
  { slug: "contorni", titolo: "Contorni", piatti: [
    { slug: "patate-al-forno", nome: "Patate al Forno Rosmarinate",
      descrizione: "Dorate e croccanti fuori, morbide dentro." },
    { slug: "verdure-grigliate", nome: "Verdure Grigliate di Stagione",
      descrizione: "Zucchine, melanzane e peperoni con olio extravergine d'oliva e basilico." },
    { slug: "insalata-mista", nome: "Insalata Mista dell'Orto",
      descrizione: "Lattuga croccante, carote julienne e pomodorini." },
  ]},
  { slug: "dolci", titolo: "Dolci", sottotitolo: "Fatti in casa", piatti: [
    { slug: "zuppa-inglese", nome: "Zuppa Inglese",
      descrizione: "Pan di Spagna inzuppato nell'Alchermes, crema pasticcera e cioccolato fondente.",
      pairing: "albana-passito-dondona" },
    { slug: "torta-di-riso", nome: "Torta di Riso Tradizionale",
      descrizione: "Il dolce tipico bolognese con riso, latte, mandorle e un tocco di liquore.",
      pairing: "albana-passito-dondona" },
    { slug: "panna-cotta", nome: "Panna Cotta",
      descrizione: "Con caramello salato o coulis di frutti di bosco freschi." },
    { slug: "tiramisu", nome: "Tiramisù Classico",
      descrizione: "Savoiardi, caffè espresso, mascarpone e cacao amaro." },
  ]},
];
```

`pairingCategoria` dei Primi si mostra una sola volta sotto il titolo categoria: "Nel calice: Pignoletto Classico «Vigna Tassinaia»". I nomi dei vini nei link vanno presi da `vini.ts` tramite lo slug.

### 8.3 `src/data/vini.ts`

```ts
export type Wine = {
  slug: string; nome: string; produttore: string; regione: string;
  uvaggio: string; note: string;
  abbinamento?: { testo: string; piatti?: string[] }; // slug dei piatti collegati
};
export type WineCategory = { slug: string; titolo: string; sottotitolo?: string; vini: Wine[] };

export const vini: WineCategory[] = [
  { slug: "bollicine", titolo: "Bollicine", sottotitolo: "Metodo Classico e Charmat", vini: [
    { slug: "pignoletto-spumante-brut", nome: "Colli Bolognesi Pignoletto Spumante Brut DOCG",
      produttore: "Tenuta Pincelli", regione: "Emilia-Romagna", uvaggio: "Pignoletto 100%",
      note: "Fresco e fragrante, con note agrumate e di mela verde.",
      abbinamento: { testo: "Aperitivo e salumi del tagliere", piatti: ["tagliere-della-trattoria"] } },
    { slug: "franciacorta-cuvee-prestige", nome: "Franciacorta Brut DOCG «Cuvée Prestige»",
      produttore: "Ca' del Bosco", regione: "Lombardia", uvaggio: "Chardonnay, Pinot Nero, Pinot Bianco",
      note: "Elegante e cremoso: frutta a polpa bianca, agrumi e crosta di pane." },
    { slug: "trento-altemasi-graal", nome: "Trento DOC Extra Brut «Altemasi Riserva Graal»",
      produttore: "Cavit", regione: "Trentino-Alto Adige", uvaggio: "Chardonnay, Pinot Nero",
      note: "Lungo affinamento sui lieviti: complesso e persistente, con sentori minerali e tostati." },
    { slug: "champagne-bollinger-special-cuvee", nome: "Champagne Brut «Special Cuvée»",
      produttore: "Bollinger", regione: "Francia", uvaggio: "Pinot Noir, Chardonnay, Meunier",
      note: "Potente e strutturato, con una bollicina finissima.",
      abbinamento: { testo: "Tutta la cena, nelle grandi occasioni" } },
  ]},
  { slug: "bianchi", titolo: "Bianchi", vini: [
    { slug: "pignoletto-classico-vigna-tassinaia", nome: "Colli Bolognesi Pignoletto Classico DOCG «Vigna Tassinaia»",
      produttore: "Gaggioli", regione: "Emilia-Romagna", uvaggio: "Pignoletto",
      note: "Sapido e minerale, con il tipico retrogusto di mandorla amara.",
      abbinamento: { testo: "I primi di pasta fresca", piatti: ["tagliatelle-al-ragu", "garganelli-salsiccia-porcini", "passatelli-asciutti"] } },
    { slug: "albana-secca-vigna-dellolmo", nome: "Romagna Albana Secca DOCG «Vigna dell'Olmo»",
      produttore: "Tre Monti", regione: "Emilia-Romagna", uvaggio: "Albana 100%",
      note: "Corpo pieno e struttura importante, con note di albicocca matura ed erbe aromatiche." },
    { slug: "sauvignon-terlano", nome: "Alto Adige Sauvignon DOC",
      produttore: "Cantina Terlano", regione: "Trentino-Alto Adige", uvaggio: "Sauvignon Blanc",
      note: "Aromatico e vibrante: sambuco, foglia di pomodoro e agrumi." },
    { slug: "fiano-pietramara", nome: "Fiano di Avellino DOCG «Pietramara»",
      produttore: "I Favati", regione: "Campania", uvaggio: "Fiano",
      note: "Note fumé, nocciola tostata e fiori bianchi, su una netta vena minerale." },
    { slug: "cervaro-della-sala", nome: "Cervaro della Sala Umbria IGT",
      produttore: "Antinori", regione: "Umbria", uvaggio: "Chardonnay, Grechetto",
      note: "Affinato in barrique: burroso ed elegante, con vaniglia, agrumi canditi e frutta tropicale." },
  ]},
  { slug: "rossi", titolo: "Rossi", sottotitolo: "Il cuore della trattoria", vini: [
    { slug: "lambrusco-di-sorbara-le-radici", nome: "Lambrusco di Sorbara DOC «Le Radici»",
      produttore: "Paltrinieri", regione: "Emilia-Romagna", uvaggio: "Sorbara",
      note: "Frizzante, fresco e fragrante, con note di fragolina di bosco.",
      abbinamento: { testo: "Tortellini in brodo e gnocco fritto", piatti: ["tortellini-in-brodo", "gnocco-fritto-caldo"] } },
    { slug: "sangiovese-vigna-i-pini", nome: "Sangiovese di Romagna Superiore DOC «Vigna i Pini»",
      produttore: "Fattoria Zerbina", regione: "Emilia-Romagna", uvaggio: "Sangiovese",
      note: "Ciliegia matura e violetta, tannini levigati e un finale speziato." },
    { slug: "chianti-classico-castello-di-ama", nome: "Chianti Classico DOCG",
      produttore: "Castello di Ama", regione: "Toscana", uvaggio: "Sangiovese, Merlot",
      note: "Classica eleganza toscana: ciliegia nera, tabacco dolce e un tannino setoso." },
    { slug: "valpolicella-ripasso-superiore", nome: "Valpolicella Ripasso DOC Superiore",
      produttore: "Zenato", regione: "Veneto", uvaggio: "Corvina, Rondinella, Corvinone",
      note: "Caldo e vellutato: ciliegia sotto spirito, cacao e spezie dolci.",
      abbinamento: { testo: "Cotoletta alla bolognese", piatti: ["cotoletta-alla-bolognese"] } },
    { slug: "barolo-bussia", nome: "Barolo DOCG «Bussia»",
      produttore: "Prunotto", regione: "Piemonte", uvaggio: "Nebbiolo 100%",
      note: "Austero e complesso: rosa canina, catrame, cuoio e sottobosco.",
      abbinamento: { testo: "Guancia brasata al Sangiovese", piatti: ["guancia-brasata-al-sangiovese"] } },
    { slug: "brunello-di-montalcino", nome: "Brunello di Montalcino DOCG",
      produttore: "Banfi", regione: "Toscana", uvaggio: "Sangiovese Grosso",
      note: "Potente e caldo: frutti rossi maturi, vaniglia e spezie fini.",
      abbinamento: { testo: "Tagliata e grigliata mista", piatti: ["tagliata-di-scottona", "grigliata-mista"] } },
    { slug: "amarone-costasera", nome: "Amarone della Valpolicella DOCG «Costasera»",
      produttore: "Masi", regione: "Veneto", uvaggio: "Corvina, Rondinella, Molinara",
      note: "Maestoso e intenso: confettura di prugna, cioccolato fondente e fichi secchi.",
      abbinamento: { testo: "Piatti di carne importanti e saporiti" } },
    { slug: "ornellaia", nome: "Bolgheri Superiore DOC «Ornellaia»",
      produttore: "Tenuta dell'Ornellaia", regione: "Toscana",
      uvaggio: "Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot",
      note: "Profondo, setoso e avvolgente, con una persistenza aromatica lunghissima." },
  ]},
  { slug: "dessert-e-meditazione", titolo: "Dessert e meditazione", vini: [
    { slug: "albana-passito-dondona", nome: "Romagna Albana Passito DOCG «Dondona»",
      produttore: "Fattoria Zerbina", regione: "Emilia-Romagna", uvaggio: "Albana",
      note: "Miele di castagno, fichi secchi e albicocca disidratata.",
      abbinamento: { testo: "Zuppa inglese e torta di riso", piatti: ["zuppa-inglese", "torta-di-riso"] } },
    { slug: "vin-santo-antinori", nome: "Vin Santo del Chianti Classico DOC",
      produttore: "Antinori", regione: "Toscana", uvaggio: "Trebbiano, Malvasia",
      note: "Caldo e vellutato: nocciola tostata, scorza d'arancia candita e caramello." },
    { slug: "barolo-chinato", nome: "Barolo Chinato",
      produttore: "Marchesi di Barolo", regione: "Piemonte",
      uvaggio: "Nebbiolo aromatizzato con china, spezie e radici",
      note: "Aromatico e speziato, in perfetto equilibrio tra dolce e amaro.",
      abbinamento: { testo: "Dolci al cioccolato, o da solo a fine pasto" } },
  ]},
];
```

Quando un abbinamento ha più piatti collegati, mostra il testo e rendi link ogni nome di piatto che compare (oppure il testo intero verso il primo piatto, se più semplice). Le virgolette «» nei nomi sono volute.

---

## 9. Comportamento responsive

| Breakpoint | Cambi principali |
|---|---|
| < 640 | Nav compatta con overlay; hero con video verticale; tovaglia a 5 colonne; sfoglia verticale; menù e vini a una colonna con media inline; contatti con foto in alto |
| 640–1023 | Come sopra, gutter più ampi; tovaglia a 8 colonne; dove serve, media 4:5 a due colonne |
| ≥ 1024 | Layout completo: pin della sfoglia, media sticky di menù e vini, contatti divisi a metà |
| ≥ 1440 | Le misure tipografiche raggiungono i valori del riferimento |
| ≥ 1920 | Contenuto max 1760px; la tovaglia passa a 14 colonne |

Da testare a: 390×844, 768×1024, 1024×768, 1440×900, 1920×1080, anche in landscape su mobile (la hero deve usare il video orizzontale).

---

## 10. Accessibilità (requisito, non opzione)

- Link "Vai al contenuto" come primo elemento focalizzabile. Landmark corretti (`header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`). Un solo `h1` ("Osteria Bologna", nella hero); `h2` per le sezioni, `h3` per le categorie, `h4` per piatti e vini (oppure `<dl>` semantici).
- Focus sempre visibile (outline 1px, offset 3px, colore del testo). Ordine di tab coerente anche nella sezione orizzontale.
- Contrasti come in 4.1. Lo zafferano non porta mai testo.
- Video: muti, `aria-hidden`, con controllo Pausa/Riproduci. Con reduced-motion mostrano il poster.
- Marquee `aria-hidden` e fermo con reduced-motion.
- Le animazioni non devono mai nascondere contenuto a chi usa uno screen reader: SplitText con `aria` gestito (testo originale disponibile), celle della tovaglia `aria-hidden`.
- Target di tocco di almeno 44×44px su mobile.

---

## 11. Performance e SEO

**Obiettivi Lighthouse (mobile):** Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100. LCP < 2,0s (l'LCP è il wordmark testuale), CLS < 0,05, INP < 200ms.

- `next/image` ovunque, con `width`/`height`, `sizes` corretti (es. sala `(min-width:1024px) 880px, 100vw`; pannelli sfoglia `(min-width:1024px) 560px, 92vw`; inserto primi `280px`) e `placeholder="blur"` con import statico.
- Solo il video della hero precarica; tutti gli altri usano LazyVideo. Font con `display: swap` e fallback con metriche aggiustate (`adjustFontFallback`).
- GSAP e Lenis caricati solo lato client (`"use client"` nei componenti di motion), ScrollTrigger `refresh()` dopo il caricamento di font e immagini sopra la piega.
- Metadata: `title` "Osteria Bologna | Trattoria tradizionale bolognese", `description` "Trattoria bolognese: pasta fresca, tortellini in brodo, carne alla brace e una carta dei vini dai Colli Bolognesi ai grandi rossi d'Italia. Prenota al +39 370 138 8515.", Open Graph e Twitter card, `metadataBase` da `site.dominio`, favicon (monogramma "OB" in serif su `pergamena`, generato).
- `opengraph-image.tsx`: 1200×630, sfondo `cantina`, wordmark "OSTERIA BOLOGNA" in `pergamena`, Caption "Trattoria bolognese".
- **JSON-LD `Restaurant`** in `layout.tsx`: `name`, `telephone: "+39 370 138 8515"`, `servesCuisine: ["Bolognese", "Emiliana", "Italiana"]`, `acceptsReservations: "True"`, `hasMenu: "<dominio>/#menu"`, `url`, `image`. Aggiungi `address` e `openingHoursSpecification` **solo se** i dati sono valorizzati (mai segnaposto nel JSON-LD).
- `sitemap.ts` e `robots.ts`.

---

## 12. Segnaposto da completare (cerca `[` nel progetto)

| Segnaposto | Dove | Note |
|---|---|---|
| `[INDIRIZZO COMPLETO]` | site.ts → contatti, footer, link Maps, JSON-LD | Obbligatorio prima del go-live |
| `[GIORNI]` / `[ORARI]` | site.ts → contatti, footer, JSON-LD | Obbligatorio |
| `[RAGIONE SOCIALE]` | footer | Intestatario della P.IVA 04411271200 |
| `[DOMINIO]` | site.ts | Per metadata, sitemap, OG |
| `[LOGO]` | nav | Per ora logotipo testuale |
| `[CREDITO STUDIO]` | footer | Firma dell'agenzia |
| `[FOTO_SALA_ORIGINALE]` | sala.jpg | Originale ad alta risoluzione e con diritti chiari |
| Testi privacy e cookie | /privacy, /cookie | Da professionista o generatore dedicato |
| Email, Instagram, Facebook, WhatsApp | site.ts | Facoltativi: se `null` non si mostrano |
| `annoApertura` | site.ts | Facoltativo |
| Frasi `[VERIFICARE]` / `[CONFERMARE]` | sfoglia, menù, vini | Da confermare col cliente |

Crea anche un `README.md` con l'elenco di questi segnaposto, i comandi (`npm run dev`, `bash scripts/prepare-media.sh`, `npm run build`) e le note sugli asset della sezione 2.2.

---

## 13. Ordine di lavoro e verifica

1. **Piano.** Prima di scrivere codice, riassumi in poche righe come intendi implementare tovaglia, sfoglia orizzontale e scrollytelling dei vini, e segnala eventuali dubbi su questo brief.
2. **Setup:** progetto Next.js + Tailwind v4, token (4.2), font (sezione 3), Lenis + GSAP.
3. **Media:** esegui `scripts/prepare-media.sh` e controlla durate e dimensioni con `ffprobe`. Verifica che il tratto con la pizza non compaia in nessun video.
4. **Struttura statica:** tutte le sezioni **senza animazioni**, responsive e accessibili, con i dati di `site.ts`, `menu.ts` e `vini.ts`. Il sito deve essere già completo e bello così (è anche la versione reduced-motion).
5. **Motion**, nell'ordine: M3 → M1 → M2 → M5 → M6 → M8 → M7 → M9 → M10 → M11 → M4. Usa `gsap.matchMedia()` per separare desktop, mobile e reduced-motion. Pulisci tutto al dismount (`useGSAP` + `revert`).
6. **SEO, performance, accessibilità** (sezioni 10–11).
7. **Verifica visiva:** con Playwright fai screenshot a 390, 768, 1440 e 1920 px di ogni sezione e degli stati intermedi della tovaglia (avanzamento 0.3, 0.6, 1.0). Confrontali con questo brief e correggi. Poi Lighthouse mobile.

### Criteri di accettazione

- [ ] Sfondo `#EBE3D5`, più chiaro del riferimento; nessun colore fuori palette; zafferano solo dove previsto.
- [ ] Nessun prezzo e nessuna "Fascia" nel menù e nella carta dei vini; "Uvage" corretto in "Uvaggio".
- [ ] Tutti i 18 piatti e i 20 vini presenti, con i testi della sezione 8.
- [ ] I collegamenti piatto ↔ vino funzionano in entrambe le direzioni, con evidenziazione e focus.
- [ ] Intro hero ≤ 1,8s, una volta per sessione; la tovaglia si stende senza fessure e si chiude perfettamente sulla sezione successiva.
- [ ] Senza JavaScript la pagina è leggibile e la hero è visibile.
- [ ] Con reduced-motion: niente pin, niente scrub, niente marquee in movimento, video in poster.
- [ ] Il tratto con la pizza e la metà destra del collage (logo di un altro ristorante) non compaiono da nessuna parte.
- [ ] "MENÙ" e le altre maiuscole accentate non sono tagliate nelle animazioni.
- [ ] Telefono cliccabile ovunque su mobile; P.IVA 04411271200 nel footer di ogni pagina.
- [ ] Nessun iframe o font esterno caricato a runtime.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100.
