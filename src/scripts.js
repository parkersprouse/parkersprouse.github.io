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
