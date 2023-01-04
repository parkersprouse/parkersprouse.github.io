/**
 * Set up a window resize listener that adjusts the page header's font size to fit the width of the
 * page if the header is too big.
 */
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');

  const calculateFontScale = (el) => {
    if (el?.style !== undefined) el.style.fontSize = `${el.offsetWidth * 0.75}%`;
    return el;
  };

  const resizeHandler = () => {
    if (window.innerWidth < 768) {
      if (title) calculateFontScale(title);
    } else {
      title.style.fontSize = null;
    }
  };

  window.addEventListener('resize', resizeHandler);
  resizeHandler();
});

/*
 * See comment in HTML for explanation on why this is disabled.
 */

/*
const Themes = Object.freeze({
  Dark: 'dark',
  Light: 'light',
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle_container = document.querySelector('.theme-toggle');
  const toggle_link = toggle_container.querySelector('a');
  const body = document.querySelector('body');

  function toggleTheme(theme) {
    if (theme === Themes.Dark) {
      body.classList.remove('light');
      body.classList.add('dark');
      toggle_link.innerText = 'go light';
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      toggle_link.innerText = 'go dark';
    }
    window.localStorage.setItem('theme', theme);
  }

  toggle_link.onclick = (e) => {
    e.preventDefault();
    if (body.classList.contains('light')) toggleTheme(Themes.Dark);
    else toggleTheme(Themes.Light);
  };

  const saved_theme = window.localStorage.getItem('theme');
  if (saved_theme) toggleTheme(saved_theme);
  // Don't want themes being inadvertently swapped if the user's browser doesn't support
  // the `window.matchMedia` method, so explicitly check for each match.
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) toggleTheme(Themes.Dark);
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) toggleTheme(Themes.Light);

  toggle_container.style.display = 'initial';
});
*/

/*
function getDefaultFontSize() {
  const element = document.createElement('div');
  element.style.width = '1rem';
  element.style.display = 'none';
  document.body.append(element);

  const widthMatch = window.getComputedStyle(element).getPropertyValue('width').match(/\d+/);
  element.remove();

  if (!widthMatch || widthMatch.length < 1) return null;

  const result = Number(widthMatch[0]);
  return Number.isNaN(result) ? null : result;
}
*/
