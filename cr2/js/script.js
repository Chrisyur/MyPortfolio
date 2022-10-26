let tasks = JSON.parse(tasksJson);

function printTasks() {
  for (let task of tasks) {
    document.getElementById("demo").innerHTML += `
    <div class="col">
      <div class="card h-100 p-3">
        <div class="card-text pb-3">
          <div class="row justify-content-between ps-3">
            <span class="col-2 text-light bg-info p-0 pt-1 text-center task-badge">
              Task
            </span>
            <div class="col-3 p-0 text-end">
              <i class="fa fa-bookmark-o pe-2 pe-sm-3" aria-hidden="true"></i>
              <i class="fa fa-ellipsis-v pe-3" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <img
          src="${task.image}"
          class="card-img-top border p-1 h-100"
          alt="${task.taskName}"
        />
        <div class="card-body p-0">
          <h5 class="card-title text-center pb-2">${task.taskName}</h5>
          <p class="card-text text-center border-bottom pb-3">
            ${task.description}
          </p>
          <p class="card-text">
            <button type="button" class="btn bg-body priority-btn">
              <i class="fa fa-exclamation-triangle p-0" aria-hidden="true"></i>
            </button>
            Priority level:
            <span class="badge importance-badge text-bg-success py-2">${task.importance}</span>
          </p>
          <p class="card-text border-bottom pb-3">
            <i class="fa fa-calendar pe-1" aria-hidden="true"></i>
            Deadline: 27.01.2022
          </p>
          <div class="text-end">
            <button type="button" class="btn btn-danger">
              <i class="fa fa-trash pe-1" aria-hidden="true"></i>Delete
            </button>
            <button type="button" class="btn btn-success">
              <i class="fa fa-check-circle-o pe-1" aria-hidden="true"></i>Done
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }
}

let badge = document.getElementsByClassName("importance-badge");

function importanceIncrease(index) {
  if (tasks[index].importance != 5) {
    tasks[index].importance++;
    badge[index].innerHTML = tasks[index].importance;
  }
  setPriorityColor();
}

function setPriorityColor() {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].importance == 2 || tasks[i].importance == 3)
      badge[i].setAttribute(
        "class",
        "badge importance-badge text-bg-warning py-2"
      );
    else if (tasks[i].importance == 4 || tasks[i].importance == 5)
      badge[i].setAttribute(
        "class",
        "badge importance-badge text-bg-danger py-2"
      );
  }
}

function addImportanceIncreaseEvent() {
  let priority_btns = document.getElementsByClassName("priority-btn");

  for (let i = 0; i < priority_btns.length; i++) {
    priority_btns[i].onclick = function () {
      importanceIncrease(i);
    };
  }
}

document.getElementById("sort").onclick = function sortByImportance() {
  tasks.sort((a, b) => b.importance - a.importance);

  document.getElementById("demo").innerHTML = "";
  printTasks();
  addImportanceIncreaseEvent();
  setPriorityColor();
};

printTasks();
addImportanceIncreaseEvent();
