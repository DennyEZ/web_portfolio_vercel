// Achievements data and definitions
export const achievements = [
  {
    id: 'first_visit',
    name: 'First Steps',
    description: 'Welcome to my portfolio!',
    icon: '🚀',
    trigger: 'pageLoad'
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visited all sections',
    icon: '🧭',
    trigger: 'allSections',
    hint: 'Every corner holds something new...'
  },
  {
    id: 'curious',
    name: 'Curious Mind',
    description: 'Viewed 3 project details',
    icon: '🔍',
    trigger: 'viewProjects',
    hint: 'Projects are meant to be explored...'
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Visiting after midnight',
    icon: '🦉',
    trigger: 'nightTime',
    hint: 'Some secrets only reveal at night...'
  },
  {
    id: 'scroller',
    name: 'Dedicated Reader',
    description: 'Scrolled through the entire page',
    icon: '📜',
    trigger: 'scrollComplete',
    hint: 'The journey matters from top to bottom...'
  },
  {
    id: 'connector',
    name: "Let's Connect",
    description: 'Clicked a social link',
    icon: '🤝',
    trigger: 'socialClick',
    hint: 'Reach out and connect...'
  },
  {
    id: 'gamer',
    name: 'True Gamer',
    description: 'Found the hidden game',
    icon: '🎮',
    trigger: 'easterEgg',
    hint: 'Type your way to fun...'
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Won the match-3 game',
    icon: '🏆',
    trigger: 'gameWin',
    hint: 'First find it, then master it...'
  },
  {
    id: 'hello_there',
    name: 'Hello There!',
    description: 'Said hello to the peeking character',
    icon: '<img src="/images/peeking-head.png" alt="head" style="width: 48px; height: 48px; object-fit: contain;">',
    trigger: 'peekClick',
    hint: 'Someone is watching from the footer...'
  },
  {
    id: 'boss_slayer',
    name: 'Bravest of Them All',
    description: 'Defeated the Boss!',
    icon: '⚔️',
    trigger: 'bossDefeated',
    isBossAchievement: true,
    teaser: 'Are you ready?'
  },
  {
    id: 'already_here',
    name: 'You Are Already Here',
    description: 'Tried to visit a website... while already on it',
    icon: '🤦',
    trigger: 'alreadyHere',
    hint: 'Sometimes the destination is where you started...'
  }
];

export default achievements;
