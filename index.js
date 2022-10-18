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

const actions = {
  moveRight: {
    key: 'KeyD',
    pressed: false,
  },
  moveLeft: {
    key: 'KeyA',
    pressed: false,
  },
  shoot: {
    key: 'KeyF',
    pressed: false,
  },
};

const backgroundLevel1 = new Sprite({
  pos: { x: 0, y: 0 },
  imageSrc: './images/background1.png',
});

const sounds = new WorldSounds();
let debugMode = false;

export const particles = [];
export const collidableParticles = [];
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
  if (player.alive) window.requestAnimationFrame(gameLoop);
  else window.requestAnimationFrame(endScreen);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#64BEC8';
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

  drawHpBar(
    ((player.stats.HP / player.stats.maxHP) * 100),
    ((player.stats.MP / player.stats.maxMP) * 100),
  );
  drawGuiWeapon(player.currentWeapon, player);
}

window.addEventListener('keydown', (event) => {
  sounds.bgmusic.play();
  switch (event.code) {
    case 'Space':
      player.jump();
      break;
    case actions.moveRight.key:
      actions.moveRight.pressed = true;
      break;
    case actions.moveLeft.key:
      actions.moveLeft.pressed = true;
      break;
    case 'F2':
      debugMode = !debugMode;
      break;
    case 'F4':
      spawnEnemy(entities, player.pos.x + 10, player.pos.y - 20);
      break;
    case 'KeyR':
      player.reload();
      break;
    case 'KeyQ':
      player.changeWeapon();
      break;
    case actions.shoot.key:
      actions.shoot.pressed = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('Unknown key down');
      // eslint-disable-next-line no-console
      console.log(event.code);
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case actions.moveRight.key:
      actions.moveRight.pressed = false;
      break;
    case actions.moveLeft.key:
      actions.moveLeft.pressed = false;
      break;
    case actions.shoot.key:
      actions.shoot.pressed = false;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('Unknown key up');
      // eslint-disable-next-line no-console
      console.log(event.code);
  }
});

let spawnTime = 3000;
function spawner() {
  if (spawnTime > 100) spawnTime -= 25;
  spawnEnemy(entities, player, canvas.width * Math.random(), 0);
  if (player.alive) setTimeout(() => { spawner(); }, spawnTime);
}

setTimeout(() => { spawner(); }, 1000);

gameLoop();
