import UIComponent from './UIComponent.js';

export default class QuoteWidget extends UIComponent {
    constructor(config = {}) {
        super({
            ...config,
            title: config.title || 'Мотивационная цитата',
            type: 'quote'
        });
        
        this.quotes = [
            "Единственный способ сделать великую работу — любить то, что ты делаешь. - Стив Джобс",
            "Не ждите. Время никогда не будет подходящим. - Наполеон Хилл",
            "Действие - это основополагающий ключ к успеху. - Пабло Пикассо",
            "Успех - это способность идти от неудачи к неудаче, не теряя энтузиазма. - Уинстон Черчилль",
            "Будущее принадлежит тем, кто верит в красоту своей мечты. - Элеонора Рузвельт",
            "Не бойтесь отказываться от хорошего в пользу великого. - Джон Д. Рокфеллер",
            "Я не потерпел неудачу. Я просто нашел 10 000 способов, которые не работают. - Томас Эдисон",
            "Если вы можете это мечтать, вы можете это сделать. - Уолт Дисней"
        ];
        
        this.currentQuoteIndex = 0;
        
        this.init();
    }
    
    init() {
        this.renderContent();
    }
    
    renderContent() {
        const content = document.createElement('div');
        content.className = 'quote-content';
        
        const quoteText = document.createElement('p');
        quoteText.className = 'quote-text';
        quoteText.textContent = this.getRandomQuote();
        
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'quote-refresh-btn';
        refreshBtn.textContent = 'Новая цитата';
        
        content.appendChild(quoteText);
        content.appendChild(refreshBtn);
        
        // Обработчик события для кнопки обновления
        refreshBtn.addEventListener('click', () => {
            quoteText.textContent = this.getRandomQuote();
        });
        
        this.updateContent(content);
    }
    
    getRandomQuote() {
        // Генерируем случайный индекс, отличный от текущего
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.quotes.length);
        } while (newIndex === this.currentQuoteIndex && this.quotes.length > 1);
        
        this.currentQuoteIndex = newIndex;
        return this.quotes[this.currentQuoteIndex];
    }
    
    destroy() {
        // Очистка ресурсов, если необходимо
    }
}