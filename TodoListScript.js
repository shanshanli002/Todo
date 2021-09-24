const newTask = document.querySelector('input[name="newtask"]');
const list = document.querySelector('#listoftasks');
const form = document.querySelector('#form');
const taskpad = document.querySelector('#listblock');
const taskArray = [];

form.addEventListener('submit', function(event){
    event.preventDefault();
    const task = addNewTaskToList(newTask.value);
    list.appendChild(task);
    taskArray.push(newTask.value);
    localStorage.setItem('task',JSON.stringify(taskArray));
    newTask.value = '';
});

taskpad.addEventListener('click', function(event) {
    event.preventDefault();
    if(event.target.tagName === 'BUTTON' && event.target.className === 'remove'){
        const taskName = (event.target.parentElement.firstChild.innerText);
        const index = taskArray.indexOf(taskName);
        taskArray.splice(index,1);
        localStorage.setItem('task',JSON.stringify(taskArray));
        event.target.parentElement.remove();
    }else if(event.target.tagName === 'BUTTON' && event.target.className === 'completed'){
        event.target.parentElement.classList.add('complete');
    }else if (event.target.tagName === 'LI'){
        event.target.classList.add('priority');
        const coffeeIcon = document.createElement('span');
        coffeeIcon.innerHTML = '&#9749';
        coffeeIcon.style.margin = '1%';
        event.target.prepend(coffeeIcon);
    }
});

function addNewTaskToList (name) {
    const createNewTask = document.createElement('li');
    const taskText = document.createElement('span');
    const createNewRemoveButton = document.createElement('button');
    const createNewCompletedButton = document.createElement('button');
    taskText.innerText = name;
    taskText.style.color = 'purple';
    taskText.style.fontFamily = 'Roboto Mono';
    taskText.style.fontSize = '2rem';
    taskText.className = "tasktext"
    createNewRemoveButton.innerText = ('Remove');
    createNewRemoveButton.className = ('remove');
    createNewRemoveButton.style.fontFamily = ('Roboto Mono');
    createNewRemoveButton.style.margin = ('3%');
    createNewRemoveButton.style.marginBottom = ('5px');
    createNewCompletedButton.innerText = ('Completed');
    createNewCompletedButton.style.fontFamily = 'Roboto Mono';
    createNewCompletedButton.style.margin = '1%';
    createNewCompletedButton.className = 'completed';
    createNewTask.appendChild(taskText);
    createNewTask.appendChild(createNewRemoveButton);
    createNewTask.appendChild(createNewCompletedButton);

    return createNewTask;
}
window.onload = function() {
    if(localStorage.length >= 1){
    let localStorageArray =JSON.parse(localStorage.getItem('task'));
        
        for(let i=0; i<localStorageArray.length; i++){
            let savedTask = localStorageArray[i];
            let task = addNewTaskToList(savedTask);
            list.appendChild(task);
            taskArray.push(savedTask);
        }       

    } else{
        localStorage.clear();
    }
}
