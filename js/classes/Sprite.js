import { context } from '../Canvas.js';

export class Sprite {
  constructor({ pos, imageSrc = '' }) {
    this.pos = pos;
    this.image = new Image();
    // Base values before loading ends.
    this.height = 32;
    this.width = 32;
    this.loaded = false;
    this.context = context;
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width;
      this.height = this.image.height;
    };
  }

  draw(posX = this.pos.x, posY = this.pos.y) {
    if (this.loaded) {
      this.context.drawImage(
        this.image,
        posX,
        posY,
        this.width,
        this.height,
      );
    }
  }
}

export class AnimatedSprite {
  constructor({
    pos, imageSrc = '', frameCount = 1, animations = {},
  }) {
    this.pos = pos;
    this.image = new Image();
    this.frameCount = frameCount;
    this.currentFrame = 0;
    this.tickCounter = 0;
    this.tickDivider = 8;
    this.animations = animations;
    // Base values before loading ends.
    this.height = 32;
    this.width = 32;
    this.loaded = false;
    this.context = context;
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameCount;
      this.height = this.image.height;
    };

    if (this.animations) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.animations) {
        // eslint-disable-next-line no-continue
        if (key === 'path') continue;
        const image = new Image();
        image.src = (`${this.animations.path + key}.png`);
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    if (this.loaded) {
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
    }

    this.updateFrameCount();
  }

  switchSprite(name) {
    if (!this.image.currentSrc.includes(name)) {
      this.image = this.animations[name].image;
      this.frameCount = this.animations[name].frameCount;
      this.tickDivider = this.animations[name].animationDelay;
      this.currentFrame = 0;
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
