import UIComponent from './UIComponent.js';

export default class TimeWidget extends UIComponent {
    constructor(config = {}) {
        super({
            ...config,
            title: config.title || 'Текущее время',
            type: 'time'
        });
        
        this.timeInterval = null;
        
        this.init();
    }
    
    init() {
        this.renderContent();
        this.startClock();
    }
    
    renderContent() {
        const content = document.createElement('div');
        content.className = 'time-content';
        
        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'time-display';
        timeDisplay.textContent = this.getCurrentTime();
        
        const dateDisplay = document.createElement('div');
        dateDisplay.className = 'date-display';
        dateDisplay.textContent = this.getCurrentDate();
        
        content.appendChild(timeDisplay);
        content.appendChild(dateDisplay);
        
        this.updateContent(content);
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ru-RU');
    }
    
    getCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return now.toLocaleDateString('ru-RU', options);
    }
    
    startClock() {
        // Обновляем время каждую секунду
        this.timeInterval = setInterval(() => {
            const timeDisplay = this.element.querySelector('.time-display');
            if (timeDisplay) {
                timeDisplay.textContent = this.getCurrentTime();
            }
        }, 1000);
    }
    
    destroy() {
        // Очищаем интервал при удалении виджета
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    }
}