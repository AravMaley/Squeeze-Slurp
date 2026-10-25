const menu = [
  { id: 1, name: "Orange Sunrise", category: "Fresh Juices", price: 80, desc: "Sweet orange, served bright and ice-cold.", tag: "Bestseller", color: "#ffe09c" },
  { id: 2, name: "Watermelon Chill", category: "Fresh Juices", price: 70, desc: "Fresh watermelon with a squeeze of lime.", tag: "Summer pick", color: "#ffd1cb" },
  { id: 3, name: "Pineapple Punch", category: "Fresh Juices", price: 80, desc: "Tangy pineapple, black salt and mint.", tag: "Fresh", color: "#fff0a9" },
  { id: 4, name: "ABC Detox", category: "Fresh Juices", price: 110, desc: "Apple, beetroot and carrot — the power trio.", tag: "No added sugar", color: "#f2c4c9" },
  { id: 5, name: "Mango Milkshake", category: "Shakes", price: 120, desc: "Thick mango shake made with chilled milk.", tag: "Seasonal", color: "#ffe17b" },
  { id: 6, name: "Oreo Overload", category: "Shakes", price: 140, desc: "Cookies, cream and a whole lot of joy.", tag: "Student favourite", color: "#d7d2c7" },
  { id: 7, name: "Choco Brownie Shake", category: "Shakes", price: 160, desc: "Chocolate shake blended with fudgy brownie.", tag: "Indulgent", color: "#d7bba5" },
  { id: 8, name: "Banana Peanut Shake", category: "Shakes", price: 140, desc: "Banana, peanut butter, milk and dates.", tag: "Protein pick", color: "#ead6a7" },
  { id: 9, name: "Classic Cold Coffee", category: "Coffee", price: 100, desc: "Strong, frothy and campus-approved.", tag: "Bestseller", color: "#d7bd9e" },
  { id: 10, name: "Iced Mocha", category: "Coffee", price: 130, desc: "Cold coffee with chocolate and milk foam.", tag: "Choco-coffee", color: "#cab6aa" },
  { id: 11, name: "Hot Cappuccino", category: "Coffee", price: 90, desc: "A balanced cup with a soft cap of foam.", tag: "Classic", color: "#ead8c3" },
  { id: 12, name: "Masala Chai", category: "Coffee", price: 40, desc: "Hot, spiced and made for long conversations.", tag: "Campus fuel", color: "#f5d7ab" },
  { id: 13, name: "Veg Grilled Sandwich", category: "Quick Bites", price: 110, desc: "Garden vegetables, cheese and green chutney.", tag: "Filling", color: "#dce9b7" },
  { id: 14, name: "Paneer Tikka Sandwich", category: "Quick Bites", price: 140, desc: "Smoky paneer, onions and mint mayo.", tag: "Spicy", color: "#ffd1a9" },
  { id: 15, name: "Classic Maggi", category: "Quick Bites", price: 60, desc: "The late-night original, hot and comforting.", tag: "Late-night pick", color: "#ffe38e" },
  { id: 16, name: "Cheese Masala Maggi", category: "Quick Bites", price: 90, desc: "Masala noodles loaded with veggies and cheese.", tag: "Comfort bowl", color: "#f6df93" },
  { id: 17, name: "Peri Peri Fries", category: "Quick Bites", price: 100, desc: "Crispy fries tossed in a punchy peri peri mix.", tag: "Shareable", color: "#ffd4a1" },
  { id: 18, name: "Veggie Burger", category: "Quick Bites", price: 120, desc: "Crisp veg patty, fresh salad and house sauce.", tag: "Hungry?", color: "#dce7af" },
  { id: 19, name: "Berry Smoothie Bowl", category: "Healthy", price: 180, desc: "Yoghurt, berries, banana, granola and seeds.", tag: "Feel good", color: "#efcadc" },
  { id: 20, name: "Fruit & Granola Cup", category: "Healthy", price: 130, desc: "Seasonal fruit, crunchy granola and yoghurt.", tag: "Light bite", color: "#d9efc4" },
  { id: 21, name: "Mint Lime Cooler", category: "Coolers", price: 80, desc: "Fresh lime, muddled mint and soda sparkle.", tag: "Refreshing", color: "#cceac7" },
  { id: 22, name: "Peach Iced Tea", category: "Coolers", price: 90, desc: "Brewed tea, juicy peach and lots of ice.", tag: "Easy sip", color: "#f9cba9" },
  { id: 23, name: "Kala Khatta Fizz", category: "Coolers", price: 90, desc: "Sweet, salty, tangy and unapologetically fun.", tag: "Desi favourite", color: "#d9c9ed" },
  { id: 24, name: "Fresh Lemonade", category: "Coolers", price: 60, desc: "Simple, sharp and instantly refreshing.", tag: "Classic", color: "#f4ed9c" }
];

