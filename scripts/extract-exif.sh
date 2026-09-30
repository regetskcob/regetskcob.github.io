#!/bin/sh
# Writes data/exif.yaml from the original photos: the shooting data for the
# lightbox (partials/exif.html) of photos that were exported without metadata.
#
#   scripts/extract-exif.sh /path/to/originals > data/exif.yaml
#
# Only the shooting data below is read, explicitly by tag: never the GPS
# position, the serial number or the date, the repository is public. Each photo
# is keyed by its file name in lower case, underscores as hyphens and without
# the extension, which is how the exported copies are named (DSCF2072.JPG ->
# dscf2072). Photos renamed on export need an entry by hand.
#
# Needs exiftool (brew install exiftool) and python3.

set -eu
[ $# -eq 1 ] && [ -d "$1" ] || { echo "usage: $0 <folder with the originals>" >&2; exit 1; }

exiftool -r -q -json -n \
  -ext jpg -ext jpeg -ext heic -ext tif -ext tiff -ext dng -ext raf -ext arw -ext nef -ext cr2 -ext cr3 \
  -Make -Model -LensModel -FNumber -FocalLength -FocalLengthIn35mmFormat \
  -ExposureTime -ISO -ExposureCompensation "$1" |
python3 -c '
import json, os, re, sys
TAGS = ["Make", "Model", "LensModel", "FNumber", "FocalLength", "FocalLengthIn35mmFormat",
        "ExposureTime", "ISO", "ExposureCompensation"]
rows = {}
for item in json.load(sys.stdin):
    key = re.sub(r"_", "-", os.path.splitext(os.path.basename(item["SourceFile"]))[0].lower())
    tags = {t: item[t] for t in TAGS if t in item and item[t] not in ("", None)}
    if tags:
        rows[key] = tags
print("# Shooting data for the lightbox, made by scripts/extract-exif.sh. No GPS, see there.")
for key in sorted(rows):
    print(f"{key}:")
    for t in TAGS:
        if t in rows[key]:
            v = rows[key][t]
            print(f"  {t}: {json.dumps(v, ensure_ascii=False)}")
'
