#!/usr/bin/env python3
"""Puts a publisher's book cover on the paper-coloured canvas used for book reviews.

    scripts/book-cover.py <cover.jpg> content/blog/<post>/cover.jpg

2000 x 1000 px, paper tone, the cover centred, 670 px high, with a soft shadow.
These are the measurements of the first review covers (C in a Nutshell, Der
große Gartenplaner, ...). The source is credited in the post with
"coverCredit" ("Cover: dpunkt.verlag"), see README, "Buchcover für Rezensionen".

Needs Pillow (pip install pillow).
"""
import sys
from PIL import Image, ImageFilter, ImageOps

PAPER = (243, 239, 230)
SIZE = (2000, 1000)
COVER_HEIGHT = 670
TOP = 179            # top edge of the cover, a little below the middle for the shadow
SHADOW_OFFSET = 7
SHADOW_BLUR = 7
SHADOW_OPACITY = 0.45


def main(src, dest):
    cover = ImageOps.exif_transpose(Image.open(src).convert("RGB"))
    width = round(cover.width * COVER_HEIGHT / cover.height)
    cover = cover.resize((width, COVER_HEIGHT), Image.LANCZOS)
    x = (SIZE[0] - width) // 2

    canvas = Image.new("RGB", SIZE, PAPER)
    shadow = Image.new("L", SIZE, 0)
    shadow.paste(Image.new("L", (width, COVER_HEIGHT), 255), (x, TOP + SHADOW_OFFSET))
    shadow = shadow.filter(ImageFilter.GaussianBlur(SHADOW_BLUR)).point(lambda v: int(v * SHADOW_OPACITY))
    canvas.paste(Image.new("RGB", SIZE, (40, 36, 30)), (0, 0), shadow)
    canvas.paste(cover, (x, TOP))
    canvas.save(dest, quality=92)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(*sys.argv[1:])
