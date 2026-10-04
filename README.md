# Osteria Bologna

Sito one-page della trattoria Osteria Bologna. È fatto con Next.js 16 (App Router), Tailwind CSS 4, GSAP 3.15 (ScrollTrigger, SplitText) e Lenis. Il brief completo è in [`docs/BRIEF.md`](docs/BRIEF.md) e prevale su tutto.

## Comandi

```bash
npm install
bash scripts/prepare-media.sh   # genera video, poster e foto dagli originali in _source-assets/
npm run dev                     # http://localhost:3300
npm run build && npm run start  # produzione, porta 3300
npm run lint && npm run typecheck
node scripts/screenshots.mjs --scan --sizes 390x844,1440x900   # verifica visiva (Playwright)
```

Opzioni utili di `scripts/screenshots.mjs`:

- `--hero 0.3,0.6,1` mostra gli stati della tovaglia in uscita;
- `--intro 0.2,0.9,1.6` mostra i fotogrammi dell'intro;
- `--reduced` simula reduced-motion;
- `--nojs` disattiva JavaScript;
- `--base http://localhost:3301` punta alla build di produzione.

Lo script `scripts/contact.sh` affianca gli scatti in fogli di provini.

## Segnaposto da completare

Per trovarli tutti basta cercare `[` nel progetto.

| Segnaposto | Dove | Note |
|---|---|---|
| `[INDIRIZZO COMPLETO]` | `src/data/site.ts` | Compare in contatti, footer, link Maps e JSON-LD (solo quando è valorizzato). **Obbligatorio prima del go-live.** |
| `[GIORNI]` / `[ORARI]` | `src/data/site.ts` | Contatti e footer. **Obbligatorio.** |
| `[RAGIONE SOCIALE]` | `src/data/site.ts` | Footer: intestatario della P.IVA 04411271200 |
| `[DOMINIO]` | `src/data/site.ts` | Serve a metadata, sitemap, OG e canonical. Finché resta segnaposto si usa l'URL Vercel, oppure localhost. |
| `[LOGO]` | `src/components/Nav.tsx` | Per ora è un logotipo testuale |
| `[CREDITO STUDIO]` | `src/data/site.ts` | Footer |
| `[FOTO_SALA_ORIGINALE]` | `sala.jpg` | Serve un originale ad alta risoluzione con diritti chiari. Fino ad allora il footer riporta `Foto sala: © Suppapapa`. |
| `[TESTO PRIVACY POLICY — da fornire]` | `src/app/privacy/page.tsx` | Da un professionista o da un generatore dedicato |
| `[TESTO COOKIE POLICY — da fornire]` | `src/app/cookie/page.tsx` | Idem |
| Email, Instagram, Facebook | `src/data/site.ts` | Facoltativi: se sono `null` non compaiono |
| `annoApertura` | `src/data/site.ts` | Facoltativo: se valorizzato, la hero mostra "Dal {anno}" |
| `[VERIFICARE "ogni giorno"]` | `src/components/Sfoglia.tsx` | Testo introduttivo della sfoglia |
| `[CONFERMARE]` | menù e vini | "Il menù può variare secondo stagione." e "Disponibilità e annate possono variare" |
| `[DIRITTI DA VERIFICARE]` | `src/components/vini/WineStory.tsx` | Video della bottiglia (vedi sotto) |

Per gli orari, quando arrivano i dati, va convertito `openingHours` del JSON-LD (in `src/app/layout.tsx`) in `openingHoursSpecification`.

## Note sugli asset (brief §2.2)

**Originali.** Stanno in `_source-assets/`, fuori da `public/`. I video pesanti non sono versionati.

**Collage dei primi.** Si usa **solo la metà sinistra**: il divisorio è la colonna x=367 e si tengono le colonne 0–365. La metà destra ha grembiuli col logo di un altro ristorante e persone reali, e non compare da nessuna parte.

**Foto della sala.**
- Ha la firma del fotografo in basso a destra: non va né rimossa né mascherata.
- È larga 735 px, quindi resta entro 880 px CSS. `// TODO: sostituire con sorgente ≥1920px`.

**Video della brace.** È largo 736 px: va a tutto schermo solo dietro overlay scuro e grana. `// TODO: sostituire con sorgente ≥1920px`.

**Immagini 736×920.** Larghezza massima di visualizzazione: 560 px CSS.

**Pasta col tartufo.** Il tartufo non è in menù: la foto è solo d'atmosfera, con alt e didascalia generici.

