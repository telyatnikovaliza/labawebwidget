import Dashboard from './js/Dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard('dashboard');
    
    // Обработчики кнопок добавления виджетов
    document.getElementById('add-todo').addEventListener('click', () => {
        dashboard.addWidget('todo');
    });
    
    document.getElementById('add-quote').addEventListener('click', () => {
        dashboard.addWidget('quote');
    });
    
    document.getElementById('add-time').addEventListener('click', () => {
        dashboard.addWidget('time');
    });
    
    document.getElementById('add-weather').addEventListener('click', () => {
        dashboard.addWidget('weather');
    });
    
    document.getElementById('add-stats').addEventListener('click', () => {
        dashboard.addWidget('stats');
    });
    
    // Добавим кнопку для календаря
    const addCalendarBtn = document.createElement('button');
    addCalendarBtn.id = 'add-calendar';
    addCalendarBtn.className = 'btn btn-primary';
    addCalendarBtn.textContent = 'Добавить календарь';
    
    document.querySelector('.controls').appendChild(addCalendarBtn);
    
    addCalendarBtn.addEventListener('click', () => {
        dashboard.addWidget('calendar');
    });
    
    // Добавим несколько виджетов по умолчанию
    setTimeout(() => {
        dashboard.addWidget('todo');
        dashboard.addWidget('quote');
        dashboard.addWidget('time');
        dashboard.addWidget('weather');
        dashboard.addWidget('stats');
        dashboard.addWidget('calendar');
    }, 100);
});