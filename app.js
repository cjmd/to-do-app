toDoStorage = window.localStorage;

function onReady() {
  let id = 0;

  let toDos = [];

	if (toDoStorage.length != 0) {
		var toDoString = toDoStorage.getItem('toDoKey');
		var storedToDos = JSON.parse(toDoString);
		toDos = storedToDos;
	}

  const addToDoForm = document.getElementById('addToDoForm');

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
    if (!newToDoText.value) { return; }

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    newToDoText.value = '';
    id++;
    toDoStorage.setItem('toDoKey',JSON.stringify(toDos));
    renderTheUI();
  }

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';
    console.log(toDos);
    toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = toDo.id;
      checkbox.complete = toDo.complete;
      if (checkbox.complete == true) {
        checkbox.checked = true;
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = "Delete";
      deleteBtn.id = toDo.id;
      deleteBtn.classList.add("mdl-button");

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteBtn);

      deleteBtn.addEventListener('click', event => {
        toDos = toDos.filter(todo => todo.id != deleteBtn.id);
        toDoStorage.setItem('toDoKey',JSON.stringify(toDos));
        renderTheUI();
      });

      checkbox.addEventListener('click', event => {
        if (checkbox.complete == false) {
          checkbox.complete = true;
        } else {
          checkbox.complete = false;
        }
        toDos.forEach(todo => {
          if (todo.id == checkbox.id) {
            todo.complete = checkbox.complete;
          }
        });
        toDoStorage.setItem('toDoKey',JSON.stringify(toDos));
        renderTheUI();
      });
    });
  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  renderTheUI();
}

window.onload = function() {
  onReady();
}
