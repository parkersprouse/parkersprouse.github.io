const toggle_link = document.querySelector('.theme-toggle').querySelector('a');

toggle_link.onclick = (e) => {
  e.preventDefault();
  const body = document.querySelector('body');
  if (body.classList[0] === 'light') {
    body.classList.replace('light', 'dark');
    toggle_link.innerText = 'go light';
  } else {
    body.classList.replace('dark', 'light');
    toggle_link.innerText = 'go dark';
  }
};
