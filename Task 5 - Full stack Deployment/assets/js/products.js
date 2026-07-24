import {addToCart} from "./cart.js";
let products=[];
let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];
const productContainer=document.getElementById("products");

export async function loadProducts(){
try{
const response=await fetch("data/products.json");
if(!response.ok)throw new Error("Failed to load products");
products=await response.json();
displayProducts(products);
}catch(error){
console.error(error);
if(productContainer){
productContainer.innerHTML="<h2>Failed to load products.</h2>";
}
}
}

export function displayProducts(data){
if(!productContainer)return;
productContainer.innerHTML="";
if(data.length===0){
productContainer.innerHTML="<h2>No Products Found</h2>";
return;
}

data.forEach(product=>{
const card=document.createElement("div");
card.className="product-card";
card.innerHTML=`
<span class="badge">${product.badge}</span>
<div class="product-placeholder">
<i class="fa-solid fa-box-open"></i>
</div>

<div class="product-content">
<p class="product-category">${product.category}</p>
<h3 class="product-title">${product.name}</h3>

<div class="product-rating">
${createStars(product.rating)}
<span>${product.rating}</span>
</div>

<div class="product-price">
<span class="current-price">$${product.price}</span>
<span class="old-price">$${product.oldPrice}</span>
</div>

<div class="product-actions">
<button class="add-cart">Add To Cart</button>
<button class="wishlist-btn">
<i class="fa-solid fa-heart"></i>
</button>
</div>
</div>
`;

card.querySelector(".add-cart").addEventListener("click",e=>{
e.stopPropagation();
addToCart(product);
});

card.querySelector(".wishlist-btn").addEventListener("click",e=>{
e.stopPropagation();
addWishlist(product);
});

card.addEventListener("click",()=>{
window.location.href=`product.html?id=${product.id}`;
});
productContainer.appendChild(card);
});
}

function createStars(rating){
let stars="";
const full=Math.floor(rating);

for(let i=0;i<full;i++){
stars+='<i class="fa-solid fa-star"></i>';
}

if(rating-full>=0.5){
stars+='<i class="fa-solid fa-star-half-stroke"></i>';
}

const total=(stars.match(/fa-star/g)||[]).length;
for(let i=total;i<5;i++){
stars+='<i class="fa-regular fa-star"></i>';
}
return stars;
}

export function searchProducts(keyword){
keyword=keyword.toLowerCase().trim();
const filtered=products.filter(product=>
product.name.toLowerCase().includes(keyword)||
product.category.toLowerCase().includes(keyword)
);
displayProducts(filtered);
}

export function filterProducts(category){
if(category==="all"){
displayProducts(products);
return;
}
const filtered=products.filter(product=>product.category===category);
displayProducts(filtered);
}

export function sortProducts(type){
let sorted=[...products];
switch(type){

case"low":
sorted.sort((a,b)=>a.price-b.price);
break;

case"high":
sorted.sort((a,b)=>b.price-a.price);
break;

case"rating":
sorted.sort((a,b)=>b.rating-a.rating);
break;

case"name":
sorted.sort((a,b)=>a.name.localeCompare(b.name));
break;

default:
break;
}
displayProducts(sorted);
}

function addWishlist(product){
const exists=wishlist.find(item=>item.id===product.id);
if(exists){
alert("Already in Wishlist");
return;
}

wishlist.push(product);
localStorage.setItem("wishlist",JSON.stringify(wishlist));
alert("Added to Wishlist");
}

export function getProduct(id){
return products.find(product=>product.id==id);
}
export function getProducts(){
return products;
}
export function getRelatedProducts(category,currentId){
return products.filter(product=>product.category===category&&product.id!==currentId);
}

export function displayRelatedProducts(category,currentId){
const container=document.getElementById("related-products");
if(!container)return;
container.innerHTML="";

const related=getRelatedProducts(category,currentId);
related.slice(0,4).forEach(product=>{
const card=document.createElement("div");
card.className="product-card";

card.innerHTML=`
<div class="product-image">
<img src="${product.image}" alt="${product.name}">
</div>
<div class="product-content">
<p class="product-category">${product.category}</p>
<h3 class="product-title">${product.name}</h3>
<div class="product-price">
<span class="current-price">$${product.price}</span>
</div>
</div>
`;

card.addEventListener("click",()=>{
window.location.href=`product.html?id=${product.id}`;
});
container.appendChild(card);
});
}

export function loadProductDetails(){
const params=new URLSearchParams(window.location.search);
const id=parseInt(params.get("id"));
if(!id)return;
const product=getProduct(id);
if(!product)return;

const image=document.getElementById("product-image");
const title=document.getElementById("product-title");
const category=document.getElementById("product-category");
const price=document.getElementById("product-price");
const oldPrice=document.getElementById("product-old-price");
const rating=document.getElementById("product-rating");
const badge=document.getElementById("product-badge");
const discount=document.getElementById("product-discount");

if(image)image.src=product.image;
if(title)title.textContent=product.name;
if(category)category.textContent=product.category;
if(price)price.textContent="$"+product.price;
if(oldPrice)oldPrice.textContent="$"+product.oldPrice;
if(rating)rating.innerHTML=createStars(product.rating)+" "+product.rating;
if(badge)badge.textContent=product.badge;

const percent=Math.round(((product.oldPrice-product.price)/product.oldPrice)*100);
if(discount)discount.textContent=percent+"% OFF";
displayRelatedProducts(product.category,product.id);
}

export function showLoader(){
const loader=document.querySelector(".loader");
if(loader){
loader.style.display="block";
}
}

export function hideLoader(){
const loader=document.querySelector(".loader");
if(loader){
loader.style.display="none";
}
}

export async function reloadProducts(){
showLoader();
try{
const response=await fetch("data/products.json");

if(!response.ok)throw new Error("Failed");
products=await response.json();
displayProducts(products);
}catch(error){

console.error(error);
if(productContainer){
productContainer.innerHTML="<h2>Unable to load products.</h2>";
}
}
hideLoader();
}

export function resetProducts(){
displayProducts(products);
}
export function getAllProducts(){
return products;
}

window.addEventListener("DOMContentLoaded",()=>{
if(document.getElementById("product-title")){
loadProductDetails();
}
});