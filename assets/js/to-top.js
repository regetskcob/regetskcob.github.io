// Shows the floating "back to top" button once the page header is out of view
// and scrolls up smoothly, unless the visitor prefers reduced motion.
(() => {
  const button = document.querySelector(".to-top");
  const header = document.querySelector("header");
  if (!button || !header || !("IntersectionObserver" in window)) return;

  new IntersectionObserver(([entry]) => {
    button.classList.toggle("is-visible", !entry.isIntersecting);
  }).observe(header);

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Move keyboard focus back to the start too, not only the viewport.
    document.querySelector(".header-title a")?.focus({ preventScroll: true });
  });
})();
