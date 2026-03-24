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
        { name: "Cherry Eater", desc: "Bulk mining", price: 1.5 },
        { name: "Cherry Subscription", desc: "Monthly perks", price: 10 }
    ]
};

let cart = [];

function applyDiscount(price) {
    return +(price * 0.8).toFixed(2);
}

function openCategory(category) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    container.classList.remove("hidden");

    productsData[category].forEach(item => {
        const div = document.createElement("div");
        div.className = "product-card";

        const oldPrice = item.price;
        const newPrice = applyDiscount(oldPrice);

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.desc || ""}</p>

            <div>
                <span class="price-old">€${oldPrice}</span>
                <span class="price-new"> €${newPrice}</span>
            </div>

            <button onclick="addToCart('${item.name}', ${newPrice})">
                Add to Cart
            </button>
        `;

        if (item.highlight) {
            div.classList.add("spring-glow");
        }

        container.appendChild(div);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
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

    document.getElementById("total").innerText = "Total: €" + total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function checkoutPayPal() {
    alert("Redirecting to PayPal (mock)");
}

function checkoutBank() {
    alert("Bank Transfer:\nIBAN: XXXX XXXX XXXX");
}
