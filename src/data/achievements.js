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
    trigger: 'allSections'
  },
  {
    id: 'curious',
    name: 'Curious Mind',
    description: 'Viewed 3 project details',
    icon: '🔍',
    trigger: 'viewProjects'
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Visiting after midnight',
    icon: '🦉',
    trigger: 'nightTime'
  },
  {
    id: 'scroller',
    name: 'Dedicated Reader',
    description: 'Scrolled through the entire page',
    icon: '📜',
    trigger: 'scrollComplete'
  },
  {
    id: 'connector',
    name: "Let's Connect",
    description: 'Clicked a social link',
    icon: '🤝',
    trigger: 'socialClick'
  },
  {
    id: 'gamer',
    name: 'True Gamer',
    description: 'Found the hidden game',
    icon: '🎮',
    trigger: 'easterEgg'
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Won the match-3 game',
    icon: '🏆',
    trigger: 'gameWin'
  }
];

export default achievements;
