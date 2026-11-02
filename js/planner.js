const STORAGE_KEY = 'academicPlannerTasks';

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Could not save tasks:', error);
  }
}

let tasks = loadTasks();

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const count = document.getElementById('task-count');

function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

function render() {
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.done ? 'task done' : 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', 'Mark as completed: ' + task.text);
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const label = document.createElement('span');
    label.textContent = task.text;

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete-btn';
    del.textContent = '✕';
    del.setAttribute('aria-label', 'Delete task: ' + task.text);
    del.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, label, del);
    list.appendChild(li);
  });

  const remaining = tasks.filter(task => !task.done).length;
  count.textContent = tasks.length === 0
    ? 'No tasks yet. Add your first one above.'
    : remaining + ' of ' + tasks.length + ' tasks left';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === '') return;
  addTask(text);
  input.value = '';
  input.focus();
});

render();  