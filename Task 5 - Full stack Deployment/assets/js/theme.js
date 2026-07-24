export function loadTheme(){
const savedTheme=localStorage.getItem("theme");
if(savedTheme==="dark"){
document.body.classList.add("dark");
}

updateThemeIcon();
const themeBtn=document.querySelector(".theme-btn");
if(themeBtn){
themeBtn.addEventListener("click",toggleTheme);
}
}

function toggleTheme(){
document.body.classList.toggle("dark");
if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
}else{
localStorage.setItem("theme","light");
}
updateThemeIcon();
}

function updateThemeIcon(){
const icon=document.querySelector(".theme-btn i");
if(!icon)return;
if(document.body.classList.contains("dark")){
icon.className="fa-solid fa-sun";
}else{
icon.className="fa-solid fa-moon";
}
}