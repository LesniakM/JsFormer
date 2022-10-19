import { context } from '../Canvas.js';
import ImageContainer from './ImageContainer.js';

const images = new ImageContainer();

export class Sprite {
  constructor({ pos, imagePath }) {
    this.pos = pos;
    this.image = images.getImage(imagePath);
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

export class AnimatedSprite {
  constructor({
    pos, imagePath = '', frameCount = 1, animations = {},
  }) {
    this.pos = pos;
    this.image = images.getImage(imagePath);
    this.frameCount = frameCount;
    this.width = this.image.width / this.frameCount;
    this.height = this.image.height;
    this.context = context;

    this.currentFrame = 0;
    this.tickCounter = 0;
    this.tickDivider = 8;
    this.animations = animations;

    if (this.animations) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.animations) {
        // eslint-disable-next-line no-continue
        if (key === 'path') continue;
        this.animations[key].image = images.getImage((`${this.animations.path + key}.png`));
      }
    }
  }

  draw() {
    if (this.height !== 0) {
      const cropbox = {
        pos: {
          x: this.width * this.currentFrame,
          y: 0,
        },
        width: this.width,
        height: this.height,
      };
      this.context.drawImage(
        this.image,
        cropbox.pos.x,
        cropbox.pos.y,
        cropbox.width,
        cropbox.height,
        this.pos.x,
        this.pos.y,
        this.width,
        this.height,
      );
    } else {
      // If image wasn't fully loaded height is equal to 0.
      // In that case try assign dimensions again.
      this.width = this.image.width / this.frameCount;
      this.height = this.image.height;
    }
    this.updateFrameCount();
  }

  switchSprite(name) {
    if (!this.image.currentSrc.includes(name)) {
      this.image = this.animations[name].image;
      this.frameCount = this.animations[name].frameCount;
      this.tickDivider = this.animations[name].animationDelay;
      this.currentFrame = 0;
      this.width = this.image.width / this.frameCount;
      this.height = this.image.height;
    }
  }

  updateFrameCount() {
    this.tickCounter += 1;
    if (this.tickCounter % this.tickDivider === 0) {
      this.currentFrame += 1;
      if (this.currentFrame >= this.frameCount) {
        this.currentFrame = 0;
      }
    }
  }
}
