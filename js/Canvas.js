export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');
export const canvasWidth = 64 * 16;
export const canvasHeight = 64 * 9;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

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

export function loadingProgress(fraction) {
  context.fillStyle = '#DDDDDD';
  context.fillRect(canvasWidth / 2 - 240, canvasHeight / 2 + 30, 480 * fraction, 40);
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
