// Skills data organized by category
export const skillCategories = [
  {
    id: 'programming',
    title: 'Programming & Theory',
    skills: [
      { id: 'c', name: 'C', icon: '⚙️', level: 70 },
      { id: 'csharp', name: 'C#', icon: '💜', level: 60 },
      { id: 'dsa', name: 'Data Structures & Algorithms', icon: '🧠', level: 60 },
      { id: 'python', name: 'Python', icon: 'PY', level: 40 },
      { id: 'cpp', name: 'C++', icon: '⚡', level: 30 }
    ]
  },
  {
    id: 'engines',
    title: 'Engines & Frameworks',
    skills: [
      { id: 'unity', name: 'Unity', icon: '🎮', level: 70 },
      { id: 'ros', name: 'ROS1', icon: '🤖', level: 60 },
      { id: 'unreal', name: 'Unreal Engine 5', icon: '🔷', level: 50 }
    ]
  },
  {
    id: 'design',
    title: 'Design & Creative',
    skills: [
      { id: 'photoshop', name: 'Photoshop', icon: '🎨', level: 90 },
      { id: 'figma', name: 'Figma', icon: '✏️', level: 55 },
      { id: 'blender', name: 'Blender', icon: '🍊', level: 30 }
    ]
  }
];

export default skillCategories;
