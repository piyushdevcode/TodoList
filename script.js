const addBtn = document.querySelector(".add-btn");
const emptyBtn = document.querySelector(".empty-btn");
const clearBtn = document.querySelector(".clear-btn");
const saveBtn = document.querySelector(".save-btn");
const saveFileBtn = document.querySelector(".saveFile-btn");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list")
const tarea = document.querySelector(".tarea");
var firstTaskToggle = true;

//# appending New Tasks 
addBtn.addEventListener('click',function(){
    
    if(input.value === ""){
        alert("Enter some task");
    }
    else{
        if(firstTaskToggle){
            todoList.removeChild(document.querySelector(".todo-list li"));
            firstTaskToggle = !firstTaskToggle;
        }    
        todoList.innerHTML += `<li>${input.value}</li>`;
        input.value ="";
    }
});
//# Clearing all the tasks
emptyBtn.addEventListener('click',function(){
    let resp = confirm("Are you sure you want to clear all");
    if(resp){
        todoList.innerHTML = `<li>Dummy Todo Item</li>`;
        input.value ="";
        tarea.style.display ="none";
        saveFileBtn.style.display ="none";
    }
});
//# remove the tasks which are completed
clearBtn.addEventListener("click",()=>{
    const completedTasks = document.querySelectorAll("li.done");
    if(completedTasks.length ===0){
        alert("First do some tasks lazy")
    }
    else{
        completedTasks.forEach(task => {
            todoList.removeChild(task);
            
        })};
    })
//## Adding strikethrough to done items [FIX: Not working due to dyanmic additions of elements]
// tasks.forEach(task => {
    //     task.addEventListener("dblclick",()=> {
        //         console.log(task);
        //     })
        
        // });
//# Strikethrough a task on dblclick to mark as done and vice-versa
document.body.addEventListener('dblclick',event=>{
    if(event.target.tagName === "LI" && event.target.classList.contains("done")){
        event.target.classList.remove("done");
    }
    else if(event.target.tagName === "LI"){
        event.target.classList.add("done");
        // console.log(event.target.tagName+"\n"+(event.target.tagName=="li"));
    }
    else if(event.target.tagName ==="TEXTAREA"){
        console.log("YO");
        tarea.select();
    }
})
//# Show the given tasks in textarea 
saveBtn.addEventListener("click",()=>{
    tarea.style.display ="block";
    saveFileBtn.style.display ="inline-block";
    tarea.innerText ="";
    
    let textContent = document.createTextNode(parseTasks());
    tarea.appendChild(textContent);
})
            
//# Retrieve tasks and format it 
const parseTasks =()=>{
    let content= "";
    let counter = 0;
    const tasks = document.querySelectorAll(".todo-list > *");
    tarea.setAttribute("rows",tasks.length + 1);
    tasks.forEach(task=>{
        console.log(task.innerText);
        counter += 1;
        content += counter + ") ";
        content += task.innerText;
        if(task.classList.contains("done")){
            content += ": COMPLETED";
        }
        else{
            
            content += ": INCOMPLETE";
        }
        content+= "\n";
    })
    return content;
}

//# Save tasks as a text file 
saveFileBtn.addEventListener("click",()=>{
    
    let date = new Date();
    // date = date.toISOString().substring(0,10);
    date = date.toISOString().substr(0,10)  +"(" +date.toTimeString().substr(0,8) +")";
    console.log(date);    
    const fileName = "tasks_" + date +".txt";
    var saveLink = document.createElement("a");
    saveLink.setAttribute("href","data:text/plain; charset=utf-8," +encodeURIComponent(tarea.value));
    saveLink.setAttribute("download",fileName);
    saveLink.style.display ="none";
    document.body.appendChild(saveLink);
    saveLink.click();
    document.body.removeChild(saveLink);
});