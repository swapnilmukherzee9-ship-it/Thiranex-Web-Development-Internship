import{loadProducts}from"./products.js";
import{initializeSearch}from"./search.js";
import{updateCartCount,renderCart}from"./cart.js";
import{loadTheme}from"./theme.js";

document.addEventListener("DOMContentLoaded",async()=>{
loadTheme();
updateCartCount();

if(document.getElementById("products")){
await loadProducts();
initializeSearch();
}

if(document.getElementById("cart-items")){
renderCart();
}
});