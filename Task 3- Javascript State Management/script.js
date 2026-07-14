let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}
function updateTaskCount(){
const activeTasks = tasks.filter(task => !task.completed).length;
taskCount.textContent = `${activeTasks} Task${activeTasks !== 1 ? "s" : ""} Remaining`;
}

function renderTasks(){
taskList.innerHTML = "";
let filteredTasks = tasks;

if(currentFilter === "active"){
filteredTasks = tasks.filter(task => !task.completed);
}
if(currentFilter === "completed"){
filteredTasks = tasks.filter(task => task.completed);
}

filteredTasks.forEach((task,index)=>{
const li = document.createElement("li");
if(task.completed){
li.classList.add("completed");
}

li.innerHTML = `
<span class="task-text">${task.text}</span>
<div class="task-actions">
<button class="complete-btn" data-index="${index}"> ✓ </button>
<button class="edit-btn" data-index="${index}"> Edit </button>
<button class="delete-btn" data-index="${index}"> Delete </button>

</div>
`;
taskList.appendChild(li);
});
updateTaskCount();
saveTasks();
}

function addTask(){
const text=taskInput.value.trim();
if(text===""){
alert("Please enter a task.");
return;
}

tasks.push({text:text,completed:false});
taskInput.value="";
renderTasks();
}

addTaskBtn.addEventListener("click",addTask);
taskInput.addEventListener("keypress",function(e){
if(e.key==="Enter"){
addTask();
}
});

taskList.addEventListener("click",function(e){
const index=e.target.dataset.index;
if(e.target.classList.contains("complete-btn")){
tasks[index].completed=!tasks[index].completed;
renderTasks();
}

if(e.target.classList.contains("delete-btn")){
tasks.splice(index,1);
renderTasks();
}

if(e.target.classList.contains("edit-btn")){
const updatedTask=prompt("Edit your task:",tasks[index].text);
if(updatedTask!==null&&updatedTask.trim()!==""){
tasks[index].text=updatedTask.trim();
renderTasks();
}
}
});

filterButtons.forEach(button=>{
button.addEventListener("click",()=>{
filterButtons.forEach(btn=>btn.classList.remove("active"));
button.classList.add("active");
currentFilter=button.dataset.filter;
renderTasks();
});
});

clearCompletedBtn.addEventListener("click",function(){
tasks=tasks.filter(task=>!task.completed);
renderTasks();
});
window.addEventListener("load",function(){
renderTasks();
});