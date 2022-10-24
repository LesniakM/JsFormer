import { WorldSounds } from './data/audio.js';
import Player from './js/classes/Player.js';
import {
  spawnEnemy, showFPS, startScreen, loadingFinished, endScreen,
  showEnemyAmount, showParticleAmount, drawHpBar, drawGuiWeapon,
} from './js/utils.js';
import { Sprite } from './js/classes/Sprite.js';
import { CloudParticle } from './js/classes/Particles.js';
import {
  updateEntities, updateParticles, updateCollidableParticles, updateClouds,
} from './js/updateFuncs.js';
import { canvas, context } from './js/Canvas.js';

const backgroundColor = '#64BEC8';
const fogColor = '#00000000';
const backgroundLevel1 = new Sprite({
  pos: { x: 0, y: 0 },
  imagePath: './images/background1.png',
});

const sounds = new WorldSounds();
const debugMode = false;

const particles = [];
const collidableParticles = [];
const entities = [];

const player = new Player(110, 140, actions, particles, collidableParticles, entities);
entities.push(player);

const clouds = [new CloudParticle(150, 100),
  new CloudParticle(600, 200),
  new CloudParticle(250, 300),
  new CloudParticle(400, 50),
  new CloudParticle(950, 80),
  new CloudParticle(920, 300)];

function gameLoop() {
  sounds.bgmusic.play();
  if (player.alive) window.requestAnimationFrame(gameLoop);
  else window.requestAnimationFrame(endScreen(player));
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  updateClouds({ clouds, debug: debugMode });

  backgroundLevel1.draw();

  if (actions.moveRight.pressed) player.accelerateRight();
  else if (actions.moveLeft.pressed) player.accelerateLeft();
  else player.deccelerate();

  updateEntities(entities, player, debugMode);
  player.enemyCollision();
  updateParticles(particles, debugMode);
  updateCollidableParticles(collidableParticles, debugMode);

  player.currentWeapon.draw();

  if (debugMode) showEnemyAmount(entities);
  if (debugMode) showParticleAmount(particles, collidableParticles);
  if (debugMode) showFPS();

  context.fillStyle = fogColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawHpBar(
    ((player.stats.HP / player.stats.maxHP) * 100),
    ((player.stats.MP / player.stats.maxMP) * 100),
  );
  drawGuiWeapon(player.currentWeapon, player);
}

let spawnTime = 3000;
function spawner() {
  if (spawnTime > 100) spawnTime -= 25;
  spawnEnemy(entities, player, canvas.width * Math.random(), 0);
  if (player.alive) setTimeout(() => { spawner(); }, spawnTime);
}

setTimeout(() => { spawner(); }, 1000);

function waitLoop() {
  if (actions.any.pressed === true) gameLoop();
  else window.requestAnimationFrame(waitLoop);
}

startScreen();
loadingFinished();
waitLoop();
