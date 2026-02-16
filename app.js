document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('Tasks'));

    if(storedTasks){
        storedTasks.forEach((task) => Tasks.push(task))
        updateTaskList();
        updateStats();
        saveTasks();
    }
})

let Tasks = [];

const saveTasks = () => {
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
};

document.querySelector(".writing-bar").addEventListener("click", function(event){
    event.preventDefault();
})

const addTask = () => {
    const taskInput = document.querySelector("#taskInput");
    const text = taskInput.value.trim();
    if(text){
        Tasks.push({text: text, completed:false});
    }
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
}

const toggleTaskComplete = (index) => {
    Tasks[index].completed = !Tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    Tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.querySelector("#taskInput");
    taskInput.value = Tasks[index].text;
    Tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const CompletedTask = Tasks.filter(task => task.completed).length;
    const totalTasks = Tasks.length;
    const progress = CompletedTask/totalTasks*100;
    const progressBar = document.querySelector(".inner-progress");
    progressBar.style.width = `${progress}%`;

    document.querySelector("#number").innerText = `${totalTasks}`;
}

const updateTaskList = () => {
    const taskList = document.querySelector(".list-ul");
    taskList.innerHTML = "";

    Tasks.forEach((element, index)=> {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
         <div class="taskItem">
            <div class="task ${element.completed ? 'completed':''}">
                <input type="checkbox" class="checkbox" ${element.completed ? 'checked':''}>
                <p>${element.text}</p>
            </div>
            <div class="icons">
                <i class="fa-solid fa-pen" onClick='editTask(${index})'></i>
                <i class="fa-solid fa-trash" onClick='deleteTask(${index})'></i>
            </div>
        </div>
        `;
        
        const checkbox = listItem.querySelector(".checkbox");
        checkbox.addEventListener("change", () => {
            toggleTaskComplete(index);
            updateTaskList();
            updateStats();
            saveTasks();
        });
        taskList.append(listItem);
    });
}

document.querySelector("#submitButton").addEventListener("click", function() {
    addTask();
})