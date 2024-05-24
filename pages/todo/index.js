const taskKey = "@tasks";

function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = new Date().getTime();

  const form = document.querySelector("#taskForm");
  const formData = new FormData(form);

  const taskTitle = formData.get("title");
  const taskDescription = formData.get("description");

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  appendTasksLi();
  form.reset();
}

window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = tasks
    .map(
      (
        task
      ) => `<li id="${task.id}"><h2>${task.title}</h2><p>${task.description}</p>
    <button class='taskButton' title='Editar tarefa'>✏️</button></li>`
    )
    .join("");
    
  document.querySelectorAll(".button-edit").forEach((button) => {
    button.addEventListener("click", () =>
      openModalEdit(button.parentElement.id)
    );
  });
});

function openModalEdit(id) {
  const dialog = document.querySelector(".dialog");

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  let task = tasks.find((task) => task.id == id);

  if (!task) {
    return;
  }

  const titleEdit = document.querySelector("#title-edit");
  titleEdit.value = task.title;
  const descriptionEdit = document.querySelector("#description-edit");
  descriptionEdit.value = task.description;

  dialog.id = id;
  dialog.showModal();
}

function resetDialog(event) {
  event.preventDefault();

  const dialog = document.querySelector(".dialog");
  dialog.close();
}
