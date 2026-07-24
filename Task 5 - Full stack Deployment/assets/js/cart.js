let cart=JSON.parse(localStorage.getItem("cart"))||[];

export function addToCart(product){
const exists=cart.find(item=>item.id===product.id);
if(exists){
exists.quantity++;
}else{
cart.push({...product,quantity:1});
}
saveCart();
updateCartCount();
renderCart();
showToast("Product added to cart");
}

export function removeFromCart(id){
cart=cart.filter(item=>item.id!==id);
saveCart();
updateCartCount();
renderCart();
}

export function increaseQuantity(id){
const item=cart.find(item=>item.id===id);
if(!item)return;
item.quantity++;
saveCart();
updateCartCount();
renderCart();
}

export function decreaseQuantity(id){
const item=cart.find(item=>item.id===id);
if(!item)return;
if(item.quantity>1){
item.quantity--;
}else{
removeFromCart(id);
return;
}
saveCart();
updateCartCount();
renderCart();
}

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

export function updateCartCount(){
const badge=document.querySelector(".cart-count");
if(!badge)return;
badge.textContent=cart.reduce((total,item)=>total+item.quantity,0);
}

export function getCart(){
return cart;
}

export function clearCart(){
cart=[];
saveCart();
updateCartCount();
renderCart();
}

export function renderCart(){
const container=document.getElementById("cart-items");
const totalElement=document.getElementById("cart-total");
if(!container)return;
container.innerHTML="";

if(cart.length===0){
container.innerHTML="<h2>Your cart is empty.</h2>";
if(totalElement)totalElement.textContent="$0.00";
return;
}

let total=0;
cart.forEach(item=>{
total+=item.price*item.quantity;
const card=document.createElement("div");
card.className="cart-item";

card.innerHTML=`<img src="${item.image}" alt="${item.name}"><div class="cart-info"><h3>${item.name}</h3><p>$${item.price}</p><div class="quantity"><button class="minus">-</button><span>${item.quantity}</span><button class="plus">+</button></div></div><button class="remove-btn"><i class="fa-solid fa-trash"></i></button>`;
card.querySelector(".minus").addEventListener("click",()=>decreaseQuantity(item.id));
card.querySelector(".plus").addEventListener("click",()=>increaseQuantity(item.id));
card.querySelector(".remove-btn").addEventListener("click",()=>removeFromCart(item.id));
container.appendChild(card);

});
if(totalElement)totalElement.textContent="$"+total.toFixed(2);
}

function showToast(message){
const toast=document.querySelector(".toast");
if(!toast)return;
toast.textContent=message;
toast.classList.add("show");
setTimeout(()=>toast.classList.remove("show"),2000);
}

document.addEventListener("DOMContentLoaded",()=>{
updateCartCount();
renderCart();
});