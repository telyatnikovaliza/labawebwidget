import UIComponent from './UIComponent.js';

export default class ToDoWidget extends UIComponent {
    constructor(config = {}) {
        super({
            ...config,
            title: config.title || 'Мои задачи',
            type: 'todo'
        });
        
        this.tasks = config.tasks || [];
        this.nextId = 1;
        
        // Инициализация виджета
        this.init();
    }
    
    init() {
        this.renderContent();
    }
    
    renderContent() {
        const content = document.createElement('div');
        content.className = 'todo-content';
        
        // Форма добавления задачи
        const form = document.createElement('form');
        form.className = 'todo-form';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Добавить новую задачу...';
        input.className = 'todo-input';
        
        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.textContent = 'Добавить';
        addButton.className = 'todo-add-btn';
        
        form.appendChild(input);
        form.appendChild(addButton);
        
        // Список задач
        const taskList = document.createElement('ul');
        taskList.className = 'todo-list';
        
        // Обновление списка задач
        this.updateTaskList(taskList);
        
        content.appendChild(form);
        content.appendChild(taskList);
        
        // Обработчики событий
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask(input.value.trim(), taskList);
            input.value = '';
        });
        
        this.updateContent(content);
    }
    
    addTask(text, taskList) {
        if (text) {
            const task = {
                id: this.nextId++,
                text: text,
                completed: false,
                createdAt: new Date()
            };
            
            this.tasks.push(task);
            this.updateTaskList(taskList);
        }
    }
    
    updateTaskList(taskList) {
        taskList.innerHTML = '';
        
        if (this.tasks.length === 0) {
            const emptyMsg = document.createElement('li');
            emptyMsg.className = 'todo-empty';
            emptyMsg.textContent = 'Нет задач. Добавьте первую задачу!';
            taskList.appendChild(emptyMsg);
            return;
        }
        
        this.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `todo-item ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.id = task.id;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.className = 'todo-checkbox';
            
            const taskText = document.createElement('span');
            taskText.className = 'todo-text';
            taskText.textContent = task.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'todo-delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.title = 'Удалить задачу';
            
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteBtn);
            
            // Обработчики событий
            checkbox.addEventListener('change', () => {
                this.toggleTask(task.id);
                taskItem.classList.toggle('completed');
            });
            
            deleteBtn.addEventListener('click', () => {
                this.deleteTask(task.id);
                this.updateTaskList(taskList);
            });
            
            taskList.appendChild(taskItem);
        });
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
    }
    
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }
    
    destroy() {
        // Очистка ресурсов, если необходимо
    }
}