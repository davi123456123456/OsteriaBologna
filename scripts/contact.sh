#!/usr/bin/env bash
# Affianca gli scatti di una scansione in fogli da N colonne: contact.sh <prefisso> <colonne> <larghezza_tile>
set -euo pipefail
pre=$1; cols=${2:-4}; tw=${3:-360}
files=( $(ls ${pre}*scan*.png | sort) )
n=${#files[@]}; i=0; sheet=0
while [ $i -lt $n ]; do
  chunk=( "${files[@]:$i:$cols}" ); m=${#chunk[@]}
  inputs=(); filt=""; for f in "${chunk[@]}"; do inputs+=( -i "$f" ); done
  for ((j=0;j<m;j++)); do filt+="[$j]scale=$tw:-1,pad=iw+6:ih:0:0:white[v$j];"; done
  for ((j=0;j<m;j++)); do filt+="[v$j]"; done
  if [ $m -gt 1 ]; then filt+="hstack=$m"; else filt="[0]scale=$tw:-1"; fi
  ffmpeg -v error -y "${inputs[@]}" -filter_complex "$filt" "${pre}sheet$sheet.png"
  echo "${pre}sheet$sheet.png"
  i=$((i+cols)); sheet=$((sheet+1))
done
