// Landing-page sections. Each function returns an HTML string; the entry
// point assembles them and replaces the placeholder root.

function heroCoverHtml() {
  const slides = [
    { type: "img",   src: "assets/slide-01.jpg" },
    { type: "video", src: "assets/slide-02.mp4" },
    { type: "video", src: "assets/slide-03.mp4" },
    { type: "video", src: "assets/slide-04.mp4" },
    { type: "video", src: "assets/slide-05.mp4" },
    { type: "video", src: "assets/slide-06.mp4" },
    { type: "video", src: "assets/slide-07.mp4" },
  ];
  const slidesHtml = slides.map((s, i) => {
    const media = s.type === "video"
      ? `<video autoplay muted loop playsinline><source src="${s.src}" type="video/mp4"/></video>`
      : `<img src="${s.src}" alt="" />`;
    return `<div class="hero-slide${i === 0 ? " active" : ""}">${media}</div>`;
  }).join("");

  return `
    <div class="hero-cover-wrap">
    <section class="hero-cover">
      <div class="hero-carousel">${slidesHtml}</div>
      <div class="hero-cover-inner">
        <div class="hero-old-logo">
          <img src="assets/newlogo.png" alt="Mumu's Pikliz" class="hero-logo-mark" />
          <img src="assets/logox.png" alt="" class="hero-logo-text" />
        </div>
        <div class="hero-cover-buttons">
          <a href="menu.html" class="btn-cover btn-red">Menu</a>
          <a href="about.html" class="btn-cover btn-blue">About</a>
        </div>
      </div>
      <div class="scroll-hint">Scroll</div>
    </section>
    </div>`;
}

function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length < 2) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
    const vid = slides[current].querySelector("video");
    if (vid) { vid.currentTime = 0; vid.play().catch(() => {}); }
  }, 5000);
}

