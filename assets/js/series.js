// Photo grids (partials/photo-grid.html), on the series page, the home page,
// the gear page and in posts: an optional random order on every visit and the
// promoted (large) tiles, one for every seven photos. Both are
// progressive enhancements. Without JavaScript the tiles keep their data file
// order and each one links straight to its large rendition or its page. The
// lightbox they open is in lightbox.js.
(() => {
  const grids = document.querySelectorAll(".series-grid");
  if (!grids.length) return;

  const setupGrid = (grid) => {
    const tiles = Array.from(grid.children);
    const shuffleOn = grid.hasAttribute("data-shuffle");
    const uniform = grid.hasAttribute("data-uniform");

    // Large tiles for every gallery, by one rule: one for every seven photos,
    // alternating landscape and portrait, landscape first (a large portrait
    // takes more than twice the room of a large landscape, so it only comes
    // in once there are enough photos around it). Which photos it is changes
    // with every visit, the number does not. Tiles marked "size: large" by
    // hand in the data file count as landscape ones and stay; the rule only
    // adds up to the number it asks for. A promoted photo gets the "sizes" of
    // a two-column tile, so the browser loads a sharp enough rendition.
    const LARGE_SIZES =
      "(max-width: 640px) 100vw, (max-width: 1250px) 54vw, 700px";
    const landscapes = uniform ? [] : tiles.filter((t) => t.classList.length === 1);
    const portraits = uniform ? [] : tiles.filter((t) => t.classList.contains("is-portrait"));
    const candidates = landscapes.concat(portraits);
    const handPicked = tiles.filter((t) => t.classList.contains("is-large")).length;
    const slots = [];
    for (let k = handPicked; k < Math.floor(tiles.length / 7); k++)
      slots.push(k % 2 === 0 ? "landscape" : "portrait");
    const featured = !uniform && slots.length > 0 && candidates.length > 0;
    // Nothing to shuffle and nothing to promote: leave the grid as it is.
    if (!shuffleOn && !featured) return;

    const smallSizes = new Map(
      candidates.map((t) => [t, t.querySelector("img")?.getAttribute("sizes")])
    );
    const pickLarge = () => {
      const picked = new Set();
      const pools = { landscape: landscapes.slice(), portrait: portraits.slice() };
      slots.forEach((type) => {
        // Without a photo of the wanted shape, the other one stands in.
        const pool = pools[type].length ? pools[type] : pools[type === "portrait" ? "landscape" : "portrait"];
        if (pool.length) picked.add(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      });
      return picked;
    };
    const applyLarge = (picked) => {
      candidates.forEach((t) => {
        const on = picked.has(t);
        // A portrait keeps its shape when promoted: two columns wide and four
        // rows high, which is the 3:4 of the photo. In the 2x2 cell of a
        // landscape it would be cropped to a landscape.
        t.classList.toggle(
          t.classList.contains("is-portrait") ? "is-large-portrait" : "is-large",
          on
        );
        t.querySelector("img")?.setAttribute(
          "sizes",
          on ? LARGE_SIZES : smallSizes.get(t)
        );
      });
    };

    // Fisher-Yates.
    const shuffle = () => {
      const order = tiles.slice();
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      return order;
    };

    const shapeOf = (tile) => {
      if (tile.classList.contains("is-large-portrait")) return { w: 2, h: 4 };
      if (tile.classList.contains("is-large")) return { w: 2, h: 2 };
      if (tile.classList.contains("is-portrait")) return { w: 1, h: 2 };
      if (tile.classList.contains("is-wide")) return { w: 2, h: 1 };
      return { w: 1, h: 1 };
    };
    const isSingle = (tile) => {
      const { w, h } = shapeOf(tile);
      return w === 1 && h === 1;
    };

    // Fills the grid cell by cell, the way CSS dense packing does, and picks
    // for each free cell the next tile from the given order that fits there.
    // CSS then places the tiles exactly as simulated.
    //
    // Only a single-cell tile can close the gap a spanning tile leaves beside
    // it, so singles are held back while spanning tiles outnumber them.
    //
    // Returns the resulting order, how many cells it leaves empty above the
    // last row, whether skipped or never reached, e.g. beside a large tile at
    // the very end (holes), and how many stay empty in the last row (tail).
    const arrange = (order, cols) => {
      const taken = new Set();
      const free = (r, c) => c < cols && !taken.has(`${r}:${c}`);
      const fits = (r, c, { w, h }) => {
        for (let dr = 0; dr < h; dr++)
          for (let dc = 0; dc < w; dc++) if (!free(r + dr, c + dc)) return false;
        return true;
      };

      const remaining = order.slice();
      const ordered = [];
      const skipped = new Set();
      let lastRow = 0;
      let row = 0;
      let col = 0;
      while (remaining.length) {
        // Advance to the next free cell in reading order.
        while (!free(row, col)) {
          col++;
          if (col >= cols) {
            col = 0;
            row++;
          }
        }

        const singlesLeft = remaining.filter(isSingle).length;
        const holdSingles = singlesLeft <= remaining.length - singlesLeft;
        const fitting = remaining.filter((t) => fits(row, col, shapeOf(t)));
        const pick =
          (holdSingles && fitting.find((t) => !isSingle(t))) || fitting[0];

        if (pick) {
          const { w, h } = shapeOf(pick);
          for (let dr = 0; dr < h; dr++)
            for (let dc = 0; dc < w; dc++) taken.add(`${row + dr}:${col + dc}`);
          lastRow = Math.max(lastRow, row + h - 1);
          remaining.splice(remaining.indexOf(pick), 1);
          ordered.push(pick);
        } else {
          // Nothing left fits this cell; leave it empty and move on.
          taken.add(`${row}:${col}`);
          skipped.add(`${row}:${col}`);
        }
      }

      let holes = 0;
      for (let r = 0; r < lastRow; r++)
        for (let c = 0; c < cols; c++) {
          const key = `${r}:${c}`;
          if (!taken.has(key) || skipped.has(key)) holes++;
        }
      let tail = 0;
      for (let c = 0; c < cols; c++) if (!taken.has(`${lastRow}:${c}`)) tail++;
      return { ordered, holes, tail };
    };

    // The simulation knows before anything is shown whether an order leaves
    // holes mid-grid or a ragged last row. If it does, another shuffle is
    // tried; a clean one usually comes up within the first attempts. Holes
    // mid-grid weigh far more than a short last row. Should the content make
    // both unavoidable, the attempt with the lowest score wins.
    //
    // In a grid with promoted tiles each attempt also re-picks which photos
    // they are, so a layout without holes is found more easily.
    //
    // The winning order is kept, so a later change in column count starts
    // from the same sequence instead of reshuffling the whole page.
    const score = (r) => r.holes * 100 + r.tail;
    let base = shuffleOn ? shuffle() : tiles.slice();
    const layout = (cols) => {
      let large = featured ? pickLarge() : null;
      if (large) applyLarge(large);
      let best = arrange(base, cols);
      for (let attempt = 0; score(best) > 0 && attempt < 60; attempt++) {
        const tryLarge = featured ? pickLarge() : null;
        if (tryLarge) applyLarge(tryLarge);
        // Without shuffle the order stays; only the promoted photos change.
        const order = shuffleOn ? shuffle() : base;
        const result = arrange(order, cols);
        if (score(result) < score(best)) {
          best = result;
          base = order;
          large = tryLarge;
        }
      }
      if (large) applyLarge(large);
      best.ordered.forEach((tile) => grid.appendChild(tile));
    };

    const columnCount = () =>
      getComputedStyle(grid).gridTemplateColumns.split(" ").length;

    let cols = columnCount();
    layout(cols);

    // The column count follows the gallery width (2, 3 or 4), so rearrange
    // whenever it changes, e.g. on rotating a phone.
    new ResizeObserver(() => {
      const now = columnCount();
      if (now !== cols) {
        cols = now;
        layout(cols);
      }
    }).observe(grid);
  };

  grids.forEach(setupGrid);
})();
