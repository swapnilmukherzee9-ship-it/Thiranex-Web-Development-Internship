export function navigate(page){
window.location.href=page;
}

export function openProduct(id){
window.location.href=`product.html?id=${id}`;
}

export function goHome(){
window.location.href="index.html";
}

export function goCart(){
window.location.href="cart.html";
}

export function goAbout(){
window.location.href="about.html";
}

export function goContact(){
window.location.href="contact.html";
}

export function goProducts(){
window.location.href="products.html";
}

export function goBack(){
window.history.back();
}

export function reloadPage(){
window.location.reload();
}

window.navigate=navigate;
window.openProduct=openProduct;
window.goHome=goHome;
window.goCart=goCart;
window.goAbout=goAbout;
window.goContact=goContact;
window.goProducts=goProducts;
window.goBack=goBack;
window.reloadPage=reloadPage;