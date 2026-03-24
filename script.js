
// ===============================
// CherrySMP Store - Unified Script
// ===============================

// CONFIG
const CONFIG = {
    DISCOUNT: 0.20,
    PAYPAL_LINK: "https://www.paypal.com/paypalme/TimCherry000",
    COUPONS: {
        "CHERRY5": 0.05,
        "SPRING5": 0.05
    }
};

// STATE
let cart = [];
let appliedCoupon = null;

// ===============================
// PRODUCTS
// ===============================

const PRODUCTS = {
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

// ===============================
// INIT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    renderAllProducts();
    showSection("ranks");
});

// ===============================
// NAVIGATION
// ===============================

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add("active");
    }
}

// ===============================
// PRICING
// ===============================

function getDiscounted(price, isSubscription = false) {
    if (isSubscription) return price;

    let discount = CONFIG.DISCOUNT;

    if (appliedCoupon && CONFIG.COUPONS[appliedCoupon]) {
        discount = CONFIG.COUPONS[appliedCoupon];
    }

    return +(price * (1 - discount)).toFixed(2);
}

// ===============================
// RENDER PRODUCTS
// ===============================

function renderAllProducts() {
    Object.keys(PRODUCTS).forEach(category => {
        const container = document.getElementById(category);
        if (!container) return;

        container.innerHTML = "";

        PRODUCTS[category].forEach(item => {
            const original = item.price;
            const discounted = getDiscounted(original, false);

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${item.name}</h3>

                <p>
                    <span class="price-old">€${original}</span>
                    → 
                    <span class="price-new">€${discounted}</span>
                </p>

                <button onclick="addToCart('${item.name}', ${discounted})">
                    Add to Cart
                </button>
            `;

            if (item.highlight) {
                card.style.border = "2px solid #7cf07c";
                card.style.boxShadow = "0 0 15px rgba(124,240,124,0.4)";
            }

            container.appendChild(card);
        });
    });
}

// ===============================
// SUBSCRIPTION (NO DISCOUNT)
// ===============================

function addSubscription() {
    addToCart("Cherry Subscription", 10);
}

// ===============================
// CART
// ===============================

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
    pulseCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;

        const div = document.createElement("div");
        div.innerHTML = `
            ${item.name} - €${item.price}
            <button onclick="removeFromCart(${i})">x</button>
        `;

        cartItems.appendChild(div);
    });

    document.getElementById("total").innerText =
        "Total: €" + total.toFixed(2);
}

// ===============================
// CART TOGGLE (IMPORTANT)
// ===============================

function toggleCart() {
    const cartBox = document.getElementById("cart");
    cartBox.classList.toggle("show");
}

// ===============================
// COUPON SYSTEM
// ===============================

function applyCoupon() {
    const input = document.getElementById("coupon");
    const code = input.value.trim().toUpperCase();

    if (CONFIG.COUPONS[code]) {
        appliedCoupon = code;
        alert("Coupon applied: " + code);

        renderAllProducts();
        renderCart();
    } else {
        alert("Invalid coupon");
    }
}

// ===============================
// CHECKOUT
// ===============================

function checkoutPayPal() {
    if (cart.length === 0) return alert("Cart is empty");

    window.open(CONFIG.PAYPAL_LINK, "_blank");
}

function checkoutBank() {
    if (cart.length === 0) return alert("Cart is empty");

    alert(
        "Bank Transfer:\n\nNot available at the moment please try paypal !"
    );
}

// ===============================
// UI EFFECTS
// ===============================

function pulseCart() {
    const cartBox = document.getElementById("cart");
    cartBox.style.transform = "scale(1.05)";
    setTimeout(() => {
        cartBox.style.transform = "scale(1)";
    }, 150);
}

// Floating particles
function createParticles() {
    for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");

        p.style.position = "fixed";
        p.style.width = "5px";
        p.style.height = "5px";
        p.style.borderRadius = "50%";
        p.style.background = "#7cf07c";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.opacity = Math.random();

        const duration = 6 + Math.random() * 10;
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

// ===============================
// INIT AFTER LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    renderAllProducts();
    showSection("ranks");
});

// ===============================
// DEBUG
// ===============================

function debugCart() {
    console.log(cart);
}

window.debugCart = debugCart;
