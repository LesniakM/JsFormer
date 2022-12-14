import Player from './Player.js';
import { CloudParticle } from './Particles.js';
import {
  updateEntities, updateParticles, updateCollidableParticles, updateClouds,
} from '../updateFuncs.js';
import {
  showFPS, endScreen, showEnemyAmount, showParticleAmount,
  drawHpBar, drawGuiWeapon,
} from '../utils.js';
import Sprite from './Sprite.js';
import spawnEnemy from '../spawner.js';
import audioManager from './AudioManager.js';

export default class Game {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} context
   */
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.sounds = audioManager;
    this.backgroundLevel1 = new Sprite({ pos: { x: 0, y: 0 }, imagePath: './images/background1.png' });
    this.images = this.backgroundLevel1.images;

    this.backgroundColor = '#64BEC8';
    this.fogColor = '#00000000';

    this.particles = [];
    this.collidableParticles = [];
    this.spawnTime = 3000;
    this.debugMode = false;

    this.clouds = [new CloudParticle(150, 100),
      new CloudParticle(600, 200),
      new CloudParticle(250, 300),
      new CloudParticle(400, 50),
      new CloudParticle(950, 80),
      new CloudParticle(920, 300)];

    this.entities = [];
    this.player = new Player(110, 140, this.particles, this.collidableParticles, this.entities);
    this.entities.push(this.player);
    this.gameStarted = false;
    this.endScreenShown = false;
  }

  startGame() {
    if (!this.gameStarted) {
      this.sounds.play('bgMusic', 'background1', true);
      setTimeout(() => { this.spawner(); }, 1000);
      this.gameStarted = true;
    }
  }

  gameLoop() {
    if (this.player.alive && this.gameStarted) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      updateClouds({ clouds: this.clouds, debug: this.debugMode });

      this.backgroundLevel1.draw();

      if (actions.moveRight.pressed) this.player.accelerateRight();
      else if (actions.moveLeft.pressed) this.player.accelerateLeft();
      else this.player.deccelerate();

      updateEntities(this.entities, this.player, this.debugMode);
      this.player.enemyCollision();
      updateParticles(this.particles, this.debugMode);
      updateCollidableParticles(this.collidableParticles, this.debugMode);

      this.player.currentWeapon.draw();

      if (actions.debugMode.toggled) showEnemyAmount(this.entities);
      if (this.debugMode) showParticleAmount(this.particles, this.collidableParticles);
      if (actions.debugMode.toggled) showFPS();

      this.context.fillStyle = this.fogColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      drawHpBar(
        ((this.player.stats.HP / this.player.stats.maxHP) * 100),
        ((this.player.stats.MP / this.player.stats.maxMP) * 100),
      );
      drawGuiWeapon(this.player.currentWeapon, this.player);

      if (actions.spawnEnemy.pressed === true) {
        spawnEnemy(this.entities, this.player, this.canvas.width * Math.random(), 0, 'Slime', 100);
        actions.spawnEnemy.pressed = false;
      }
    }
    if (!this.player.alive && !this.endScreenShown) {
      endScreen(this.player);
      this.endScreenShown = true;
    }
  }

  spawner() {
    if (this.spawnTime > 100) this.spawnTime -= 25;
    spawnEnemy(this.entities, this.player, this.canvas.width * Math.random(), 0);
    if (this.player.alive) setTimeout(() => { this.spawner(); }, this.spawnTime);
  }
}
