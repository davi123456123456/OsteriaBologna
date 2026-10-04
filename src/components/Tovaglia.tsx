// La tovaglia a quadretti (§7.2.3): una griglia di celle quadrate che copre la hero.
// Le celle A — (riga + colonna) pari — sono lino, le B pergamena.
//
// Le celle nascono da uno script inline eseguito subito dopo il contenitore, quindi prima del
// primo paint: alla prima visita la hero è già coperta e il wordmark (LCP) è già disegnato sotto.
// React non tocca il contenuto del contenitore (innerHTML vuoto lato server); il componente
// della hero ricostruisce le celle al resize o se lo script non è stato eseguito
// (navigazione lato client).

export const TOVAGLIA_ID = "tovaglia";

/** Colonne per larghezza: mobile 5, tablet 8, desktop 12, ≥1920 14. */
export function tovagliaCols(width: number) {
  return width >= 1920 ? 14 : width >= 1024 ? 12 : width >= 640 ? 8 : 5;
}

/**
 * Costruisce (o ricostruisce) le celle. Restituisce true se la griglia è cambiata.
 * Va tenuta allineata alla versione inline qui sotto.
 */
export function buildCells(el: HTMLElement): boolean {
  const w = el.clientWidth || window.innerWidth;
  const h = Math.max(el.clientHeight, window.innerHeight);
  const cols = tovagliaCols(window.innerWidth);
  const rows = Math.ceil(h / (w / cols)) + 1;
  if (el.dataset.cols === String(cols) && el.dataset.rows === String(rows) && el.children.length === cols * rows) return false;
  const frag = document.createDocumentFragment();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = document.createElement("i");
      i.className = (r + c) % 2 === 0 ? "a" : "b";
      frag.appendChild(i);
    }
  }
  el.replaceChildren(frag);
  el.style.setProperty("--cols", String(cols));
  el.dataset.cols = String(cols);
  el.dataset.rows = String(rows);
  return true;
}

const inline = `(function(){var t=document.getElementById("${TOVAGLIA_ID}");if(!t||!document.documentElement.classList.contains("motion"))return;var W=innerWidth,w=t.clientWidth||W,h=Math.max(t.clientHeight,innerHeight),c=W>=1920?14:W>=1024?12:W>=640?8:5,r=Math.ceil(h/(w/c))+1,s="";for(var y=0;y<r;y++)for(var x=0;x<c;x++)s+=(x+y)%2?'<i class="b"></i>':'<i class="a"></i>';t.innerHTML=s;t.style.setProperty("--cols",c);t.dataset.cols=c;t.dataset.rows=r})();`;

export function Tovaglia() {
  return (
    <>
      <div
        id={TOVAGLIA_ID}
        className="tovaglia"
        aria-hidden="true"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: "" }}
      />
      <script dangerouslySetInnerHTML={{ __html: inline }} />
    </>
  );
}
