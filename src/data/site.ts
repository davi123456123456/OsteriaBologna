// Dati del locale (brief §8.1). I valori tra [ ] sono segnaposto da completare
// prima del go-live: cerca "[" nel progetto (elenco completo nel README).
export const site = {
  nome: "Osteria Bologna",
  telefonoDisplay: "+39 370 138 8515",
  telefonoHref: "tel:+393701388515",
  piva: "04411271200",
  ragioneSociale: "[RAGIONE SOCIALE]",
  indirizzo: "[INDIRIZZO COMPLETO]", // es. "Via …, 40100 Bologna BO"
  orari: [["[GIORNI]", "[ORARI]"]] as [string, string][],
  email: null as string | null,
  instagram: null as string | null,
  facebook: null as string | null,
  annoApertura: null as number | null, // se valorizzato, la hero mostra "Dal {anno}"
  dominio: "https://[DOMINIO]",
  creditoStudio: "[CREDITO STUDIO]",
};

/** Un valore è ancora un segnaposto se contiene le parentesi quadre. */
export const isPlaceholder = (v: string | null | undefined) => !v || /\[.*\]/.test(v);

/** URL del sito valido anche finché il dominio è un segnaposto. */
export function siteUrl(): URL {
  if (!isPlaceholder(site.dominio)) return new URL(site.dominio);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return new URL(vercel ? `https://${vercel}` : "http://localhost:3300");
}

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.indirizzo)}`;
