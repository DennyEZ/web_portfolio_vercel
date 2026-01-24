// Animations module using GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Hero section animations
  initHeroAnimations();
  
  // Section animations
  initSectionAnimations();
  
  // Skill bar animations
  initSkillBars();
  
  // Project card animations
  initProjectCards();
}

function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  tl.fromTo('.hero__badge', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
  )
  .fromTo('.hero__title-line', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.3'
  )
  .fromTo('.hero__title-name', 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.4'
  )
  .fromTo('.hero__subtitle', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4'
  )
  .fromTo('.hero__description', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4'
  )
  .fromTo('.hero__cta .btn', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
    '-=0.3'
  )
  .fromTo('.hero__avatar', 
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.8 },
    '-=0.6'
  )
  .fromTo('.hero__scroll-hint', 
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.2'
  );
}

function initSectionAnimations() {
  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
}

function initSkillBars() {
  gsap.utils.toArray('.skill-card').forEach((card, index) => {
    const bar = card.querySelector('.skill-card__bar-fill');
    const targetWidth = bar?.dataset.level || '0';
    
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power3.out',
      onComplete: () => {
        if (bar) {
          gsap.to(bar, {
            width: `${targetWidth}%`,
            duration: 1.2,
            ease: 'power2.out'
          });
        }
      }
    });
  });
}

function initProjectCards() {
  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.7,
      delay: index * 0.15,
      ease: 'power3.out'
    });
  });
}

// Progress bar animation
export function initProgressBar() {
  const progressFill = document.querySelector('.progress-bar__fill');
  const xpValue = document.getElementById('xpValue');
  let maxXP = 100;
  let currentXP = 0;
  
  function updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollHeight) * 100;
    
    if (progressFill) {
      progressFill.style.width = `${scrollProgress}%`;
    }
    
    // Update XP based on scroll
    const newXP = Math.floor(scrollProgress * 0.5); // 0-50 XP from scrolling
    if (newXP > currentXP) {
      currentXP = newXP;
      if (xpValue) {
        xpValue.textContent = currentXP;
      }
    }
  }
  
  window.addEventListener('scroll', updateProgress);
  
  // Add XP for achievements
  function addXP(amount) {
    currentXP = Math.min(currentXP + amount, maxXP);
    if (xpValue) {
      gsap.to(xpValue, {
        textContent: currentXP,
        duration: 0.5,
        snap: { textContent: 1 }
      });
    }
  }
  
  return { addXP };
}

export default initAnimations;
