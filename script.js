// CherrySMP Store Script
// Handles UI, products, cart, checkout, animations

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
        { name: "Cherry Driller", desc: "3x3 mining (5 days)", price: 1.5 },
        { name: "Cherry Cutter", desc: "Breaks trees", price: 1.5 },
        { name: "Cherry Eater", desc: "Bulk soft block mining", price: 1.5 },
        { name: "Cherry Subscription", desc: "Monthly perks", price: 10 }
    ]
};

let cart = [];

// Utility
function applyDiscount(price) {
    return +(price * 0.8).toFixed(2); // 20% off
}

// Open category
function openCategory(category) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    container.classList.remove("hidden");

    productsData[category].forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        const discounted = applyDiscount(item.price);

        div.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.desc || ""}</p>
            <p>Price: €${discounted}</p>
            <button onclick='addToCart("${item.name}", ${discounted})'>Add to Cart</button>
        `;

        if (item.highlight) {
            div.classList.add("spring-glow");
        }

        container.appendChild(div);
    });
}

// Add to cart
function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

// Render cart
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

    document.getElementById("total").innerText = "Total: €" + total.toFixed(2);
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Checkout PayPal (mock)
function checkoutPayPal() {
    alert("Redirecting to PayPal (mock)...");
}

// Checkout Bank Transfer (mock)
function checkoutBank() {
    alert("Bank transfer details:\nIBAN: XXXX XXXX XXXX\nBIC: XXXXX");
}

// Background animation (floating particles)
const body = document.body;

for (let i = 0; i < 30; i++) {
    const leaf = document.createElement("div");
    leaf.style.position = "fixed";
    leaf.style.width = "8px";
    leaf.style.height = "8px";
    leaf.style.background = "#a8e6a3";
    leaf.style.borderRadius = "50%";
    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.top = Math.random() * 100 + "vh";
    leaf.style.opacity = Math.random();
    leaf.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
    body.appendChild(leaf);
}

// Floating animation keyframes injected dynamically
const style = document.createElement("style");
style.innerHTML = `
@keyframes float {
    from { transform: translateY(0); }
    to { transform: translateY(-100vh); }
}`;
document.head.appendChild(style);

// Smooth UI transitions
document.addEventListener("DOMContentLoaded", () => {
    console.log("CherrySMP Store Loaded");

    // Auto open ranks preview
    setTimeout(() => openCategory("ranks"), 500);
});

// Extra UI effects
function pulseCart() {
    const cartBox = document.getElementById("cart");
    cartBox.style.transform = "scale(1.05)";
    setTimeout(() => cartBox.style.transform = "scale(1)", 200);
}

// Hook pulse on cart updates
const originalAdd = addToCart;
addToCart = function(name, price) {
    originalAdd(name, price);
    pulseCart();
};

// Search filter (future expansion)
function searchProducts(query) {
    query = query.toLowerCase();
    let results = [];

    Object.keys(productsData).forEach(cat => {
        productsData[cat].forEach(item => {
            if (item.name.toLowerCase().includes(query)) {
                results.push(item);
            }
        });
    });

    return results;
}

// Debug helper
function debugCart() {
    console.log(cart);
}

// Placeholder for future API integration
function sendOrderToServer(order) {
    console.log("Sending order:", order);
}

// Export for testing
window.debugCart = debugCart;

// End of script
