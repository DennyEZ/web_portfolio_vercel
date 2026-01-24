# Game-Inspired Portfolio

A professional, interactive portfolio website with game elements, built for internship applications to game studios.

## 🎮 Features

- **Dark Theme Design** - Professional, game-inspired aesthetic
- **Achievement System** - 8 unlockable achievements with toast notifications
- **Hidden Match-3 Game** - Easter egg mini-game (Konami code: ↑↑↓↓←→←→BA)
- **XP Progress Bar** - Tracks exploration progress
- **Smooth Animations** - Powered by GSAP with scroll triggers
- **Responsive Design** - Works on desktop and mobile

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
web_portfolio/
├── index.html              # Main HTML
├── src/
│   ├── main.js             # Entry point
│   ├── styles/             # CSS modules
│   │   ├── variables.css   # Design tokens
│   │   ├── base.css        # Reset & base styles
│   │   ├── components.css  # Reusable components
│   │   ├── header.css      # Header & navigation
│   │   ├── sections.css    # Page sections
│   │   └── game.css        # Game elements
│   ├── modules/            # JavaScript modules
│   │   ├── navigation.js   # Nav & smooth scroll
│   │   ├── animations.js   # GSAP animations
│   │   ├── achievements.js # Achievement system
│   │   └── game.js         # Match-3 game
│   └── data/               # Static data
│       ├── skills.js       # Skills list
│       ├── projects.js     # Projects list
│       └── achievements.js # Achievement defs
└── public/                 # Static assets
```

## 🏆 Achievements

| Achievement | Trigger |
|------------|---------|
| First Steps | Visit the site |
| Explorer | Visit all sections |
| Curious Mind | View 3 projects |
| Night Owl | Visit after midnight |
| Dedicated Reader | Scroll all content |
| Let's Connect | Click a social link |
| True Gamer | Find the hidden game |
| Champion | Win the match-3 game |

## 🎯 Easter Eggs

- **Konami Code**: ↑↑↓↓←→←→BA - Opens the match-3 game
- **Coffee Click**: Click ☕ in footer 5 times quickly
- **Secret Word**: Type "play" anywhere on the page

## 📦 Tech Stack

- **Vite** - Build tool & dev server
- **Vanilla JavaScript** - No framework overhead
- **GSAP** - Smooth animations
- **CSS Custom Properties** - Design tokens

## 🎨 Customization

Edit these files to personalize:
- `src/data/skills.js` - Your skills
- `src/data/projects.js` - Your projects
- `index.html` - Name, bio, social links

## 📄 License

MIT
