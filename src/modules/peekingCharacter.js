// Peeking Character Module
// A fun interactive character that peeks over the footer
import { getAchievementSystem } from './achievements.js';

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

const ANIMATION_DURATION = 600; // ms - must match CSS animation duration

let clickCount = 0;
let isHidden = false;
let messageIndex = 0;
let isOnCooldown = false;

export default function initPeekingCharacter() {
  const character = document.getElementById('peekingCharacter');
  const bubble = document.getElementById('peekingBubble');
  const textElement = bubble?.querySelector('.footer__peeking-text');
  
  if (!character || !bubble || !textElement) return;
  
  let bubbleTimeout = null;
  let resetTimeout = null;
  
  // Click interaction - cycle through messages
  character.addEventListener('click', () => {
    // Ignore clicks during cooldown
    if (isOnCooldown || isHidden) return;
    
    // Unlock achievement on first click
    getAchievementSystem()?.unlock('hello_there');
    
    clickCount++;
    
    // Update message
    messageIndex = (messageIndex + 1) % messages.length;
    textElement.textContent = messages[messageIndex];
    
    // Show bubble temporarily
    clearTimeout(bubbleTimeout);
    bubble.classList.add('footer__peeking-bubble--visible');
    
    // Start cooldown and wave animation
    isOnCooldown = true;
    character.classList.add('footer__peeking--waving');
    
    // End cooldown and remove animation class after animation completes
    setTimeout(() => {
      character.classList.remove('footer__peeking--waving');
      isOnCooldown = false;
    }, ANIMATION_DURATION);
    
    // Hide bubble after delay
    bubbleTimeout = setTimeout(() => {
      bubble.classList.remove('footer__peeking-bubble--visible');
    }, 2000);
    
    // Reset click count after inactivity
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
    if (!footer || isOnCooldown) return;
    
    const footerTop = footer.getBoundingClientRect().top;
    
    // If footer is coming into view and scrolling down fast
    if (footerTop < window.innerHeight + 200 && scrollVelocity > 30) {
      scareCharacter();
    }
  });
  
  // Double-click to make character hide/show
  character.addEventListener('dblclick', () => {
    if (isOnCooldown) return;
    
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
  if (character && !character.classList.contains('footer__peeking--scared') && !isOnCooldown) {
    isOnCooldown = true;
    character.classList.add('footer__peeking--scared');
    setTimeout(() => {
      character.classList.remove('footer__peeking--scared');
      isOnCooldown = false;
    }, 500);
  }
}
