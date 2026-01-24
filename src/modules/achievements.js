// Achievements module
import achievementsData from '../data/achievements.js';

const STORAGE_KEY = 'portfolio_achievements';

class AchievementSystem {
  constructor() {
    this.achievements = this.loadAchievements();
    this.toastContainer = document.getElementById('achievementToasts');
    this.panel = document.getElementById('achievementPanel');
    this.panelGrid = document.getElementById('achievementPanelGrid');
    this.countDisplay = document.getElementById('achievementsCount');
    this.listeners = [];
    
    this.init();
  }
  
  init() {
    this.updateCountDisplay();
    this.renderPanel();
    this.setupPanelListeners();
    this.setupTriggers();
  }
  
  loadAchievements() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedData = saved ? JSON.parse(saved) : {};
    
    return achievementsData.map(achievement => ({
      ...achievement,
      unlocked: savedData[achievement.id] || false
    }));
  }
  
  saveAchievements() {
    const data = {};
    this.achievements.forEach(a => {
      if (a.unlocked) data[a.id] = true;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  unlock(achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (!achievement || achievement.unlocked) return false;
    
    achievement.unlocked = true;
    this.saveAchievements();
    this.updateCountDisplay();
    this.renderPanel();
    this.showToast(achievement);
    this.createConfetti();
    
    // Dispatch event for other systems
    window.dispatchEvent(new CustomEvent('achievementUnlocked', { 
      detail: achievement 
    }));
    
    return true;
  }
  
  showToast(achievement) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <span class="achievement-toast__icon">${achievement.icon}</span>
      <div class="achievement-toast__content">
        <div class="achievement-toast__label">Achievement Unlocked!</div>
        <div class="achievement-toast__name">${achievement.name}</div>
      </div>
    `;
    
    this.toastContainer.appendChild(toast);
    
    // Remove after animation
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
  
  createConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti';
    document.body.appendChild(container);
    
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.5}s`;
      piece.style.animationDuration = `${2 + Math.random() * 2}s`;
      container.appendChild(piece);
    }
    
    setTimeout(() => container.remove(), 4000);
  }
  
  updateCountDisplay() {
    const unlocked = this.achievements.filter(a => a.unlocked).length;
    const total = this.achievements.length;
    if (this.countDisplay) {
      this.countDisplay.textContent = `${unlocked}/${total}`;
    }
  }
  
  renderPanel() {
    if (!this.panelGrid) return;
    
    this.panelGrid.innerHTML = this.achievements.map(achievement => `
      <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-item__icon">${achievement.icon}</div>
        <div class="achievement-item__info">
          <div class="achievement-item__name">
            ${achievement.unlocked ? achievement.name : '???'}
          </div>
          <div class="achievement-item__description">
            ${achievement.unlocked ? achievement.description : 'Keep exploring...'}
          </div>
        </div>
      </div>
    `).join('');
  }
  
  setupPanelListeners() {
    const btn = document.getElementById('achievementsBtn');
    const closeBtn = document.getElementById('achievementPanelClose');
    const overlay = this.panel?.querySelector('.achievement-panel__overlay');
    
    btn?.addEventListener('click', () => this.openPanel());
    closeBtn?.addEventListener('click', () => this.closePanel());
    overlay?.addEventListener('click', () => this.closePanel());
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.panel?.classList.contains('active')) {
        this.closePanel();
      }
    });
  }
  
  openPanel() {
    this.panel?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closePanel() {
    this.panel?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  setupTriggers() {
    // First visit achievement
    setTimeout(() => this.unlock('first_visit'), 1500);
    
    // Night owl achievement (midnight to 5am)
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      setTimeout(() => this.unlock('night_owl'), 3000);
    }
    
    // All sections visited
    let visitedCount = 0;
    window.addEventListener('sectionVisited', (e) => {
      visitedCount = e.detail.total;
      if (visitedCount >= 4) {
        this.unlock('explorer');
      }
    });
    
    // Scroll complete
    let scrolledToBottom = false;
    window.addEventListener('scroll', () => {
      if (scrolledToBottom) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.scrollY + window.innerHeight;
      if (scrollPos >= scrollHeight - 100) {
        scrolledToBottom = true;
        this.unlock('scroller');
      }
    });
    
    // Social link click
    document.querySelectorAll('[data-social]').forEach(link => {
      link.addEventListener('click', () => {
        this.unlock('connector');
      });
    });
    
    // Project view tracking
    let projectViews = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        projectViews++;
        if (projectViews >= 3) {
          this.unlock('curious');
        }
      });
    });
  }
  
  // Called by game module
  unlockGameAchievements(type) {
    if (type === 'found') {
      this.unlock('gamer');
    } else if (type === 'won') {
      this.unlock('champion');
    }
  }
}

let achievementSystem = null;

export function initAchievements() {
  achievementSystem = new AchievementSystem();
  return achievementSystem;
}

export function getAchievementSystem() {
  return achievementSystem;
}

export default initAchievements;
