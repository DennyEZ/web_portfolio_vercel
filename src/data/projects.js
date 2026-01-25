// Projects data
export const projects = [
  {
    id: 'ue5-dope-generator',
    title: 'UE5 Synthetic Dataset Generator',
    description: "Synthetic dataset generator built in Unreal Engine 5 for our ITU AUV Team's Autonomous Underwater Vehicle. Generates photorealistic training data for DOPE (Deep Object Pose Estimation), segmentation, and semantic segmentation — enabling the AUV to autonomously identify and locate underwater objects for competition tasks.",
    image: '/images/projects/ue5-dope-thumbnail.png',  // Static thumbnail
    video: '/images/projects/ue5-dope-demo.mp4',       // Video on hover
    emoji: '🎯',
    tags: ['Unreal Engine 5', 'Python', 'Computer Vision', 'Deep Learning', 'Robotics'],
    liveUrl: null,
    githubUrl: '#',
    featured: true
  },
  {
    id: 'portfolio-website',
    title: 'This Portfolio (Yes, Meta)',
    description: 'A gamified portfolio featuring various mini-games, achievement unlocking, hidden match-3 game (type "play"), Konami code Easter egg, and GSAP scroll animations. Built with vanilla JavaScript and modular architecture to prove I can write clean code without frameworks. Try the Easter eggs for a comprehensive experience. (And don\'t forget to take a peek at achievement tab in the header!)',
    image: '/images/projects/portfolio-thumbnail.png',
    emoji: '🎯',
    tags: ['Vite', 'Vanilla JavaScript', 'GSAP', 'Game Development', 'CSS'],
    liveUrl: 'https://deniztm.me',
    githubUrl: 'https://github.com/DennyEZ/web_portfolio_vercel',
    featured: false
  }
];

export default projects;
