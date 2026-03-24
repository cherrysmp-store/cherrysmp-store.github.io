
// ================================
// CherrySMP Store - Enhanced Script
// ================================

// Discount
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
        { name: "Cherry Cutter", desc: "Breaks down whole trees", price: 1.5 },
        { name: "Cherry Eater", desc: "Bulk mines soft blocks", price: 1.5 },
        { name: "Cherry Subscription", desc: "Monthly perks", price: 10 }
    ]
};

// Cart
let cart = [];

// ================================
// Utility
// ================================

function getDiscounted(price) {
    return +(price * (1 - DISCOUNT)).toFixed(2);
}

// ================================
// Category UI
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
        const newPrice = getDiscounted(oldPrice);

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.desc || ""}</p>

            <div class="price-block">
                <span class="price-old">€${oldPrice}</span>
                <span class="price-arrow"> → </span>
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
// Cart System
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
        div.className = "cart-item";

        div.innerHTML = `
            <span>${item.name} - €${item.price}</span>
            <button onclick="removeItem(${index})">x</button>
        `;

        cartItems.appendChild(div);
    });

    document.getElementById("total").innerText =
        "Total: €" + total.toFixed(2);
}

// ================================
// Checkout (Mock)
// ================================

function checkoutPayPal() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Redirecting to PayPal (demo)");
}

function checkoutBank() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Bank Transfer:\nIBAN: XXXX XXXX XXXX\nBIC: XXXXX");
}

// ================================
// UI Effects
// ================================

// Cart pulse animation
function pulseCart() {
    const cartBox = document.getElementById("cart");
    cartBox.style.transform = "scale(1.05)";
    setTimeout(() => {
        cartBox.style.transform = "scale(1)";
    }, 200);
}

// Background floating particles (spring vibe)
function createParticles() {
    const body = document.body;

    for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");

        p.style.position = "fixed";
        p.style.width = "6px";
        p.style.height = "6px";
        p.style.borderRadius = "50%";
        p.style.background = "#7cf07c";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.opacity = Math.random();

        const duration = 8 + Math.random() * 10;

        p.style.animation = `float ${duration}s linear infinite`;

        body.appendChild(p);
    }

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes float {
            from { transform: translateY(0px); }
            to { transform: translateY(-120vh); }
        }
    `;
    document.head.appendChild(style);
}

// Smooth entrance animation
function initAnimations() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
}

// ================================
// Init
// ================================

document.addEventListener("DOMContentLoaded", () => {
    initAnimations();
    createParticles();

    // Default open ranks
    openCategory("ranks");
});

// ================================
// Debug helpers
// ================================

function debugCart() {
    console.log(cart);
}

window.debugCart = debugCart;
