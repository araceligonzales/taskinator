//these variables link the elements from the html
var formEl = document.querySelector("#task-form");
var tasksTodoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
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

  //check if input values are empty strings
  if(!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
  }
  formEl.reset();


//send as argument to createTaskEl
createTaskEl(taskDataObj);
   
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

     //increase task counter for next unique id
     taskIdCounter++
}

//this is what the webpage is looking to see if it will happen aka the trigger.
formEl.addEventListener("submit", taskFormHandler);