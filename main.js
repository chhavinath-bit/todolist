function getTodoData(){
    let todoDataFile=   JSON.parse(localStorage.getItem("todoData"));
    if(todoDataFile===null){
        return [];
    }
    else{
        return todoDataFile;
    }
}
let todoListItems= getTodoData();
    // {
    //     text:"Learn HTML",
    //     uniqueNum:0
    // },
    // {
    //     text:"Learn CSS",
    //     uniqueNum:1
    // },
    // {
    //     text:"complete static website course",
    //     uniqueNum:2
    // },
    // {
    //     text:"complete responsive website course",
    //     uniqueNum:3
    // },
    // {
    //     text:"complete dynamic website course",
    //     uniqueNum:4
    // },
    // {
    //     text:"make todo list",
    //     uniqueNum:5
    // },

function onClickAdd(){
 let userInput= document.getElementById("userInputId");
 let userInputValue = userInput.value;
 if(userInputValue===""){
    alert("Enter a valid text");
    return;
 }
 arrSize = todoListItems.length;
 let newTodo={
    text:userInputValue,
    uniqueNum:arrSize,
    isCheked:false
 };
 todoListItems.push(newTodo);
 createAndAppend(newTodo);
 userInput.value= "";
}
function delete_todo(todoItemContainer, todoId){
    let todoElement= document.getElementById(todoId);
    todoItemContainer.removeChild(todoElement);
    let indexOfArray= todoListItems.findIndex(
    function(eachTodo){
        let eachTodoId= "todo"+eachTodo.uniqueNum;
        if(eachTodoId===todoId){
            return true;
        } 
        else{
            return false;
        }
    }
   
    );
    todoListItems.splice(indexOfArray,1);
    onClickSave();

}
function onClickSave(){
    localStorage.setItem("todoData",JSON.stringify(todoListItems));
}
function checkTheCheckbox(checkBoxId, labelId, todoId){
    // let checkboxelement= document.getElementById(checkBoxId);
    let todositem= document.getElementById(labelId);
    // console.log(checkboxelement.checked);
    // if(checkboxelement.checked===true){
        // console.log("add");
    //    todositem.classList.add("checked");
       todositem.classList.toggle("checked");
    // }
    // else{
        // console.log("remove");
        // todositem.classList.remove("checked");
    // }
   let arrIndex= todoListItems.findIndex(function(eachTodo){
    let eachTodoId= "todo"+eachTodo.uniqueNum;
    if(eachTodoId===todoId){
        return true;
    } 
    else{
        return false;
    }
   });
   let todoObject= todoListItems[arrIndex];
   if(todoObject.isCheked===true){
    todoObject.isCheked=false;
   }
   else{
    todoObject.isCheked=true;
   }
}
// let bgElement= document.getElementById("bgcontainer");
// // console.log(parseInt(bgElement.style.height-"vh"));
// bgheight=parseInt(bgElement.style.height)/2;
function createAndAppend(todos)
{
let todoId= "todo"+todos.uniqueNum;
let todoItemContainer=document.getElementById("todoitemcontainer");

let listItem = document.createElement("li");
listItem.classList.add("d-flex" , "flex-row");
listItem.id= todoId;
todoItemContainer.appendChild(listItem);

let checkBoxId= "checkbox"+todos.uniqueNum;
let labelId="label"+todos.uniqueNum;
let inputItem= document.createElement("input");
inputItem.type="checkbox";
inputItem.id= checkBoxId;
inputItem.classList.add("check_box_input");
listItem.appendChild(inputItem);
let listContainer= document.createElement("div");
listContainer.classList.add("d-flex" ,"flex-row" ,"list_container", "mb-2");
listItem.appendChild(listContainer);
let labelname= document.createElement("label");
labelname.setAttribute("for",checkBoxId);
labelname.classList.add("label_containers");
labelname.textContent=todos.text;
labelname.id=labelId;
listContainer.appendChild(labelname);
// listItem.style.textDecoration= "line-through";
inputItem.checked=todos.isCheked;
if(todos.isCheked === true){
    labelname.classList.add("checked");
}
else{
    labelname.classList.remove("checked");
}
inputItem.onclick = function(){
    checkTheCheckbox(checkBoxId,labelId, todoId);
    // labelname.style.textDecoration= "line-through";
};
let trashContainer=document.createElement("div");
trashContainer.classList.add("deleted_trash");
listContainer.appendChild(trashContainer);
let deletedIcon= document.createElement("i");
deletedIcon.classList.add("fa-solid","fa-trash-can","trash_container");
trashContainer.appendChild(deletedIcon);
deletedIcon.onclick= function(){
    delete_todo(todoItemContainer, todoId);
}

}

for(let todos of todoListItems){
    createAndAppend(todos)
}
// checkTheCheckbox("checkbox"+2,"label"+2 )

// document.getElementById("label"+2).style.textDecoration="line-through";
