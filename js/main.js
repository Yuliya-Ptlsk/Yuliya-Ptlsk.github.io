'use strict'
// show/hide Add menu
var toggleBtn = document.querySelector('.add-handler__angle');
var addMenu = document.querySelector('.add-menu');
function toggleDisplay() {
    if (!toggleBtn.classList.contains('active')) {
        addClass(toggleBtn,'active');
        addClass(addMenu, 'active')
    } else {
        removeClass(toggleBtn,'active');
        removeClass(addMenu, 'active');
    }
}
function addClass(elem, initClass){
    elem.classList.add(initClass)
}
function removeClass(elem, initClass){
    elem.classList.remove(initClass)
}
toggleBtn.addEventListener('click',toggleDisplay, false);

//global variables
var taskName= document.getElementById('taskName');
var taskDescription = document.getElementById('taskDescription');
/*var taskPriority = document.getElementById('taskPriority');*/
var addBtn = document.getElementById('addBtn');
var toDoList = document.getElementById('toDoList');
var toDoCount = document.getElementById('toDoCount');
var comleteList = document.getElementById('completeList');
var completeCount = document.getElementById('completeCount');
var sortDateTopBtn = document.getElementById('sort-date-top');
var sortDateBottomBtn = document.getElementById('sort-date-bottom');
var sortPriorityTopBtn = document.getElementById('sort-priority-top');
var sortPriorityBottomBtn = document.getElementById('sort-priority-bottom');
//describe function which create list item (li)
function createListItem(title,description,date,priority){
    var listItem = document.createElement('li');
    var itemInner = document.createElement('div');
    itemInner.className = 'item-inner';
    var itemInnerCheck = document.createElement('div');
    itemInnerCheck.className = 'item-inner__check';
    var itemCheckbox = document.createElement('input');
    itemCheckbox.setAttribute('type','checkbox');
    itemCheckbox.className = 'list-checkbox';
    var itemInnerText = document.createElement('div');
    itemInnerText.className = 'item-inner__text';
    var div_1 = document.createElement('div');
    var titleInput = document.createElement('input');
    titleInput.setAttribute('type','text');
    titleInput.setAttribute('readonly','');
    var div_2 = document.createElement('div');
    var descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('type','text');
    descriptionInput.setAttribute('readonly','');
    var itemInnerDoings = document.createElement('div');
    itemInnerDoings.className = 'item-inner__doings';
    var div_3 = document.createElement('div');
    var iconClock = document.createElement('span');
    iconClock.className = 'icon-clock';
    var dateCreate = document.createElement('span');
    var dateComplete =  document.createElement('span');
    var priorityBlock = document.createElement('div');
    var div_4 = document.createElement('div');
    var iconEdit = document.createElement('span');
    iconEdit.className = 'icon-document-edit';
    var iconChecked = document.createElement('span');
    iconChecked.className = 'icon-document-checked';
    var div_5 = document.createElement('div');
    var iconTrash = document.createElement('span');

    iconTrash.className = 'icon-trash';
    listItem.appendChild(itemInner);
    itemInner.appendChild(itemInnerCheck);
    itemInnerCheck.appendChild(itemCheckbox);
    itemInner.appendChild(itemInnerText);
    itemInnerText.appendChild(div_1);
    itemInnerText.appendChild(div_2);
    div_1.appendChild(titleInput);
    div_2.appendChild(descriptionInput);
    itemInner.appendChild(itemInnerDoings);
    itemInnerDoings.appendChild(div_3);
    div_3.appendChild(iconClock);
    div_3.appendChild(dateCreate);
    div_3.appendChild(dateComplete);
    itemInnerDoings.appendChild(priorityBlock);
    itemInnerDoings.appendChild(div_4);
    div_4.appendChild(iconEdit);
    div_4.appendChild(iconChecked);
    itemInnerDoings.appendChild(div_5);
    div_5.appendChild(iconTrash);

    titleInput.setAttribute('value',title);
    descriptionInput.setAttribute('placeholder',description);
    dateCreate.innerHTML = date;
    priorityBlock.innerHTML = priority;

    return listItem;
}
//describe function which add task in toDo list
function addTask(){
    var taskNameValue = taskName.value;
    var taskDescriptionValue = taskDescription.value;
    var priorityValue = document.querySelector('input[name="priority"]:checked').value;
    var creationTime = getTimeInfo();
    var milisec = getMilisecInfo();
    var li = createListItem(taskNameValue,taskDescriptionValue,creationTime,priorityValue);
    if(taskNameValue =='' || taskDescriptionValue ==''){
        return;
    } else {
        toDoList.appendChild(li);
        li.setAttribute('data-milisec',milisec);
        taskName.value='';
        taskDescription.value='';
    }
}
//describe function which get actual time and date
function getTimeInfo(){
    var year = new Date().getFullYear().toString().slice(2);
    var month = new Date().getMonth()+1;
    var day = new Date().getDate();
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    return formatData(day,2)+'.'+formatData(month,2)+'.'+year+' '+formatData(hour,2)+':'+formatData(minutes,2);
}
//describe function which format time and date data
function formatData(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}
function getMilisecInfo(){
    var now = new Date().getTime();
    return now;
}
//describe function which count tasks in lists
function setCount(list, elem){
    var count = list.children.length;
    if (count !== 0){
        elem.innerHTML ='('+ count +')';
    } else if (count == 0) {
        elem.innerHTML = '';
    }
}
//describe function which move tasks from one list to another
function shiftListItem(){
    var checkbox = event.target;
    var list = checkbox.parentNode.parentNode.parentNode.parentNode;
    var listItem = checkbox.parentNode.parentNode.parentNode;
    var dateCreateBlock;
    var dateCompleteBlock;
    var priorityBlock;
    var editBlock;

    if (checkbox.classList.contains('list-checkbox') && list.classList.contains('to-do-list')){
        dateCreateBlock = checkbox.parentNode.nextSibling.nextSibling.firstChild.childNodes[1];
        dateCompleteBlock = checkbox.parentNode.nextSibling.nextSibling.firstChild.childNodes[2];
        priorityBlock = checkbox.parentNode.nextSibling.nextSibling.childNodes[1];
        editBlock = checkbox.parentNode.nextSibling.nextSibling.childNodes[2];
        toDoList.removeChild(listItem);
        comleteList.appendChild(listItem);
        setCount(toDoList,toDoCount);
        setCount(comleteList,completeCount);
        setCompleteElems();
    } else if (checkbox.classList.contains('list-checkbox') && list.classList.contains('complete-list')){
        dateCreateBlock = checkbox.parentNode.nextSibling.nextSibling.firstChild.childNodes[1];
        dateCompleteBlock = checkbox.parentNode.nextSibling.nextSibling.firstChild.childNodes[2];
        priorityBlock = checkbox.parentNode.nextSibling.nextSibling.childNodes[1];
        editBlock = checkbox.parentNode.nextSibling.nextSibling.childNodes[2];
        comleteList.removeChild(listItem);
        toDoList.appendChild(listItem);
        setCount(comleteList,completeCount);
        setCount(toDoList,toDoCount);
        setToDoElems();
    }
    //describe function which set required condition of elements in complete list from ToDo list
    function setCompleteElems(){
        var dateComplete = getTimeInfo();
        dateCreateBlock.style.display = 'none';
        dateCompleteBlock.innerHTML = dateComplete;
        dateCompleteBlock.style.display = 'inline-block';
        priorityBlock.style.display = 'none';
        editBlock.style.display = 'none';
    }
    //describe function which set required condition of elements in ToDo list from complete list
    function setToDoElems(){
        dateCreateBlock.style.display = 'inline-block';
        dateCompleteBlock.style.display = 'none';
        priorityBlock.style.display = 'block';
        editBlock.style.display = 'block';
    }
}
//describe function which delete list item (li)
function removeListItem(){
    var removeBtn = event.target;
    var list = removeBtn.parentNode.parentNode.parentNode.parentNode.parentNode;
    var listItem = removeBtn.parentNode.parentNode.parentNode.parentNode;
    if (removeBtn.classList.contains('icon-trash') && list.classList.contains('to-do-list')){
        list.removeChild(listItem);
        setCount(toDoList, toDoCount);
    } else if (removeBtn.classList.contains('icon-trash') && list.classList.contains('complete-list')){
        list.removeChild(listItem);
        setCount(comleteList, completeCount);
    }
}
//describe function which correct inner text in toDo tasks
function editListItem(){
    var editBtn = event.target;
    var input_1;
    var input_2;
    var inputs = [];
    if ( editBtn.classList.contains('icon-document-edit')){
        input_1 = editBtn.parentNode.parentNode.previousSibling.firstChild.firstChild;
        input_2 = editBtn.parentNode.parentNode.previousSibling.lastChild.firstChild;
        inputs.push(input_1,input_2);
        for (var i=0; i<inputs.length; i++) {
            inputs[i].removeAttribute('readonly');
            inputs[i].style.border = 'solid 1px rgba(96,110,120, 0.2)';
        }
        editBtn.style.display = 'none';
        editBtn.nextSibling.style.display = 'block';
    } else if (editBtn.classList.contains('icon-document-checked')){
        input_1 = editBtn.parentNode.parentNode.previousSibling.firstChild.firstChild;
        input_2 = editBtn.parentNode.parentNode.previousSibling.lastChild.firstChild;
        inputs.push(input_1,input_2);
        for (var l=0; l<inputs.length; l++) {
            inputs[l].setAttribute('readonly','');
            inputs[l].style.border = 'none';
        }
        editBtn.style.display = 'none';
        editBtn.previousSibling.style.display = 'block';
    }
}
//
/*function sortItemsByDate(){
    var dateArray=[];
    for (var i=0, k=1; i<toDoList.children.length, k<toDoList.childNodes.length; i++, k++){
        var hash={};
        var item = toDoList.childNodes[k];
        var milisec = toDoList.children[i].getAttribute('data-milisec');
        hash.elem = item;
        hash.data = milisec;
        dateArray.push(hash);
        console.log(item);
        console.log(milisec);
    }
   function  compareDate (a,b){
        return b.data-a.data;
    };
    return dateArray.sort(compareDate).reverse();

}*/
//describe events listeners
addBtn.onclick = function(){
    addTask();
    setCount(toDoList,toDoCount);
};
document.body.onchange = shiftListItem;
document.body.onclick = function(){
    removeListItem();
    editListItem();
};
/*sortDateTopBtn.onclick = function(){
    if(toDoList.children.length!==0){
        sortItemsByDate();
    }

};*/





