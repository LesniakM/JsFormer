import {
  canvas, context, startScreen, loadingFinished, loadingProgress,
} from './js/Canvas.js';
import Game from './js/classes/Game.js';

startScreen();
// sounds.bgmusic.play();
const game = new Game(canvas, context);

let imageLoadProgress = 0;
let audioLoadProgress = 0;
let gameIsReady = false;

function mainLoop() {
  window.requestAnimationFrame(mainLoop);
  if (game.gameStarted) {
    game.gameLoop();
  } else {
    if (!gameIsReady) {
      imageLoadProgress = game.images.loadProgress();
      audioLoadProgress = game.sounds.loadProgress();
      loadingProgress((imageLoadProgress + audioLoadProgress) / 2);
      if (imageLoadProgress === 1 && audioLoadProgress === 1) {
        gameIsReady = true;
        loadingFinished();
      }
    }
    if (actions.any.pressed === true && gameIsReady) game.startGame();
  }
}

mainLoop();
