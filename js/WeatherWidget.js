import UIComponent from './UIComponent.js';

export default class WeatherWidget extends UIComponent {
    constructor(config = {}) {
        super({
            ...config,
            title: config.title || 'Погода',
            type: 'weather'
        });
        
        this.apiKey = 'your-api-key-here'; // В реальном приложении нужно получить API ключ
        this.city = config.city || 'Moscow';
        this.weatherData = null;
        
        this.init();
    }
    
    async init() {
        this.renderContent();
        await this.fetchWeather();
    }
    
    renderContent() {
        const content = document.createElement('div');
        content.className = 'weather-content';
        
        if (!this.weatherData) {
            content.innerHTML = '<p class="weather-loading">Загрузка данных о погоде...</p>';
        } else {
            this.updateWeatherDisplay(content);
        }
        
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'weather-refresh-btn';
        refreshBtn.textContent = 'Обновить';
        
        refreshBtn.addEventListener('click', async () => {
            await this.fetchWeather();
            this.renderContent();
        });
        
        content.appendChild(refreshBtn);
        this.updateContent(content);
    }
    
    async fetchWeather() {
        try {
            // Для демонстрации используем мок-данные, так как требуется API ключ
            // В реальном приложении здесь был бы запрос к API погоды
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Мок-данные для демонстрации
            this.weatherData = {
                temperature: Math.round(Math.random() * 30 - 5), // Случайная температура от -5 до 25
                description: ['Солнечно', 'Облачно', 'Пасмурно', 'Дождь', 'Снег'][Math.floor(Math.random() * 5)],
                humidity: Math.round(Math.random() * 100),
                windSpeed: Math.round(Math.random() * 20),
                city: this.city
            };
        } catch (error) {
            console.error('Ошибка при получении данных о погоде:', error);
            this.weatherData = null;
        }
    }
    
    updateWeatherDisplay(content) {
        if (!this.weatherData) return;
        
        const weatherInfo = document.createElement('div');
        weatherInfo.className = 'weather-info';
        
        weatherInfo.innerHTML = `
            <div class="weather-city">${this.weatherData.city}</div>
            <div class="weather-temp">${this.weatherData.temperature}°C</div>
            <div class="weather-desc">${this.weatherData.description}</div>
            <div class="weather-details">
                <div class="weather-detail">Влажность: ${this.weatherData.humidity}%</div>
                <div class="weather-detail">Ветер: ${this.weatherData.windSpeed} м/с</div>
            </div>
        `;
        
        content.innerHTML = '';
        content.appendChild(weatherInfo);
    }
    
    destroy() {
        // Очистка ресурсов, если необходимо
    }
}