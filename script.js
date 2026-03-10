// ===============================
// SERVER STATUS (REAL PLAYER COUNT)
// ===============================

async function updateServerStatus(){
  try{
    const res = await fetch("https://api.mcsrvstat.us/2/cherrysmp.top");
    const data = await res.json();

    if(data.online){
      document.getElementById("playerCount").textContent = data.players.online;
    } else {
      document.getElementById("playerCount").textContent = "Offline";
    }
  }catch{
    document.getElementById("playerCount").textContent = "Error";
  }
}

updateServerStatus();
setInterval(updateServerStatus,30000);


// ===============================
// COPY SERVER IP
// ===============================

function copyIP(){
  const ip = document.getElementById("serverIP").textContent;
  navigator.clipboard.writeText(ip);
  alert("Server IP copied!");
}


// ===============================
// CART SYSTEM (WITH SAVE)
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;

updateCart();

function addToCart(item, price){

  cart.push({item, price});

  alert(item + " added to cart!");

  updateCart();
}

function removeFromCart(index){

  cart.splice(index,1);

  updateCart();
}

function updateCart(){

  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((c,i)=>{

    total += c.price;

    let li = document.createElement("li");

    li.innerHTML =
      c.item +
      " - €" +
      c.price.toFixed(2) +
      ' <button onclick="removeFromCart('+i+')">Remove</button>';

    cartItems.appendChild(li);

  });

  total = total - total * discount;

  totalPrice.textContent = total.toFixed(2);

  cartCount.textContent = cart.length;

  localStorage.setItem("cart", JSON.stringify(cart));
}


// ===============================
// DISCOUNT CODES
// ===============================

function applyCode(){

  const code = document.getElementById("discountCode").value;

  if(code === "CHERRY10"){
    discount = 0.10;
    alert("10% discount applied!");
  }

  else if(code === "SPRING20"){
    discount = 0.20;
    alert("20% discount applied!");
  }

  else{
    alert("Invalid code!");
  }

  updateCart();
}


// ===============================
// DISCORD CHECKOUT
// ===============================

document.getElementById("checkout").addEventListener("click", ()=>{

  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }

  let order = cart
    .map(c => c.item + " (€" + c.price.toFixed(2) + ")")
    .join("\n");

  let total = document.getElementById("totalPrice").textContent;

  const message = encodeURIComponent(
    "CherrySMP Store Order:\n\n" +
    order +
    "\n\nTotal: €" + total
  );

  window.open("https://discord.com/channels/@me");

});


// ===============================
// PARTICLE BACKGROUND
// ===============================

const canvas = document.getElementById("particles");
const header = document.querySelector("header");

const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = header.offsetHeight;
}

resizeCanvas();

let particlesArr = [];

function Particle(){

  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;

  this.size = Math.random() * 3 + 1;

  this.speedY = Math.random() * 1 + 0.5;

  this.color = "rgba(255,119,170," + Math.random() + ")";

  this.update = function(){

    this.y -= this.speedY;

    if(this.y < 0){
      this.y = canvas.height;
    }

  };

  this.draw = function(){

    ctx.fillStyle = this.color;

    ctx.fillRect(this.x,this.y,this.size,this.size);

  };
}

for(let i=0;i<100;i++){
  particlesArr.push(new Particle());
}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particlesArr.forEach(p=>{
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", resizeCanvas);


// ===============================
// FAQ ACCORDION
// ===============================

let acc = document.getElementsByClassName("accordion");

for(let i=0;i<acc.length;i++){

  acc[i].addEventListener("click", function(){

    this.classList.toggle("active");

    let panel = this.nextElementSibling;

    if(panel.style.display === "block"){
      panel.style.display = "none";
    }

    else{
      panel.style.display = "block";
    }

  });

}


// ===============================
// BACK TO TOP BUTTON
// ===============================

window.addEventListener("scroll", ()=>{

  let btn = document.getElementById("backToTop");

  if(window.scrollY > 300){
    btn.style.display = "block";
  }

  else{
    btn.style.display = "none";
  }

});


// ===============================
// MODAL ITEM INFO
// ===============================

const infoData = {

"VIP":"3 homes, more orders, more auction sells, /workbench for crafting table, own kit",

"Maple":"4 homes, more orders, more auction sells, /anvil for anvil, /smithing table for smithing table, own kit",

"Cherry":"5 homes, more orders, more auction sells, /grindstone, /stonecutter, own kit",

"Cherry+":"5 homes, more auction sells, more orders, /ec for enderchest, /loom for loom, cherry kit, gets cherries every minute everywhere",

"Snow Crate":"Basic diamond gear with worst enchants",

"Ocean Crate":"Diamond gear with decent enchants + Heart of Sea",

"Slime Crate":"7 kinds of spawners",

"Maple Crate":"Best diamond gear possible with best enchants + best trident",

"Cherry Crate":"Best Netherite armor with maxed maces and spear and piglin head",

"Cherry Driller":"Mines 3x3",

"Cherry Cutter":"Breaks trees in 1 shot",

"Cherry Eater":"Breaks gravel, sand, dirt etc. 3x3",

"Pro Bundle":"VIP rank + Maple Crate + Ocean Crate",

"Cherry Bundle":"Cherry rank + Cherry Crate + Maple Crate",

"Spring Bundle":"Spring rank + 3 Cherry Crates"

};

function showInfo(item){

  document.getElementById("modalTitle").textContent = item;

  document.getElementById("modalDesc").textContent =
    infoData[item] || "No info available";

  document.getElementById("infoModal").style.display = "block";

}

function closeModal(){

  document.getElementById("infoModal").style.display = "none";

}

window.onclick = function(event){

  if(event.target == document.getElementById("infoModal")){
    closeModal();
  }

};
