// =============================
// CONFIGURACIÓN DEL NEGOCIO
// =============================
// Escribe aquí el número de WhatsApp con indicativo de país.
// Colombia: 57 + número. Ejemplo: "573001234567"
const WHATSAPP_NUMBER = "573237127014";

const menu = [
  {
    category: "Perros calientes",
    items: [
      ["Sencillo", 7000, "Pan de mantequilla, salchicha, verduras, mozzarella y salsas"],
      ["Choriperro", 12000, "Pan de mantequilla, salchicha, chorizo, chimichurri, verduras, mozzarella y salsas"],
      ["Pollodog", 13000, "Pan de mantequilla, salchicha, pollo, verduras, mozzarella y salsas"],
      ["Gemelo", 10000, "Pan de mantequilla, doble salchicha, verduras, mozzarella y salsas"],
      ["Suizo", 15000, "Pan de mantequilla, salchicha suiza, verduras, mozzarella y salsas"],
      ["Italiano", 9000, "Pan de mantequilla, salchicha, jamón, verduras, mozzarella y salsas"],
      ["Medio Suizo", 12000, "Pan de mantequilla, media suiza, verduras, mozzarella y salsas"],
      ["Italo-Suizo", 17000, "Pan de mantequilla, suiza, jamón, verduras, mozzarella y salsas"]
    ]
  },
  {
    category: "Salchipapas",
    items: [
      ["Sencilla", 13000, "Papa, salchicha y salsas de la casa"],
      ["Salchipollo", 18000, "Papa, salchicha, pollo y salsas"],
      ["Salchicerdo", 18000, "Papa, salchicha, cerdo y salsas de la casa"],
      ["Choripapa", 18000, "Papa, salchicha, chorizo de cerdo y salsas"],
      ["Suiza", 17000, "Papa, salchicha, salchicha suiza y salsas"],
      ["Butipapa", 16000, "Papa, salchicha, butifarra y salsas"],
      ["Choripollo", 22000, "Papa, salchicha, chorizo y pollo, salsas"],
      ["Mixta", 23000, "Papa, salchicha, pollo y cerdo, salsas"]
    ]
  },
  {
    category: "Burgers",
    items: [
      ["Classic", 18000, "Pan brioche, carne, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa. Con papas"],
      ["Doble Sabor", 24000, "Pan brioche, carne, pollo, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa. Con papas"],
      ["La Brutal", 27000, "Pan brioche, carne, pollo, suiza, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa. Con papas"],
      ["King", 26000, "Pan brioche, doble carne, tocineta, cebolla caramelizada, mozzarella, vegetales y salsa. Con papas"]
    ]
  },
  {
    category: "Chorizos",
    items: [
      ["Sencilla", 8000, "Chorizo de cerdo artesanal acompañado de bollo o papa francesa, limón, chimichurri y salsas"],
      ["Doble", 14000, "Doble chorizo de cerdo artesanal acompañado de bollo o papa francesa, limón, chimichurri y salsas"]
    ]
  },
  {
    category: "Salvajadas",
    items: [
      ["Duo Salvaje", 35000, "Papa, salchicha, chorizo de cerdo, butifarra, pollo y gratinado (maíz o jamón)"],
      ["La Atrevida", 45000, "Papa, salchicha, chorizo de cerdo, butifarra, pollo, cerdo y gratinado (maíz o jamón)"],
      ["Sixva", 65000, "Papa, salchicha, chorizo de cerdo, butifarra, pollo, cerdo, gratinado, maíz y jamón"]
    ]
  },
  {
    category: "Desgranados",
    items: [
      ["Pollo", 18000, "Bollo, pollo, chongo, maíz y gratinado"],
      ["Cerdo", 18000, "Bollo, cerdo, chongo, maíz y gratinado"],
      ["Chorizo", 18000, "Bollo, chorizo, chongo, maíz y gratinado"],
      ["PA 2'", 32000, "Bollo, chorizo, pollo, chongo, maíz, gratinado y tocineta"]
    ]
  },
  {
    category: "Asados",
    items: [
      ["Pechuga a la plancha", 18000, "Acompañada de papas a la francesa o bollo, ensalada"],
      ["Pechuga gratinada", 21000, "Acompañada de papas a la francesa o bollo, ensalada"],
      ["Carne asada", 20000, "Acompañada de papas a la francesa o bollo, ensalada"]
    ]
  },
  {
    category: "Bebidas",
    items: [
      ["Coca-Cola personal", 2500, ""],
      ["Coca-Cola litro", 6000, ""],
      ["Cerveza", 3000, ""]
    ]
  },
  {
    category: "Adicionales",
    items: [
      ["Pollo", 5000, ""],
      ["Cerdo", 5000, ""],
      ["Gratinado", 5000, ""],
      ["Chorizo de cerdo", 5000, ""],
      ["Papas", 4000, ""],
      ["Maíz", 2000, ""],
      ["Jamón", 2000, ""],
      ["Tocineta", 3000, ""]
    ]
  }
];

