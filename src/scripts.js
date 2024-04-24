document.addEventListener('DOMContentLoaded', () => {
  /**
   * Set up a window resize listener that adjusts the page header's font size to fit the width of the
   * page if the header is too big.
   */
  const title = document.querySelector('.title');
  if (title) {
    new ResizeObserver(() => {
      if (window.innerWidth < 768) {
        if (title.style !== undefined) {
          title.style.fontSize = `${title.offsetWidth * 0.75}%`;
        }
      } else {
        title.style.fontSize = undefined;
      }
    }).observe(document.body);
  }

  const Theme = Object.freeze({
    Dark: 'dark',
    Light: 'light',
  });
  const toggle_container = document.querySelector('.theme-toggle');
  const toggle_link = toggle_container.querySelector('a');
  const body = document.querySelector('body');

  function toggleTheme(theme) {
    if (theme === Theme.Dark) {
      body.classList.remove('light');
      body.classList.add('dark');
      toggle_link.innerText = 'light mode';
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      toggle_link.innerText = 'dark mode';
    }
    window.localStorage.setItem('theme', theme);
  }

  toggle_link.addEventListener('click', (e) => {
    e.preventDefault();
    if (body.classList.contains('light')) toggleTheme(Theme.Dark);
    else toggleTheme(Theme.Light);
  });

  const saved_theme = window.localStorage.getItem('theme');
  if (saved_theme) toggleTheme(saved_theme);
  // Don't want themes being inadvertently swapped if the user's browser doesn't support
  // the `window.matchMedia` method, so explicitly check for each match.
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) toggleTheme(Theme.Dark);
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) toggleTheme(Theme.Light);

  toggle_container.style.display = 'initial';
});