const PROMOS = { SLURP10: { label: "SLURP10 (10% off)", pct: 10 }, MAGGI20: { label: "MAGGI20 (₹20 off)", flat: 20 } };
const state = { category: "All", query: "", sort: "default", favsOnly: false, promo: localStorage.getItem("squeeze-slurp-promo") || "", favs: JSON.parse(localStorage.getItem("squeeze-slurp-favs") || "[]"), cart: JSON.parse(localStorage.getItem("squeeze-slurp-cart") || "{}") };
const categories = ["All", ...new Set(menu.map(item => item.category))];
const $ = selector => document.querySelector(selector);
const money = value => `₹${value}`;

function renderTabs() {
  $("#categoryTabs").innerHTML = categories.map(category => `<button type="button" role="tab" aria-selected="${state.category === category}" class="${state.category === category ? "active" : ""}" data-category="${category}">${category}</button>`).join("");
}

function cardControl(item) {
  const qty = state.cart[item.id] || 0;
  if (!qty) return `<button class="add-button" type="button" data-add="${item.id}" aria-label="Add ${item.name} to cart">+</button>`;
  return `<div class="card-stepper"><button type="button" data-qty="${item.id}" data-change="-1" aria-label="Remove one ${item.name}">−</button><span class="card-qty" title="${qty} in cart">${qty}</span><button type="button" data-qty="${item.id}" data-change="1" aria-label="Add one ${item.name}">+</button></div>`;
}

function renderMenu() {
  const query = state.query.toLowerCase();
  const filtered = menu.filter(item => (state.category === "All" || item.category === state.category) && (!state.favsOnly || state.favs.includes(item.id)) && `${item.name} ${item.desc} ${item.category}`.toLowerCase().includes(query));
  if (state.sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (state.sort === "high") filtered.sort((a, b) => b.price - a.price);
  $("#menuGrid").innerHTML = filtered.map(item => `
    <article class="menu-card" style="--card-color:${item.color}">
      <div class="menu-card-top"><div><span class="tag">${item.tag}</span><h3>${item.name}</h3><p>${item.desc}</p></div><div class="card-icons"><button class="fav-button${state.favs.includes(item.id) ? " on" : ""}" type="button" data-fav="${item.id}" aria-label="Favourite ${item.name}">♥</button><span class="veg-mark" title="Vegetarian"></span></div></div>
      <div class="menu-card-bottom"><span class="menu-card-price">${money(item.price)}</span>${cardControl(item)}</div>
    </article>`).join("");
  $("#emptyState").hidden = filtered.length > 0;
}

function cartEntries() {
  return Object.entries(state.cart).map(([id, qty]) => ({ item: menu.find(item => item.id === Number(id)), qty })).filter(entry => entry.item);
}

function cartTotal() { return cartEntries().reduce((sum, { item, qty }) => sum + item.price * qty, 0); }

function discount() {
  const promo = PROMOS[state.promo];
  if (!promo) return 0;
  const total = cartTotal();
  return Math.min(total, promo.pct ? Math.round(total * promo.pct / 100) : promo.flat);
}

function saveCart() {
  localStorage.setItem("squeeze-slurp-cart", JSON.stringify(state.cart));
  renderMenu();
  renderCart();
}

function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveCart();
  showToast(`${menu.find(item => item.id === id).name} added`);
}

function updateQty(id, change) {
  state.cart[id] = (state.cart[id] || 0) + change;
  if (state.cart[id] <= 0) delete state.cart[id];
  saveCart();
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, entry) => sum + entry.qty, 0);
  $("#cartCount").textContent = count;
  $("#cartItems").innerHTML = entries.map(({ item, qty }) => `
    <div class="cart-line"><div><h3>${item.name}</h3><p>${item.category}</p><div class="qty-control"><button type="button" data-qty="${item.id}" data-change="-1" aria-label="Remove one">−</button><span>${qty}</span><button type="button" data-qty="${item.id}" data-change="1" aria-label="Add one">+</button></div></div><div class="cart-line-price">${money(item.price * qty)}</div></div>`).join("");
  $("#cartEmpty").hidden = entries.length > 0;
  $("#cartFooter").hidden = entries.length === 0;
  const off = discount();
  $("#discountRow").hidden = !off;
  if (off) { $("#discountLabel").textContent = `Promo ${PROMOS[state.promo].label}`; $("#discountAmount").textContent = `−${money(off)}`; }
  $("#subtotal").textContent = money(cartTotal() - off);
  $("#checkoutTotal").textContent = money(cartTotal() - off);
}

