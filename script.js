// =======================================
// CherrySMP Store - Expanded Script
// =======================================

// =======================
// CONFIG
// =======================

const CONFIG = {
    DISCOUNT: 0.20,
    CURRENCY: "€",
    COUPONS: {
        "CHERRY20": 0.20,
        "SPRING10": 0.10
    },
    PAYPAL_LINK: "https://www.paypal.com/paypalme/YOUR_USERNAME"
};

// =======================
// STATE
// =======================

let cart = [];
let activeDiscount = 0;
let appliedCoupon = null;

// =======================
// PRODUCTS
// =======================

const PRODUCTS = {
    ranks: [
        { name: "VIP", price: 2 },
        { name: "Maple", price: 4 },
        { name: "Cherry", price: 6 },
        { name: "Cherry+", price: 8 },
        { name: "Spring", price: 10 }
    ],
    crates: [
        { name: "Slime Crate", price: 1 },
        { name: "Maple Crate", price: 1.5 },
        { name: "Cherry Crate", price: 2.2 }
    ],
    bundles: [
        { name: "Pro Bundle", price: 3 },
        { name: "Immortal Bundle", price: 5 },
        { name: "Cherry Bundle", price: 7 },
        { name: "Spring Bundle", price: 11.5 }
    ],
    stuff: [
        { name: "Cherry Driller", price: 1.5 },
        { name: "Cherry Cutter", price: 1.5 },
        { name: "Cherry Eater", price: 1.5 }
    ]
};

// =======================
// UTILITIES
// =======================

function formatPrice(price) {
    return CONFIG.CURRENCY + price.toFixed(2);
}

function calculateDiscount(price) {
    let discount = CONFIG.DISCOUNT;

    if (appliedCoupon && CONFIG.COUPONS[appliedCoupon]) {
        discount = CONFIG.COUPONS[appliedCoupon];
    }

    return +(price * (1 - discount)).toFixed(2);
}

// =======================
// NAVIGATION
// =======================

function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        sec.classList.remove("active");
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add("active");
        animateSection(target);
    }
}

// Smooth animation
function animateSection(section) {
    section.style.opacity = 0;
    section.style.transform = "translateY(10px)";

    setTimeout(() => {
        section.style.transition = "all 0.4s ease";
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
    }, 50);
}

// =======================
// RENDER PRODUCTS
// =======================

function renderProducts() {
    Object.keys(PRODUCTS).forEach(category => {
        const container = document.getElementById(category);
        if (!container) return;

        container.innerHTML = "";

        PRODUCTS[category].forEach(item => {
            const original = item.price;
            const discounted = calculateDiscount(original);

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${item.name}</h3>

                <p>
                    <span class="price-old">${formatPrice(original)}</span>
                    <span> → </span>
                    <span class="price-new">${formatPrice(discounted)}</span>
                </p>

                <button onclick="addToCart('${item.name}', ${discounted})">
                    Add to Cart
                </button>
            `;

            container.appendChild(card);
        });
    });
}

// =======================
// CART SYSTEM
// =======================

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
    cartAnimation();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>${item.name} - ${formatPrice(item.price)}</span>
            <button onclick="removeFromCart(${index})">x</button>
        `;

        cartContainer.appendChild(div);
    });

    document.getElementById("total").innerText =
        "Total: " + formatPrice(total);
}

// Cart animation
function cartAnimation() {
    const cartBox = document.getElementById("cart");
    cartBox.style.transform = "scale(1.05)";
    setTimeout(() => {
        cartBox.style.transform = "scale(1)";
    }, 150);
}

// =======================
// COUPON SYSTEM
// =======================

function applyCoupon() {
    const input = document.getElementById("coupon");
    const code = input.value.trim().toUpperCase();

    if (CONFIG.COUPONS[code]) {
        appliedCoupon = code;
        alert("Coupon applied: " + code);

        renderProducts();
        renderCart();
    } else {
        alert("Invalid coupon code");
    }
}

// =======================
// CHECKOUT
// =======================

function checkoutPayPal() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.open(CONFIG.PAYPAL_LINK, "_blank");
}

function checkoutBank() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Bank Transfer Details:\n\n" +
        "IBAN: XXXX XXXX XXXX\n" +
        "BIC: XXXXX\n\n" +
        "Please include your IGN as reference."
    );
}

// =======================
// UI EFFECTS
// =======================

// Floating particles
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const p = document.createElement("div");

        p.style.position = "fixed";
        p.style.width = "5px";
        p.style.height = "5px";
        p.style.borderRadius = "50%";
        p.style.background = "#7cf07c";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.opacity = Math.random();

        const duration = 5 + Math.random() * 10;
        p.style.animation = `float ${duration}s linear infinite`;

        document.body.appendChild(p);
    }

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes float {
            from { transform: translateY(0); }
            to { transform: translateY(-120vh); }
        }
    `;
    document.head.appendChild(style);
}

// Page fade-in
function initPage() {
    document.body.style.opacity = 0;

    setTimeout(() => {
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = 1;
    }, 100);
}

// =======================
// EVENTS
// =======================

document.addEventListener("DOMContentLoaded", () => {
    initPage();
    createParticles();
    renderProducts();
    showSection("ranks");
});

// =======================
// DEBUG
// =======================

function debugCart() {
    console.log("Cart:", cart);
    console.log("Coupon:", appliedCoupon);
}

window.debugCart = debugCart;
