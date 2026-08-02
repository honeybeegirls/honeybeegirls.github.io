// Honey Bee Girls — shared site behavior
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // In-memory cart (resets on reload — no storage APIs used)
  let cartCount = 0;
  const cartCountEls = document.querySelectorAll('.cart-count');

  function renderCart() {
    cartCountEls.forEach(el => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? 'flex' : 'none';
    });
  }
  renderCart();

  document.querySelectorAll('.add-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      renderCart();
      const original = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.style.background = 'var(--green)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
      }, 900);
    });
  });

  // Product filter (shop page)
  const filterBtns = document.querySelectorAll('.product-filter button');
  const productCards = document.querySelectorAll('.product-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      productCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'flex' : 'none';
      });
    });
  });

  // Newsletter / contact forms — cosmetic only, no backend wired up
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Thanks! 🐝';
        setTimeout(() => { btn.textContent = original; }, 2200);
      }
      form.reset();
    });
  });

  // Simple scroll-reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }
});