**Tagli video.** Sono stati verificati fotogramma per fotogramma e correggono il brief in due punti:
- **brace:** il volantino compare dal frame 367 (15,31 s) e si vede, anche solo come bordo in alto a destra, fino al frame 498 (20,77 s). Si tiene 0–15,3 s + **20,80 s**–fine; nel brief c'era 20,56 s, che lasciava 6 fotogrammi col volantino.
- **pasta:** la pizza compare a 6,833 s e il taglio a 6,8 s è corretto. Però tra 9,5 e 12,37 s c'è un piatto di carne con insalata che non è in menù. La clip degli antipasti parte quindi da **12,4 s** (pancetta, crostini, burrata, 4,9 s) e non da 11,4 s.

**Video del vino.** È un render dimostrativo Outshinery (il file originale si chiamava `outshinery_ssspin.io_…`). L'etichetta mostra "2017 SUMMIT", un vino che non è in carta. **I diritti d'uso vanno verificati.**

**Immagini.** Su disco c'erano solo le copie allegate in chat, in parte ricodificate WebP; `cucina-bn` è 1125×2000 invece di 1152×2048. Se arrivano gli originali, basta sostituirli in `_source-assets/` e rilanciare lo script.

**Font.**
- **Satoshi** (Fontshare, licenza ITF FFL, in `src/fonts/`): i file originali non vanno modificati.
- **Fraunces** (OFL) sostituisce TT Ramillas, che non è stato fornito. `src/fonts/Fraunces-Light-OG.ttf` è un'istanza statica a peso 300, usata solo per favicon e immagini generate.

## Scelte tecniche e scostamenti dal brief

**Motion caricato dopo l'idratazione.** GSAP, ScrollTrigger, SplitText e Lenis arrivano con import dinamico (`src/lib/gsap.ts` → `useMotion`). Così ~60 KB gzip escono dal percorso critico del primo paint, dove l'LCP è il wordmark.

**Tovaglia.** Le celle vengono create da uno script inline subito dopo il contenitore, prima del primo paint: alla prima visita la hero è già coperta e il wordmark è già disegnato sotto. In più c'è un failsafe CSS: se il JavaScript non parte entro 4 s, la tovaglia sparisce e l'intro viene saltata.

**Nav.**
- Il tema si sceglie con un hit-test sulla linea centrale della barra, a ogni scroll.
- Sopra vini e footer la barra è cantina velata, invece che trasparente: altrimenti la lista scorre illeggibile sotto la nav. È trasparente solo sopra la hero.
- Nell'uscita della hero il passaggio al tema chiaro avviene a **0,62** invece che a 0,8: tra 0,6 e 0,8 il testo pergamena finiva sopra le celle chiare.

**Pausa/Riproduci.** Il testo visibile cambia ed è anche il nome accessibile. Non c'è `aria-pressed`: insieme a un'etichetta che cambia darebbe annunci contraddittori.

**TextLink.** A riposo ha un filetto tenue, così il link si riconosce anche senza hover; la sottolineatura piena si estende da sinistra.

**Didascalie su lino.** Usano `espresso`, perché `noce` su lino si ferma a 4,05:1.

**Immagini in `src/media/img`.** Non stanno in `public/media/img`, così l'import statico con `placeholder="blur"` non duplica i file.

**Sfoglia.**
- Senza movimento, su desktop è una griglia 3×2 (e il video è ritagliato 4:5); su tablet è a 2 colonne; su mobile è un elenco.
- La parallasse interna (`xPercent ±6`) si applica solo alle foto: il pannello video tiene fermo il suo bottone Pausa.

**Telefoni in orizzontale.** Sotto i 560 px di altezza la hero si compatta: wordmark ≤ 18svh, lead e CTA sulla stessa riga.

## Verifica

**Screenshot** a 320, 390, 667×375, 768, 844×390, 1024×768, 1440, 1920 e 2560, anche senza JS e con reduced-motion. Nessuno scroll orizzontale a nessuna larghezza.

**Lighthouse mobile** (build di produzione in locale, 4 run):

| Metrica | Risultato |
|---|---|
| Performance | 92–96 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| CLS | 0,011 |
| TBT | 60–190 ms |
| LCP simulata | 2,7 s |

La LCP osservata è il wordmark al primo paint (~0,1 s). Il valore simulato è dominato dal runtime React/Next (~150 KB gzip) richiesto prima del paint.
