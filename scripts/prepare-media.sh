#!/usr/bin/env bash
# Genera i media del sito dagli originali in _source-assets/ (brief §2.3).
#   video  → public/media/video/   (serviti così come sono)
#   foto   → src/media/img/        (import statico: next/image genera AVIF/WebP e il blur)
#   poster → src/media/poster/     (idem)
#
# Tagli verificati fotogramma per fotogramma (vedi README, "Note sugli asset"):
#   - brace: il volantino compare dal frame 367 (15,307 s) e resta, anche solo come bordo
#     in alto a destra, fino al frame 498 (20,771 s): si tiene 0–15,3 s + 20,80 s–fine.
#   - pasta: la pizza compare a 6,833 s; tra 9,5 e 12,37 s c'è un piatto di carne con
#     insalata non in menù: la clip degli antipasti parte a 12,4 s (pancetta → crostini → burrata).
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=_source-assets
VID=public/media/video
IMG=src/media/img
POS=src/media/poster
mkdir -p "$VID" "$IMG" "$POS"

FF="ffmpeg -hide_banner -loglevel error -y"
X264="-c:v libx264 -preset slow -pix_fmt yuv420p -movflags +faststart -color_primaries bt709 -color_trc bt709 -colorspace bt709"

# HERO DESKTOP — brace: 0–15,3 s + 20,80 s–fine (via il volantino), senza audio
# TODO: sostituire con sorgente ≥1920px
$FF -i "$SRC/video_carne_alla_bracie_916.mp4" -filter_complex \
  "[0:v]trim=0:15.3,setpts=PTS-STARTPTS[a];[0:v]trim=start=20.80,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -an $X264 -crf 24 "$VID/hero-brace.mp4"

# HERO MOBILE + LA SFOGLIA — pasta in padella 0–6,8 s (la pizza parte a 6,833 s)
$FF -i "$SRC/video_pasta_169.mp4" -vf "trim=0:6.8,setpts=PTS-STARTPTS" -an $X264 -crf 24 "$VID/sfoglia-padella.mp4"

# ANTIPASTI — pancetta, crostini e burrata: 12,4 s–fine
$FF -i "$SRC/video_pasta_169.mp4" -vf "trim=start=12.4,setpts=PTS-STARTPTS" -an $X264 -crf 24 "$VID/antipasti-crostini.mp4"

# VINO — loop "boomerang" (avanti + indietro) per evitare lo stacco a fine clip
$FF -i "$SRC/Video_vino169.mp4" -filter_complex \
  "[0:v]split[f][r0];[r0]reverse[r];[f][r]concat=n=2:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -an $X264 -crf 22 "$VID/vino-calice.mp4"

# POSTER (fotogrammi verificati)
$FF -ss 6.5 -i "$VID/hero-brace.mp4"         -frames:v 1 -q:v 2 "$POS/hero-brace-poster.jpg"
$FF -ss 3.5 -i "$VID/sfoglia-padella.mp4"    -frames:v 1 -q:v 2 "$POS/sfoglia-padella-poster.jpg"
$FF -ss 2   -i "$VID/antipasti-crostini.mp4" -frames:v 1 -q:v 2 "$POS/antipasti-crostini-poster.jpg"
$FF -ss 2   -i "$VID/vino-calice.mp4"        -frames:v 1 -q:v 2 "$POS/vino-calice-poster.jpg"

# IMMAGINI → JPG di alta qualità (next/image poi genera AVIF/WebP)
# I nomi in ingresso sono quelli per contenuto: vedi la tabella nel README.
jpg() { $FF -i "$SRC/$1" -q:v 2 "$IMG/$2"; }
jpg sala.png               sala.jpg            # TODO: sostituire con sorgente ≥1920px [FOTO_SALA_ORIGINALE]
jpg cucina-bn.webp         cucina-bn.jpg
jpg carne-tagliere.webp    carne-tagliere.jpg
jpg pasta-mantecata.webp   pasta-mantecata.jpg
jpg pasta-piatto.webp      pasta-piatto.jpg
jpg sfoglia-taglio.webp    sfoglia-taglio.jpg
jpg sfoglia-rulli.webp     sfoglia-rulli.jpg
jpg tagliatelle-nastri.webp tagliatelle-nastri.jpg
jpg vigna-aerea.webp       vigna-aerea.jpg
jpg cantina-botti.webp     cantina-botti.jpg
# Collage: SOLO metà sinistra. Il divisorio è la colonna x=367: si tengono le colonne 0–365.
$FF -i "$SRC/collage.png" -vf "crop=366:563:0:0" -q:v 2 "$IMG/primo-ragu.jpg"

echo "Media pronti:"
for f in "$VID"/*.mp4; do
  printf "  %-40s %s\n" "$f" "$(ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height -of csv=p=0 "$f" | tr '\n' ' ')"
done
