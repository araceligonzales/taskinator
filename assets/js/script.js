//these variables link the elements from the html
var formEl = document.querySelector("#task-form");
var tasksTodoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content")
var tasks = [];
//the task handler function tells the page WHAT to do after its listener is triggered
//and must be defined first.
var taskFormHandler = function(event){
    
 //the event argument tells the browser to NOT do its usual behavior
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name'").value;
    var taskTypeInput = document.querySelector("select[name='task-type'").value;
    var isEdit = formEl.hasAttribute("data-task-id");
//package data as object
var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do"
};

  //check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
}

formEl.reset();


//send as argument to createTaskEl
if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
}
else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    createTaskEl(taskDataObj);
}
};

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i=0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task updated");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var taskStatusChangeHandler = function(event) {
console.log(event.target, event.target.getAttribute("data-task-id"));
    var taskId = event.target.getAttribute("data-task-id");

    var statusValue = event.target.value.toLowerCase();

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksTodoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected)
    }
    for (var i = 0; i <tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
};

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);
//delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(statusSelectEl);

var statusChoices = ["To Do", "In Progress", "Completed"];
for(var i = 0; i <statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
}

return actionContainerEl;
}

var createTaskEl = function(taskDataObj){
        //creates list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
     //add class id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

     //create div to hold task info and add to list item 
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
     //add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

     //add entire list item to list
    tasksTodoEl.appendChild(listItemEl);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

     //increase task counter for next unique id
    taskIdCounter++
}

var editTask = function(taskId){
    var taskSelected= document.querySelector(".task-item[data-task-id='" + taskId + "']");
// get content from task name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;
console.log(taskName);

var taskType = taskSelected.querySelector("span.task-type").textContent;
console.log(taskType);

document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent="Save Task";
formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId){
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
        taskSelected.remove();

    var updatedTaskArr = [];

    for (var i = 0; i <tasks.length; i++){
        if(tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;
};

var taskButtonHandler = function(event){
//get target elements from event
var targetEl = event.target;

//edit button was clicked 
if (targetEl.matches(".edit-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId)
}

//delete button gets clicked 
else if(targetEl.matches(".delete-btn")){
    //get elements task id
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
}
};

//this is what the webpage is looking to see if it will happen aka the trigger.

pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
