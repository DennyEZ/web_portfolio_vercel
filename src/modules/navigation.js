// Navigation module
export function initNavigation() {
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('[data-section]');
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  // Track visited sections
  const visitedSections = new Set();
  
  // Scroll handler for header hide/show
  function onScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
  
  // Mobile menu toggle
  menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Active section highlighting
  function updateActiveSection() {
    const sections = ['about', 'skills', 'projects', 'contact'];
    const scrollPos = window.scrollY + window.innerHeight / 3;
    
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
          });
          
          // Track section visit
          if (!visitedSections.has(sectionId)) {
            visitedSections.add(sectionId);
            window.dispatchEvent(new CustomEvent('sectionVisited', { 
              detail: { section: sectionId, total: visitedSections.size }
            }));
          }
          break;
        }
      }
    }
  }
  
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  return { visitedSections };
}

export default initNavigation;
