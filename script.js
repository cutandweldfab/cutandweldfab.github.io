// Business contact
var CW_EMAIL = 'cutandweldfab@gmail.com';

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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      try { sessionStorage.setItem('cw_email_popup_seen', '1'); } catch (err) {}
      var addr = (form.querySelector('input[name="email"]') || {}).value || '';
      var subject = 'Add me to the Cut and Weld Fabrication list';
      var body = 'Please add me to your email list for availability and project updates.\n\nMy email: ' + addr;
      window.location.href = 'mailto:' + CW_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      closePopup();
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

// Quote form — opens the visitor's email app addressed to Cut and Weld Fabrication
(function () {
  var form = document.getElementById('quoteForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
    var projSel = document.getElementById('project');
    var project = projSel && projSel.value ? projSel.options[projSel.selectedIndex].text : 'Not specified';
    var name = val('name');
    var subject = 'Quote Request: ' + project + (name ? ' - ' + name : '');
    var body = 'Name: ' + name + '\n' +
      'Email: ' + val('email') + '\n' +
      'Phone: ' + (val('phone') || 'Not provided') + '\n' +
      'Project Type: ' + project + '\n\n' +
      'Project Details:\n' + val('message') + '\n';
    window.location.href = 'mailto:' + CW_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
