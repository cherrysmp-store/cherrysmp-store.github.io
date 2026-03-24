
// ================================
// CherrySMP Store - Final Upgrade
// ================================

const DISCOUNT = 0.20;

// Products
const productsData = {
    ranks: [
        { name: "VIP", price: 2 },
        { name: "Maple", price: 4 },
        { name: "Cherry", price: 6 },
        { name: "Cherry+", price: 8 },
        { name: "Spring", price: 10, highlight: true }
    ],
    crates: [
        { name: "Slime Crate", price: 1 },
        { name: "Maple Crate", price: 1.5 },
        { name: "Cherry Crate", price: 2.2 }
    ],
    bundles: [
        { name: "Pro Bundle", desc: "VIP + 2 Slime Crates", price: 3 },
        { name: "Immortal Bundle", desc: "Maple + 2 Maple Crates", price: 5 },
        { name: "Cherry Bundle", desc: "Cherry + 2 Cherry Crates", price: 7 },
        { name: "Spring Bundle", desc: "Spring + all crates", price: 11.5 }
    ],
    stuff: [
        { name: "Cherry Driller", desc: "Mines 3x3 (5 days)", price: 1.5 },
        { name: "Cherry Cutter", desc: "Breaks trees", price: 1.5 },
        { name: "Cherry Eater", desc: "Bulk mining", price: 1.5 }
    ]
};

// Subscription (NOT discounted)
const subscription = {
    name: "Cherry Subscription",
    price: 10,
    desc: "Monthly perks + weekly crate + Discord benefits"
};

let cart = [];

// ================================
// Pricing Logic
// ================================

function getDiscounted(price, isSubscription = false) {
    if (isSubscription) return price; // no discount
    return +(price * (1 - DISCOUNT)).toFixed(2);
}

// ================================
// Category Rendering
// ================================

function openCategory(category) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    container.classList.remove("hidden");

    const title = document.createElement("h2");
    title.innerText = category.toUpperCase();
    title.style.textAlign = "center";
    title.style.marginBottom = "20px";
    container.appendChild(title);

    productsData[category].forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";

        const oldPrice = item.price;
        const newPrice = getDiscounted(oldPrice, false);

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.desc || ""}</p>

            <div class="price-block">
                <span class="price-old">€${oldPrice}</span>
                <span> → </span>
                <span class="price-new">€${newPrice}</span>
            </div>

            <button onclick="addToCart('${item.name}', ${newPrice})">
                Add to Cart
            </button>
        `;

        if (item.highlight) {
            card.classList.add("spring-glow");
        }

        container.appendChild(card);
    });
}

// ================================
// Subscription (SPECIAL UI)
// ================================

function renderSubscription() {
    const container = document.getElementById("products");

    const subCard = document.createElement("div");
    subCard.className = "product-card spring-glow";
    subCard.style.gridColumn = "1 / -1"; // span full width
    subCard.style.textAlign = "center";
    subCard.style.marginTop = "40px";

    subCard.innerHTML = `
        <h2>⭐ ${subscription.name}</h2>
        <p>${subscription.desc}</p>

        <div class="price-block">
            <span class="price-new">€${subscription.price}</span>
        </div>

        <button onclick="addToCart('${subscription.name}', ${subscription.price})">
            Subscribe
        </button>
    `;

    container.appendChild(subCard);
}

// ================================
// Cart
// ================================

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
    pulseCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");

        div.innerHTML = `
            ${item.name} - €${item.price}
            <button onclick="removeItem(${index})">x</button>
        `;

        cartItems.appendChild(div);
    });

    document.getElementById("total").innerText =
        "Total: €" + total.toFixed(2);
}

// ================================
// Checkout
// ================================

function checkoutPayPal() {
    if (cart.length === 0) return alert("Cart empty");
    alert("Redirecting to PayPal (demo)");
}

function checkoutBank() {
    if (cart.length === 0) return alert("Cart empty");
    alert("Bank Transfer:\nIBAN: XXXX XXXX XXXX");
}

// ================================
// UI Effects
// ================================

function pulseCart() {
    const cartBox = document.getElementById("cart");
    cartBox.style.transform = "scale(1.05)";
    setTimeout(() => cartBox.style.transform = "scale(1)", 200);
}

// ================================
// Init
// ================================

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);

    openCategory("ranks");

    // Render subscription separately
    setTimeout(renderSubscription, 300);
});
