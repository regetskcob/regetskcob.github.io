// The photo lightbox (partials/lightbox.html), shared by the photo grids and
// the images in posts. Links marked data-lightbox open it. The photos of one
// group, a grid or a post, can be paged through with the buttons, the arrow
// keys or a swipe; the order is the one on screen, shuffled grids included.
(() => {
  const dialog = document.querySelector(".lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const photo = dialog.querySelector("img");
  const prev = dialog.querySelector(".lightbox-prev");
  const next = dialog.querySelector(".lightbox-next");
  const count = dialog.querySelector(".lightbox-count");
  const caption = dialog.querySelector(".lightbox-caption");

  // Tiles linking to a page (the series teaser) carry no data-lightbox and
  // navigate as usual.
  const GROUPS = ".series-grid, .single-content";
  let group = [];
  let index = 0;

  const show = (i) => {
    index = (i + group.length) % group.length;
    const link = group[index];
    photo.src = link.href;
    photo.alt = link.querySelector("img")?.alt ?? "";
    caption.textContent = photo.alt;
    count.textContent = `${index + 1} / ${group.length}`;
    // Load the neighbours ahead, so paging does not wait for the photo.
    [index - 1, index + 1].forEach((n) => {
      new Image().src = group[(n + group.length) % group.length].href;
    });
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-lightbox]");
    // Leave modified clicks alone, so "open in new tab" keeps working.
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const container = link.closest(GROUPS) ?? document;
    group = Array.from(container.querySelectorAll("a[data-lightbox]"));
    event.preventDefault();
    const single = group.length < 2;
    prev.hidden = next.hidden = count.hidden = single;
    show(group.indexOf(link));
    dialog.showModal();
  });

  // A click anywhere in the open view closes it: photo or backdrop. The
  // buttons page through instead.
  dialog.addEventListener("click", () => dialog.close());
  [prev, next].forEach((button) =>
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      show(index + (button === next ? 1 : -1));
    })
  );

  // Modal dialogs close on Escape natively, but browsers may skip that when
  // the dialog was not opened by a direct user gesture. Closing an already
  // closed dialog is a no-op, so handling it here as well is safe.
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "Escape") dialog.close();
    else if (group.length > 1 && event.key === "ArrowRight") show(index + 1);
    else if (group.length > 1 && event.key === "ArrowLeft") show(index - 1);
  });

  // A horizontal swipe pages through, a mostly vertical one is left alone.
  let startX = 0;
  let startY = 0;
  dialog.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
  }, { passive: true });
  dialog.addEventListener("touchend", (event) => {
    if (group.length < 2) return;
    const dx = event.changedTouches[0].clientX - startX;
    const dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > 2 * Math.abs(dy)) {
      show(index + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  // The close event arrives a moment after closing; a view opened again in
  // between must keep its photo.
  dialog.addEventListener("close", () => {
    if (dialog.open) return;
    photo.removeAttribute("src");
    caption.textContent = "";
  });
})();
