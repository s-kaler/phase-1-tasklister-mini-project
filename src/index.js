document.addEventListener("DOMContentLoaded", () => {
  // your code here
  console.log('DOM Loaded!');
  let form = document.querySelector('#create-task-form');
  form.addEventListener('submit', (e) => {
    //console.log(e);
    e.preventDefault();
    //console.log(e.target['new-task-description'].value);
    let newTask = e.target['new-task-description'].value;
    let taskPriority = e.target.priority.value;
    let taskLocation = e.target.location.value;
    if (newTask !== ''){
      buildToDo(newTask, taskPriority, taskLocation);
    }
    form.reset(); 
  })
  let sortButton = document.querySelector('#sort');
  sortButton.addEventListener('click', sortPriority);
});

function buildToDo(toDo, priority, location) {
  let li = document.createElement('li');
  li.textContent = `${toDo}, at ${location} `;
  let editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', buildEdit);
  let delButton = document.createElement('button');
  delButton.addEventListener('click', handleDelete);
  delButton.textContent = 'x';
  delButton.class = 'list-button';
  li.appendChild(delButton);
  li.appendChild(editButton);
  let color = '';
  let index = 0;
  if(priority === 'high'){
    color = 'red';
    index = 1;
  }
  else if (priority === 'medium'){
    color = '#F6BE00';
    index = 2;
  }
  else if (priority === 'low'){
    color = 'green';
    index = 3;
  }
  li.style.color = color;
  li.dataset.index = index;
  //console.log(li);
  document.querySelector('#tasks').appendChild(li);
  
}

function buildEdit(newEdit){
  let editButton = newEdit.target;
  let listedItem = newEdit.target.parentNode;
  console.log(listedItem);

  const editForm = document.createElement('form');
  editForm.id = 'create-edit';
  editForm.action = '';
  editForm.method = 'POST';

  const editTaskLabel = document.createElement('label');
  editTaskLabel.for = 'edit-task-description';

  const editTask = document.createElement('input');
  editTask.id = 'edit-task-description';
  editTask.name = 'edit-task-description';
  editTask.placeholder = 'Enter New Description';

  const editLocationLabel = document.createElement('label');
  editLocationLabel.for = 'edit-location';

  const editLocation = document.createElement('input');
  editLocation.name = 'edit-location';
  editLocation.placeholder = 'Enter New Location';

  const confirmButton = document.createElement('button');
  confirmButton.class = 'list-button';
  confirmButton.textContent = 'Confirm';

  const newPriority = document.getElementById('priority').cloneNode(true);
  newPriority.id = 'new-priority'; 
  
  editForm.appendChild(editTaskLabel);
  editForm.appendChild(editTask);
  editForm.appendChild(editLocationLabel);
  editForm.appendChild(editLocation);
  editForm.appendChild(newPriority);
  editForm.appendChild(confirmButton);
  listedItem.appendChild(editForm);
  //console.log('form: ' + editForm);

  editForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let editedTask = e.target['edit-task-description'].value;
    let editedLocation = e.target['edit-location'].value;
    listedItem.firstChild.data = `${editedTask}, at ${editedLocation} `;
    let priority = e.target['new-priority'].value;
    let color = '';
    let index = 0;
    if(priority === 'high'){
      color = 'red';
      index = 1;
    }
    else if (priority === 'medium'){
      color = '#F6BE00';
      index = 2;
    }
    else if (priority === 'low'){
      color = 'green';
      index = 3;
    }
    listedItem.style.color = color;
    listedItem.dataset.index = index;
    editForm.reset();
    editForm.remove();
  })
}

function handleDelete(e){
  e.target.parentNode.remove();
}


function sortPriority(){
  var indexes = document.querySelectorAll("[data-index]"); 
  var indexesArray = Array.from(indexes); 
  let sorted = indexesArray.sort(comparator); 
  sorted.forEach(e =>   
      document.querySelector("#tasks").appendChild(e)); 
}

function comparator(a, b) { 
  if (a.dataset.index < b.dataset.index) 
      return -1; 
  if (a.dataset.index > b.dataset.index) 
      return 1; 
  return 0; 
} 