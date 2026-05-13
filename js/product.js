// PDP: gallery (1 main + 4 thumbs), size picker, qty stepper, related grid.

function pdpHtml(product) {
  const sizes = product.sizes.map((s, i) => `
    <button class="size-opt${i === 0 ? " active" : ""}" data-size-ix="${i}" data-price="${s.price}">
      <div class="label">${s.label}</div>
      <div class="price">$${s.price}</div>
    </button>`).join("");

  const heatChip = product.heat > 0
    ? `<div class="pdp-crumb" style="margin-bottom:12px;color:var(--tomato)">
         ${heatScaleHtml(product.heat)}
         <span style="margin-left:8px">${HEAT_LABELS[product.heat - 1]}</span>
       </div>`
    : "";

  const imgs = product.images || (product.image ? [product.image] : []);
  const thumbs = [0, 1, 2, 3].map(i => `
    <div class="pdp-thumb${i === 0 ? " active" : ""}" data-thumb-ix="${i}">
      ${imgs[i]
        ? `<img src="${imgs[i]}" alt="${product.name} ${i+1}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${product.imagePosition||'center'};transform:scale(${product.imageScale||1});display:block;pointer-events:none" />`
        : `<div class="product-illust">${productIllustrationSvg(product.id)}</div><image-slot id="pdp-${product.id}-thumb-${i}" shape="rect" placeholder="" style="width:100%;height:100%;display:block"></image-slot>`}
    </div>`).join("");

  return `
    <section class="pdp" data-product-id="${product.id}" data-size-ix="0" data-qty="1" data-active-img="0">
      <div class="container">
        <div class="pdp-crumb">
          <a href="index.html">Mumu's</a> &nbsp;/&nbsp;
          <a href="menu.html">Menu</a> &nbsp;/&nbsp; ${product.name}
        </div>
        <div class="pdp-grid">
          <div>
            <div class="pdp-gallery">
              ${product.image
                ? `<img src="${product.image}" alt="${product.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${product.imagePosition||'center'};transform:scale(${product.imageScale||1});display:block;pointer-events:none" data-pdp-main />`
                : `<div class="product-illust">${productIllustrationSvg(product.id)}</div><image-slot id="pdp-${product.id}-0" shape="rect" placeholder="" style="width:100%;height:100%;display:block" data-pdp-main></image-slot>`}
            </div>
            <div class="pdp-thumbs">${thumbs}</div>
          </div>

          <div class="pdp-info">
            ${heatChip}
            <h1>${product.name}</h1>
            <p class="pdp-tagline">${product.tagline}</p>

            ${(product.tags || []).length ? `<div class="pdp-meta">${(product.tags).map(t => `<span class="meta-chip">${t}</span>`).join("")}</div>` : ""}

            <div class="size-picker">${sizes}</div>

            <div class="qty-and-add">
              <div class="qty-stepper">
                <button type="button" data-qty-delta="-1">−</button>
                <span class="val" data-qty-val>1</span>
                <button type="button" data-qty-delta="1">+</button>
              </div>
              <button class="btn btn-primary btn-block" data-add-to-cart>
                Add to basket · $<span data-line-total>${product.sizes[0].price}</span>
              </button>
            </div>

            <div class="pdp-details">
              ${product.ingredients ? `<div class="detail-row"><div class="k">Ingredients</div><div class="v">${product.ingredients}</div></div>` : ""}
              <div class="detail-row">
                <div class="k">Description</div>
                <div class="v">${product.desc}</div>
              </div>
              ${product.storage ? `<div class="detail-row"><div class="k">Storage</div><div class="v">${product.storage}</div></div>` : ""}
              <div class="detail-row">
                <div class="k">Shipping</div>
                <div class="v">Ships within 3–5 business days. Local Boston pickup available — DM @mumuspikliz.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function relatedHtml(currentId) {
  const others = PRODUCTS.filter(p => p.id !== currentId);
  return `
    <section class="related" style="background:var(--cream-2);border-top:1.5px solid var(--ink)">
      <div class="container">
        <h3 class="hand" style="font-size:48px;color:var(--tomato);margin-bottom:24px">
          You might also like —
        </h3>
        <div class="products">
          ${others.map(p => productCardHtml(p)).join("")}
        </div>
      </div>
    </section>`;
}

function bindPdpInteractions() {
  function updateLineTotal(section) {
    const sizeIx = parseInt(section.dataset.sizeIx, 10);
    const qty = parseInt(section.dataset.qty, 10);
    const product = PRODUCTS.find(p => p.id === section.dataset.productId);
    const price = product.sizes[sizeIx].price;
    section.querySelector("[data-line-total]").textContent = (price * qty).toFixed(0);
  }

  document.addEventListener("click", (e) => {
    const section = document.querySelector(".pdp");
    if (!section) return;

    const sizeBtn = e.target.closest(".size-opt");
    if (sizeBtn && section.contains(sizeBtn)) {
      section.querySelectorAll(".size-opt").forEach(b => b.classList.remove("active"));
      sizeBtn.classList.add("active");
      section.dataset.sizeIx = sizeBtn.dataset.sizeIx;
      updateLineTotal(section);
      return;
    }

    const qtyBtn = e.target.closest("[data-qty-delta]");
    if (qtyBtn && section.contains(qtyBtn)) {
      const delta = parseInt(qtyBtn.dataset.qtyDelta, 10);
      const next = Math.max(1, parseInt(section.dataset.qty, 10) + delta);
      section.dataset.qty = next;
      section.querySelector("[data-qty-val]").textContent = next;
      updateLineTotal(section);
      return;
    }

    const thumb = e.target.closest(".pdp-thumb");
    if (thumb && section.contains(thumb)) {
      section.querySelectorAll(".pdp-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      section.dataset.activeImg = thumb.dataset.thumbIx;
      const mainImg = section.querySelector("[data-pdp-main]");
      const thumbImg = thumb.querySelector("img");
      if (mainImg && mainImg.tagName === "IMG" && thumbImg) {
        mainImg.src = thumbImg.src;
      }
      return;
    }

    const addBtn = e.target.closest("[data-add-to-cart]");
    if (addBtn && section.contains(addBtn)) {
      const product = PRODUCTS.find(p => p.id === section.dataset.productId);
      const size = product.sizes[parseInt(section.dataset.sizeIx, 10)];
      const qty = parseInt(section.dataset.qty, 10);
      addToCart(product, size, qty);
    }
  });
}
