// Menu page — full lineup with size pickers, qty steppers, and direct-order form.
// Each item carries its own (size index, qty) state via data- attributes,
// updated in place when the user clicks size/qty buttons.

function menuHeroHtml() {
  return `
    <section class="menu-hero">
      <div class="container">
        <span class="section-eyebrow">— The Menu</span>
        <h1 class="menu-h1">
          <i>Five jars,</i><br/>
          <span class="gold-script-big">one family recipe.</span>
        </h1>
        <p class="menu-lede">
          Small-batch, made to order, jarred in Boston. Click any item to read more, choose a
          size, and add to your basket — or order direct via the form below.
        </p>
      </div>
    </section>`;
}

function menuItemHtml(product, index) {
  const flipped = index % 2 === 1 ? " flipped" : "";
  const heatMeta = product.heat > 0
    ? `<div class="menu-item-heat">${heatScaleHtml(product.heat)}<span>${HEAT_LABELS[product.heat - 1]}</span></div>`
    : "";
  const sizes = product.sizes.map((s, i) => `
    <button class="menu-size${i === 0 ? " active" : ""}" data-size-ix="${i}" data-price="${s.price}">
      <span class="ms-dots"></span>
      <span class="ms-label">${s.label}</span>
      <span class="ms-price">$${s.price}.00</span>
    </button>`).join("");

  const firstPrice = product.sizes[0].price;

  return `
    <article class="menu-item${flipped}" id="${product.id}" data-product-id="${product.id}" data-qty="1" data-size-ix="0">
      <div class="menu-item-photo">
        <div class="product-illust">${productIllustrationSvg(product.id)}</div>
        <image-slot id="product-${product.id}" shape="rect" placeholder=""
          style="width:100%;height:100%;display:block"></image-slot>
      </div>

      <div class="menu-item-info">
        <div class="menu-item-head">
          <h2 class="menu-item-name">${product.name}</h2>
          ${heatMeta}
        </div>

        <p class="menu-item-desc">${product.desc}</p>

        <div class="menu-item-prices">${sizes}</div>

        <div class="menu-item-actions">
          <div class="qty-stepper">
            <button type="button" data-qty-delta="-1" aria-label="Decrease quantity">−</button>
            <span class="val" data-qty-val>1</span>
            <button type="button" data-qty-delta="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn-primary" data-add-to-cart>
            Add — $<span data-line-total>${firstPrice}</span>
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-ghost">Details →</a>
        </div>
      </div>
    </article>`;
}

function menuListHtml() {
  return `
    <section class="menu-list-section">
      <div class="container">
        <div class="menu-list">
          ${PRODUCTS.map((p, i) => menuItemHtml(p, i)).join("")}
        </div>
      </div>
    </section>`;
}

function menuOrderFormHtml() {
  return `
    <section class="menu-order" id="order">
      <div class="container">
        <div class="contact-grid">
          <div>
            <span class="section-eyebrow">— Order direct</span>
            <h2 style="font-size:clamp(34px,4vw,56px);margin:20px 0 16px">
              Or <span class="gold-script">talk</span> to us.
            </h2>
            <p class="lede" style="justify-self:start;margin-bottom:32px">
              Currently accepting orders via phone, email, and Social Media DMs. Fill out the form
              and we'll reach out to complete the order — delivery, shipping, or pickup.
            </p>
            <ul class="contact-list">
              <li><span class="k">Phone</span><a href="tel:+18573422433">857-342-2433</a></li>
              <li><span class="k">Email</span><a href="mailto:hello@mumuspikliz.com">hello@mumuspikliz.com</a></li>
              <li><span class="k">Instagram</span><a href="#">@mumuspikliz</a></li>
              <li><span class="k">Hours</span><span>Sat &amp; Sun, 10a — 4p ET</span></li>
            </ul>
          </div>
          <form class="contact-form" data-contact-form>
            <label class="cf-row">
              <span class="cf-label">Name</span>
              <input class="cf-input" type="text" placeholder="Your name" required />
            </label>
            <label class="cf-row">
              <span class="cf-label">Email</span>
              <input class="cf-input" type="email" placeholder="you@example.com" required />
            </label>
            <label class="cf-row">
              <span class="cf-label">Phone</span>
              <input class="cf-input" type="tel" placeholder="(555) 555-5555" />
            </label>
            <label class="cf-row">
              <span class="cf-label">What you need</span>
              <textarea class="cf-input cf-textarea" rows="4"
                placeholder="Which jars, sizes, delivery option, anything else…" required></textarea>
            </label>
            <button type="submit" class="btn btn-primary">Send →</button>
          </form>
        </div>
      </div>
    </section>`;
}

function bindMenuInteractions() {
  function updateLineTotal(article) {
    const sizeIx = parseInt(article.dataset.sizeIx, 10);
    const qty = parseInt(article.dataset.qty, 10);
    const product = PRODUCTS.find(p => p.id === article.dataset.productId);
    const price = product.sizes[sizeIx].price;
    article.querySelector("[data-line-total]").textContent = (price * qty).toFixed(0);
  }

  document.addEventListener("click", (e) => {
    const sizeBtn = e.target.closest(".menu-size");
    if (sizeBtn) {
      const article = sizeBtn.closest(".menu-item");
      article.querySelectorAll(".menu-size").forEach(b => b.classList.remove("active"));
      sizeBtn.classList.add("active");
      article.dataset.sizeIx = sizeBtn.dataset.sizeIx;
      updateLineTotal(article);
      return;
    }

    const qtyBtn = e.target.closest("[data-qty-delta]");
    if (qtyBtn) {
      const article = qtyBtn.closest(".menu-item");
      if (!article) return;
      const delta = parseInt(qtyBtn.dataset.qtyDelta, 10);
      const next = Math.max(1, parseInt(article.dataset.qty, 10) + delta);
      article.dataset.qty = next;
      article.querySelector("[data-qty-val]").textContent = next;
      updateLineTotal(article);
      return;
    }

    const addBtn = e.target.closest("[data-add-to-cart]");
    if (addBtn) {
      const article = addBtn.closest(".menu-item");
      const product = PRODUCTS.find(p => p.id === article.dataset.productId);
      const size = product.sizes[parseInt(article.dataset.sizeIx, 10)];
      const qty = parseInt(article.dataset.qty, 10);
      addToCart(product, size, qty);
    }
  });
}
