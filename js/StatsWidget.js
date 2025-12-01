import UIComponent from './UIComponent.js';

export default class StatsWidget extends UIComponent {
    constructor(config = {}) {
        super({
            ...config,
            title: config.title || 'Статистика продуктивности',
            type: 'stats'
        });
        
        this.statsData = null;
        
        this.init();
    }
    
    async init() {
        this.renderContent();
        await this.fetchStats();
    }
    
    renderContent() {
        const content = document.createElement('div');
        content.className = 'stats-content';
        
        if (!this.statsData) {
            content.innerHTML = '<p class="stats-loading">Загрузка статистики...</p>';
        } else {
            this.updateStatsDisplay(content);
        }
        
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'stats-refresh-btn';
        refreshBtn.textContent = 'Обновить';
        
        refreshBtn.addEventListener('click', async () => {
            await this.fetchStats();
            this.renderContent();
        });
        
        content.appendChild(refreshBtn);
        this.updateContent(content);
    }
    
    async fetchStats() {
        try {
            // Для демонстрации используем мок-данные
            // В реальном приложении здесь был бы запрос к API статистики
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Мок-данные для демонстрации
            this.statsData = {
                completedTasks: Math.floor(Math.random() * 20),
                totalTasks: Math.floor(Math.random() * 30) + 10,
                focusTime: Math.floor(Math.random() * 8),
                productivityScore: Math.floor(Math.random() * 40) + 60 // От 60 до 100
            };
        } catch (error) {
            console.error('Ошибка при получении статистики:', error);
            this.statsData = null;
        }
    }
    
    updateStatsDisplay(content) {
        if (!this.statsData) return;
        
        const statsInfo = document.createElement('div');
        statsInfo.className = 'stats-info';
        
        const completionRate = Math.round((this.statsData.completedTasks / this.statsData.totalTasks) * 100) || 0;
        
        statsInfo.innerHTML = `
            <div class="stats-item">
                <div class="stats-label">Выполнено задач:</div>
                <div class="stats-value">${this.statsData.completedTasks}/${this.statsData.totalTasks}</div>
                <div class="stats-progress">
                    <div class="stats-progress-bar" style="width: ${completionRate}%"></div>
                </div>
                <div class="stats-percent">${completionRate}%</div>
            </div>
            <div class="stats-item">
                <div class="stats-label">Время фокуса:</div>
                <div class="stats-value">${this.statsData.focusTime} ч</div>
            </div>
            <div class="stats-item">
                <div class="stats-label">Продуктивность:</div>
                <div class="stats-value">${this.statsData.productivityScore}%</div>
            </div>
        `;
        
        content.innerHTML = '';
        content.appendChild(statsInfo);
    }
    
    destroy() {
        // Очистка ресурсов, если необходимо
    }
}