import { canvasHeiht } from '../Canvas.js';
import { AnimatedSprite } from './Sprite.js';
import { collisionBlocks } from './CollisionBlock.js';

export default class Entity extends AnimatedSprite {
  constructor({
    pos,
    playerRef,
    imageSrc = '',
    frameCount = 1,
    animations = {},
  }) {
    super({
      pos, imageSrc, frameCount, animations,
    });
    this.vel = {
      x: 0,
      y: 0,
    };
    this.acc = {
      x: 1,
      y: 1,
    };
    this.typeCollOffset = {
      verticalTop: -0.1,
      verticalBottom: 2,
      horizontalRight: -1,
      horizontalLeft: 1,
    };
    this.player = playerRef;
    this.speed = 5;
    this.jumping = false;
    this.collisionBlocks = collisionBlocks;
    this.alive = true;
    this.stats = {
      maxHP: 30,
      HP: 30,
      maxMP: 0,
      MP: 0,
      attack: 10,
      defense: 0,
    };
  }

  reduceHP(damage) {
    this.stats.HP -= damage;
    this.sounds.playDamage();
    if (this.stats.HP <= 0) {
      this.alive = false;
      this.stats.HP = 0;
    }
  }

  reduceMP(cost) {
    this.stats.MP -= cost;
    if (this.stats.MP <= 0) {
      this.stats.MP = 0;
    }
  }

  applyGravity() {
    if (this.pos.y + this.height < canvasHeiht) {
      this.vel.y += this.acc.y;
    }
  }

  drawSpriteBox() {
    this.context.fillStyle = 'rgba(0, 0, 255, 0.25)';
    this.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  drawHitBox() {
    this.context.fillStyle = 'rgba(255, 0, 0, 0.33)';
    this.context.fillRect(
      this.hitbox.pos.x,
      this.hitbox.pos.y,
      this.hitbox.width,
      this.hitbox.height,
    );
  }

  checkHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i += 1) {
      const collisionBlock = this.collisionBlocks[i];

      if (this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.width
                && this.hitbox.pos.x + this.hitbox.width >= collisionBlock.pos.x
                && this.hitbox.pos.y + this.hitbox.height >= collisionBlock.pos.y
                && this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.height) {
        const hitboxOffsetLeft = this.hitbox.pos.x - this.pos.x;
        if (this.vel.x < 0) {
          this.pos.x = collisionBlock.pos.x - hitboxOffsetLeft
          + collisionBlock.width + this.typeCollOffset.horizontalLeft;
          this.vel.x = 0;
          break;
        }
        if (this.vel.x > 0) {
          const hitboxOffsetRight = (this.hitbox.pos.x - this.pos.x);
          this.pos.x = collisionBlock.pos.x - this.hitbox.width
          - hitboxOffsetRight + this.typeCollOffset.horizontalRight;
          this.vel.x = 0;
          break;
        }
      }
    }
  }

  checkVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i += 1) {
      const collisionBlock = this.collisionBlocks[i];

      if (this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.width
                && this.hitbox.pos.x + this.hitbox.width >= collisionBlock.pos.x
                && this.hitbox.pos.y + this.hitbox.height >= collisionBlock.pos.y
                && this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.height) {
        if (this.vel.y < 0) {
          const hitboxOffset = this.hitbox.pos.y - this.pos.y;
          this.pos.y = collisionBlock.pos.y + collisionBlock.height
          - hitboxOffset + this.typeCollOffset.verticalBottom;
          this.vel.y = 0;
          break;
        }
        if (this.vel.y > 0) {
          const hitboxOffset = this.hitbox.pos.y - this.pos.y + this.hitbox.height;
          if (this.jumping || this.vel.y > 10) this.endJump();
          this.pos.y = collisionBlock.pos.y - hitboxOffset + this.typeCollOffset.verticalTop;
          this.vel.y = 0;
          break;
        }
      }
    }
  }

  /**
   * Used to play overlaping sound effects.
   * @param  {HTMLAudioElement} sound Audio
   */
  static playSound(sound) {
    sound.pause();
    // eslint-disable-next-line no-param-reassign
    sound.currentTime = 0;
    sound.play();
  }

  // eslint-disable-next-line no-console
  static update() { console.error('Update not implemented for', this.constructor.name); }
}
