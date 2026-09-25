// Photo grids (partials/photo-grid.html), on the series page and the home
// page: a random order on every visit and a lightweight lightbox. Both are
// progressive enhancements. Without JavaScript the tiles keep their data file
// order and each one links straight to its large rendition or its page.
(() => {
  const grids = document.querySelectorAll(".series-grid");
  if (!grids.length) return;

  const setupShuffle = (grid) => {
    const tiles = Array.from(grid.children);

    // Galleries without hand-picked large tiles would be a plain field of
    // equal cells. With data-feature, a few landscape tiles, about one in six
    // and at least one, show at 2x2; which ones changes with every visit. A
    // promoted photo gets the "sizes" of a two-column tile, so the browser
    // loads a sharp enough rendition.
    const LARGE_SIZES =
      "(max-width: 640px) 100vw, (max-width: 1250px) 54vw, 700px";
    const landscapes = tiles.filter((t) => t.classList.length === 1);
    const featured =
      grid.hasAttribute("data-feature") &&
      landscapes.length > 0 &&
      !tiles.some((t) => t.classList.contains("is-large"));
    const featureCount = Math.max(1, Math.floor(tiles.length / 6));
    const smallSizes = new Map(
      landscapes.map((t) => [t, t.querySelector("img")?.getAttribute("sizes")])
    );
    const pickLarge = (count) => {
      const pool = landscapes.slice();
      const picked = new Set();
      const n = Math.min(pool.length, Math.max(1, count));
      while (picked.size < n)
        picked.add(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      return picked;
    };
    const applyLarge = (picked) => {
      landscapes.forEach((t) => {
        const on = picked.has(t);
        t.classList.toggle("is-large", on);
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
    // In a featured grid (see below) each attempt also re-picks which
    // landscape tiles show at 2x2, and one more or fewer than planned, since
    // the number of cells they add decides whether the rows can come out even.
    //
    // The winning order is kept, so a later change in column count starts
    // from the same sequence instead of reshuffling the whole page.
    const score = (r) => r.holes * 100 + r.tail;
    let base = shuffle();
    const layout = (cols) => {
      let large = featured ? pickLarge(featureCount) : null;
      if (large) applyLarge(large);
      let best = arrange(base, cols);
      for (let attempt = 0; score(best) > 0 && attempt < 60; attempt++) {
        const tryLarge = featured
          ? pickLarge(featureCount + Math.floor(Math.random() * 3) - 1)
          : null;
        if (tryLarge) applyLarge(tryLarge);
        const order = shuffle();
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

  grids.forEach((grid) => {
    if (grid.hasAttribute("data-shuffle")) setupShuffle(grid);
  });

  const dialog = document.querySelector(".series-lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const photo = dialog.querySelector("img");

  // One lightbox for all grids. Only tiles that link to their photo open it;
  // tiles linking to a page (the series teaser) navigate as usual.
  document.addEventListener("click", (event) => {
    const link = event.target.closest(".series-grid a[data-lightbox]");
    // Leave modified clicks alone, so "open in new tab" keeps working.
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    photo.src = link.href;
    photo.alt = link.querySelector("img")?.alt ?? "";
    dialog.showModal();
  });

  // A click anywhere in the open view closes it: photo, button or backdrop.
  dialog.addEventListener("click", () => dialog.close());

  // Modal dialogs close on Escape natively, but browsers may skip that when
  // the dialog was not opened by a direct user gesture. Closing an already
  // closed dialog is a no-op, so handling it here as well is safe.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) dialog.close();
  });
  dialog.addEventListener("close", () => photo.removeAttribute("src"));
})();
