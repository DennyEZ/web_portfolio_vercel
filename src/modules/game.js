// Game Module - Main Entry Point
// Imports and initializes all game components

import { Match3Game } from './match3Game.js';
import { BossGame } from './bossGame.js';

let match3Instance = null;
let bossInstance = null;

/**
 * Initialize all game components
 */
export function initGame() {
  // Initialize the hidden match-3 Easter egg game
  match3Instance = new Match3Game();
  
  // Initialize the boss battle game
  bossInstance = new BossGame();
  
  console.log('🎮 Games initialized');
  return match3Instance;
}

/**
 * Get the Match3Game instance
 * @returns {Match3Game|null}
 */
export function getGame() {
  return match3Instance;
}

/**
 * Get the BossGame instance
 * @returns {BossGame|null}
 */
export function getBossGame() {
  return bossInstance;
}

export { Match3Game, BossGame };
export default initGame;
