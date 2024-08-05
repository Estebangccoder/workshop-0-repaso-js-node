class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
    // se añade el metodo de actualizar la descripción

    updateDescription(newDescription) {
        this.description = newDescription;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.tasks = this.tasks.map(task => new Task(task.id, task.description, task.completed)); //debemos crear la instancia de nuevo, ya que al guardarlo en el local storage se almacena en formato json
        this.loadTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
            this.renderTasks();
        }
    }

    editTaskDescription(id, newDescription) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.updateDescription(newDescription);
            this.saveTasks();
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');

            const taskText = document.createElement('span');
            taskText.textContent = task.description;
            taskText.className = task.completed ? 'completed' : '';

//Aqui incluiremos el boton de tarea completada

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Desmarcar' : 'Completar';
            completeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTaskComplete(task.id);
            });

   //Aqui incluiremos el boton de editar tarea
   
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const newDescription = prompt('Editar tarea:', task.description);
                if (newDescription) {
                    this.editTaskDescription(task.id, newDescription);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTask(task.id);
            });

            item.appendChild(taskText);
            item.appendChild(completeButton);
            item.appendChild(editButton);   
            item.appendChild(deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});




