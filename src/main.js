// Main entry point
import './styles/main.css';
import initNavigation from './modules/navigation.js';
import initAnimations, { initProgressBar } from './modules/animations.js';
import initAchievements, { getAchievementSystem } from './modules/achievements.js';
import initGame from './modules/game.js';
import initPeekingCharacter from './modules/peekingCharacter.js';
import skillCategories from './data/skills.js';
import projects from './data/projects.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Render dynamic content
  renderSkills();
  renderProjects();
  
  // Initialize modules
  initNavigation();
  initAnimations();
  initProgressBar();
  initAchievements();
  initGame();
  initPeekingCharacter();
  
  // Handle meta link (portfolio Live Demo easter egg)
  initMetaLink();
  
  console.log('🎮 Portfolio initialized! Try the Konami code for a surprise...');
});

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  
  grid.innerHTML = skillCategories.map(category => `
    <div class="skill-category">
      <h3 class="skill-category__title">${category.title}</h3>
      <div class="skill-category__list">
        ${category.skills.map(skill => `
          <div class="skill-card">
            <div class="skill-card__header">
              <div class="skill-card__icon">${skill.icon}</div>
              <div>
                <div class="skill-card__title">${skill.name}</div>
                <div class="skill-card__level">${skill.level}%</div>
              </div>
            </div>
            <div class="skill-card__bar">
              <div class="skill-card__bar-fill" data-level="${skill.level}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  
  grid.innerHTML = projects.map(project => `
    <article class="project-card" data-project="${project.id}">
      <div class="project-card__image">
        ${project.video 
          ? `
            <img src="${project.image}" alt="${project.title}" class="project-card__thumbnail">
            <video 
              src="${project.video}" 
              class="project-card__video" 
              muted 
              loop 
              playsinline
              preload="metadata"
            ></video>
          `
          : project.image 
            ? `<img src="${project.image}" alt="${project.title}">`
            : `<div class="project-card__image-placeholder">${project.emoji}</div>`
        }
        <div class="project-card__overlay"></div>
      </div>
      <div class="project-card__content">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__description">${project.description}</p>
        <div class="project-card__tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-card__links">
          ${project.liveUrl ? `
            <a href="${project.liveUrl}" ${project.id === 'portfolio-website' ? 'data-meta-link="true"' : 'target="_blank" rel="noopener"'} class="project-card__link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live Demo
            </a>
          ` : ''}
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-card__link">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `).join('');
  
  // Add video hover listeners
  initVideoHover();
}

function initVideoHover() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    const video = card.querySelector('.project-card__video');
    const thumbnail = card.querySelector('.project-card__thumbnail');
    
    if (!video) return;
    
    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {}); // Ignore autoplay errors
      if (thumbnail) thumbnail.style.opacity = '0';
      video.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      if (thumbnail) thumbnail.style.opacity = '1';
      video.style.opacity = '0';
    });
  });
}

function initMetaLink() {
  const metaLink = document.querySelector('[data-meta-link="true"]');
  if (!metaLink) return;
  
  metaLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Unlock the "already here" achievement
    const achievementSystem = getAchievementSystem();
    if (achievementSystem) {
      achievementSystem.unlock('already_here');
    }
  });
}
