import{searchProducts,filterProducts,sortProducts,getAllProducts,displayProducts}from"./products.js";

export function initializeSearch(){
const search=document.getElementById("search");
const category=document.getElementById("category");
const sort=document.getElementById("sort");
const reset=document.getElementById("reset");

if(search){
search.addEventListener("input",()=>searchProducts(search.value));
}
if(category){
category.addEventListener("change",()=>filterProducts(category.value));
}

if(sort){
sort.addEventListener("change",()=>sortProducts(sort.value));
}

if(reset){
reset.addEventListener("click",()=>{
if(search)search.value="";
if(category)category.value="all";
if(sort)sort.value="default";
displayProducts(getAllProducts());
});
}
}