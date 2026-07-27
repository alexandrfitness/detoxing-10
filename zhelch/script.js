// ============ Theme Toggle ============
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  function updateIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    toggle.setAttribute('aria-label', 'Переключить на ' + (theme === 'dark' ? 'светлую' : 'тёмную') + ' тему');
  }

  updateIcon();

  toggle && toggle.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    updateIcon();
  });
})();

// ============ Header scroll behavior ============
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const current = window.scrollY;
    if (current > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = current;
  }, { passive: true });
})();

// ============ Mobile menu ============
(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ============ Contact form → Fluent Forms (форма 4 основного сайта) ============
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var PHONE = '+7 967 453-37-67';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var btnText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Отправляем…'; }

    var name = form.elements['name'] ? form.elements['name'].value : '';
    var phone = form.elements['phone'] ? form.elements['phone'].value : '';
    var message = form.elements['message'] ? form.elements['message'].value : '';
    var src = form.getAttribute('data-src') || 'Исследование желчи';
    var desc = message ? src + ' · ' + message : src;

    var data = 'names%5Bfirst_name%5D=' + encodeURIComponent(name) +
      '&input_mask=' + encodeURIComponent(phone) +
      '&email=' +
      '&description=' + encodeURIComponent(desc) +
      '&gdpr-agreement=on' +
      '&wjaxmk8812=' + Math.floor(100000 + Math.random() * 899999) +
      '&alt_s=';

    var body = new URLSearchParams();
    body.set('action', 'fluentform_submit');
    body.set('form_id', '4');
    body.set('data', data);

    fetch('https://bisharova.com/wp-admin/admin-ajax.php', { method: 'POST', body: body })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.success) {
          var ok = document.createElement('div');
          ok.className = 'form-success';
          ok.textContent = 'Спасибо, ' + (name || 'заявка принята') + '! Мы свяжемся с вами в ближайшее время.';
          form.innerHTML = '';
          form.appendChild(ok);
        } else {
          alert('Не удалось отправить заявку. Позвоните нам: ' + PHONE);
          if (btn) { btn.disabled = false; btn.textContent = btnText; }
        }
      })
      .catch(function () {
        alert('Сеть недоступна. Позвоните нам: ' + PHONE);
        if (btn) { btn.disabled = false; btn.textContent = btnText; }
      });
  });
})();

// ============ Smooth scroll fallback ============
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