const money = n => new Intl.NumberFormat("es-CO", {
  style: "currency", currency: "COP", maximumFractionDigits: 0
}).format(n);

let activeCategory = "Todos";
let cart = JSON.parse(localStorage.getItem("nacha_cart") || "[]");

const menuEl = document.querySelector("#menu");
const categoriesEl = document.querySelector("#categories");
const searchEl = document.querySelector("#search");
const cartPanel = document.querySelector("#cartPanel");

function allProducts() {
  return menu.flatMap(section => section.items.map(item => ({
    name: item[0], price: item[1], desc: item[2], category: section.category
  })));
}

function renderCategories() {
  const names = ["Todos", ...menu.map(x => x.category)];
  categoriesEl.innerHTML = names.map(name =>
    `<button class="category ${name === activeCategory ? "active" : ""}" data-category="${name}">${name}</button>`
  ).join("");
}

function renderMenu() {
  const q = searchEl.value.trim().toLowerCase();
  const sections = activeCategory === "Todos"
    ? menu
    : menu.filter(s => s.category === activeCategory);

  let html = "";
  sections.forEach(section => {
    const items = section.items.filter(item =>
      !q || `${item[0]} ${item[2]}`.toLowerCase().includes(q)
    );
    if (!items.length) return;
    html += `<section class="menu-section">
      <div class="section-title"><h2>${section.category}</h2><span>${items.length} opciones</span></div>
      <div class="menu-grid">
        ${items.map(item => `
          <article class="card">
            <div>
              <div class="card__top">
                <h3>${item[0]}</h3>
                <span class="price">${money(item[1])}</span>
              </div>
              ${item[2] ? `<p class="desc">${item[2]}</p>` : ""}
            </div>
            <button class="add" data-name="${encodeURIComponent(item[0])}" data-price="${item[1]}" data-category="${encodeURIComponent(section.category)}">+ Agregar</button>
          </article>
        `).join("")}
      </div>
    </section>`;
  });

  menuEl.innerHTML = html || `<div class="empty">No encontramos productos con esa búsqueda.</div>`;
}

function saveCart() {
  localStorage.setItem("nacha_cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(name, price, category) {
  const found = cart.find(x => x.name === name);
  if (found) found.qty++;
  else cart.push({ name, price, category, qty: 1 });
  saveCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

function renderCart() {
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + x.qty * x.price, 0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = money(total);

  document.querySelector("#cartItems").innerHTML = cart.length
    ? cart.map((x, i) => `
      <div class="cart-row">
        <div><strong>${x.name}</strong><small>${x.category} · ${money(x.price)}</small></div>
        <div class="qty">
          <button data-minus="${i}">−</button><b>${x.qty}</b><button data-plus="${i}">+</button>
        </div>
      </div>
    `).join("")
    : `<div class="empty">Tu pedido está vacío.</div>`;
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

categoriesEl.addEventListener("click", e => {
  const btn = e.target.closest("[data-category]");
  if (!btn) return;
  activeCategory = btn.dataset.category;
  renderCategories();
  renderMenu();
});

menuEl.addEventListener("click", e => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  addToCart(
    decodeURIComponent(btn.dataset.name),
    Number(btn.dataset.price),
    decodeURIComponent(btn.dataset.category)
  );
  openCart();
});

document.querySelector("#cartItems").addEventListener("click", e => {
  if (e.target.dataset.minus) changeQty(Number(e.target.dataset.minus), -1);
  if (e.target.dataset.plus) changeQty(Number(e.target.dataset.plus), 1);
});

searchEl.addEventListener("input", renderMenu);
document.querySelector("#cartButton").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
document.querySelector("#cartBackdrop").addEventListener("click", closeCart);

document.querySelector("#whatsappButton").addEventListener("click", () => {
  if (!WHATSAPP_NUMBER) {
    alert("Configura WHATSAPP_NUMBER en app.js con el número del negocio.");
    return;
  }
  if (!cart.length) return alert("Agrega al menos un producto.");
  const lines = cart.map(x => `• ${x.qty} x ${x.name} — ${money(x.qty * x.price)}`);
  const total = cart.reduce((s, x) => s + x.qty * x.price, 0);
  const text = `Hola, quiero hacer este pedido en Donde Nacha:%0A%0A${encodeURIComponent(lines.join("\n"))}%0A%0ATotal: ${encodeURIComponent(money(total))}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
});

renderCategories();
renderMenu();
renderCart();
