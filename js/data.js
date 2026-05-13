// Product catalog, copy blocks, palettes, and SVG illustrations.

const PRODUCTS = [
  {
    id: "pikliz",
    name: "Pikliz",
    tagline: "The OG. Spicy slaw with attitude.",
    desc: "A Haitian spicy slaw made with cabbage, mixed veggies, hot peppers & salt all submerged in vinegar.",
    image: "assets/pikliz01.jpg",
    images: ["assets/pikliz01.jpg", "assets/pikliz02.jpg", "assets/pikliz03.jpg", "assets/pikliz04.jpg"],
    heat: 4,
    badge: "Bestseller",
    tags: ["Topping", "Small batch", "No preservatives", "Haitian recipe"],
    sizes: [
      { label: "24 oz", price: 10 },
      { label: "32 oz", price: 15 },
      { label: "64 oz", price: 25 },
    ],
    ingredients: "Cabbage, mixed vegetables, hot peppers, salt & vinegar.",
  },
  {
    id: "corn",
    name: "Spicy Sweet Corn",
    tagline: "Sweet now, slow burn after.",
    desc: "A customer inspired spicy topping made with sweet corn, hot peppers, & salt submerged in vinegar. A more mild alternative than Pikliz.",
    image: "assets/corn01.jpg",
    images: ["assets/corn01.jpg", "assets/corn.jpg", "assets/corn02.jpg", "assets/corn03.jpg"],
    heat: 2,
    badge: "Customer pick",
    tags: ["Topping", "Small batch", "No preservatives", "Mild heat"],
    sizes: [
      { label: "24 oz", price: 12 },
      { label: "32 oz", price: 18 },
      { label: "64 oz", price: 30 },
    ],
    ingredients: "Sweet corn, hot peppers, salt & vinegar.",
  },
  {
    id: "epis",
    name: "Epis",
    tagline: "The marinade that does the heavy lifting.",
    desc: "The perfect Haitian marinade made with scallions, parsley, green & red peppers, garlic, hot pepper, onion, olive oil, spices & herbs.",
    image: "assets/epis01.jpg",
    images: ["assets/epis01.jpg", "assets/epis.02.jpg", "assets/epis03.jpg", "assets/epis04.jpg"],
    heat: 3,
    badge: "Kitchen staple",
    tags: ["Marinade", "Small batch", "No preservatives", "Haitian recipe"],
    sizes: [
      { label: "24 oz", price: 20 },
      { label: "32 oz", price: 30 },
      { label: "64 oz", price: 55 },
    ],
    ingredients: "Scallions, parsley, peppers, garlic, onion, olive oil, spices & herbs.",
  },
  {
    id: "apron",
    name: "Aprons",
    tagline: "Wear the brand. Earn the splatters.",
    desc: "Heavyweight cotton apron with reinforced pocket and Mumu's Pikliz patch. Available in Blue or Red.",
    image: "assets/apron01.jpg",
    images: ["assets/apron01.jpg", "assets/apron02.jpg", "assets/apron03.jpg", "assets/apron04.jpg"],
    heat: 0,
    badge: "Merch",
    tags: [],
    sizes: [
      { label: "Blue", price: 20 },
      { label: "Red", price: 20 },
    ],
    ingredients: "100% heavyweight cotton. Adjustable neck strap, waist ties, large front pocket.",
  },
  /* {
    id: "apron-jar",
    name: "Aprons in Jar",
    tagline: "Gift-ready, jar-packaged.",
    desc: "Our Mumu's apron folded into a signature jar. The same cotton apron you love, ready to gift.",
    heat: 0,
    badge: "Gift-ready",
    sizes: [
      { label: "Blue", price: 25 },
      { label: "Red", price: 25 },
    ],
    ingredients: "100% heavyweight cotton apron. Packaged in a 32oz glass jar.",
  }, */
];

const HEAT_LABELS = ["very mild", "mild", "medium", "spicy", "scotch bonnet"];

