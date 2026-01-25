// Peeking Character Module
// A fun interactive character that peeks over the footer

const messages = [
  "👋 Hey there!",
  "🎮 Found any Easter eggs?",
  "💡 Try typing 'play'!",
  "🚀 Scroll up for projects!",
  "☕ Need more coffee?",
  "✨ You're awesome!",
  "🎯 Almost at the bottom!",
  "🤖 Beep boop!",
  "🌟 Thanks for visiting!",
  "🔥 You're on fire!",
];

let clickCount = 0;
let isHidden = false;
let messageIndex = 0;

export default function initPeekingCharacter() {
  const character = document.getElementById('peekingCharacter');
  const bubble = document.getElementById('peekingBubble');
  const textElement = bubble?.querySelector('.footer__peeking-text');
  
  if (!character || !bubble || !textElement) return;
  
  // Click interaction - cycle through messages
  character.addEventListener('click', () => {
    clickCount++;
    
    // Update message
    messageIndex = (messageIndex + 1) % messages.length;
    textElement.textContent = messages[messageIndex];
    
    // Show bubble temporarily
    bubble.classList.add('footer__peeking-bubble--visible');
    
    // Wave animation
    character.classList.remove('footer__peeking--waving');
    void character.offsetWidth; // Trigger reflow
    character.classList.add('footer__peeking--waving');
    
    // Hide bubble after delay
    setTimeout(() => {
      bubble.classList.remove('footer__peeking-bubble--visible');
    }, 2000);
    
    // Special interaction: hide after 5 rapid clicks
    if (clickCount >= 5) {
      hideCharacter();
      setTimeout(() => {
        showCharacter();
        clickCount = 0;
      }, 3000);
    }
  });
  
  // Reset click count after inactivity
  let resetTimeout;
  character.addEventListener('click', () => {
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      clickCount = 0;
    }, 1000);
  });
  
  // Scared animation when user scrolls fast towards footer
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
    
    // Check if scrolling fast towards footer
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const footerTop = footer.getBoundingClientRect().top;
    
    // If footer is coming into view and scrolling down fast
    if (footerTop < window.innerHeight + 200 && scrollVelocity > 30) {
      scareCharacter();
    }
  });
  
  // Random peek-out when footer becomes visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isHidden) {
        // Show a random greeting after a short delay
        setTimeout(() => {
          if (Math.random() > 0.5) {
            textElement.textContent = messages[Math.floor(Math.random() * messages.length)];
            bubble.classList.add('footer__peeking-bubble--visible');
            character.classList.add('footer__peeking--waving');
            
            setTimeout(() => {
              bubble.classList.remove('footer__peeking-bubble--visible');
              character.classList.remove('footer__peeking--waving');
            }, 2500);
          }
        }, 500);
      }
    });
  }, { threshold: 0.5 });
  
  const footer = document.querySelector('.footer');
  if (footer) {
    observer.observe(footer);
  }
  
  // Double-click to make character hide/show
  character.addEventListener('dblclick', () => {
    if (isHidden) {
      showCharacter();
    } else {
      hideCharacter();
      // Automatically come back after a while
      setTimeout(() => {
        showCharacter();
      }, 5000);
    }
  });
}

function hideCharacter() {
  const character = document.getElementById('peekingCharacter');
  if (character) {
    isHidden = true;
    character.classList.add('footer__peeking--hidden');
  }
}

function showCharacter() {
  const character = document.getElementById('peekingCharacter');
  if (character) {
    isHidden = false;
    character.classList.remove('footer__peeking--hidden');
  }
}

function scareCharacter() {
  const character = document.getElementById('peekingCharacter');
  if (character && !character.classList.contains('footer__peeking--scared')) {
    character.classList.add('footer__peeking--scared');
    setTimeout(() => {
      character.classList.remove('footer__peeking--scared');
    }, 500);
  }
}
