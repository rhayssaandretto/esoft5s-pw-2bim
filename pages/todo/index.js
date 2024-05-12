function addTask(task) {
  task.preventDefault();

  const form = task.target;
  const formData = new FormData(form);

  const taskName = formData.get("title");
  const taskDescription = formData.get("description");

  let taskData = localStorage.getItem("taskData")
    ? JSON.parse(localStorage.getItem("taskData"))
    : [];

  taskData.push({
    taskName,
    taskDescription,
  });

  localStorage.setItem("taskData", JSON.stringify(taskData));

  form.reset();
  showTasks();
}

function showTasks() {
  const tasksData = JSON.parse(localStorage.getItem("taskData")) || [];

  const taskSection = document.getElementById("task-list");
  taskSection.innerHTML = "";
  
  tasksData.forEach((task) => {
    const section = document.createElement("section");

    const title = document.createElement("h2");
    title.textContent = task.taskName;

    const description = document.createElement("p");
    description.textContent = task.taskDescription;

    section.appendChild(title);
    section.appendChild(description);

    taskSection.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showTasks();
});
