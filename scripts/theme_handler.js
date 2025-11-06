const Theme = Object.freeze({
  Dark: 'dark',
  Light: 'light',
});

const node = document.querySelector('html');
const toggle_container = document.querySelector('.theme-toggle');
const toggle_button = toggle_container.querySelector('button');

const addClass = (cls) => node.classList.add(cls);
const containsClass = (cls) => node.classList.contains(cls);
const removeClass = (cls) => node.classList.remove(cls);
export const onResizeCallback = (mobile) => {
  is_mobile = mobile;
  updateButtonLabel(toggle_button);
};

let is_mobile = false;

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

function updateButtonLabel(btn) {
  if (!btn) return;
  const suffix = is_mobile ? '' : ' mode';
  btn.textContent = containsClass(Theme.Light) ? `dark${suffix}` : `light${suffix}`;
}

export function initThemeHandler() {
  updateButtonLabel(toggle_button);

  toggle_button.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (containsClass(Theme.Light)) toggleTheme(Theme.Dark);
    else toggleTheme(Theme.Light);
    updateButtonLabel(toggle_button);
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
