// /*---------- Query Selectors -----------*/
var inputTitle = document.querySelector('#input-title');
var inputTaskItem = document.querySelector('#input-item');
var inputSearch = document.querySelector('#input-search');
var outputArray = document.getElementsByClassName('sidebar__task-list');
var btnTaskListItemDelete = document.getElementsByClassName('img__task-delete');
var btnAddTask = document.querySelector('#add-task-icon');
var btnCreateTaskList = document.querySelector('#btn-make-task');
var btnClear = document.querySelector('#btn-clear');
var btnFilterUrgent = document.querySelector('#btn-filter-urgent') 
var cardTemplate = document.querySelector('template'); 
var outputTaskContainer = document.querySelector('.form__task-container');
var cardsArea = document.querySelector('main');
/*---------- Global Variables ----------*/
var lists = JSON.parse(localStorage.getItem('list-card')) || [];
/*---------- Event Listeners -----------*/
outputTaskContainer.addEventListener('click', removeSingleItem);
$('.form__task-container').on('click', () => {

})
btnAddTask.addEventListener('click', addTaskToList);

btnCreateTaskList.addEventListener('click', addTaskToArray);

btnClear.addEventListener('click', clearTaskListBtn);

btnFilterUrgent.addEventListener('click', toggleShowUrgent);

inputSearch.addEventListener('input', searchLists);
/*---------- Functions -----------------*/

$(document).ready(()=>{
    fetchLists();
    toggleNoLists();
})

// function startCheckYoSelf() {
//   fetchLists()
//   toggleNoLists()
// }

function fetchLists() {
  lists.forEach(element => addCardToDOM(element));
}

function toggleNoLists() {
  var hiddenMessage = document.querySelector('.no-ideas');
  if (lists.length === 0) {
    hiddenMessage.classList.remove('hidden');
    cardsArea.classList.remove("masonry-layout");
  } else {
    hiddenMessage.classList.add('hidden');
    cardsArea.classList.add('masonry-layout');
  }
}

function reinstateLists(i) {
  return new ToDoList(
    lists[i].id,
    lists[i].title,
    lists[i].tasks,
    lists[i].urgent
  );
}

function searchLists(e) {
  e.preventDefault()
  var searchQuery = inputSearch.value.toLowerCase();
  var searchResults = lists.filter(card => card.title.toLowerCase().includes(searchQuery));
  cardsArea.innerHTML = '';
  searchResults.forEach(list => addCardToDOM(list));
}

function toggleShowUrgent(e) {
  e.preventDefault()
  btnFilterUrgent.classList.toggle('urgent');
  if(btnFilterUrgent.classList.contains('urgent')) {
    var filterResults = lists.filter(list => list.urgent === true);
  } else {
    var filterResults = lists.filter(list => list.urgent === list.urgent)
  }
  cardsArea.innerHTML = "";
  filterResults.forEach(idea => addCardToDOM(idea));
}

function addTaskToList(e) {
  e.preventDefault()
  if(inputTaskItem.value){
    outputTaskContainer.innerHTML += `<li class="sidebar__task-list"><img src="images/delete.svg" class="card__task-ico img__task-delete"><p contenteditable="true">${inputTaskItem.value}<p></li>`
    inputTaskItem.value = '';
  }
}

function removeSingleItem(e) {
  if (e.target.matches('.img__task-delete')) {
    e.target.closest('li').remove()
  }
}

function addTaskToArray(e){
  e.preventDefault()
  var taskArray = []
 for (let i = 0; i < outputArray.length; i++) {
   var newTask = {
     id: `1${i}${Date.now()}`, 
     done: false, 
     content: outputArray[i].innerText
   }
   taskArray.push(newTask)
 }
  createNewList(taskArray)
}

function createNewList(taskItems) {
  if (inputTitle.value && taskItems.length != 0) {
    var newToDoList = new ToDoList(Date.now(), inputTitle.value, taskItems);
    lists.push(newToDoList);
    addCardToDOM(newToDoList);
    newToDoList.saveToStorage(lists);
    clearTaskList();
    toggleNoLists();
  }
}

function addCardToDOM(list) {
  var cardClone = cardTemplate.content.cloneNode(true);
  var cardQuery = cardClone.querySelector('.card');
  cloneQueries(cardClone, list);
  cardQuery.addEventListener('click', cardActions);
  cardsArea.insertBefore(cardClone, cardsArea.firstChild);
}

