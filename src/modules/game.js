// Match-3 Game Module
import { getAchievementSystem } from './achievements.js';

const TILE_TYPES = [
  { id: 'js', color: '#f7df1e', label: 'JS' },
  { id: 'py', color: '#3776ab', label: 'PY' },
  { id: 'react', color: '#61dafb', label: '⚛️' },
  { id: 'css', color: '#264de4', label: 'CSS' },
  { id: 'node', color: '#339933', label: 'N' }
];

const GRID_SIZE = 5;
const TARGET_SCORE = 100;

class Match3Game {
  constructor() {
    this.modal = document.getElementById('gameModal');
    this.board = document.getElementById('gameBoard');
    this.scoreDisplay = document.getElementById('gameScore');
    this.targetDisplay = document.getElementById('gameTarget');
    this.closeBtn = document.getElementById('gameClose');
    this.resetBtn = document.getElementById('gameReset');
    
    this.grid = [];
    this.score = 0;
    this.selectedTile = null;
    this.isAnimating = false;
    this.gameWon = false;
    
    this.init();
  }
  
  init() {
    this.setupListeners();
    this.setupEasterEggs();
  }
  
  setupListeners() {
    this.closeBtn?.addEventListener('click', () => this.close());
    this.resetBtn?.addEventListener('click', () => this.reset());
    
    this.modal?.querySelector('.game-modal__overlay')
      ?.addEventListener('click', () => this.close());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.close();
      }
    });
  }
  
  setupEasterEggs() {
    // Konami code: ↑↑↓↓←→←→BA
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          this.open();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
    
    // Coffee emoji click (5 rapid clicks)
    const coffeeEmoji = document.getElementById('coffeeEmoji');
    let clickCount = 0;
    let clickTimer = null;
    
    coffeeEmoji?.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);
      
      if (clickCount >= 5) {
        this.open();
        clickCount = 0;
      }
      
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 1000);
    });
    
    // Type "play" anywhere
    let typedChars = '';
    document.addEventListener('keypress', (e) => {
      typedChars += e.key.toLowerCase();
      if (typedChars.includes('play')) {
        this.open();
        typedChars = '';
      }
      // Reset after 2 seconds of no typing
      clearTimeout(this.typeTimer);
      this.typeTimer = setTimeout(() => {
        typedChars = '';
      }, 2000);
    });
  }
  
  open() {
    if (!this.modal) return;
    
    // Notify achievement system
    getAchievementSystem()?.unlockGameAchievements('found');
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.reset();
  }
  
  close() {
    this.modal?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  reset() {
    this.score = 0;
    this.gameWon = false;
    this.selectedTile = null;
    this.isAnimating = false;
    this.updateScore();
    this.generateGrid();
    this.render();
    
    // Remove win overlay if exists
    const winOverlay = this.modal?.querySelector('.game-win-overlay');
    winOverlay?.remove();
  }
  
  generateGrid() {
    this.grid = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      this.grid[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        this.grid[row][col] = this.getRandomTile();
      }
    }
    
    // Ensure no initial matches
    while (this.findMatches().length > 0) {
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          this.grid[row][col] = this.getRandomTile();
        }
      }
    }
  }
  
  getRandomTile() {
    return TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
  }
  
  render() {
    if (!this.board) return;
    
    this.board.innerHTML = '';
    
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const tile = this.grid[row][col];
        const element = document.createElement('div');
        element.className = 'game-tile';
        element.dataset.row = row;
        element.dataset.col = col;
        element.style.backgroundColor = tile.color;
        element.style.color = this.getContrastColor(tile.color);
        element.textContent = tile.label;
        
        element.addEventListener('click', () => this.onTileClick(row, col));
        
        this.board.appendChild(element);
      }
    }
  }
  
  getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
  
  onTileClick(row, col) {
    if (this.isAnimating || this.gameWon) return;
    
    const tiles = this.board.querySelectorAll('.game-tile');
    const index = row * GRID_SIZE + col;
    const clickedElement = tiles[index];
    
    if (this.selectedTile === null) {
      this.selectedTile = { row, col };
      clickedElement.classList.add('selected');
    } else {
      const { row: prevRow, col: prevCol } = this.selectedTile;
      const prevIndex = prevRow * GRID_SIZE + prevCol;
      tiles[prevIndex].classList.remove('selected');
      
      // Check if adjacent
      const isAdjacent = (
        (Math.abs(row - prevRow) === 1 && col === prevCol) ||
        (Math.abs(col - prevCol) === 1 && row === prevRow)
      );
      
      if (isAdjacent) {
        this.swapTiles(prevRow, prevCol, row, col);
      }
      
      this.selectedTile = null;
    }
  }
  
  async swapTiles(row1, col1, row2, col2) {
    this.isAnimating = true;
    
    // Swap in grid
    const temp = this.grid[row1][col1];
    this.grid[row1][col1] = this.grid[row2][col2];
    this.grid[row2][col2] = temp;
    
    this.render();
    
    // Check for matches
    const matches = this.findMatches();
    
    if (matches.length > 0) {
      await this.processMatches(matches);
    } else {
      // Swap back if no matches
      await new Promise(r => setTimeout(r, 200));
      const temp2 = this.grid[row1][col1];
      this.grid[row1][col1] = this.grid[row2][col2];
      this.grid[row2][col2] = temp2;
      this.render();
    }
    
    this.isAnimating = false;
  }
  
  findMatches() {
    const matches = [];
    
    // Check horizontal matches
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        const tile = this.grid[row][col];
        if (tile.id === this.grid[row][col + 1].id && 
            tile.id === this.grid[row][col + 2].id) {
          matches.push({ row, col }, { row, col: col + 1 }, { row, col: col + 2 });
        }
      }
    }
    
    // Check vertical matches
    for (let row = 0; row < GRID_SIZE - 2; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const tile = this.grid[row][col];
        if (tile.id === this.grid[row + 1][col].id && 
            tile.id === this.grid[row + 2][col].id) {
          matches.push({ row, col }, { row: row + 1, col }, { row: row + 2, col });
        }
      }
    }
    
    // Remove duplicates
    const unique = [];
    matches.forEach(match => {
      if (!unique.some(u => u.row === match.row && u.col === match.col)) {
        unique.push(match);
      }
    });
    
    return unique;
  }
  
  async processMatches(matches) {
    // Mark matched tiles
    const tiles = this.board.querySelectorAll('.game-tile');
    matches.forEach(({ row, col }) => {
      const index = row * GRID_SIZE + col;
      tiles[index].classList.add('matched');
    });
    
    // Update score
    this.score += matches.length * 10;
    this.updateScore();
    
    await new Promise(r => setTimeout(r, 300));
    
    // Remove matched tiles and drop new ones
    this.removeAndFill(matches);
    this.render();
    
    // Check for cascading matches
    await new Promise(r => setTimeout(r, 300));
    const newMatches = this.findMatches();
    if (newMatches.length > 0) {
      await this.processMatches(newMatches);
    }
    
    // Check win condition
    if (this.score >= TARGET_SCORE && !this.gameWon) {
      this.win();
    }
  }
  
  removeAndFill(matches) {
    // Mark positions to remove
    const toRemove = new Set(matches.map(m => `${m.row},${m.col}`));
    
    // For each column, drop tiles down
    for (let col = 0; col < GRID_SIZE; col++) {
      const column = [];
      
      // Collect non-matched tiles from bottom to top
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (!toRemove.has(`${row},${col}`)) {
          column.push(this.grid[row][col]);
        }
      }
      
      // Fill with new tiles
      while (column.length < GRID_SIZE) {
        column.push(this.getRandomTile());
      }
      
      // Place back in grid (reverse order)
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        this.grid[row][col] = column[GRID_SIZE - 1 - row];
      }
    }
  }
  
  updateScore() {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = this.score;
    }
    if (this.targetDisplay) {
      this.targetDisplay.textContent = TARGET_SCORE;
    }
  }
  
  win() {
    this.gameWon = true;
    
    // Notify achievement system
    getAchievementSystem()?.unlockGameAchievements('won');
    
    // Show win overlay
    const overlay = document.createElement('div');
    overlay.className = 'game-win-overlay';
    overlay.innerHTML = `
      <div class="game-win-overlay__title">🎉 You Win!</div>
      <div class="game-win-overlay__score">Final Score: ${this.score}</div>
      <button class="btn btn--primary" onclick="this.parentElement.remove()">
        Play Again
      </button>
    `;
    
    overlay.querySelector('button').addEventListener('click', () => {
      overlay.remove();
      this.reset();
    });
    
    this.modal.querySelector('.game-modal__content').appendChild(overlay);
  }
}

let game = null;

export function initGame() {
  game = new Match3Game();
  return game;
}

export function getGame() {
  return game;
}

export default initGame;
