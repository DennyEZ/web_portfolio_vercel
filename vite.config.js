import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        skills: resolve(__dirname, 'skills.html'),
        projects: resolve(__dirname, 'projects.html'),
        experience: resolve(__dirname, 'experience.html'),
        contact: resolve(__dirname, 'contact.html'),
        trMain: resolve(__dirname, 'tr/index.html'),
        trAbout: resolve(__dirname, 'tr/about.html'),
        trSkills: resolve(__dirname, 'tr/skills.html'),
        trProjects: resolve(__dirname, 'tr/projects.html'),
        trExperience: resolve(__dirname, 'tr/experience.html'),
        trContact: resolve(__dirname, 'tr/contact.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
});

