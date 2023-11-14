const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const input = document.getElementById('task-input');
let taskCount = 0;

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    addTask();
  }
});
function saveTask(){
  let taskData = [];
  const tasks = document.querySelectorAll('li');
  tasks.forEach((task) => {
    const taskText = task.querySelector('.task-text').textContent;
    const taskStatus = task.getAttribute('status');
    taskData.push({ text: taskText, status: taskStatus });

  })
  localStorage.setItem('tasks', JSON.stringify(taskData));
}
function addTask() {
  if (input.value.trim() === '') {
    alert('Please enter a task');
    return;
  }
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  const blurBackgroundElement = document.createElement('div');
  blurBackgroundElement.classList.add('blur-background');
  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = input.value;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-task');
  deleteBtn.innerHTML = '<img src="img/cross.svg" alt="delete" class="buttons-img">';

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-task');
  completeBtn.innerHTML = '<img src="img/check.svg" alt="complete" class="buttons-img2">';
  deleteBtn.addEventListener('click', function() {
    deleteTask(this);
  });
  completeBtn.addEventListener('click', function() {
    completeTask(this);
  });
  newTask.setAttribute('status', 'inProgress');
  newTask.appendChild(blurBackgroundElement);
  newTask.appendChild(taskText);
  newTask.appendChild(deleteBtn);
  newTask.appendChild(completeBtn);
  taskList.appendChild(newTask);
  newTask.addEventListener('mouseover', () => {
    blurBackgroundElement.style.backdropFilter = 'blur(20px)';
    blurBackgroundElement.style.boxShadow = 'inset 0 0 0 2000px rgba(0, 0, 0, 0.762)';
    deleteBtn.style.visibility = 'visible';
    completeBtn.style.visibility = 'visible';
    deleteBtn.style.opacity = '1';
    completeBtn.style.opacity = '1';
  });

  newTask.addEventListener('mouseout', () => {
    blurBackgroundElement.style.backdropFilter = 'none';
    blurBackgroundElement.style.boxShadow = 'none';
    deleteBtn.style.visibility = 'hidden';
    completeBtn.style.visibility = 'hidden';
    deleteBtn.style.opacity = '0';
    completeBtn.style.opacity = '0';
  });
  taskCount = taskList.childElementCount;
  document.getElementById('score').innerHTML = taskCount;
  input.value = '';
  saveTask();
}
function completeTask(button) {
  const task = button.closest('li');
  if (task) {
    const currentStatus = task.getAttribute('status');
    if (currentStatus === 'completed') {
      task.setAttribute('status', 'inProgress');
    } else if (currentStatus === 'inProgress') {
      task.setAttribute('status', 'completed');
    }
  }
  saveTask();
}
function showAllTasks() {
  const tasks = document.querySelectorAll('li');
  tasks.forEach((task) => {
    task.style.display = 'flex';
    document.getElementById('score').innerHTML = taskCount;
  taskCount =taskList.childElementCount ;
    });
  
}
function showInProgressTasks() {
  const tasks = document.querySelectorAll('li');
  let visibleTaskCount = 0;
  tasks.forEach((task) => {
    if (task.getAttribute('status') === 'inProgress') {
      task.style.display = 'flex';
      visibleTaskCount++; 
    } else {
      task.style.display = 'none';
    }
  });

  document.getElementById('score').innerHTML = visibleTaskCount; 
}
function showCompletedTasks() {
  const tasks = document.querySelectorAll('li');
  tasks.forEach((task) => {
    if (task.getAttribute('status') === 'completed') {
      task.style.display = 'flex';
      const hiddenTasks = document.querySelectorAll('.task[status*="completed"]');
const hiddenTaskCount = hiddenTasks.length;
      taskCount = hiddenTaskCount;
      document.getElementById('score').innerHTML = taskCount;
    } else {
      task.style.display = 'none';
      const hiddenTasks = document.querySelectorAll('.task[status*="completed"]');
      const hiddenTaskCount = hiddenTasks.length;
      taskCount = hiddenTaskCount;
      document.getElementById('score').innerHTML = taskCount;
    } 
  });
}
const showAllButton = document.querySelector('#all-tasks');
const inProgressTaskButton = document.querySelector('#in-progress');
const completedTaskButton = document.querySelector('#completed');
showAllButton.addEventListener('click', showAllTasks);
inProgressTaskButton.addEventListener('click', showInProgressTasks);
completedTaskButton.addEventListener('click', showCompletedTasks);

