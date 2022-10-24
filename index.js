import { WorldSounds } from './data/audio.js';
import Player from './js/classes/Player.js';
import {
  spawnEnemy, showFPS,
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

function endScreen() {
  context.fillStyle = '#222222AA';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = '40px Verdana';
  context.fillStyle = '#DDDDDD';
  let text = 'You died.';
  context.fillText(
    text,
    canvas.width / 2 - context.measureText(text).width / 2,
    canvas.height / 2 - 20,
  );
  context.font = '30px Verdana';
  text = '<Press F5 to restart game>';
  context.fillText(
    text,
    canvas.width / 2 - context.measureText(text).width / 2,
    canvas.height / 2 + 20,
  );

  context.font = '25px Verdana';
  text = `You killed ${player.stats.killed} slimes.`;
  context.fillText(text, 160, canvas.height / 2 + 100);
  text = `You shot ${player.stats.shots} times.`;
  context.fillText(text, 160, canvas.height / 2 + 140);
  text = `You jumped ${player.stats.jumps} times.`;
  context.fillText(text, 160, canvas.height / 2 + 180);
  text = `You reloaded ${player.stats.reloads} times.`;
  context.fillText(text, 160, canvas.height / 2 + 220);
}

function gameLoop() {
  sounds.bgmusic.play();
  if (player.alive) window.requestAnimationFrame(gameLoop);
  else window.requestAnimationFrame(endScreen);
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

function startScreen() {
  context.fillStyle = '#131313';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = '40px Verdana';
  context.fillStyle = '#DDDDDD';
  const text = 'Loading...';
  context.fillText(
    text,
    canvas.width / 2 - context.measureText(text).width / 2,
    canvas.height / 2 - 20,
  );
  context.fillRect(canvas.width / 2 - 250, canvas.height / 2 + 20, 500, 60);
  context.fillStyle = '#111111';
  context.fillRect(canvas.width / 2 - 245, canvas.height / 2 + 25, 490, 50);
}

function loadingFinished() {
  context.font = '30px Verdana';
  context.fillStyle = '#DDDDDD';
  const text = '<Press any key to start>';
  context.fillText(
    text,
    canvas.width / 2 - context.measureText(text).width / 2,
    canvas.height / 2 + 130,
  );
}

function waitLoop() {
  if (actions.any.pressed === true) gameLoop();
  else window.requestAnimationFrame(waitLoop);
}

startScreen();
loadingFinished();
waitLoop();
