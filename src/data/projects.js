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
    id: 'project-2',
    title: 'Interactive Web App',
    description: 'A full-stack web application with real-time features and smooth animations. Focus on user experience and performance.',
    image: null,
    emoji: '🌐',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'project-3',
    title: 'Data Visualization Tool',
    description: 'Interactive dashboard for visualizing complex datasets with charts, graphs, and filtering capabilities.',
    image: null,
    emoji: '📊',
    tags: ['Python', 'D3.js', 'Flask'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'project-4',
    title: 'AI/ML Experiment',
    description: 'Machine learning project exploring game AI and procedural content generation using neural networks.',
    image: null,
    emoji: '🤖',
    tags: ['Python', 'TensorFlow', 'OpenAI'],
    liveUrl: null,
    githubUrl: '#',
    featured: false
  }
];

export default projects;
