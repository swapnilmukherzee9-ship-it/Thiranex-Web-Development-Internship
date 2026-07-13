document.addEventListener("DOMContentLoaded",()=>{
const toggle=document.getElementById("theme-toggle");
if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
if(toggle) toggle.textContent="☀️";
}

if(toggle){
toggle.addEventListener("click",()=>{
document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
toggle.textContent="☀️";
}else{
localStorage.setItem("theme","light");
toggle.textContent="🌙";
}
});
}
const form=document.getElementById("contactForm");

if(form){
form.addEventListener("submit",function(e){
e.preventDefault();
const name=document.getElementById("name").value.trim();
const email=document.getElementById("email").value.trim();
const subject=document.getElementById("subject").value.trim();
const message=document.getElementById("message").value.trim();

if(name===""||email===""||subject===""||message===""){
alert("Please fill in all fields.");
return;
}

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailPattern.test(email)){
alert("Please enter a valid email address.");
return;
}

alert("Your message has been sent successfully!");
form.reset();
});
}
});