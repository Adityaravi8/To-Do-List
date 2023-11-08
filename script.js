document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("input-form");
  const input = document.getElementById("task-input");
  const inputDate = document.getElementById("date-input");
  const tasklist = document.getElementById("task-list");
  const priority = document.getElementById("priority-options");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask(input.value, inputDate.value, priority.value);
    input.value = "";
    inputDate.value = "";
    priority.value = "";
    saveTasks();
  });

  function addTask() {
    // Alert the user to fill in all the fields if any or all of the fields are not filled in.
    if (input.value !== "" && inputDate.value !== "" && priority.value !== "") {
      //create an html list element that will store the tasks added
      const newTask = document.createElement("li");
      const priorityRatings = { High: 1, Medium: 2, Low: 3 };
      //Created text nodes for the task, date and priority for each task to display on list
      const task = document.createTextNode(input.value);
      const date = document.createTextNode(inputDate.value);
      const priority_option = document.createTextNode(priority.value);
      //Created a span to act as a delete button
      const Delete = document.createElement("span");
      Delete.innerHTML = "delete";

      //Created two space text nodes to add spacing between the task, date and priority
      const space = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");
      const space2 = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");

      //Add all the text nodes into the html list element
      newTask.appendChild(task);
      newTask.appendChild(space);
      newTask.appendChild(date);
      newTask.appendChild(space2);
      newTask.appendChild(priority_option);
      newTask.appendChild(Delete);
      //Add the new task to the task list displaying on the web browser.
      tasklist.appendChild(newTask);

      //If statements to check if the priority is High, Medium or Low and change the text color accordingly.
      if (priority.value === "High") {
        newTask.style.color = "red";
      } else if (priority.value === "Medium") {
        newTask.style.color = "orange";
      } else {
        newTask.style.color = "blue";
      }
      // Get all tasks from the list, adds them to the new task and sorts the array so that the highest priority tasks will display at the top of list
      const allTasks = Array.from(tasklist.getElementsByTagName("li"));
      allTasks.push(newTask);
      allTasks.sort(
        (a, b) =>
          priorityRatings[a.childNodes[4].nodeValue.trim()] -
          priorityRatings[b.childNodes[4].nodeValue.trim()]
      );

      tasklist.innerHTML = "";
      allTasks.forEach((task) => {
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
