import '../styles/index.css';

import { initThemeHandler } from './theme_handler.js';

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
    } else {
      title.style.fontSize = undefined;
    }
  });

  observer.observe(document.body);
}

document.addEventListener('DOMContentLoaded', () => {
  initTitleResizeListener();
  initThemeHandler();
});