function toggleCart(open) {
  $("#cartDrawer").classList.toggle("open", open);
  $("#cartDrawer").setAttribute("aria-hidden", String(!open));
  $("#overlay").classList.toggle("open", open);
  document.body.classList.toggle("locked", open);
}

function toggleCheckout(open) {
  $("#checkoutModal").classList.toggle("open", open);
  $("#checkoutModal").setAttribute("aria-hidden", String(!open));
  $("#overlay").classList.toggle("open", open);
  document.body.classList.toggle("locked", open);
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 1700);
}

$("#categoryTabs").addEventListener("click", event => {
  if (!event.target.dataset.category) return;
  state.category = event.target.dataset.category; renderTabs(); renderMenu();
});
$("#menuGrid").addEventListener("click", event => {
  const { add, fav, qty, change } = event.target.dataset;
  if (add) addToCart(Number(add));
  if (qty) updateQty(Number(qty), Number(change));
  if (fav) {
    const id = Number(fav);
    state.favs = state.favs.includes(id) ? state.favs.filter(f => f !== id) : [...state.favs, id];
    localStorage.setItem("squeeze-slurp-favs", JSON.stringify(state.favs));
    renderMenu();
  }
});
$("#menuSort").addEventListener("change", event => { state.sort = event.target.value; renderMenu(); });
$("#favFilter").addEventListener("click", event => {
  state.favsOnly = !state.favsOnly;
  event.currentTarget.setAttribute("aria-pressed", state.favsOnly);
  event.currentTarget.classList.toggle("active", state.favsOnly);
  renderMenu();
});
$("#clearCart").addEventListener("click", () => { state.cart = {}; saveCart(); });
$("#promoForm").addEventListener("submit", event => {
  event.preventDefault();
  const code = $("#promoInput").value.trim().toUpperCase();
  if (!PROMOS[code]) { showToast("That code isn’t valid"); return; }
  state.promo = code; localStorage.setItem("squeeze-slurp-promo", code);
  $("#promoInput").value = ""; renderCart(); showToast(`${code} applied`);
});
$("#menuSearch").addEventListener("input", event => { state.query = event.target.value; renderMenu(); });
$("#cartItems").addEventListener("click", event => { if (event.target.dataset.qty) updateQty(Number(event.target.dataset.qty), Number(event.target.dataset.change)); });
$("#cartTrigger").addEventListener("click", () => toggleCart(true));
$("#closeCart").addEventListener("click", () => toggleCart(false));
$("#browseMenu").addEventListener("click", () => { toggleCart(false); $("#menu").scrollIntoView(); });
$("#overlay").addEventListener("click", () => { toggleCart(false); toggleCheckout(false); });
$("#checkoutButton").addEventListener("click", () => { toggleCart(false); toggleCheckout(true); });
$("#closeCheckout").addEventListener("click", () => toggleCheckout(false));
$("#doneButton").addEventListener("click", () => { toggleCheckout(false); $("#checkoutView").hidden = false; $("#successView").hidden = true; });

document.querySelectorAll('input[name="fulfilment"]').forEach(input => input.addEventListener("change", event => {
  const delivery = event.target.value === "Campus delivery";
  $("#locationField").classList.toggle("visible", delivery);
  $("#locationField input").required = delivery;
}));

$("#orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.target);
  const orderId = `SQS-${String(Date.now()).slice(-5)}`;
  const order = { id: orderId, name: data.get("name"), fulfilment: data.get("fulfilment"), location: data.get("location"), note: data.get("note"), items: cartEntries(), total: cartTotal() - discount(), promo: PROMOS[state.promo] ? state.promo : null, createdAt: new Date().toISOString() };
  localStorage.setItem("squeeze-slurp-last-order", JSON.stringify(order));
  $("#successMessage").textContent = `${order.name}, your ${order.fulfilment.toLowerCase()} order is confirmed. We’ll have it ready in about 15–25 minutes.`;
  $("#orderNumber").textContent = orderId;
  $("#checkoutView").hidden = true; $("#successView").hidden = false;
  state.cart = {}; state.promo = ""; localStorage.removeItem("squeeze-slurp-promo"); saveCart(); event.target.reset();
});

$("#quickOrder").addEventListener("click", () => {
  const last = JSON.parse(localStorage.getItem("squeeze-slurp-last-order") || "null");
  if (!last?.items?.length) { showToast("Your first favourite is waiting below"); $("#menu").scrollIntoView(); return; }
  state.cart = {};
  last.items.forEach(({ item, qty }) => { if (menu.some(menuItem => menuItem.id === item.id)) state.cart[item.id] = qty; });
  saveCart(); toggleCart(true);
});

document.addEventListener("keydown", event => { if (event.key === "Escape") { toggleCart(false); toggleCheckout(false); } });
$("#year").textContent = new Date().getFullYear();
renderTabs(); renderMenu(); renderCart();
