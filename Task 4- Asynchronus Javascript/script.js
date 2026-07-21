const cityInput=document.getElementById("cityInput");
const searchBtn=document.getElementById("searchBtn");
const cityName=document.getElementById("cityName");
const country=document.getElementById("country");
const temperature=document.getElementById("temperature");
const feelsLike=document.getElementById("feelsLike");
const humidity=document.getElementById("humidity");

const windSpeed=document.getElementById("windSpeed");
const pressure=document.getElementById("pressure");
const visibility=document.getElementById("visibility");
const clouds=document.getElementById("clouds");
const sunrise=document.getElementById("sunrise");
const sunset=document.getElementById("sunset");
const condition=document.getElementById("condition");
const weatherIcon=document.getElementById("weatherIcon");
const currentDate=document.getElementById("currentDate");
const currentTime=document.getElementById("currentTime");
const errorMessage=document.getElementById("errorMessage");

function updateClock(){
const now=new Date();
currentDate.textContent=now.toLocaleDateString();
currentTime.textContent=now.toLocaleTimeString();
}

setInterval(updateClock,1000);
updateClock();

const weatherCodes={
0:"Clear Sky",
1:"Mainly Clear",
2:"Partly Cloudy",
3:"Overcast",
45:"Fog",
48:"Depositing Rime Fog",
51:"Light Drizzle",
53:"Moderate Drizzle",
55:"Dense Drizzle",
61:"Slight Rain",
63:"Moderate Rain",
65:"Heavy Rain",
71:"Snow Fall",
80:"Rain Showers",
95:"Thunderstorm"
};

async function getCoordinates(city){
const response=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);

if(!response.ok){
throw new Error("Network Error");
}

const data=await response.json();
if(!data.results){
throw new Error("City Not Found");
}
return data.results[0];
}
async function getWeather(city){

try{
errorMessage.textContent="";
const location=await getCoordinates(city);
cityName.textContent=location.name;
country.textContent=location.country;
const response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,cloud_cover,weather_code&daily=sunrise,sunset&timezone=auto`);

if(!response.ok){
throw new Error("Weather Data Not Available");
}
const data=await response.json();

temperature.textContent=Math.round(data.current.temperature_2m)+"°C";
feelsLike.textContent=Math.round(data.current.apparent_temperature)+"°C";
humidity.textContent=data.current.relative_humidity_2m+"%";
windSpeed.textContent=data.current.wind_speed_10m+" km/h";
pressure.textContent=data.current.pressure_msl+" hPa";
clouds.textContent=data.current.cloud_cover+"%";
visibility.textContent="Available";
condition.textContent=weatherCodes[data.current.weather_code]||"Unknown";

sunrise.textContent=new Date(data.daily.sunrise[0]).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});

sunset.textContent=new Date(data.daily.sunset[0]).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});

const code=data.current.weather_code;
if(code===0){
weatherIcon.src="https://openweathermap.org/img/wn/01d@2x.png";
}
else if(code<=3){
weatherIcon.src="https://openweathermap.org/img/wn/03d@2x.png";
}
else if(code<=65){
weatherIcon.src="https://openweathermap.org/img/wn/10d@2x.png";
}
else if(code<=80){
weatherIcon.src="https://openweathermap.org/img/wn/13d@2x.png";
}
else{
weatherIcon.src="https://openweathermap.org/img/wn/11d@2x.png";
}

}catch(error){
errorMessage.textContent=error.message;
}
}
searchBtn.addEventListener("click",()=>{
const city=cityInput.value.trim();

if(city===""){
errorMessage.textContent="Please enter a city name.";
return;
}
getWeather(city);
});

cityInput.addEventListener("keypress",e=>{
if(e.key==="Enter"){
const city=cityInput.value.trim();

if(city===""){
errorMessage.textContent="Please enter a city name.";
return;
}
getWeather(city);
}
});

window.addEventListener("load",()=>{
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(

async(position)=>{
const lat=position.coords.latitude;
const lon=position.coords.longitude;

try{
const response=await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`);
const place=await response.json();

if(place.results && place.results.length>0){
getWeather(place.results[0].name);
}else{
getWeather("Delhi");
}

}catch{
getWeather("Delhi");
}
},

()=>{
getWeather("Delhi");
}

);
}else{
getWeather("Delhi");
}
});