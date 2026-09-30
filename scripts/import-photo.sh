#!/bin/sh
# Copies exported photos into the repository with a cleaned set of metadata.
#
#   scripts/import-photo.sh <source.jpeg> <destination.jpg>
#
# The repository and the site are public. Everything is stripped from the
# copy, GPS position, serial numbers, owner, date, maker notes, thumbnails;
# only the shooting data shown in the lightbox (see [imaging.exif] in
# hugo.toml and partials/exif.html) is written back, plus the colour profile
# and the orientation, which the image needs to look right.
#
# Needs exiftool (brew install exiftool).

set -eu
[ $# -eq 2 ] && [ -f "$1" ] || { echo "usage: $0 <source> <destination>" >&2; exit 1; }
cp "$1" "$2"
exiftool -q -overwrite_original -all= -tagsfromfile "$1" \
  -Make -Model -LensModel -FNumber -FocalLength -FocalLengthIn35mmFormat \
  -ExposureTime -ISO -ExposureCompensation -Orientation -ICC_Profile "$2"