function deleteComplete (){  
  let tasks = document.querySelectorAll('li[status="completed"]');
  if (tasks.length === 0) {
    alert("There are no completed tasks to delete");
    return;
  }
  if (confirm("Are you sure you want to delete all completed tasks?")) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach((task) => {
      if (task.getAttribute('status') === 'completed') {
        task.remove();
      }
    });
    saveTask();
    taskCount = taskList.childElementCount;
    document.getElementById('score').innerHTML = taskCount;
  }
}
function deleteAll() {
  const tasks = document.querySelectorAll('li');
  
  if (tasks.length === 0) {
    alert("There are no tasks to delete");
    return;
  }
  
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks.forEach((task) => {
      task.remove();
    });
    taskCount = 0;
    document.getElementById('score').innerHTML = taskCount;
    saveTasks();
  }
}
function allComplete(){
  const tasks = document.querySelectorAll('li');
  if (tasks.length === 0) {
    alert("There are no tasks to complete");
    return;
  }
  tasks.forEach((task) => {
    if (task.getAttribute('status') === 'inProgress') {
      task.setAttribute('status', 'completed');
    }
    else if (task.getAttribute('status') === 'completed') {
      task.setAttribute('status', 'inProgress');
    }
  });
  saveTask();
}
function deleteTask(button) {
  const task = button.closest('li');
  if (task) {
    task.remove();
    updateTaskCount();
  }
  saveTask();
}

function updateTaskCount() {
  const tasks = document.querySelectorAll('li');
  let visibleTaskCount = 0;

  tasks.forEach((task) => {
    if (task.style.display !== 'none') {
      visibleTaskCount++;
    }
  });

  document.getElementById('score').textContent = visibleTaskCount;
}
const buttonAllDone = document.querySelector('#allDone');
buttonAllDone.addEventListener('click', allComplete);
const deleteAllButton = document.querySelector('#deleteAllTasks');
deleteAllButton.addEventListener('click', deleteAll);
const deleteCompleteButton = document.querySelector('#deleteComplete');
deleteCompleteButton.addEventListener('click', deleteComplete);
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks){
    const taskData = JSON.parse(savedTasks);
    taskData.forEach((data) => {
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  const blurBackgroundElement = document.createElement('div');
  blurBackgroundElement.classList.add('blur-background');
  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = data.text;
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-task');
  deleteBtn.innerHTML = '<img src="img/cross.svg" alt="delete" class="buttons-img">';
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-task');
  completeBtn.innerHTML = '<img src="img/check.svg" alt="complete" class="buttons-img2">';
  deleteBtn.addEventListener('click', function() {
    deleteTask(this);
  });
  completeBtn.addEventListener('click', function() {
    completeTask(this);
  });
  newTask.setAttribute('status', data.status);
  newTask.appendChild(blurBackgroundElement);
  newTask.appendChild(taskText);
  newTask.appendChild(deleteBtn);
  newTask.appendChild(completeBtn);
  taskList.appendChild(newTask);
  newTask.addEventListener('mouseover', () => {
    blurBackgroundElement.style.backdropFilter = 'blur(20px)';
    blurBackgroundElement.style.boxShadow = 'inset 0 0 0 2000px rgba(0, 0, 0, 0.762)';
    deleteBtn.style.visibility = 'visible';
    completeBtn.style.visibility = 'visible';
    deleteBtn.style.opacity = '1';
    completeBtn.style.opacity = '1';
  });

  newTask.addEventListener('mouseout', () => {
    blurBackgroundElement.style.backdropFilter = 'none';
    blurBackgroundElement.style.boxShadow = 'none';
    deleteBtn.style.visibility = 'hidden';
    completeBtn.style.visibility = 'hidden';
    deleteBtn.style.opacity = '0';
    completeBtn.style.opacity = '0';
  });
  taskCount = taskList.childElementCount;
  document.getElementById('score').innerHTML = taskCount;

  

      taskList.appendChild(newTask);
      taskCount = taskList.childElementCount;
      document.getElementById('score').innerHTML = taskCount;
    });

  }
}
window.addEventListener('load', loadTasks);