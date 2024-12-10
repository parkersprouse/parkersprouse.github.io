export function initThemeHandler() {
  const Theme = Object.freeze({
    Dark: 'dark',
    Light: 'light',
  });
  const body = document.body;
  const toggle_container = document.querySelector('.theme-toggle');
  const toggle_button = toggle_container.querySelector('button');

  function toggleTheme(theme) {
    if (theme === Theme.Dark) {
      body.classList.remove('light');
      body.classList.add('dark');
      toggle_button.textContent = 'light mode';
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      toggle_button.textContent = 'dark mode';
    }
    window.localStorage.setItem('theme', theme);
  }

  toggle_button.addEventListener('click', (e) => {
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
}
