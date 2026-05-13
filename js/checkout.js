function checkoutPageHtml() {
  return `
    <section class="checkout-page">

      <div class="checkout-head section-flag-blue">
        <div class="container">
          <span class="section-eyebrow">— Checkout</span>
          <h1 class="checkout-title">Order <span class="gold-script">Summary</span></h1>
        </div>
      </div>

      <div class="container">
        <div class="checkout-summary-single">
          <div id="checkout-summary-root"></div>
          <div class="checkout-actions">
            <p class="co-empty-warning" id="co-empty-warning">Your basket is empty — add something before continuing.</p>
            <div class="checkout-action-row">
              <a href="menu.html" class="btn btn-ghost">← Back to menu</a>
              <a href="order.html" class="btn btn-primary co-submit" id="co-checkout-btn">Checkout →</a>
            </div>
          </div>
        </div>
      </div>

    </section>`;
}

function bindCheckout() {
  const checkoutBtn = document.getElementById("co-checkout-btn");
  const emptyWarning = document.getElementById("co-empty-warning");
  const mobileBarEl = document.getElementById("mobile-cart-bar-root");

  function renderMobileBar() {
    const { count, subtotal } = cartSummary();
    if (!mobileBarEl) return;
    if (count === 0) { mobileBarEl.innerHTML = ""; return; }
    mobileBarEl.innerHTML = `
      <button class="mobile-cart-bar" data-cart-go-order>
        <span class="mcb-left">Checkout</span>
        <span class="mcb-total">$${subtotal.toFixed(2)}</span>
      </button>`;
  }

  function syncBtn() {
    const { count } = cartSummary();
    const empty = count === 0;
    if (checkoutBtn) {
      checkoutBtn.style.pointerEvents = empty ? "none" : "";
      checkoutBtn.style.opacity = empty ? "0.38" : "";
      checkoutBtn.style.cursor = empty ? "not-allowed" : "";
    }
    if (emptyWarning) emptyWarning.hidden = !empty;
    renderMobileBar();
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cart-go-order]")) {
      window.location.href = "order.html";
    }
  });

  window.addEventListener("cart-update", syncBtn);
  syncBtn();
}
