import { initThemeHandler, onResizeCallback } from './theme_handler.js';

/**
 * Set up a window resize listener that adjusts the page header's
 * font size to fit the width of the page if the header is too big.
 */
function initTitleResizeListener() {
  const title = document.querySelector('.title');
  if (!title) return;

  const observer = new ResizeObserver(() => {
    if (window.innerWidth < 768) {
      if (title.style !== undefined) {
        title.style.fontSize = `${title.offsetWidth * 0.75}%`;
      }
      onResizeCallback(true);
    } else {
      title.style.fontSize = undefined;
      onResizeCallback(false);
    }
  });

  observer.observe(document.body);

  onResizeCallback(window.innerWidth < 768);
}

document.addEventListener('DOMContentLoaded', () => {
  initTitleResizeListener();
  initThemeHandler();
});
