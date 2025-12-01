import ToDoWidget from './ToDoWidget.js';
import QuoteWidget from './QuoteWidget.js';
import TimeWidget from './TimeWidget.js';
import WeatherWidget from './WeatherWidget.js';
import StatsWidget from './StatsWidget.js';
import CalendarWidget from './CalendarWidget.js';  // Добавили импорт

export default class Dashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.widgets = [];
        
        if (!this.container) {
            console.error(`Контейнер с id "${containerId}" не найден`);
            return;
        }
        
        this.init();
    }
    
    init() {
        this.render();
    }
    
    render() {
        this.container.innerHTML = '';
        this.container.className = 'dashboard';
        
        this.widgets.forEach(widget => {
            this.container.appendChild(widget.render());
        });
    }
    
    addWidget(widgetType, config = {}) {
        let widget;
        
        switch (widgetType) {
            case 'todo':
                widget = new ToDoWidget(config);
                break;
            case 'quote':
                widget = new QuoteWidget(config);
                break;
            case 'time':
                widget = new TimeWidget(config);
                break;
            case 'weather':
                widget = new WeatherWidget(config);
                break;
            case 'stats':
                widget = new StatsWidget(config);
                break;
            case 'calendar':  // Добавили новый case
                widget = new CalendarWidget(config);
                break;
            default:
                console.error(`Неизвестный тип виджета: ${widgetType}`);
                return null;
        }
        
        this.widgets.push(widget);
        this.container.appendChild(widget.render());
        
        return widget;
    }
    
    removeWidget(widgetId) {
        const widgetIndex = this.widgets.findIndex(w => w.id === widgetId);
        
        if (widgetIndex !== -1) {
            const widget = this.widgets[widgetIndex];
            widget.close();
            this.widgets.splice(widgetIndex, 1);
        }
    }
    
    getWidgets() {
        return this.widgets;
    }
    
    getWidgetById(widgetId) {
        return this.widgets.find(w => w.id === widgetId);
    }
}