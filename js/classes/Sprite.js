import { context } from '../Canvas.js';
import ImageContainer from './ImageContainer.js';

const imageContainter = new ImageContainer();

export default class Sprite {
  images = imageContainter;

  constructor({ pos, imagePath }) {
    this.pos = pos;
    this.image = this.images.getImage(imagePath);
    this.width = this.image.width;
    this.height = this.image.height;
    this.context = context;
  }

  draw(posX = this.pos.x, posY = this.pos.y) {
    if (this.height !== 0) {
      this.context.drawImage(
        this.image,
        posX,
        posY,
        this.width,
        this.height,
      );
    } else {
      // If image wasn't fully loaded height is equal to 0.
      // In that case try assign dimensions again.
      this.width = this.image.width;
      this.height = this.image.height;
    }
  }
}
