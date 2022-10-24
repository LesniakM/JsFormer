/* eslint-disable no-param-reassign */
import { GreenSlime, BlueSlime, RedSlime } from './classes/Slime.js';
import { context, canvasHeight, canvasWidth } from './Canvas.js';

let lastTimeFPS = new Date();
const barImage = new Image();
barImage.src = './images/hpBar.png';

export function spawnEnemy(entities, playerRef, x = 200, y = 100, type = 'Slime', amount = 1) {
  for (let i = 0; i < amount; i += 1) {
    if (type === 'Slime') {
      const rand = Math.random();
      if (rand < 0.5) entities.push(new GreenSlime(x + i * 10, y, playerRef));
      else if (rand < 0.8) entities.push(new BlueSlime(x + i * 10, y, playerRef));
      else entities.push(new RedSlime(x + i * 10, y, playerRef));
    }
  }
}

export function showFPS() {
  const thisTimeFPS = new Date();
  const fps = 1000 / (thisTimeFPS - lastTimeFPS);
  lastTimeFPS = thisTimeFPS;
  const fpsStr = `FPS: ${Math.round(fps)}`;
  context.fillText(fpsStr, 900, 30);
}

export function showEnemyAmount(entities) {
  context.font = '30px Arial';
  context.fillStyle = 'black';
  const enemyStr = `Enemies: ${entities.length - 1}`;
  context.fillText(enemyStr, 10, 60);
}

export function showParticleAmount(particles, collidableParticles) {
  context.font = '30px Arial';
  context.fillStyle = 'black';
  let particleStr = `Particles: ${particles.length}`;
  context.fillText(particleStr, 10, 90);
  particleStr = `Collidable particles: ${collidableParticles.length}`;
  context.fillText(particleStr, 10, 120);
}

/**
* @param {number} posX Bar's left x coordinate
* @param {number} posY Bar's top y coordinate
* @param {number} posX Actual HP %, value from 0 to 100
* @param {number} posY Actual MP %, value from 0 to 100
*/
export function drawHpBar(hp, mp, posX = 5, posY = 5) {
  let botLeftX = posX + 14; let topLeftX = posX + 25; let topY = posY + 2; let
    botY = posY + 15;
  context.fillStyle = '#224422'; // HP dark bacground
  context.beginPath(); context.lineTo(botLeftX, botY); context.lineTo(botLeftX + 152, botY);
  context.lineTo(topLeftX + 152, topY); context.lineTo(topLeftX, topY); context.fill();
  context.fillStyle = '#47D866'; // HP red bar
  context.beginPath(); context.lineTo(botLeftX, botY); context.lineTo(botLeftX + hp * 1.52, botY);
  context.lineTo(topLeftX + hp * 1.52, topY); context.lineTo(topLeftX, topY); context.fill();

  botLeftX = posX; topLeftX = posX + 10; topY = posY + 17; botY = posY + 27;
  context.fillStyle = '#222244'; // MP dark bacground
  context.beginPath(); context.lineTo(botLeftX, botY); context.lineTo(botLeftX + 153, botY);
  context.lineTo(topLeftX + 153, topY); context.lineTo(topLeftX, topY); context.fill();
  context.fillStyle = '#4B84D8'; // MP red bar
  context.beginPath(); context.lineTo(botLeftX, botY); context.lineTo(botLeftX + mp * 1.53, botY);
  context.lineTo(topLeftX + mp * 1.53, topY); context.lineTo(topLeftX, topY); context.fill();

  context.drawImage(barImage, posX, posY);
}

export function drawGuiWeapon(weapon, player) {
  weapon.drawForGUI(200, 25);
  player.drawAmmo(310, 5);
}

export function startScreen() {
  context.fillStyle = '#131313';
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  context.font = '40px Verdana';
  context.fillStyle = '#DDDDDD';
  const text = 'Loading...';
  context.fillText(
    text,
    canvasWidth / 2 - context.measureText(text).width / 2,
    canvasHeight / 2 - 20,
  );
  context.fillRect(canvasWidth / 2 - 250, canvasHeight / 2 + 20, 500, 60);
  context.fillStyle = '#111111';
  context.fillRect(canvasWidth / 2 - 245, canvasHeight / 2 + 25, 490, 50);
}

export function loadingFinished() {
  context.font = '30px Verdana';
  context.fillStyle = '#DDDDDD';
  const text = '<Press any key to start>';
  context.fillText(
    text,
    canvasWidth / 2 - context.measureText(text).width / 2,
    canvasHeight / 2 + 130,
  );
}

export function endScreen(player) {
  context.fillStyle = '#222222AA';
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  context.font = '40px Verdana';
  context.fillStyle = '#DDDDDD';
  let text = 'You died.';
  context.fillText(
    text,
    canvasWidth / 2 - context.measureText(text).width / 2,
    canvasHeight / 2 - 20,
  );
  context.font = '30px Verdana';
  text = '<Press F5 to restart game>';
  context.fillText(
    text,
    canvasWidth / 2 - context.measureText(text).width / 2,
    canvasHeight / 2 + 20,
  );

  context.font = '25px Verdana';
  text = `You killed ${player.stats.killed} slimes.`;
  context.fillText(text, 160, canvasHeight / 2 + 100);
  text = `You shot ${player.stats.shots} times.`;
  context.fillText(text, 160, canvasHeight / 2 + 140);
  text = `You jumped ${player.stats.jumps} times.`;
  context.fillText(text, 160, canvasHeight / 2 + 180);
  text = `You reloaded ${player.stats.reloads} times.`;
  context.fillText(text, 160, canvasHeight / 2 + 220);
}