function storyHtml() {
  return `
    <section class="story section-flag-blue" id="story">
      <div class="container">
        <div class="story-grid">
          <div class="story-photo">
            <img src="assets/profile.jpg" alt="Samantha Benoit, founder" style="width:100%;height:100%;object-fit:cover;display:block" />
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

function brandIntroHtml() {
  return `
    <section class="brand-intro">
      <div class="container">
        <div class="brand-intro-grid">
          <div class="brand-intro-photo">
            <img src="assets/about-01.jpg" alt="Dish garnished with Mumu's Pikliz" />
          </div>
          <div class="brand-intro-text">
            <span class="section-eyebrow">— What we are</span>
            <h2>A food product that will<br/><span class="gold-script">enhance your dishes.</span></h2>
            <p>Mumu's Pikliz blends fresh vegetables, spices and herbs to create the perfect addition to your family traditions!</p>
            <a href="about.html" class="btn btn-primary" style="margin-top:8px">Our story →</a>
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
    <a class="product-card${variantClass}" href="product.html?id=${product.id}">
      <div class="product-photo">
        ${heatPill}
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${product.imagePosition||'center'};transform:scale(${product.imageScale||1});display:block;z-index:2;pointer-events:none" />`
          : `<div class="product-illust">${productIllustrationSvg(product.id)}</div><image-slot id="product-${product.id}" shape="rect" placeholder="" style="width:100%;height:100%;display:block"></image-slot>`}
      </div>
      <div class="product-name">${product.name}</div>
      <p class="product-desc">${product.desc}</p>
      <div class="product-price-row">
        <div class="product-price"><span class="from">From</span>$${startPrice}</div>
        <span class="shop-link">Shop →</span>
      </div>
    </a>`;
}

function productsSectionHtml() {
  const jars = PRODUCTS.filter(p => p.heat > 0);
  const cards = jars.map(p => `
    <a class="jar-card" href="product.html?id=${p.id}">
      <div class="jar-card-photo">
        ${p.heat > 0 ? `<div class="heat-pill">${heatScaleHtml(p.heat)}<span>${HEAT_LABELS[p.heat - 1]}</span></div>` : ""}
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${p.imagePosition||'center'};transform:scale(${p.imageScale||1});display:block;z-index:2;pointer-events:none" />`
          : `<div class="product-illust">${productIllustrationSvg(p.id)}</div><image-slot id="product-${p.id}" shape="rect" placeholder="" style="width:100%;height:100%;display:block"></image-slot>`}
      </div>
      <div class="jar-card-body">
        <div class="jar-card-name">${p.name}</div>
        <div class="jar-card-tag">${p.tagline}</div>
      </div>
    </a>`).join("");

  return `
    <section id="menu" class="section-flag-red menu-section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-eyebrow">— The Menu</span>
            <h2>Save time.<br/><span class="gold-script">Buy Mumu's.</span></h2>
          </div>
          <p class="lede">
            Something so simple, such a big difference.
            Browse the <a href="menu.html" style="text-decoration:underline">full menu</a>.
          </p>
        </div>
        <div class="jar-cards">${cards}</div>
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
      <div class="recipe-photo${r.reelUrl ? " has-embed" : ""}">
        ${r.reelUrl
          ? `<blockquote class="instagram-media" data-instgrm-permalink="${r.reelUrl}" data-instgrm-version="14" style="margin:0;max-width:100%;min-width:0;width:100%;border:0"></blockquote>`
          : `<image-slot id="recipe-${i}" shape="rect" placeholder="Drop ${r.title} photo" style="width:100%;height:100%;display:block"></image-slot>`}
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
            Three ways to use Mumu's — from weeknight dinners to weekend spreads.
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
        <div class="loc-actions">
          ${l.infoUrl ? `<a class="btn btn-ghost loc-btn" href="${l.infoUrl}" target="_blank" rel="noopener">Info</a>` : ""}
          <a class="btn btn-ghost loc-btn" href="${l.mapsUrl}" target="_blank" rel="noopener">Directions →</a>
        </div>
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
                <li><span class="k">Instagram</span><a href="https://www.instagram.com/mumus_pikliz" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-2px;margin-right:5px"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>@mumus_pikliz</a></li>
                <li><span class="k">Hours</span><span>Sat &amp; Sun, 10a — 4p ET</span></li>
              </ul>
            </div>
            <form class="contact-form" data-contact-form>
              <label class="cf-row">
                <span class="cf-label">Name</span>
                <input class="cf-input" name="name" type="text" placeholder="Your name" required />
              </label>
              <label class="cf-row">
                <span class="cf-label">Email</span>
                <input class="cf-input" name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label class="cf-row">
                <span class="cf-label">Phone</span>
                <input class="cf-input" name="phone" type="tel" placeholder="(555) 555-5555" />
              </label>
              <label class="cf-row">
                <span class="cf-label">What you need</span>
                <textarea class="cf-input cf-textarea" name="message" rows="4"
                  placeholder="Which products, sizes, delivery option, anything else…" required></textarea>
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
            <div class="footer-logo">
              <img src="assets/logox.png" alt="Mumu's Pikliz" />
            </div>
            <p>Fresh Haitian condiments made in Boston.
              Delivery covers the South Shore and Boston area; shipping reaches anywhere in the U.S.</p>
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
              <a href="about.html">About</a>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div class="footer-links">
              <a href="tel:+18573422433">857-342-2433</a>
              <a href="mailto:hello@mumuspikliz.com">hello@mumuspikliz.com</a>
              <a href="https://www.instagram.com/mumus_pikliz" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-2px;margin-right:5px"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>@mumus_pikliz</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Mumu's Pikliz · All rights reserved</span>
          <span>Made in Boston · Roots in Haiti</span>
          <span>Painted with pixels, wired with logic · By <a href="https://gerlinpl.com/" target="_blank" rel="noopener">Gerlinpl</a></span>
        </div>
      </div>
    </footer>`;
}

function bindContactForm() {
  document.addEventListener("submit", async (e) => {
    if (!e.target.matches("[data-contact-form]")) return;
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("[type=submit]");
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";
    try {
      const data = Object.fromEntries(new FormData(form));
      await fetch("https://formsubmit.co/ajax/mumuspikliz@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...data, _subject: `New Message — ${data.name} · ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` }),
      });
      form.reset();
      btn.textContent = "Sent ✓";
      setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 4000);
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
      alert("Something went wrong. Please reach us at hello@mumuspikliz.com or call 857-342-2433.");
    }
  });
}
