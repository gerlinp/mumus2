// Landing-page sections. Each function returns an HTML string; the entry
// point assembles them and replaces the placeholder root.

function heroCoverHtml() {
  return `
    <section class="hero-cover">
      <div class="hero-cover-photo">
        <image-slot id="hero-photo" shape="rect"
          placeholder="Drop hero photo (jars on counter)"
          style="width:100%;height:100%;display:block"></image-slot>
      </div>
      <div class="hero-cover-inner">
        <div class="hero-emblem-wrap">
          <img src="assets/logo.png" alt="Mumu's Pikliz" class="hero-emblem-img" />
        </div>
        <h1 class="hero-title">Mumu's Pikliz</h1>
        <div class="hero-tag"><span class="gold-script-tag">Cooking</span> Essentials</div>
        <div class="hero-cover-buttons">
          <a href="menu.html" class="btn-cover btn-red">Menu</a>
          <a href="#story" class="btn-cover btn-blue">About</a>
        </div>
      </div>
      <div class="scroll-hint">Scroll</div>
    </section>`;
}

function storyHtml() {
  return `
    <section class="story section-flag-blue" id="story">
      <div class="container">
        <div class="story-grid">
          <div class="story-photo">
            <image-slot id="founder-photo" shape="rect"
              placeholder="Drop founder photo"
              style="width:100%;height:100%;display:block"></image-slot>
          </div>
          <div>
            <div class="story-eyebrow">— Our Story</div>
            <h2>Manman called her<br/><span class="gold-script">"Mumu."</span><br/>The jar kept the name.</h2>
            <p>
              Mumu's Pikliz was founded by Samantha Benoit — Haitian-American educator, home cook,
              and recipe-tinkerer. Her mother taught her to cook traditional Haitian meals with
              specific spices and herbs, and is also the only person who calls Samantha
              <i>Mumu</i> (pronounced <i>mōō-mōō</i>).
            </p>
            <p>
              What started on Instagram, expanded to Facebook, and now has its own independent
              storefront. Delivery covers the South Shore and Boston area; shipping reaches anywhere
              in the United States.
            </p>
            <div class="pullquote">
              <div class="q">"My goal is not to change the way you cook, but to enhance it."</div>
              <div class="a">— Samantha Benoit, founder</div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function productCardHtml(product, variant = "default") {
  const startPrice = Math.min(...product.sizes.map(s => s.price));
  const variantClass = variant === "editorial" ? " editorial" : variant === "bold" ? " bold" : "";
  const heatPill = product.heat > 0
    ? `<div class="heat-pill">${heatScaleHtml(product.heat)}<span>${HEAT_LABELS[product.heat - 1]}</span></div>`
    : "";
  return `
    <article class="product-card${variantClass}">
      <div class="product-photo">
        ${heatPill}
        <div class="product-illust">${productIllustrationSvg(product.id)}</div>
        <image-slot id="product-${product.id}" shape="rect" placeholder=""
          style="width:100%;height:100%;display:block"></image-slot>
      </div>
      <div class="product-name">${product.name}</div>
      <p class="product-desc">${product.desc}</p>
      <div class="product-price-row">
        <div class="product-price"><span class="from">From</span>$${startPrice}</div>
        <a href="product.html?id=${product.id}" class="shop-link">Shop →</a>
      </div>
    </article>`;
}

function productsSectionHtml() {
  return `
    <section id="menu" class="section-flag-red menu-section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-eyebrow">— The Menu</span>
            <h2>Five jars,<br/><span class="gold-script">one family recipe.</span></h2>
          </div>
          <p class="lede">
            Three jars from the family recipe book — plus two aprons to wear while you cook.
            Everything is <i>made to order</i>, never sitting on a shelf.
            Browse the <a href="menu.html" style="text-decoration:underline">full menu</a>.
          </p>
        </div>
        <div class="products">
          ${PRODUCTS.map(p => productCardHtml(p)).join("")}
        </div>
        <div style="text-align:center;margin-top:64px">
          <a href="menu.html" class="btn btn-primary">See the full menu →</a>
        </div>
      </div>
    </section>`;
}

function recipesSectionHtml() {
  const cards = RECIPES.map((r, i) => `
    <div class="recipe-card">
      <div class="recipe-num">${r.n} / 03</div>
      <div class="recipe-photo">
        <image-slot id="recipe-${i}" shape="rect"
          placeholder="Drop ${r.title} photo"
          style="width:100%;height:100%;display:block"></image-slot>
      </div>
      <h3>${r.title}</h3>
      <p>${r.body}</p>
      <span class="recipe-tag">${r.tag}</span>
    </div>`).join("");

  return `
    <section class="recipes section-flag-blue" id="recipes">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-eyebrow">— How to use</span>
            <h2>Spoon it on<br/><span class="gold-script">everything.</span></h2>
          </div>
          <p class="lede">
            Three dinners that get the jar opened most weeks. Recipe-tested by Mumu, eaten by her
            family on Sundays.
          </p>
        </div>
        <div class="recipe-grid">${cards}</div>
      </div>
    </section>`;
}

function pressSectionHtml() {
  const cards = PRESS.map(p => `
    <div class="press-card">
      <div class="press-stars">★ ★ ★ ★ ★</div>
      <div class="press-quote">"${p.quote}"</div>
      <div class="press-attrib">
        <div class="press-avatar ${p.color}">${p.avatar}</div>
        <div>
          <div class="name">${p.name}</div>
          <div class="where">${p.where}</div>
        </div>
      </div>
    </div>`).join("");

  return `
    <section class="press section-flag-red" id="social">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-eyebrow">— Customers say</span>
            <h2>On every<br/><span class="gold-script">sandwich</span> now.</h2>
          </div>
          <p class="lede">
            Saturday market regulars. Sunday-dinner cooks. The customer who came back the next weekend
            for three. <i>Their words, not ours.</i>
          </p>
        </div>
        <div class="press-grid">${cards}</div>
      </div>
    </section>`;
}

function locationsSectionHtml() {
  const cards = LOCATIONS.map(l => `
    <div class="loc-card">
      <div class="loc-tag">${l.tag}</div>
      <div class="loc-name">${l.name}</div>
      <div class="loc-addr">${l.addr.replace(/\n/g, "<br/>")}</div>
      <div style="margin-top:auto">
        ${l.schedule.map(s => `
          <div class="loc-schedule">
            <span class="day">${s.day}</span>
            <span class="time">${s.time}</span>
          </div>`).join("")}
      </div>
    </div>`).join("");

  return `
    <section class="locations section-flag-blue" id="locations">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-eyebrow">— Find us</span>
            <h2>Retail &amp; pickup<br/><span class="gold-script">around Boston.</span></h2>
          </div>
          <p class="lede">
            Two summer markets and a Cambridge popup. Tap a card for the weekly schedule —
            or <i>DM @mumuspikliz</i> if you'd rather we hand-deliver on the South Shore.
          </p>
        </div>
        <div class="loc-grid">${cards}</div>

        <div class="contact-block" id="contact">
          <div class="contact-grid">
            <div>
              <span class="section-eyebrow">— Get in touch</span>
              <h2 style="font-size:clamp(34px,4vw,56px);margin:20px 0 16px">
                Order or <span class="gold-script">say hello.</span>
              </h2>
              <p class="lede" style="justify-self:start;margin-bottom:32px">
                Phone calls. Emails. <i>DMs that start with "how do I get a jar."</i>
                Tell us what you need and we'll sort delivery, shipping, or Saturday-market pickup.
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
      </div>
    </section>`;
}

function footerHtml() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">Mumu's Pikliz</div>
            <p>Haitian condiments, jarred in small batches by Samantha Benoit since 2019.
              Shipped from Boston, with love, all over the U.S.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <div class="footer-links">
              <a href="product.html?id=pikliz">Pikliz</a>
              <a href="product.html?id=corn">Spicy Sweet Corn</a>
              <a href="product.html?id=epis">Epis</a>
              <a href="product.html?id=apron">Aprons</a>
            </div>
          </div>
          <div>
            <h4>Visit</h4>
            <div class="footer-links">
              <a href="index.html#locations">Locations</a>
              <a href="index.html#recipes">Recipes</a>
              <a href="index.html#story">About</a>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div class="footer-links">
              <a href="tel:+18573422433">857-342-2433</a>
              <a href="mailto:hello@mumuspikliz.com">hello@mumuspikliz.com</a>
              <a href="#">@mumuspikliz</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Mumu's Pikliz · All rights reserved</span>
          <span>Made in Boston · Roots in Haiti</span>
        </div>
      </div>
    </footer>`;
}

function bindContactForm() {
  document.addEventListener("submit", (e) => {
    if (e.target.matches("[data-contact-form]")) {
      e.preventDefault();
      window.location.href = "order-success.html";
    }
  });
}
