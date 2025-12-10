// script.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  navToggle?.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      const headerOffset = document.querySelector('.header').offsetHeight;
      const topPos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
      // закрыть меню
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });
});
