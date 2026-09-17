// Photo series page: a random order on every visit and a lightweight lightbox.
// Both are progressive enhancements. Without JavaScript the tiles keep their
// front matter order and each one links straight to the large rendition.
(() => {
  const grid = document.querySelector(".series-grid");
  if (!grid) return;

  if (grid.hasAttribute("data-shuffle")) {
    const tiles = Array.from(grid.children);

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
    // Returns the resulting order and how many cells it leaves empty above the
    // last row, whether skipped or never reached, e.g. beside a large tile at
    // the very end. Empty cells in the last row are the natural ragged end.
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
      return { ordered, holes };
    };

    // The simulation knows before anything is shown whether an order leaves
    // holes mid-grid. If it does, another shuffle is tried; a clean one almost
    // always comes up within the first attempts. Should the content make holes
    // unavoidable, the attempt with the fewest wins.
    //
    // The winning order is kept, so a later change in column count starts
    // from the same sequence instead of reshuffling the whole page.
    let base = shuffle();
    const layout = (cols) => {
      let best = arrange(base, cols);
      for (let attempt = 0; best.holes > 0 && attempt < 20; attempt++) {
        const order = shuffle();
        const result = arrange(order, cols);
        if (result.holes < best.holes) {
          best = result;
          base = order;
        }
      }
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
  }

  const dialog = document.querySelector(".series-lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const photo = dialog.querySelector("img");

  grid.addEventListener("click", (event) => {
    const link = event.target.closest("a");
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
