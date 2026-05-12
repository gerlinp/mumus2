// Cart state lives in localStorage; pages re-render their cart UI when
// `cart-update` fires. The drawer slides in from the right; on desktop
// the body gets padding-right so content compresses instead of being
// overlaid. Mobile gets a bottom floating bar + overlay drawer.

const CART_KEY = "mumus_cart_v1";

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart-update"));
}

function cartSummary() {
  const items = loadCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  return { items, count, subtotal };
}

function addToCart(product, size, qty) {
  qty = Math.max(1, qty | 0);
  const items = loadCart();
  const key = `${product.id}-${size.label}`;
  const ix = items.findIndex(i => i.key === key);
  if (ix >= 0) {
    items[ix].qty += qty;
  } else {
    items.push({
      key,
      productId: product.id,
      name: product.name,
      size: size.label,
      price: size.price,
      qty,
    });
  }
  saveCart(items);
  openCart();
}

function setCartQty(key, qty) {
  const items = loadCart()
    .map(i => i.key === key ? { ...i, qty } : i)
    .filter(i => i.qty > 0);
  saveCart(items);
}

function removeFromCart(key) {
  saveCart(loadCart().filter(i => i.key !== key));
}

function isCartOpen() { return document.body.classList.contains("cart-open"); }

function openCart() {
  document.body.classList.add("cart-open");
  window.dispatchEvent(new CustomEvent("cart-toggle"));
}

function closeCart() {
  document.body.classList.remove("cart-open");
  window.dispatchEvent(new CustomEvent("cart-toggle"));
}

function navHtml({ currentPage = "home", onDark = false } = {}) {
  return `
    <nav class="nav${onDark ? " on-dark" : ""}">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo-wrap" aria-label="Mumu's Pikliz home">
          <img src="assets/logo.png" alt="" class="nav-logo-mark" />
          <span class="nav-logo-text">
            <span class="nl-1">Mumu's Pikliz</span>
          </span>
        </a>
        <div class="nav-links">
          <a href="index.html" class="${currentPage === "home" ? "active" : ""}">Home</a>
          <a href="menu.html" class="${currentPage === "menu" ? "active" : ""}">Menu</a>
          <a href="index.html#locations">Locations</a>
          <a href="index.html#story">About</a>
          <a href="index.html#contact">Contact</a>
        </div>
        <button class="nav-cart-btn" data-cart-open>
          Basket · <span data-cart-count>0</span>
        </button>
      </div>
    </nav>`;
}

function cartItemHtml(item) {
  return `
    <div class="cart-item" data-key="${item.key}">
      <div class="cart-item-img">
        <image-slot id="product-${item.productId}" shape="rect" placeholder=""
          style="width:100%;height:100%;display:block"></image-slot>
      </div>
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">${item.size}</div>
        <div class="qty-row">
          <button class="qty-btn" data-cart-qty="-1" aria-label="Decrease">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-cart-qty="1" aria-label="Increase">+</button>
          <span class="remove-link" data-cart-remove>Remove</span>
        </div>
      </div>
      <div class="cart-item-price">$${(item.qty * item.price).toFixed(0)}</div>
    </div>`;
}

function cartDrawerHtml() {
  const { items, subtotal } = cartSummary();
  // Open state is baked into the initial markup so a re-render mid-open
  // (e.g. after a qty change) doesn't flash the slide-out transition.
  const openCls = document.body.classList.contains("cart-open") ? " open" : "";
  const body = items.length === 0
    ? `<div class="cart-empty">
         <span class="hand">it's empty in here</span>
         <p>Try a jar of Pikliz. Mumu insists.</p>
       </div>`
    : items.map(cartItemHtml).join("");

  const foot = items.length === 0 ? "" : `
    <div class="cart-foot">
      <div class="cart-totals">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(0)}</span>
      </div>
      <button class="btn btn-primary btn-block" data-cart-checkout>
        Continue to checkout →
      </button>
      <div class="cart-note">Shipping calculated at checkout. Local pickup free.</div>
    </div>`;

  return `
    <div class="cart-overlay${openCls}" data-cart-close></div>
    <aside class="cart-drawer${openCls}">
      <div class="cart-head">
        <h3>Your Basket</h3>
        <button class="cart-close" data-cart-close aria-label="Close">✕</button>
      </div>
      <div class="cart-body">${body}</div>
      ${foot}
    </aside>`;
}

function mobileCartBarHtml() {
  const { count, subtotal } = cartSummary();
  if (count === 0) return "";
  return `
    <button class="mobile-cart-bar" data-cart-open>
      <span class="mcb-left">
        <span class="mcb-icon" aria-hidden="true">▢</span>
        View Cart
        <span class="mcb-count">· ${count}</span>
      </span>
      <span class="mcb-total">$${subtotal.toFixed(2)}</span>
    </button>`;
}

// Sync `cart-open` and `has-cart-items` classes; reflect count/subtotal in
// any element with [data-cart-count] / [data-cart-subtotal]. Page-specific
// drawer/mobile-bar containers re-render on `cart-update`.
function bindCartUi() {
  const drawerEl = document.getElementById("cart-drawer-root");
  const mobileBarEl = document.getElementById("mobile-cart-bar-root");

  function syncOpenClasses() {
    const isOpen = document.body.classList.contains("cart-open");
    document.querySelectorAll(".cart-drawer, .cart-overlay").forEach(el => {
      el.classList.toggle("open", isOpen);
    });
  }

  function renderAll() {
    const { count } = cartSummary();
    document.body.classList.toggle("has-cart-items", count > 0);
    document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = count; });
    if (drawerEl) drawerEl.innerHTML = cartDrawerHtml();
    if (mobileBarEl) mobileBarEl.innerHTML = mobileCartBarHtml();
    syncOpenClasses();
  }

  window.addEventListener("cart-toggle", syncOpenClasses);

  // Single delegated handler for every cart interaction on the page.
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-cart-open]");
    if (opener) { e.preventDefault(); openCart(); return; }

    const closer = e.target.closest("[data-cart-close]");
    if (closer) { closeCart(); return; }

    const checkout = e.target.closest("[data-cart-checkout]");
    if (checkout) { window.location.href = "order-success.html"; return; }

    const qtyBtn = e.target.closest("[data-cart-qty]");
    if (qtyBtn) {
      const row = qtyBtn.closest(".cart-item");
      if (row) {
        const delta = parseInt(qtyBtn.getAttribute("data-cart-qty"), 10);
        const { items } = cartSummary();
        const item = items.find(i => i.key === row.dataset.key);
        if (item) setCartQty(item.key, item.qty + delta);
      }
      return;
    }

    const removeBtn = e.target.closest("[data-cart-remove]");
    if (removeBtn) {
      const row = removeBtn.closest(".cart-item");
      if (row) removeFromCart(row.dataset.key);
      return;
    }
  });

  window.addEventListener("cart-update", renderAll);
  window.addEventListener("storage", renderAll);
  renderAll();
}
