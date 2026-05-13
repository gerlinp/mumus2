function orderPageHtml() {
  return `
    <section class="checkout-page">

      <div class="checkout-head section-flag-blue">
        <div class="container">
          <span class="section-eyebrow">— Almost there</span>
          <h1 class="checkout-title">Your <span class="gold-script">details</span></h1>
        </div>
      </div>

      <div class="container">
        <div class="checkout-grid">

          <div class="checkout-form-col">
            <form class="checkout-form" id="checkout-form" novalidate>
              <div class="co-field-group">
                <div class="co-field">
                  <label class="co-label" for="co-first">First name</label>
                  <input class="co-input" id="co-first" name="first_name" type="text" placeholder="First name" required />
                </div>
                <div class="co-field">
                  <label class="co-label" for="co-last">Last name</label>
                  <input class="co-input" id="co-last" name="last_name" type="text" placeholder="Last name" required />
                </div>
              </div>

              <div class="co-field">
                <label class="co-label" for="co-email">Email</label>
                <input class="co-input" id="co-email" name="email" type="email" placeholder="you@example.com" required />
              </div>

              <div class="co-field">
                <label class="co-label" for="co-phone">Phone</label>
                <input class="co-input" id="co-phone" name="phone" type="tel" placeholder="(555) 555-5555" />
              </div>

              <div class="co-field">
                <label class="co-label">Fulfillment</label>
                <div class="co-radio-group">
                  <label class="co-radio">
                    <input type="radio" name="fulfillment" value="pickup" checked />
                    <span class="co-radio-box">
                      <span class="co-radio-title">Local pickup</span>
                      <span class="co-radio-sub">Boston / South Shore</span>
                    </span>
                  </label>
                  <label class="co-radio">
                    <input type="radio" name="fulfillment" value="delivery" />
                    <span class="co-radio-box">
                      <span class="co-radio-title">Local delivery</span>
                      <span class="co-radio-sub">South Shore &amp; Boston area</span>
                    </span>
                  </label>
                  <label class="co-radio">
                    <input type="radio" name="fulfillment" value="shipping" />
                    <span class="co-radio-box">
                      <span class="co-radio-title">Shipping</span>
                      <span class="co-radio-sub">Anywhere in the US</span>
                    </span>
                  </label>
                </div>
              </div>

              <div class="co-field co-address-field">
                <label class="co-label" for="co-address">Delivery / shipping address</label>
                <input class="co-input" id="co-address" name="address" type="text" placeholder="123 Main St, Boston, MA 02101" />
              </div>

              <div class="co-field">
                <label class="co-label" for="co-notes">Notes <span class="co-optional">(optional)</span></label>
                <textarea class="co-input co-textarea" id="co-notes" name="notes" rows="3" placeholder="Allergies, gate codes, preferred pickup time…"></textarea>
              </div>

              <p class="co-note">We'll confirm your order and finalize shipping or delivery cost within 24 hours.</p>

              <button type="submit" class="btn btn-primary co-submit">
                Place order · $<span data-co-total>0</span>
              </button>
            </form>
          </div>

          <div class="checkout-summary-col">
            <button class="co-summary-toggle" id="co-summary-toggle" aria-expanded="false" aria-controls="co-summary-panel">
              <span>Your order</span>
              <span class="co-summary-toggle-right">
                $<span data-summary-total>0</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="co-toggle-chevron" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </button>
            <div class="co-summary-card" id="co-summary-panel">
              <h3 class="co-summary-head">Your order</h3>
              <div id="checkout-summary-root"></div>
            </div>
          </div>

        </div>
      </div>

    </section>`;
}

function bindOrder() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  const submitBtn = form.querySelector(".co-submit");

  const mobileBarEl = document.getElementById("mobile-cart-bar-root");

  function renderMobileBar() {
    const { subtotal } = cartSummary();
    const totalEl = submitBtn.querySelector("[data-co-total]");
    if (totalEl) totalEl.textContent = subtotal.toFixed(0);
    const toggleTotal = document.querySelector("[data-summary-total]");
    if (toggleTotal) toggleTotal.textContent = subtotal.toFixed(0);
    if (mobileBarEl) {
      mobileBarEl.innerHTML = `
        <button class="mobile-cart-bar" data-mobile-place-order>
          <span class="mcb-left">Place order</span>
          <span class="mcb-total">$${subtotal.toFixed(2)}</span>
        </button>`;
    }
  }

  window.addEventListener("cart-update", renderMobileBar);
  renderMobileBar();

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-mobile-place-order]")) {
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  });

  const toggleBtn = document.getElementById("co-summary-toggle");
  const summaryPanel = document.getElementById("co-summary-panel");
  if (toggleBtn && summaryPanel) {
    toggleBtn.addEventListener("click", () => {
      const open = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!open));
      summaryPanel.classList.toggle("open", !open);
    });
  }

  function syncAddressField() {
    const val = form.querySelector("[name=fulfillment]:checked")?.value;
    const addressField = form.querySelector(".co-address-field");
    const addressInput = form.querySelector("#co-address");
    const show = val === "delivery" || val === "shipping";
    addressField.classList.toggle("co-address-hidden", !show);
    addressInput.required = show;
  }

  form.querySelectorAll("[name=fulfillment]").forEach(r => r.addEventListener("change", syncAddressField));
  syncAddressField();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    submitBtn.disabled = true;

    const data = Object.fromEntries(new FormData(form));
    const { items, subtotal } = cartSummary();

    const itemLines = items.map(i =>
      `${i.name} (${i.size}) × ${i.qty} — $${(i.qty * i.price).toFixed(2)}`
    ).join("\n");

    const orderMessage = [
      "ORDER DETAILS",
      "─────────────",
      itemLines,
      "",
      `Subtotal: $${subtotal.toFixed(2)}`,
      "",
      `Fulfillment: ${data.fulfillment}`,
      data.address ? `Address: ${data.address}` : null,
      data.notes ? `Notes: ${data.notes}` : null,
    ].filter(Boolean).join("\n");

    try {
      await fetch("https://formsubmit.co/ajax/mumuspikliz@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: `${data.first_name} ${data.last_name}`,
          email: data.email,
          phone: data.phone || "",
          message: orderMessage,
          _subject: `New Order — ${data.first_name} ${data.last_name} · ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
        }),
      });
      localStorage.removeItem("mumus_cart_v1");
      window.dispatchEvent(new CustomEvent("cart-update"));
      window.location.href = "order-success.html";
    } catch {
      submitBtn.disabled = false;
      alert("Something went wrong. Please reach us at hello@mumuspikliz.com or call 857-342-2433.");
    }
  });
}