const RECIPES = [
  {
    n: "01",
    title: "Mumu-Topped Griot",
    body: "Jackfruit Gyro, fried plantains and Mumu's Pikliz!",
    tag: "weekend dinner",
    reelUrl: "https://www.instagram.com/p/C3tIUv9vwbo/",
  },
  {
    n: "02",
    title: "Epis Marinated Chicken",
    body: "Rub Epis under the skin the night before. Roast. That's it. The herbs do everything you'd otherwise spend two hours on.",
    tag: "set & forget",
    reelUrl: "https://www.instagram.com/reel/Cm_1UVNj2RO/",
  },
  {
    n: "03",
    title: "Loaded Tater Tots",
    body: "Loaded tater tots! Top your tots with cheese, turkey sausage, bacon bits, hummus, guacamole, and of course garnished with Mumu's Pikliz 😌 thank us later!",
    tag: "20 min weeknight",
    reelUrl: "https://www.instagram.com/p/Ck6FEptOeA3/",
  },
];

const PRESS = [
  {
    quote: "I now keep a jar of Mumu's in the door of my fridge at all times. It is on every sandwich I make.",
    name: "Janelle T.",
    where: "Boston, MA",
    avatar: "J",
    color: "tomato",
  },
  {
    quote: "Bought one jar at the Brighton market. Came back the next Sunday for three. Bring it back.",
    name: "Marcus O.",
    where: "Brighton, MA",
    avatar: "M",
    color: "mango",
  },
  {
    quote: "The Epis changed how I cook chicken. Genuinely. I will not shut up about this product.",
    name: "Renee P.",
    where: "Roslindale, MA",
    avatar: "R",
    color: "palm",
  },
];

const LOCATIONS = [
  {
    tag: "Popportunity",
    name: "Starlight Square",
    addr: "84 Bishop Allen Drive\nCentral Square, Cambridge MA",
    schedule: [
      { day: "Sat", time: "11a — 4p" },
      { day: "Sun", time: "12p — 4p" },
    ],
  },
  {
    tag: "Summer Market",
    name: "Brighton",
    addr: "30 Chestnut Hill Ave\nBrighton, MA 02135",
    schedule: [{ day: "Sun", time: "10a — 2p" }],
  },
  {
    tag: "Summer Market",
    name: "Roslindale",
    addr: "4236 Washington St\nRoslindale, MA 02131",
    schedule: [{ day: "Sat", time: "9a — 1:30p" }],
  },
];

// Palette = accent colors only. Page background / paper / ink stay fixed across
// drapo/klere/karayib (white background palettes); lannwit overrides them for
// the dark variant.
const PALETTE_DEFAULTS = {
  cream: "#ffffff", cream2: "#f4f4f4", paper: "#f9f9f9",
  ink: "#0e0e14", ink2: "#5a5a62",
  hair: "rgba(14,14,20,0.10)", hairDark: "rgba(14,14,20,0.18)",
  altBg: "#f9f9f9", altInk: "#0e0e14", altHair: "rgba(14,14,20,0.10)",
};

const HEAT_PALETTES = {
  drapo:   { tomato: "#c8112a", mango: "#d4a32c", palm: "#0a2a6c" },
  klere:   { tomato: "#e8421e", mango: "#f5b82a", palm: "#0e6e3e" },
  karayib: { tomato: "#e04860", mango: "#e6a042", palm: "#0a8a8a" },
  lannwit: {
    tomato: "#ff7a98", mango: "#f5cf58", palm: "#6db4ef",
    cream: "#1a3055", cream2: "#23396a", paper: "#1f3460",
    ink: "#f0f4fa", ink2: "#b8c8e0",
    hair: "rgba(240,244,250,0.12)", hairDark: "rgba(240,244,250,0.22)",
    altBg: "#4a1525", altInk: "#f7e0e5", altHair: "rgba(247,224,229,0.14)",
  },
};

function applyPalette(name) {
  const p = HEAT_PALETTES[name] || HEAT_PALETTES.drapo;
  const merged = { ...PALETTE_DEFAULTS, ...p };
  const root = document.documentElement;
  root.style.setProperty("--cream", merged.cream);
  root.style.setProperty("--cream-2", merged.cream2);
  root.style.setProperty("--paper", merged.paper);
  root.style.setProperty("--ink", merged.ink);
  root.style.setProperty("--ink-2", merged.ink2);
  root.style.setProperty("--tomato", merged.tomato);
  root.style.setProperty("--mango", merged.mango);
  root.style.setProperty("--palm", merged.palm);
  root.style.setProperty("--hair", merged.hair);
  root.style.setProperty("--hair-dark", merged.hairDark);
  root.style.setProperty("--alt-bg", merged.altBg);
  root.style.setProperty("--alt-ink", merged.altInk);
  root.style.setProperty("--alt-hair", merged.altHair);
}

