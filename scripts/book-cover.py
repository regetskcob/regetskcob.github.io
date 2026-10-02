#!/usr/bin/env python3
"""Puts a publisher's book cover on the paper-coloured canvas used for book reviews.

    scripts/book-cover.py [--trim] <cover.jpg> content/blog/<post>/cover.jpg

2000 x 1000 px, paper tone, the cover centred, 670 px high, with a soft shadow.
These are the measurements of the first review covers (C in a Nutshell, Der
große Gartenplaner, ...). The source is credited in the post with
"coverCredit" ("Cover: dpunkt.verlag"), see README, "Buchcover für Rezensionen".

--trim is for images that come with a background of their own (a packshot on
black, a cover with a white margin and a baked-in shadow): the background
that touches the edges is cut away, so only the book stands on the paper.
Do not use it for covers that are white themselves.

Needs Pillow (pip install pillow).
"""
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

PAPER = (243, 239, 230)
SIZE = (2000, 1000)
COVER_HEIGHT = 670
TOP = 179            # top edge of the cover, a little below the middle for the shadow
SHADOW_OFFSET = 7
SHADOW_BLUR = 7
SHADOW_OPACITY = 0.45
TRIM_THRESHOLD = 28


def trim(img):
    """Cuts away the uniform background around the book; returns the picture and its mask."""
    marker = (255, 0, 255)
    marked = img.copy()
    for corner in ((0, 0), (img.width - 1, 0), (0, img.height - 1), (img.width - 1, img.height - 1)):
        ImageDraw.floodfill(marked, corner, marker, thresh=TRIM_THRESHOLD)
    r, g, b = marked.split()
    background = ImageChops.multiply(
        ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0), g.point(lambda v: 255 if v == 0 else 0)),
        b.point(lambda v: 255 if v == 255 else 0),
    )
    mask = ImageOps.invert(background)
    box = mask.getbbox()
    return img.crop(box), mask.crop(box)


def main(src, dest, do_trim=False):
    cover = ImageOps.exif_transpose(Image.open(src).convert("RGB"))
    mask = Image.new("L", cover.size, 255)
    if do_trim:
        cover, mask = trim(cover)
    width = round(cover.width * COVER_HEIGHT / cover.height)
    cover = cover.resize((width, COVER_HEIGHT), Image.LANCZOS)
    mask = mask.resize((width, COVER_HEIGHT), Image.LANCZOS)
    x = (SIZE[0] - width) // 2

    canvas = Image.new("RGB", SIZE, PAPER)
    shadow = Image.new("L", SIZE, 0)
    shadow.paste(mask, (x, TOP + SHADOW_OFFSET))
    shadow = shadow.filter(ImageFilter.GaussianBlur(SHADOW_BLUR)).point(lambda v: int(v * SHADOW_OPACITY))
    canvas.paste(Image.new("RGB", SIZE, (40, 36, 30)), (0, 0), shadow)
    canvas.paste(cover, (x, TOP), mask)
    canvas.save(dest, quality=92)


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--trim"]
    if len(args) != 2:
        sys.exit(__doc__)
    main(*args, do_trim="--trim" in sys.argv)
