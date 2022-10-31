import { startScreen, loadingFinished } from './js/utils.js';
import { canvas, context } from './js/Canvas.js';
import ImageContainer from './js/classes/ImageContainer.js';
import { WorldSounds } from './data/audio.js';
import Game from './js/classes/Game.js';

startScreen();
const images = new ImageContainer();
const sounds = new WorldSounds();
sounds.bgmusic.play();
const game = new Game(canvas, context, images, sounds);
loadingFinished();

function mainLoop() {
  window.requestAnimationFrame(mainLoop);
  game.gameLoop();
  if (actions.any.pressed === true) game.startGame();
}

mainLoop();
