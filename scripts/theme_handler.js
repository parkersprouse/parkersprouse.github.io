const Theme = Object.freeze({
  Dark: 'dark',
  Light: 'light',
});

const addClass = (cls) => document.body.classList.add(cls);
const containsClass = (cls) => document.body.classList.contains(cls);
const removeClass = (cls) => document.body.classList.remove(cls);

function toggleTheme(theme) {
  if (theme === Theme.Light) {
    removeClass(Theme.Dark);
    addClass(Theme.Light);
  } else {
    removeClass(Theme.Light);
    addClass(Theme.Dark);
  }
  window.localStorage.setItem('theme', theme);
}

export function initThemeHandler() {
  const toggle_container = document.querySelector('.theme-toggle');
  const toggle_button = toggle_container.querySelector('button');

  function updateButtonLabel() {
    toggle_button.textContent = containsClass(Theme.Light) ? 'dark mode' : 'light mode';
  }

  updateButtonLabel();

  toggle_button.addEventListener('click', (e) => {
    e.preventDefault();
    if (containsClass(Theme.Light)) toggleTheme(Theme.Dark);
    else toggleTheme(Theme.Light);
    updateButtonLabel();
  });

  toggle_container.classList.remove('invisible');
}

export function loadSavedTheme() {
  const saved_theme = window.localStorage.getItem('theme');
  if (saved_theme) toggleTheme(saved_theme);
  // Don't want themes being inadvertently swapped if the user's browser doesn't support
  // the `window.matchMedia` method, so explicitly check for each match.
  else if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) toggleTheme(Theme.Dark);
  else if (window.matchMedia('(prefers-color-scheme: light)')?.matches) toggleTheme(Theme.Light);
}
