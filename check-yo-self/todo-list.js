class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }
  saveToStorage(lists) {
    localStorage.setItem("list-card", JSON.stringify(lists));
  }
  deleteFromStorage(index) {
    lists.splice(index, 1);
    this.saveToStorage(lists);
  }
  updateToDo() {
    let newList = lists.map(listItem => {
      if (this.id === listItem.id) {
        listItem.urgent = !listItem.urgent;
      }
      return listItem;
    });
    
    this.saveToStorage(newList);
  }
  updateTask(i) {
    this.tasks[i].done = !this.tasks[i].done;
    this.saveToStorage(lists);
  }
} 