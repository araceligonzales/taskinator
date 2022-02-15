//these variables link the elements from the html
var formEl = document.querySelector("#task-form");
var tasksTodoEl = document.querySelector("#tasks-to-do");

//the task handler function tells the page WHAT to do after its listener is triggered
//and must be defined first.
var taskFormHandler = function(event){
    
 //the event argument tells the browser to NOT do its usual behavior
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name'").value;
    var taskTypeInput = document.querySelector("select[name='task-type'").value;
//package data as object
var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
};

//send as argument to createTaskEl
createTaskEl(taskDataObj);
   
};

var createTaskEl = function(taskDataObj){
   
     //creates list item
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";
     //create div to hold task info and add to list item 
     var taskInfoEl = document.createElement("div");
     taskInfoEl.className = "task-info";
     //add html content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
 
     listItemEl.appendChild(taskInfoEl);
 
     //add entire list item to list
     tasksTodoEl.appendChild(listItemEl);
}

//this is what the webpage is looking to see if it will happen aka the trigger.
formEl.addEventListener("submit", taskFormHandler);