const ILLUST_FRAME_OPEN =
  '<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="width:70%;height:auto;display:block">' +
  '<ellipse cx="100" cy="266" rx="58" ry="3" stroke-width="0.6" opacity="0.35"/>';
const ILLUST_FRAME_CLOSE = "</svg>";

function jarBodySvg(accentLabel, accentText) {
  return `
    <path d="M 60 38 L 60 28 Q 60 24 64 24 L 136 24 Q 140 24 140 28 L 140 38" />
    <path d="M 56 38 L 144 38 L 144 50 L 56 50 Z" />
    <line x1="58" y1="44" x2="142" y2="44" stroke-width="0.5" opacity="0.6"/>
    <path d="M 50 50 Q 48 50 48 54 L 48 250 Q 48 258 56 258 L 144 258 Q 152 258 152 250 L 152 54 Q 152 50 150 50 Z" />
    <path d="M 60 88 Q 60 86 62 86 L 138 86 Q 140 86 140 88 L 140 188 Q 140 190 138 190 L 62 190 Q 60 190 60 188 Z" stroke-width="0.7" opacity="0.55"/>
    <g stroke="none" fill="currentColor">
      <text x="100" y="118" text-anchor="middle" font-family="'Allura', cursive" font-size="26">Mumu's</text>
      <text x="100" y="148" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="20" letter-spacing="1.5">${accentLabel}</text>
    </g>
    <line x1="76" y1="160" x2="124" y2="160" stroke-width="0.5" opacity="0.6"/>
    <text x="100" y="174" text-anchor="middle" font-family="serif" font-size="6" letter-spacing="1.4" stroke="none" fill="currentColor" opacity="0.7">${accentText}</text>`;
}

function buildPiklizSvg() {
  let bits = "";
  const piklizPaths = [
    "M 64 64 q 5 -3 10 0", "M 80 68 q 6 -4 12 0",
    "M 116 70 q 6 -3 12 0",
    "M 56 78 q 5 -2 9 0", "M 70 80 q 5 -2 9 0", "M 88 78 q 6 -3 12 0",
    "M 110 80 q 5 -2 9 0", "M 128 78 q 5 -2 9 0",
    "M 56 202 q 6 -3 12 0", "M 74 204 q 6 -3 12 0",
    "M 112 206 q 6 -3 12 0", "M 130 204 q 6 -3 12 0",
    "M 60 220 q 6 -3 12 0", "M 80 218 q 6 -3 12 0",
    "M 100 222 q 8 -3 14 0", "M 120 220 q 6 -3 12 0",
    "M 56 236 q 8 -3 14 0", "M 78 240 q 6 -3 12 0",
    "M 100 236 q 8 -3 14 0", "M 124 238 q 8 -3 14 0",
  ];
  piklizPaths.forEach(d => { bits += `<path d="${d}" />`; });
  bits += `<circle cx="104" cy="66" r="1.5" /><circle cx="100" cy="202" r="1.5" />`;
  return ILLUST_FRAME_OPEN + jarBodySvg("Pikliz", "HAITIAN · SMALL BATCH") +
    `<g stroke-width="0.9" opacity="0.75">${bits}</g>` + ILLUST_FRAME_CLOSE;
}

function buildCornSvg() {
  let bits = "";
  for (let row = 0; row < 4; row++) {
    [68, 80, 92, 104, 116, 128, 140].forEach(x => {
      bits += `<circle cx="${x}" cy="${64 + row * 4 + row * 6}" r="1.6" />`;
    });
  }
  for (let row = 0; row < 5; row++) {
    [60, 72, 84, 96, 108, 120, 132, 144].forEach(x => {
      bits += `<circle cx="${x}" cy="${200 + row * 4 + row * 6}" r="1.5" />`;
    });
  }
  return ILLUST_FRAME_OPEN + jarBodySvg("Corn", "SPICY · SWEET · SMALL BATCH") +
    `<g stroke-width="0.6" opacity="0.75">${bits}</g>` + ILLUST_FRAME_CLOSE;
}

