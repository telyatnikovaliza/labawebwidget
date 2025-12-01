// Базовый класс для всех виджетов
export default class UIComponent {
    constructor(config = {}) {
        this.id = config.id || `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.title = config.title || 'Виджет';
        this.type = config.type || 'base';
        this.isMinimized = false;
        this.isClosed = false;
        
        // Создаем DOM-элемент виджета
        this.element = this.createWidgetElement();
    }
    
    // Создание DOM-элемента виджета
    createWidgetElement() {
        const widget = document.createElement('div');
        widget.className = 'widget';
        widget.id = this.id;
        widget.dataset.type = this.type;
        
        // Заголовок виджета с кнопками управления
        const header = document.createElement('div');
        header.className = 'widget-header';
        
        const title = document.createElement('h3');
        title.className = 'widget-title';
        title.textContent = this.title;
        
        const controls = document.createElement('div');
        controls.className = 'widget-controls';
        
        const minimizeBtn = document.createElement('button');
        minimizeBtn.className = 'widget-btn widget-minimize';
        minimizeBtn.innerHTML = '−';
        minimizeBtn.title = 'Свернуть';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'widget-btn widget-close';
        closeBtn.innerHTML = '×';
        closeBtn.title = 'Закрыть';
        
        controls.appendChild(minimizeBtn);
        controls.appendChild(closeBtn);
        
        header.appendChild(title);
        header.appendChild(controls);
        
        // Контент виджета
        const content = document.createElement('div');
        content.className = 'widget-content';
        
        widget.appendChild(header);
        widget.appendChild(content);
        
        // Обработчики событий для кнопок управления
        minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        closeBtn.addEventListener('click', () => this.close());
        
        return widget;
    }
    
    // Отрисовка виджета
    render() {
        return this.element;
    }
    
    // Обновление контента виджета
    updateContent(content) {
        const contentElement = this.element.querySelector('.widget-content');
        if (contentElement) {
            contentElement.innerHTML = '';
            if (typeof content === 'string') {
                contentElement.innerHTML = content;
            } else if (content instanceof HTMLElement) {
                contentElement.appendChild(content);
            } else if (Array.isArray(content)) {
                content.forEach(item => {
                    if (item instanceof HTMLElement) {
                        contentElement.appendChild(item);
                    } else {
                        const div = document.createElement('div');
                        div.innerHTML = item;
                        contentElement.appendChild(div);
                    }
                });
            }
        }
    }
    
    // Сворачивание/разворачивание виджета
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        const content = this.element.querySelector('.widget-content');
        
        if (this.isMinimized) {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    }
    
    // Закрытие виджета
    close() {
        this.isClosed = true;
        this.element.remove();
        // Вызываем метод destroy для очистки ресурсов
        this.destroy();
    }
    
    // Уничтожение виджета (очистка ресурсов)
    destroy() {
        // Базовый метод, переопределяется в дочерних классах
    }
}