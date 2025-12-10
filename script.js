// script.js
// Универсальный скрипт для лендинга (меню, плавный скролл, модалки, validation, gallery, темы)
// Соответствует ТЗ: чистый JS, семантика, адаптивность, modal, smooth scroll, form validation.
// Автор: адаптировано под Sapienti Sat — минималистичная версия

document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     УТИЛИТЫ
     ========================= */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const hasClass = (el, cls) => el && el.classList.contains(cls);
  const addClass = (el, cls) => el && el.classList.add(cls);
  const removeClass = (el, cls) => el && el.classList.remove(cls);
  const toggleClass = (el, cls) => el && el.classList.toggle(cls);

  /* =========================
     NAV / MOBILE MENU
     ========================= */
  (function navInit() {
    const header = $('.header');
    const navToggle = $('.nav-toggle');
    const nav = $('.nav') || $('.nav-menu') || null; // разработка под разные HTML
    if (!navToggle || !nav) return;

    // ARIA state
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      // Блокировка прокрутки на мобильных
      document.documentElement.style.overflow = isOpen ? 'hidden' : '';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Закрыть меню при клике по ссылке-якорю
    $$( 'a[href^="#"]', nav ).forEach(link => {
      link.addEventListener('click', () => {
        if (hasClass(nav, 'active')) {
          removeClass(nav, 'active');
          removeClass(navToggle, 'active');
          navToggle.setAttribute('aria-expanded', 'false');
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        }
      });
    });

    // Эффект тени шапки при скролле
    window.addEventListener('scroll', () => {
      if (!header) return;
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }, { passive: true });
  })();

  /* =========================
     SMOOTH SCROLL (с учётом фиксированной шапки)
     ========================= */
  (function smoothScrollInit() {
    const header = $('.header');
    const headerHeight = () => (header ? header.offsetHeight : 0);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const rect = target.getBoundingClientRect();
        const targetY = window.pageYOffset + rect.top - headerHeight() - 12; // небольшой отступ
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      });
    });
  })();

  /* =========================
     MODAL (универсальный)
     - data-modal-open="[id]" для кнопки
     - #id должен быть modal-контейнером
     - внутри modal: .modal-close для кнопки закрытия
     - реализован focus trap и закрытие на Esc/overlay
     ========================= */
  (function modalInit() {
    const openButtons = document.querySelectorAll('[data-modal-open]');
    if (!openButtons.length) return;

    // focus trap helper
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function trapFocus(modal) {
      const focusables = Array.from(modal.querySelectorAll(focusableSelectors));
      if (!focusables.length) return () => {};
      let i = 0;
      focusables[0].focus();

      function handleKey(e) {
        if (e.key === 'Tab') {
          e.preventDefault();
          if (e.shiftKey) i = (i - 1 + focusables.length) % focusables.length;
          else i = (i + 1) % focusables.length;
          focusables[i].focus();
        }
      }
      modal.addEventListener('keydown', handleKey);
      return () => modal.removeEventListener('keydown', handleKey);
    }

    openButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-modal-open');
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.style.display = 'flex';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        // focus trap
        const release = trapFocus(modal);
        // store for close
        modal._releaseFocus = release;
      });
    });

    // Close handlers (by .modal-close, overlay click, Esc)
    document.addEventListener('click', (e) => {
      // close button
      const close = e.target.closest('.modal-close');
      if (close) {
        const modal = close.closest('.modal');
        closeModal(modal);
      }
      // overlay click (если кликнули на фон у modal)
      const overlay = e.target.classList && e.target.classList.contains('modal');
      if (overlay && e.target.matches('.modal')) {
        closeModal(e.target);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // закрываем все видимые модалки
        document.querySelectorAll('.modal').forEach(m => {
          if (getComputedStyle(m).display !== 'none') closeModal(m);
        });
      }
    });

    function closeModal(modal) {
      if (!modal) return;
      modal.style.display = 'none';
      // restore scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // release focus trap
      if (typeof modal._releaseFocus === 'function') modal._releaseFocus();
    }
  })();

  /* =========================
     FORM VALIDATION (семантическая, дружелюбная)
     - форма должна иметь .needs-validation
     - поля должны иметь required и data-error (опционально)
     ========================= */
  (function formValidationInit() {
    const forms = document.querySelectorAll('form.needs-validation');
    if (!forms.length) return;

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    forms.forEach(form => {
      // create a lightweight function to show error near input
      function showError(input, message) {
        let err = input.nextElementSibling;
        if (!err || !err.classList.contains('field-error')) {
          err = document.createElement('div');
          err.className = 'field-error';
          input.parentNode.insertBefore(err, input.nextSibling);
        }
        err.textContent = message;
        input.classList.add('invalid');
      }

      function clearError(input) {
        const err = input.nextElementSibling;
        if (err && err.classList.contains('field-error')) err.textContent = '';
        input.classList.remove('invalid');
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          clearError(field);
          const val = String(field.value || '').trim();

          if (!val) {
            const msg = field.getAttribute('data-error') || 'Заполните поле';
            showError(field, msg);
            valid = false;
            return;
          }

          // email validation
          if (field.type === 'email' && !emailRe.test(val)) {
            showError(field, field.getAttribute('data-error') || 'Введите корректный email');
            valid = false;
            return;
          }

          // optional: min length data-min
          const min = field.getAttribute('data-min');
          if (min && val.length < Number(min)) {
            showError(field, field.getAttribute('data-error') || `Минимум ${min} символов`);
            valid = false;
            return;
          }
        });

        if (!valid) {
          // прокрутка к первой ошибке
          const firstInvalid = form.querySelector('.invalid');
          if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }

        // если всё ок — можно отправить через fetch (пример, заглушка)
        const submitUrl = form.getAttribute('action') || '#';
        const method = (form.getAttribute('method') || 'POST').toUpperCase();

        // Соберём данные
        const data = new FormData(form);

        // UX: показать сообщение отправки
        const submitBtn = form.querySelector('button[type="submit"]');
        const prevText = submitBtn ? submitBtn.textContent : null;
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Отправка...';
        }

        // Здесь — заглушка: симулируем сетевой запрос
        setTimeout(() => {
          // успешная отправка
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = prevText;
          }

          // показываем дружелюбное сообщение. В реале — показывать исходя из ответа сервера.
          const successMsg = document.createElement('div');
          successMsg.className = 'form-success';
          successMsg.textContent = form.getAttribute('data-success') || 'Спасибо! Мы получили ваше сообщение.';
          form.appendChild(successMsg);

          form.reset();

          // скрыть сообщение через 5 секунд
          setTimeout(() => {
            successMsg.remove();
          }, 5000);
        }, 900);

        // Для реального проекта:
        // fetch(submitUrl, { method, body: data }).then(...).catch(...)
      });
    });
  })();

  /* =========================
     GALLERY LIGHTBOX
     - картинки: <a href="large.jpg" data-lightbox="gallery-name"><img ...></a>
     - поддержка стрелок (prev/next) и Esc
     ========================= */
  (function galleryInit() {
    const galleryLinks = document.querySelectorAll('a[data-lightbox]');
    if (!galleryLinks.length) return;

    // Соберём группы по имени
    const groups = {};
    galleryLinks.forEach(a => {
      const name = a.getAttribute('data-lightbox') || '__default';
      groups[name] = groups[name] || [];
      groups[name].push(a);
    });

    // Создаём modal для галереи (один общий)
    const galleryModal = document.createElement('div');
    galleryModal.className = 'modal gallery-modal';
    galleryModal.style.display = 'none';
    galleryModal.style.alignItems = 'center';
    galleryModal.style.justifyContent = 'center';
    galleryModal.style.position = 'fixed';
    galleryModal.style.inset = '0';
    galleryModal.style.background = 'rgba(0,0,0,0.75)';
    galleryModal.style.zIndex = '3000';
    galleryModal.innerHTML = `
      <div class="gallery-inner" style="max-width:90%; max-height:90%; position:relative;">
        <button class="gallery-close" aria-label="Закрыть" style="position:absolute;right:-10px;top:-10px;">×</button>
        <img src="" alt="" style="max-width:100%; max-height:100%; display:block; margin:0 auto; border-radius:6px;" />
        <div class="gallery-caption" style="text-align:center; margin-top:12px; color:#fff; opacity:.9;"></div>
      </div>
    `;
    document.body.appendChild(galleryModal);

    const imgEl = galleryModal.querySelector('img');
    const captionEl = galleryModal.querySelector('.gallery-caption');
    let currentGroup = [];
    let currentIndex = 0;

    function openGallery(groupName, index) {
      currentGroup = groups[groupName];
      currentIndex = index;
      const a = currentGroup[currentIndex];
      const src = a.getAttribute('href') || a.querySelector('img')?.src;
      const alt = a.querySelector('img')?.alt || a.getAttribute('data-caption') || '';
      imgEl.src = src;
      imgEl.alt = alt;
      captionEl.textContent = alt;
      galleryModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
      galleryModal.style.display = 'none';
      imgEl.src = '';
      captionEl.textContent = '';
      document.body.style.overflow = '';
    }

    function showNext(offset) {
      if (!currentGroup.length) return;
      currentIndex = (currentIndex + offset + currentGroup.length) % currentGroup.length;
      const a = currentGroup[currentIndex];
      imgEl.src = a.getAttribute('href') || a.querySelector('img')?.src;
      captionEl.textContent = a.querySelector('img')?.alt || a.getAttribute('data-caption') || '';
    }

    // Навешиваем события на ссылки
    galleryLinks.forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const name = a.getAttribute('data-lightbox') || '__default';
        const group = groups[name];
        const idx = group.indexOf(a);
        openGallery(name, idx);
      });
    });

    // Закрытие и клавиши
    galleryModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('gallery-close') || e.target === galleryModal) closeGallery();
    });

    document.addEventListener('keydown', (e) => {
      if (getComputedStyle(galleryModal).display === 'flex') {
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') showNext(1);
        if (e.key === 'ArrowLeft') showNext(-1);
      }
    });

  })();

  /* =========================
     THEME SWITCHER (необязательно, легкая изюминка)
     - элементы с data-theme-btn="[theme]" переключают тему
     - запись в localStorage 'site-theme'
     - themes: 'default' | 'warm' | 'dark'
     ========================= */
  (function themeSwitcher() {
    const available = ['default', 'warm', 'dark'];
    const root = document.documentElement;
    const saved = localStorage.getItem('site-theme') || 'default';
    setTheme(saved);

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-theme-btn]');
      if (!btn) return;
      const theme = btn.getAttribute('data-theme-btn');
      if (!available.includes(theme)) return;
      setTheme(theme);
      localStorage.setItem('site-theme', theme);
    });

    function setTheme(name) {
      // CSS-переменные могут быть определены в файле стилей под [data-theme="..."]
      root.setAttribute('data-theme', name);
    }
  })();

  /* =========================
     Accessibility helpers: add role where logical (progressive enhancement)
     ========================= */
  (function a11yEnhance() {
    // Ensure nav has role
    const nav = $('.nav') || $('.nav-menu');
    if (nav && !nav.hasAttribute('role')) nav.setAttribute('role', 'navigation');
  })();

}); // DOMContentLoaded end