function taskToCard(newCard) {
  var taskListIteration = '';
  for (var i = 0; i < newCard.tasks.length; i++) {
    taskListIteration += `<label><li class="card__task-checkbox ${newCard.tasks[i].done === true ? 'card__task-checked' : null}" data-id=${newCard.tasks[i].id}><img src=${newCard.tasks[i].done === true ? `"images/checkbox-active.svg"` : `"images/checkbox.svg"`} class="card__task-ico card__mark-ico"><p class="card__task-content">${newCard.tasks[i].content}</p></li></label>`
  } return taskListIteration;
}

function cloneQueries(cardClone, list) {
  cardClone.querySelector('.card').dataset.id = list.id;
  cardClone.querySelector('.card').classList.add(`${list.urgent === true ? `urgent-card` : 'empty-class'}`)
  cardClone.querySelector('.card-title').innerText = list.title;
  cardClone.querySelector('.card__task-list').innerHTML = `${taskToCard(list)}`;
  cardClone.querySelector('.card__task-urgent').setAttribute('src', `${list.urgent === true ? `images/urgent-active.svg` : `images/urgent.svg`}`);
}

function cardActions(e) {
  e.preventDefault();
  let target = e.target;
  if (target.matches('.card__task-delete')) {
    removeCard(target);
  }
  if (target.matches('.card__task-urgent')) {
    urgentify(target);
  }
  if (target.matches('.card__mark-ico')){
    markItems(target)
  }
  // if (target.matches('.card__task-content')){
  //   editContentText(target)
  // }
  toggleNoLists()
}

function getListIndex(target) {
  var parent = target.closest('article');
  var parentID = parseInt(parent.dataset.id);
  var listIndex = lists.findIndex(element => element.id === parentID);
  return listIndex;
}

// function editContentText(target) {
//   var editedText = target.innerText;
//   // var listIndex = lists.indexOf(targetList);
//   debugger;
//   var parsedId = parseInt(target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id'));
//   debugger;
//   var toDoCard = lists.find(list => list.id === parsedId);
//   if (target.matches('.card-title')) {
//     targetlist.updateTitle(targetList, editedText)
//   }
//   if (target.matches('.card-body')) {
//     targetList.updateBody(targetList, editedText)
//   }
// }

function removeCard(target) {
  var listIndex = getListIndex(target)
  var card = reinstateLists(listIndex)
  var unchecked = card.tasks.filter(item => item.done === false)
  if (unchecked.length === 0){
    target.closest('article').remove();
    card.deleteFromStorage(listIndex);
  } else {
    alert('You gotta finish all the tasks before you delete me!') 
  }
}


function urgentify(target) {
  var listIndex = getListIndex(target)
  var toDoCard = reinstateLists(listIndex)
  updateCardUrgentDOM(target, toDoCard)
  toDoCard.updateToDo()
}

function updateCardUrgentDOM(target, toDoCard){
  target.setAttribute(`src`, `${toDoCard.urgent === false ? `images/urgent-active.svg` : `images/urgent.svg`}`)
  target.parentNode.parentNode.parentNode.classList.toggle('urgent-card');

}

function markItems(target) {
  var parent = target.closest('article')
  var child = target.closest('li')
  var listIndex = getListIndex(target);
  var toDoCard = reinstateLists(listIndex);
  const targetList = lists.find(list => list.id == parent.dataset.id);
  const targetIndex = targetList.tasks.findIndex(task => task.id === child.dataset.id)
  toDoCard.updateTask(targetIndex)
  updateItemDOM(target, toDoCard, targetIndex)
}

function updateItemDOM(target, toDoCard, targetIndex) {
  target.setAttribute('src', `${toDoCard.tasks[targetIndex].done === true ? `images/checkbox-active.svg` : `images/checkbox.svg`}`)
  target.parentNode.classList.toggle('card__task-checked')
}

function clearTaskListBtn(e) {
  e.preventDefault()
  clearTaskList()  
}

function clearTaskList() {
  inputTitle.value = '';
  outputTaskContainer.innerHTML =''
}

// window.onload = startCheckYoSelf()