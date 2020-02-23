// Needed for parcel. Not entirely sure why, but
// https://github.com/parcel-bundler/parcel/issues/1762#issuecomment-504389468
import 'regenerator-runtime/runtime';
import MoveTo from 'moveto';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('html').classList.remove('no-js');

  const moveTo = new MoveTo();

  document.querySelectorAll('.back-to-top').forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();
      const y = window.pageYOffset || document.documentElement.scrollTop;
      moveTo.move(-y);
    };
  });

  document.querySelector('.navbar__skills-link').onclick = (e) => {
    e.preventDefault();
    moveTo.move(document.querySelector('#skills'));
  };

  document.querySelector('.navbar__projects-link').onclick = (e) => {
    e.preventDefault();
    moveTo.move(document.querySelector('#projects'));
  };

  document.querySelector('.navbar__contact-link').onclick = (e) => {
    e.preventDefault();
    moveTo.move(document.querySelector('#contact'));
  };

  // Contact Form
  const contact_form = document.querySelector('.contact-form');
  const err_msg = document.querySelector('.alert--error');
  const success_msg = document.querySelector('.alert--success');

  contact_form.onsubmit = async (e) => {
    e.preventDefault();
    err_msg.classList.add('hidden');
    success_msg.classList.add('hidden');

    const email = contact_form.querySelector('#email');
    const message = contact_form.querySelector('#message');
    const name = contact_form.querySelector('#name');
    const honeypot = contact_form.querySelector('#hp');
    const submit = contact_form.querySelector('#submit');

    submit.disabled = true;
    submit.classList.add('loading');

    const response = await fetch('http://api.parkersprouse.me/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        honeypot: honeypot.value,
        message: message.value,
        name: name.value,
      }),
    });

    submit.disabled = false;
    submit.classList.remove('loading');

    if (response.ok) {
      success_msg.classList.remove('hidden');
      email.value = '';
      message.value = '';
      name.value = '';
    } else {
      const { error } = await response.json();
      err_msg.innerHTML = error || 'There was an unknown problem sending your message';
      err_msg.classList.remove('hidden');
    }
  };
});
