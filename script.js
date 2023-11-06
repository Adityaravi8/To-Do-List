document.addEventListener('DOMContentLoaded', function () {


    const form = document.querySelector('.input-field');
    const input = document.querySelector('.input-text');
    const inputDate = document.querySelector('.input-date');
    const tasklist = document.querySelector('.task-list');
    const priority = document.querySelector(".priority-options");




    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(input.value, inputDate.value);
        input.value = '';
        inputDate.value = '';
        priority.value = '';
        saveTasks();
    })
    function addTask() {
        if (input.value !== "" && inputDate.value !== "" && priority.value !== "") {
            const newTask = document.createElement("li");

            const span = document.createElement("span");
            span.innerHTML = "delete";

            const space = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");
            const space2 = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");
            
            newTask.appendChild(document.createTextNode(input.value));
            newTask.appendChild(space);
            newTask.appendChild(document.createTextNode(inputDate.value));
            newTask.appendChild(space2);
            newTask.appendChild(document.createTextNode(priority.value));
            newTask.appendChild(span);
            tasklist.appendChild(newTask);
        }
        
        else {
            alert("Please Enter a Task and Date and Priority!");
        }

    }


    function saveTasks() {

        localStorage.setItem("data", tasklist.innerHTML);

    }

    tasklist.addEventListener("click", function(event) {
        if (event.target.tagName === "SPAN") {
            event.target.closest('li').remove();
            saveTasks();

        }
        else if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
            saveTasks();
        }
    }, false)

    function showTasks() {

        tasklist.innerHTML = localStorage.getItem("data");

    }
    showTasks();

});