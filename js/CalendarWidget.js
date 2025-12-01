import UIComponent from './UIComponent.js';

export default class CalendarWidget extends UIComponent {
    constructor(config = {}) {
        super({
            ...config,
            title: config.title || 'Календарь',
            type: 'calendar'
        });
        
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        
        this.init();
    }
    
    init() {
        this.renderContent();
    }
    
    renderContent() {
        const content = document.createElement('div');
        content.className = 'calendar-content';
        
        // Панель управления
        const controls = document.createElement('div');
        controls.className = 'calendar-controls';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'calendar-btn calendar-prev';
        prevBtn.innerHTML = '&larr;';
        prevBtn.title = 'Предыдущий месяц';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'calendar-btn calendar-next';
        nextBtn.innerHTML = '&rarr;';
        nextBtn.title = 'Следующий месяц';
        
        const monthDisplay = document.createElement('div');
        monthDisplay.className = 'calendar-month';
        monthDisplay.textContent = this.getMonthName(this.currentMonth) + ' ' + this.currentYear;
        
        const todayBtn = document.createElement('button');
        todayBtn.className = 'calendar-today-btn';
        todayBtn.textContent = 'Сегодня';
        
        controls.appendChild(prevBtn);
        controls.appendChild(monthDisplay);
        controls.appendChild(nextBtn);
        
        // Календарь
        const calendar = document.createElement('div');
        calendar.className = 'calendar-grid';
        
        // Заголовки дней недели
        const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-name';
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });
        
        // Дни месяца
        this.updateCalendarDays(calendar);
        
        content.appendChild(controls);
        content.appendChild(todayBtn);
        content.appendChild(calendar);
        
        // Обработчики событий
        prevBtn.addEventListener('click', () => {
            this.changeMonth(-1);
            this.updateDisplay(monthDisplay, calendar);
        });
        
        nextBtn.addEventListener('click', () => {
            this.changeMonth(1);
            this.updateDisplay(monthDisplay, calendar);
        });
        
        todayBtn.addEventListener('click', () => {
            this.currentDate = new Date();
            this.currentMonth = this.currentDate.getMonth();
            this.currentYear = this.currentDate.getFullYear();
            this.updateDisplay(monthDisplay, calendar);
        });
        
        this.updateContent(content);
    }
    
    getMonthName(month) {
        const months = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        return months[month];
    }
    
    changeMonth(delta) {
        this.currentMonth += delta;
        
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
    }
    
    updateDisplay(monthDisplay, calendar) {
        monthDisplay.textContent = this.getMonthName(this.currentMonth) + ' ' + this.currentYear;
        this.updateCalendarDays(calendar);
    }
    
    updateCalendarDays(calendar) {
        // Удаляем старые дни (кроме заголовков)
        const oldDays = calendar.querySelectorAll('.calendar-day');
        oldDays.forEach(day => day.remove());
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const today = new Date();
        
        // Пустые клетки в начале месяца
        const startDay = (firstDay.getDay() + 6) % 7; // Понедельник = 0
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }
        
        // Дни месяца
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Проверяем, сегодня ли это
            if (day === today.getDate() && 
                this.currentMonth === today.getMonth() && 
                this.currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Помечаем выходные
            const currentDay = new Date(this.currentYear, this.currentMonth, day);
            if (currentDay.getDay() === 0 || currentDay.getDay() === 6) {
                dayElement.classList.add('weekend');
            }
            
            calendar.appendChild(dayElement);
        }
    }
    
    destroy() {
        // Очистка ресурсов
    }
}