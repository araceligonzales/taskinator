//these variables link the elements from the html
var formEl = document.querySelector("#task-form");
var tasksTodoEl = document.querySelector("#tasks-to-do");

//the task handler function tells the page WHAT to do after its listener is triggered
//and must be defined first.
var createTaskHandler = function(){
 //the event argument tells the browser to NOT do its usual behavior
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is the new task.";
    tasksTodoEl.appendChild(listItemEl);
};

//this is what the webpage is looking to see if it will happen aka the trigger.
formEl.addEventListener("submit", createTaskHandler);