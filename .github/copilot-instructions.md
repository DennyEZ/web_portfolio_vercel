# Copilot Instructions

## Project Overview

This is **Deniz Meral's** personal portfolio website, built with Vite and vanilla JavaScript. The site is deployed on Vercel and showcases skills, experience, and projects to potential employers (targeting game companies like DreamGames, Peak Games, and Codeway).

## Tech Stack

- **Build Tool**: Vite
- **Languages**: HTML, CSS, JavaScript (vanilla, no frameworks)
- **Deployment**: Vercel (auto-deploys from GitHub)
- **Styling**: Custom CSS with CSS variables (design tokens)

## Project Structure

```
├── index.html              # Main HTML file (single page)
├── vite.config.js          # Vite configuration
├── public/                 # Static assets (images, etc.)
│   └── images/
│       └── projects/       # Project screenshots/videos
├── src/
│   ├── main.js             # Main entry point
│   ├── data/               # Content data (easy to update)
│   │   ├── achievements.js # Gamification achievements
│   │   ├── projects.js     # Portfolio projects
│   │   └── skills.js       # Skills by category
│   ├── modules/            # JavaScript modules
│   │   ├── achievements.js # Achievement system logic
│   │   ├── animations.js   # GSAP animations
│   │   ├── game.js         # Hidden match-3 game
│   │   └── navigation.js   # Nav and scroll handling
│   └── styles/             # Modular CSS
│       ├── variables.css   # Design tokens
│       ├── base.css        # Reset and base styles
│       ├── components.css  # Reusable components
│       ├── header.css      # Header styles
│       ├── sections.css    # Section-specific styles
│       ├── game.css        # Game modal styles
│       └── main.css        # Main import file
```

## Key Features

1. **Gamification**: XP progress bar, achievements system, hidden Easter eggs
2. **Hidden Game**: Type "play" anywhere to trigger a match-3 game
3. **Konami Code**: Easter egg on footer
4. **Sections**: About, Skills, Experience, Projects, Contact
5. **Responsive**: Mobile-first design

## Coding Conventions

### CSS
- Use CSS custom properties from `variables.css`
- Follow BEM naming: `.block__element--modifier`
- Keep section styles in `sections.css`
- Component styles in `components.css`

### JavaScript
- ES6 modules
- Data is separated from logic (in `data/` folder)
- Dynamic rendering for projects, skills, achievements

### HTML
- Semantic HTML5
- Accessibility: aria-labels, proper headings hierarchy
- All interactive elements have proper focus states

## Content Updates

To update portfolio content, edit the files in `src/data/`:
- **Projects**: `src/data/projects.js`
- **Skills**: `src/data/skills.js`
- **Achievements**: `src/data/achievements.js`

## Context

- **Owner**: Deniz Meral
- **University**: Istanbul Technical University (Control and Automation Engineering)
- **Team**: ITU AUV Team (Software Sub-Team) - https://github.com/itu-auv
- **Target Companies**: DreamGames, Peak Games, Codeway (game/app companies)

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Build for production
npm run preview # Preview production build
```
