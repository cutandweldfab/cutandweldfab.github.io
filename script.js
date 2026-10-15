// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Email popup — 3 seconds after load, once per session
(function () {
  const overlay = document.getElementById('emailPopup');
  if (!overlay) return;
  const closeBtn = document.getElementById('popupClose');
  const form = document.getElementById('popupEmailForm');

  function closePopup() {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    try { sessionStorage.setItem('cw_email_popup_seen', '1'); } catch (e) {}
  }

  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  if (form) {
    form.addEventListener('submit', function () {
      try { sessionStorage.setItem('cw_email_popup_seen', '1'); } catch (e) {}
    });
  }

  let seen = false;
  try { seen = sessionStorage.getItem('cw_email_popup_seen') === '1'; } catch (e) {}
  if (!seen) {
    setTimeout(function () {
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
    }, 3000);
  }
})();
