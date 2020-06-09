function onReady() {
  const addToDoForm = document.getElementById('addToDoForm');
  const newToDoText = document.getElementById('newToDoText');
  const toDoList = document.getElementById('toDoList');

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();

    // get the text
    let title = newToDoText.value;

    // create a new li
    let newLi = document.createElement('li');

    // create a new input
    let checkbox = document.createElement('input');

    // set the input's type to checkbox
    checkbox.type = "checkbox";
    checkbox.classList.add("mdl-checkbox");

    // create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("mdl-button");

    // set title
    newLi.textContent = title;

    // attach the checkbox to li
    newLi.appendChild(checkbox);
    newLi.appendChild(deleteBtn);

    newLi.classList.add("mdl-list__item");

    // attach the li to the ul
    toDoList.appendChild(newLi);

    // empty the input
    newToDoText.value = '';

    deleteBtn.onclick = function() {
      toDoList.removeChild(newLi);
    }
  })
}

window.onload = function() {
  onReady();
}