function buildEpisSvg() {
  const leaves = [
    "M 60 62 q 4 -6 10 -4 q 0 6 -10 4 z",
    "M 78 70 q 5 -7 12 -4 q 0 7 -12 4 z",
    "M 100 64 q 4 -6 10 -4 q 0 6 -10 4 z",
    "M 118 70 q 5 -7 12 -4 q 0 7 -12 4 z",
    "M 134 64 q 4 -6 10 -4 q 0 6 -10 4 z",
    "M 56 80 q 4 -2 8 -2", "M 80 84 q 4 -2 8 -2",
    "M 108 80 q 4 -2 8 -2", "M 132 84 q 4 -2 8 -2",
    "M 60 202 q 4 -6 10 -4 q 0 6 -10 4 z",
    "M 80 208 q 5 -7 12 -4 q 0 7 -12 4 z",
    "M 102 204 q 4 -6 10 -4 q 0 6 -10 4 z",
    "M 122 210 q 5 -7 12 -4 q 0 7 -12 4 z",
    "M 64 222 q 4 -2 8 -2", "M 88 224 q 4 -2 8 -2",
    "M 112 222 q 4 -2 8 -2", "M 136 224 q 4 -2 8 -2",
    "M 70 240 q 5 -7 12 -4 q 0 7 -12 4 z",
    "M 100 244 q 5 -7 12 -4 q 0 7 -12 4 z",
    "M 128 240 q 4 -6 10 -4 q 0 6 -10 4 z",
  ];
  const bits = leaves.map(d => `<path d="${d}" />`).join("");
  return ILLUST_FRAME_OPEN + jarBodySvg("Epis", "GREEN · HERBAL · SMALL BATCH") +
    `<g stroke-width="0.9" opacity="0.78">${bits}</g>` + ILLUST_FRAME_CLOSE;
}

function buildApronSvg() {
  return ILLUST_FRAME_OPEN + `
    <path d="M 80 32 Q 80 24 88 24 L 112 24 Q 120 24 120 32 L 120 50" />
    <line x1="80" y1="42" x2="120" y2="42" stroke-width="0.7" opacity="0.5"/>
    <path d="M 70 50 L 130 50 L 144 100 L 152 246 Q 152 256 142 256 L 58 256 Q 48 256 48 246 L 56 100 Z" />
    <path d="M 56 100 L 32 130 L 36 138 L 60 110" />
    <path d="M 144 100 L 168 130 L 164 138 L 140 110" />
    <rect x="74" y="148" width="52" height="38" rx="2" stroke-width="0.9"/>
    <rect x="84" y="196" width="32" height="32" rx="2" stroke-width="0.8"/>
    <g stroke="none" fill="currentColor">
      <text x="100" y="210" text-anchor="middle" font-family="'Allura', cursive" font-size="11">Mumu's</text>
      <text x="100" y="222" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="9">Pikliz</text>
    </g>` + ILLUST_FRAME_CLOSE;
}

const PRODUCT_ILLUSTRATIONS = {
  pikliz: buildPiklizSvg,
  corn: buildCornSvg,
  epis: buildEpisSvg,
  apron: buildApronSvg,
  "apron-jar": buildApronSvg,
};

function productIllustrationSvg(productId) {
  const fn = PRODUCT_ILLUSTRATIONS[productId] || buildPiklizSvg;
  return fn();
}

function heatScaleHtml(level, dark = false) {
  let html = '<span style="display:inline-flex;gap:3px">';
  for (let n = 1; n <= 5; n++) {
    const filled = n <= level;
    const bg = filled ? "var(--tomato)" : "transparent";
    const border = filled
      ? "var(--tomato)"
      : (dark ? "rgba(255,255,255,0.3)" : "var(--hair-dark)");
    html += `<span style="width:6px;height:6px;border-radius:50%;background:${bg};border:1px solid ${border}"></span>`;
  }
  return html + "</span>";
}
