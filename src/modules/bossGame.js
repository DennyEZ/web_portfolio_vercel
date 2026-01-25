// Boss Battle Game Module - Candy Pop Boss Fight!
import { getAchievementSystem } from './achievements.js';

export class BossGame {
  constructor() {
    this.modal = document.getElementById('bossGameModal');
    this.arena = document.getElementById('bossGameArena');
    this.closeBtn = document.getElementById('bossGameClose');
    
    // Game state
    this.bossMaxHP = 100;
    this.bossHP = 100;
    this.playerHP = 3; // Lives/hearts
    this.combo = 0;
    this.totalDamage = 0;
    this.isAnimating = false;
    this.gameOver = false;
    this.bossPhase = 1;
    this.turnsUntilAttack = 3;
    
    // Grid
    this.gridSize = 6;
    this.tileTypes = ['🔴', '🔵', '🟢', '🟡', '🟣'];
    this.grid = [];
    this.selectedTile = null;
    
    // Animation tracking - stores drop distances for each tile
    this.tileAnimations = {}; // key: "row-col", value: { dropDistance: number, isNew: boolean }
    
    this.init();
  }
  
  init() {
    this.setupListeners();
  }
  
  setupListeners() {
    this.closeBtn?.addEventListener('click', () => this.close());
    
    this.modal?.querySelector('.boss-game__overlay')
      ?.addEventListener('click', () => this.close());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.close();
      }
    });
    
    // Listen for boss battle start event
    window.addEventListener('startBossBattle', () => this.open());
  }
  
  open() {
    if (!this.modal) return;
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.reset();
  }
  
  close() {
    this.modal?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  reset() {
    this.bossHP = this.bossMaxHP;
    this.playerHP = 3;
    this.combo = 0;
    this.totalDamage = 0;
    this.isAnimating = false;
    this.gameOver = false;
    this.bossPhase = 1;
    this.turnsUntilAttack = 3;
    this.selectedTile = null;
    this.tileAnimations = {};
    this.generateGrid();
    this.render();
  }
  
  // ==================== Grid Generation ====================
  
  generateGrid() {
    this.grid = [];
    for (let row = 0; row < this.gridSize; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.gridSize; col++) {
        this.grid[row][col] = this.getRandomTile();
      }
    }
    // Remove initial matches
    this.removeInitialMatches();
  }
  
  getRandomTile() {
    return this.tileTypes[Math.floor(Math.random() * this.tileTypes.length)];
  }
  
  removeInitialMatches() {
    let hasMatches = true;
    while (hasMatches) {
      hasMatches = false;
      for (let row = 0; row < this.gridSize; row++) {
        for (let col = 0; col < this.gridSize; col++) {
          // Check horizontal
          if (col >= 2 && 
              this.grid[row][col] === this.grid[row][col-1] && 
              this.grid[row][col] === this.grid[row][col-2]) {
            this.grid[row][col] = this.getRandomTile();
            hasMatches = true;
          }
          // Check vertical
          if (row >= 2 && 
              this.grid[row][col] === this.grid[row-1][col] && 
              this.grid[row][col] === this.grid[row-2][col]) {
            this.grid[row][col] = this.getRandomTile();
            hasMatches = true;
          }
        }
      }
    }
  }
  
  // ==================== Rendering ====================
  
  render() {
    // Don't re-render if game is over (victory/defeat animation in progress)
    if (this.gameOver) {
      return;
    }
    
    const hpPercent = (this.bossHP / this.bossMaxHP) * 100;
    this.bossPhase = hpPercent > 50 ? 1 : hpPercent > 25 ? 2 : 3;
    
    const bossEmoji = this.bossPhase === 1 ? '🐛' : this.bossPhase === 2 ? '😠' : '👿';
    const bossName = this.bossPhase === 1 ? 'Code Bug' : this.bossPhase === 2 ? 'Angry Bug' : 'FINAL BUG';
    const bossQuote = this.getBossQuote();
    const phaseClass = `boss-phase-${this.bossPhase}`;
    
    this.arena.innerHTML = `
      <div class="boss-battle ${phaseClass}">
        <!-- Boss Section -->
        <div class="boss-section" id="bossSection">
          <div class="boss-character" id="bossCharacter">
            <div class="boss-emoji" id="bossEmoji">${bossEmoji}</div>
          </div>
          <div class="boss-info">
            <div class="boss-name">${bossName}</div>
            <div class="boss-hp-bar">
              <div class="boss-hp-fill" style="width: ${hpPercent}%"></div>
              <span class="boss-hp-text">${this.bossHP} / ${this.bossMaxHP}</span>
            </div>
            <div class="boss-quote">"${bossQuote}"</div>
          </div>
          <div class="boss-turn-warning ${this.turnsUntilAttack <= 1 ? 'danger' : ''}">
            ⚠️ Boss attacks in: ${this.turnsUntilAttack} ${this.turnsUntilAttack === 1 ? 'turn' : 'turns'}
          </div>
        </div>
        
        <!-- Game Grid -->
        <div class="boss-grid-container">
          <div class="boss-grid" id="bossGrid">
            ${this.renderGrid()}
          </div>
          <div class="combo-display ${this.combo > 1 ? 'active' : ''}" id="comboDisplay">
            COMBO x${this.combo}!
          </div>
        </div>
        
        <!-- Player Section -->
        <div class="player-section" id="playerSection">
          <div class="player-hearts">
            ${'❤️'.repeat(this.playerHP)}${'🖤'.repeat(3 - this.playerHP)}
          </div>
          <div class="damage-dealt">Damage: ${this.totalDamage}</div>
        </div>
        
        <!-- Floating Damage Numbers Container -->
        <div class="damage-numbers" id="damageNumbers"></div>
      </div>
    `;
    
    this.attachGridListeners();
    
    // Check game over states
    if (this.bossHP <= 0 && !this.gameOver) {
      this.gameOver = true;
      setTimeout(() => this.showVictory(), 500);
    } else if (this.playerHP <= 0 && !this.gameOver) {
      this.gameOver = true;
      setTimeout(() => this.showDefeat(), 500);
    }
  }
  
  renderGrid() {
    return this.grid.map((row, rowIndex) => 
      row.map((tile, colIndex) => {
        const animKey = `${rowIndex}-${colIndex}`;
        const anim = this.tileAnimations[animKey];
        const dropClass = anim ? (anim.isNew ? 'spawning' : 'dropping') : '';
        const dropDistance = anim ? anim.dropDistance : 0;
        const animDelay = colIndex * 0.03; // Stagger animation per column
        
        return `
        <div class="boss-tile ${dropClass}" 
             data-row="${rowIndex}" 
             data-col="${colIndex}"
             data-tile="${tile}"
             style="${anim ? `--drop-distance: ${dropDistance}; --anim-delay: ${animDelay}s;` : ''}">
          ${tile}
        </div>
      `;
      }).join('')
    ).join('');
  }
  
  attachGridListeners() {
    const tiles = this.arena.querySelectorAll('.boss-tile');
    tiles.forEach(tile => {
      tile.addEventListener('click', (e) => this.handleTileClick(e));
    });
  }
  
  // ==================== Tile Interaction ====================
  
  handleTileClick(e) {
    if (this.isAnimating || this.gameOver) return;
    
    const tile = e.currentTarget;
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);
    
    if (this.selectedTile) {
      const { row: selRow, col: selCol } = this.selectedTile;
      
      // Check if adjacent
      const isAdjacent = (Math.abs(row - selRow) === 1 && col === selCol) ||
                         (Math.abs(col - selCol) === 1 && row === selRow);
      
      if (isAdjacent) {
        this.swapTiles(selRow, selCol, row, col);
      } else {
        // Select new tile
        this.clearSelection();
        this.selectTile(tile, row, col);
      }
    } else {
      this.selectTile(tile, row, col);
    }
  }
  
  selectTile(tile, row, col) {
    tile.classList.add('selected');
    this.selectedTile = { row, col };
  }
  
  clearSelection() {
    const selected = this.arena.querySelector('.boss-tile.selected');
    selected?.classList.remove('selected');
    this.selectedTile = null;
  }
  
  async swapTiles(row1, col1, row2, col2) {
    this.isAnimating = true;
    this.clearSelection();
    
    // Swap in grid
    const temp = this.grid[row1][col1];
    this.grid[row1][col1] = this.grid[row2][col2];
    this.grid[row2][col2] = temp;
    
    // Check for matches
    const matches = this.findAllMatches();
    
    if (matches.length === 0) {
      // Swap back - invalid move
      this.grid[row2][col2] = this.grid[row1][col1];
      this.grid[row1][col1] = temp;
      this.isAnimating = false;
      this.render();
      this.shakeElement(this.arena.querySelector('.boss-grid'));
      return;
    }
    
    // Valid move - process matches
    this.combo = 0;
    await this.processMatches();
    
    // Boss turn after player move
    this.turnsUntilAttack--;
    if (this.turnsUntilAttack <= 0 && this.bossHP > 0) {
      await this.bossAttack();
      this.turnsUntilAttack = this.bossPhase === 3 ? 2 : 3;
    }
    
    this.isAnimating = false;
    this.render();
  }
  
  // ==================== Match Detection ====================
  
  findAllMatches() {
    const matches = [];
    
    // Horizontal matches
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize - 2; col++) {
        const tile = this.grid[row][col];
        if (tile && tile === this.grid[row][col+1] && tile === this.grid[row][col+2]) {
          let matchLength = 3;
          while (col + matchLength < this.gridSize && this.grid[row][col+matchLength] === tile) {
            matchLength++;
          }
          for (let i = 0; i < matchLength; i++) {
            if (!matches.some(m => m.row === row && m.col === col + i)) {
              matches.push({ row, col: col + i, tile });
            }
          }
          col += matchLength - 1;
        }
      }
    }
    
    // Vertical matches
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize - 2; row++) {
        const tile = this.grid[row][col];
        if (tile && tile === this.grid[row+1][col] && tile === this.grid[row+2][col]) {
          let matchLength = 3;
          while (row + matchLength < this.gridSize && this.grid[row+matchLength][col] === tile) {
            matchLength++;
          }
          for (let i = 0; i < matchLength; i++) {
            if (!matches.some(m => m.row === row + i && m.col === col)) {
              matches.push({ row: row + i, col, tile });
            }
          }
          row += matchLength - 1;
        }
      }
    }
    
    return matches;
  }
  
  // ==================== Match Processing ====================
  
  async processMatches() {
    let matches = this.findAllMatches();
    
    while (matches.length > 0) {
      this.combo++;
      
      // Calculate damage based on match size and combo
      const baseDamage = matches.length >= 5 ? 50 : matches.length >= 4 ? 25 : 10;
      const comboDamage = baseDamage * (1 + (this.combo - 1) * 0.5);
      const damage = Math.floor(comboDamage);
      
      // Show damage and effects
      this.showDamageNumber(damage);
      this.hitBoss(damage, matches.length);
      
      // Show combo if > 1
      if (this.combo > 1) {
        this.showCombo();
      }
      
      // Screen shake for big matches
      if (matches.length >= 4) {
        this.shakeScreen(matches.length >= 5 ? 'big' : 'small');
      }
      
      // Remove matched tiles with animation
      this.render();
      const tileElements = this.arena.querySelectorAll('.boss-tile');
      matches.forEach(m => {
        const el = Array.from(tileElements).find(
          t => parseInt(t.dataset.row) === m.row && parseInt(t.dataset.col) === m.col
        );
        el?.classList.add('popping');
      });
      
      await this.delay(300);
      
      // Remove tiles
      matches.forEach(m => {
        this.grid[m.row][m.col] = null;
      });
      
      // Drop tiles and track animations
      this.dropTiles();
      
      // Fill empty spaces with new tiles (they spawn from top)
      this.fillEmptySpaces();
      
      // Render with drop animations
      this.render();
      
      // Wait for drop animation to complete
      await this.delay(400);
      
      // Clear animations after they complete
      this.tileAnimations = {};
      
      // Check for new matches (chain reaction)
      matches = this.findAllMatches();
    }
  }
  
  dropTiles() {
    // Clear previous animations
    this.tileAnimations = {};
    
    for (let col = 0; col < this.gridSize; col++) {
      let emptyRow = this.gridSize - 1;
      
      for (let row = this.gridSize - 1; row >= 0; row--) {
        if (this.grid[row][col] !== null) {
          if (row !== emptyRow) {
            // Track how many rows this tile drops
            const dropDistance = emptyRow - row;
            this.tileAnimations[`${emptyRow}-${col}`] = { 
              dropDistance, 
              isNew: false 
            };
            
            this.grid[emptyRow][col] = this.grid[row][col];
            this.grid[row][col] = null;
          }
          emptyRow--;
        }
      }
    }
  }
  
  fillEmptySpaces() {
    for (let col = 0; col < this.gridSize; col++) {
      // Count empty spaces from top for each column
      let emptyCount = 0;
      for (let row = 0; row < this.gridSize; row++) {
        if (this.grid[row][col] === null) {
          emptyCount++;
        }
      }
      
      // Fill from top, new tiles drop from above the grid
      let spawnIndex = 0;
      for (let row = 0; row < this.gridSize; row++) {
        if (this.grid[row][col] === null) {
          this.grid[row][col] = this.getRandomTile();
          // New tiles spawn from above - drop distance is their row + 1 (from off-screen)
          // Plus offset based on spawn order for cascading effect
          const dropDistance = row + 1 + (emptyCount - spawnIndex - 1);
          this.tileAnimations[`${row}-${col}`] = { 
            dropDistance, 
            isNew: true 
          };
          spawnIndex++;
        }
      }
    }
  }
  
  // ==================== Boss Actions ====================
  
  hitBoss(damage, matchSize) {
    this.bossHP = Math.max(0, this.bossHP - damage);
    this.totalDamage += damage;
    
    // Boss reaction
    const boss = this.arena.querySelector('.boss-character');
    if (boss) {
      const reactionClass = matchSize >= 5 ? 'hit-critical' : matchSize >= 4 ? 'hit-big' : 'hit-small';
      boss.classList.add(reactionClass);
      setTimeout(() => boss.classList.remove(reactionClass), 500);
    }
    
    // Show hurt emoji briefly
    const bossEmoji = this.arena.querySelector('.boss-emoji');
    if (bossEmoji && matchSize >= 4) {
      const originalEmoji = bossEmoji.textContent;
      bossEmoji.textContent = matchSize >= 5 ? '😵' : '😣';
      setTimeout(() => {
        bossEmoji.textContent = originalEmoji;
      }, 400);
    }
  }
  
  async bossAttack() {
    const boss = this.arena.querySelector('.boss-character');
    const playerSection = this.arena.querySelector('.player-section');
    
    // Wind-up animation
    boss?.classList.add('attacking');
    await this.delay(600);
    
    // Strike!
    this.shakeScreen('big');
    playerSection?.classList.add('hit');
    this.playerHP = Math.max(0, this.playerHP - 1);
    
    // Flash screen red
    this.arena.classList.add('player-hurt');
    
    await this.delay(400);
    
    boss?.classList.remove('attacking');
    playerSection?.classList.remove('hit');
    this.arena.classList.remove('player-hurt');
    
    this.render();
  }
  
  getBossQuote() {
    if (this.bossHP <= 0) return "Nooooo...!";
    if (this.bossPhase === 3) {
      const quotes = ["I WON'T GO DOWN!", "FEEL MY WRATH!", "YOU'LL PAY FOR THIS!"];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
    if (this.bossPhase === 2) {
      const quotes = ["Getting annoying...", "Not bad, human.", "I'm just warming up!"];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
    const quotes = ["Hehe, try your best!", "Is that all you got?", "Pathetic!"];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  // ==================== Visual Effects ====================
  
  showDamageNumber(damage) {
    const container = this.arena.querySelector('.damage-numbers');
    if (!container) return;
    
    const dmgEl = document.createElement('div');
    dmgEl.className = `damage-number ${damage >= 50 ? 'critical' : damage >= 25 ? 'big' : ''}`;
    dmgEl.textContent = `-${damage}`;
    dmgEl.style.left = `${30 + Math.random() * 40}%`;
    container.appendChild(dmgEl);
    
    setTimeout(() => dmgEl.remove(), 1000);
  }
  
  showCombo() {
    const comboEl = this.arena.querySelector('.combo-display');
    if (comboEl) {
      comboEl.classList.add('pop');
      setTimeout(() => comboEl.classList.remove('pop'), 300);
    }
  }
  
  shakeScreen(intensity = 'small') {
    const arena = this.arena.querySelector('.boss-battle');
    arena?.classList.add(`shake-${intensity}`);
    setTimeout(() => arena?.classList.remove(`shake-${intensity}`), 400);
  }
  
  shakeElement(el) {
    el?.classList.add('shake-invalid');
    setTimeout(() => el?.classList.remove('shake-invalid'), 300);
  }
  
  // ==================== Victory / Defeat ====================
  
  async showVictory() {
    const bossSection = document.getElementById('bossSection');
    const bossCharacter = document.getElementById('bossCharacter');
    const bossEmoji = document.getElementById('bossEmoji');
    
    // Force stop ALL animations on boss emoji (phase 3 has strong CSS)
    if (bossEmoji) {
      bossEmoji.setAttribute('style', 'animation: none !important; filter: brightness(1) !important;');
    }
    
    // Boss death sequence - add dying class (flash white)
    if (bossCharacter) {
      bossCharacter.classList.add('dying');
    }
    
    await this.delay(400);
    
    // HIDE EVERYTHING - the boss is dead!
    if (bossSection) {
      // Remove the entire boss section from DOM
      bossSection.remove();
    }
    
    // Create explosion container at a fixed position in the arena (not in bossSection which will be cleared)
    const explosionOverlay = document.createElement('div');
    explosionOverlay.className = 'explosion-overlay';
    explosionOverlay.id = 'explosionOverlay';
    
    const pieces = [
      { emoji: '🦟', angle: 0, distance: 120 },
      { emoji: '💀', angle: 45, distance: 150 },
      { emoji: '💥', angle: 90, distance: 100 },
      { emoji: '✨', angle: 135, distance: 130 },
      { emoji: '🦟', angle: 180, distance: 125 },
      { emoji: '💫', angle: 225, distance: 140 },
      { emoji: '💥', angle: 270, distance: 110 },
      { emoji: '✨', angle: 315, distance: 135 },
      { emoji: '🔥', angle: 22, distance: 95 },
      { emoji: '🔥', angle: 68, distance: 105 },
      { emoji: '🔥', angle: 112, distance: 100 },
      { emoji: '🔥', angle: 158, distance: 110 },
      { emoji: '🔥', angle: 202, distance: 98 },
      { emoji: '🔥', angle: 248, distance: 108 },
      { emoji: '🔥', angle: 292, distance: 102 },
      { emoji: '🔥', angle: 338, distance: 112 },
      { emoji: '⚡', angle: 30, distance: 80 },
      { emoji: '⚡', angle: 150, distance: 85 },
      { emoji: '⚡', angle: 210, distance: 82 },
      { emoji: '⚡', angle: 330, distance: 88 },
    ];
    
    pieces.forEach(({ emoji, angle, distance }, index) => {
      const radians = (angle * Math.PI) / 180;
      const xMove = Math.cos(radians) * distance;
      const yMove = Math.sin(radians) * distance;
      const piece = document.createElement('span');
      piece.className = 'explosion-piece';
      piece.textContent = emoji;
      piece.style.setProperty('--x-move', `${xMove}px`);
      piece.style.setProperty('--y-move', `${yMove}px`);
      piece.style.setProperty('--delay', `${index * 0.03}s`);
      piece.style.setProperty('--size', `${1.5 + Math.random() * 1}rem`);
      explosionOverlay.appendChild(piece);
    });
    
    // Add big central explosion
    const centralBoom = document.createElement('div');
    centralBoom.className = 'central-boom';
    centralBoom.textContent = '💥';
    explosionOverlay.appendChild(centralBoom);
    
    // Add to arena so it persists through the transition
    this.arena.appendChild(explosionOverlay);
    
    // Let the explosion play out
    await this.delay(1200);
    
    // Remove explosion overlay - boss area is now empty
    explosionOverlay.remove();
    
    // Brief pause with empty boss area (the bug is gone!)
    await this.delay(600);
    
    // Show victory screen
    
    // NOW show victory screen
    this.arena.innerHTML = `
      <div class="boss-victory">
        <div class="victory-confetti" id="victoryConfetti"></div>
        <div class="victory-sparkles" id="victorySparkles"></div>
        <div class="victory-content">
          <div class="victory-emoji">🏆</div>
          <h2 class="victory-title">VICTORY!</h2>
          <p class="victory-text">You defeated the Code Bug!</p>
          <p class="victory-damage">Total Damage: ${this.totalDamage}</p>
          <div class="victory-achievement">
            <span class="victory-achievement-icon">⚔️</span>
            <span class="victory-achievement-text">Achievement Unlocked: Bravest of Them All</span>
          </div>
          <button class="btn btn--primary victory-btn" id="victoryCloseBtn">
            <span>Claim Victory</span>
          </button>
        </div>
      </div>
    `;
    
    // Confetti and sparkles!
    this.createConfetti();
    this.createSparkles();
    
    // Unlock achievement
    this.onBossDefeated();
    
    // Close button
    document.getElementById('victoryCloseBtn')?.addEventListener('click', () => this.close());
  }
  
  showDefeat() {
    this.arena.innerHTML = `
      <div class="boss-defeat">
        <div class="defeat-content">
          <div class="defeat-emoji">💀</div>
          <h2 class="defeat-title">DEFEATED</h2>
          <p class="defeat-text">The Code Bug was too strong...</p>
          <p class="defeat-damage">Damage Dealt: ${this.totalDamage}</p>
          <div class="defeat-buttons">
            <button class="btn btn--primary" id="retryBtn">
              <span>⚔️ Try Again</span>
            </button>
            <button class="btn btn--secondary" id="defeatCloseBtn">
              <span>Retreat</span>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('retryBtn')?.addEventListener('click', () => this.reset());
    document.getElementById('defeatCloseBtn')?.addEventListener('click', () => this.close());
  }
  
  // ==================== Particle Effects ====================
  
  createDeathParticles(container) {
    if (!container) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'death-particles';
    particleContainer.id = 'deathParticles';
    container.style.position = 'relative';
    container.appendChild(particleContainer);
    
    // Create multiple particle types
    const particles = [
      { emoji: '💀', count: 6 },
      { emoji: '🔥', count: 8 },
      { emoji: '💥', count: 5 },
      { emoji: '✨', count: 10 },
      { emoji: '⚡', count: 4 },
    ];
    
    particles.forEach(({ emoji, count }) => {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'death-particle';
        particle.textContent = emoji;
        particle.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
        particle.style.setProperty('--delay', `${Math.random() * 0.3}s`);
        particle.style.setProperty('--duration', `${0.6 + Math.random() * 0.4}s`);
        particleContainer.appendChild(particle);
      }
    });
  }
  
  createConfetti() {
    const container = document.getElementById('victoryConfetti');
    if (!container) return;
    
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];
    
    for (let i = 0; i < 100; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 1}s`;
      piece.style.animationDuration = `${2 + Math.random() * 2}s`;
      container.appendChild(piece);
    }
  }
  
  createSparkles() {
    const container = document.getElementById('victorySparkles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'victory-sparkle';
      sparkle.textContent = '✨';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      sparkle.style.fontSize = `${1 + Math.random() * 1.5}rem`;
      container.appendChild(sparkle);
    }
  }
  
  // ==================== Utilities ====================
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  onBossDefeated() {
    getAchievementSystem()?.unlock('boss_slayer');
  }
}

export default BossGame;
