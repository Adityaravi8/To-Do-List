document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".input-field");
  const input = document.querySelector(".input-text");
  const inputDate = document.querySelector(".input-date");
  const tasklist = document.querySelector(".task-list");
  const priority = document.querySelector(".priority-options");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask(input.value, inputDate.value, priority.value);
    input.value = "";
    inputDate.value = "";
    priority.value = "";
    saveTasks();
  });
  function addTask() {
    if (input.value !== "" && inputDate.value !== "" && priority.value !== "") {
      const newTask = document.createElement("li");
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };

      const deleteButton = document.createElement("span");
      deleteButton.innerHTML = "❌";

      const space = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");
      const space2 = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");

      newTask.appendChild(document.createTextNode(input.value));
      newTask.appendChild(space);
      newTask.appendChild(document.createTextNode(inputDate.value));
      newTask.appendChild(space2);
      newTask.appendChild(document.createTextNode(priority.value));
      newTask.appendChild(deleteButton);

      if (priority.value === "High") {
        newTask.style.color = "red";
      } else if (priority.value === "Medium") {
        newTask.style.color = "orange";
      } else {
        newTask.style.color = "blue";
      }
      tasklist.appendChild(newTask);
      const tasks = Array.from(tasklist.getElementsByTagName("li"));
      tasks.push(newTask);
      tasks.sort(
        (a, b) =>
          priorityOrder[a.childNodes[4].nodeValue.trim()] -
          priorityOrder[b.childNodes[4].nodeValue.trim()]
      );

      tasklist.innerHTML = "";
      tasks.forEach((task) => {
        tasklist.appendChild(task);
      });
    } else {
      alert("Please Enter a Task and Date and Priority!");
    }
  }

  function saveTasks() {
    localStorage.setItem("data", tasklist.innerHTML);
  }

  tasklist.addEventListener(
    "click",
    function (event) {
      if (event.target.tagName === "SPAN") {
        event.target.closest("li").remove();
        saveTasks();
      } else if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveTasks();
      }
    },
    false
  );

  function showTasks() {
    tasklist.innerHTML = localStorage.getItem("data");
    const deleteButtons = document.querySelectorAll(".task-list li span");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.target.parentElement.remove();
        saveTasks();
      });
    });
    showTasks();
  }
  showTasks();
});
