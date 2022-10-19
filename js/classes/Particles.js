import { Sprite, AnimatedSprite } from './Sprite.js';
import { context, canvasWidth } from '../Canvas.js';
import { collisionBlocks } from './CollisionBlock.js';

class AnimatedParticle extends AnimatedSprite {
  /**
     * @param {number} pos_x Particle left pos.
     * @param {number} pos_y Particle top  pos.
     * @param {string} imageSrc Path to image.
     * @param {number} frameCount Amount of frames on image.
     * @param {number} loops How many times animation have to be played. -1 for infinity.
     * @param {number} ticksPerFrame How long one frame should stay on screen.
     */
  constructor({
    posX, posY, imagePath, frameCount = 1, loops = 1, ticksPerFrame = 4,
  }) {
    super({ pos: { x: posX, y: posY }, imagePath, frameCount });
    this.loops = loops;
    this.tickDivider = ticksPerFrame;
    this.alive = true;
    this.context = context;
  }

  drawSpriteBox() {
    this.context.fillStyle = 'rgba(0, 255, 0, 0.25)';
    this.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  updateFrameCount() {
    this.tickCounter += 1;
    if (this.tickCounter % this.tickDivider === 0) {
      this.currentFrame += 1;
      if (this.currentFrame >= this.frameCount) {
        this.currentFrame = 0;
        this.loops -= 1;
        if (this.loops === 0) this.alive = false;
      }
    }
  }
}

class StaticParticle extends Sprite {
  /**
     * @param {number} posX Particle left pos.
     * @param {number} posY Particle top  pos.
     * @param {string} imageSrc Path to image.
     */
  constructor({ posX, posY, imagePath }) {
    super({ pos: { x: posX, y: posY }, imagePath });
    this.alive = true;
    this.context = context;
  }

  drawSpriteBox() {
    this.context.fillStyle = 'rgba(0, 255, 0, 0.25)';
    this.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

export class JumpParticle extends AnimatedParticle {
  constructor(posX, posY) {
    super({
      posX,
      posY,
      imagePath: './images/jumpDust.png',
      frameCount: 3,
      loops: 1,
      ticksPerFrame: 2,
    });
  }
}

class BulletSplashParticle extends AnimatedParticle {
  constructor(posX, posY, small = false) {
    super({
      posX,
      posY,
      imagePath: ((small === true) ? './images/bullet_splash_small.png' : './images/bullet_splash.png'),
      frameCount: 3,
      loops: 1,
      ticksPerFrame: 2,
    });
  }
}

export class ShellParticle extends AnimatedParticle {
  constructor(posX, posY, velX, startFrame = 2, velY = -8, accY = 1, rotation = 5) {
    super({
      posX,
      posY,
      imagePath: './images/empty_shell.png',
      frameCount: 8,
      loops: -1,
      ticksPerFrame: rotation,
    });
    this.vel_x = velX - 1 + Math.random() * 2;
    this.vel_y = velY - 2 + Math.random() * 3;
    this.acc_y = accY;
    this.currentFrame = startFrame;
  }

  move() {
    if (this.pos.y > 600) {
      this.alive = false;
      return;
    }
    this.pos.x += this.vel_x;
    this.vel_y += this.acc_y;
    this.pos.y += this.vel_y;
  }
}

export class CloudParticle extends StaticParticle {
  constructor(posX, posY) {
    super({ posX, posY, imagePath: './images/cloud1.png' });

    this.sources = [['./images/cloud1.png', 0.5],
      ['./images/cloud2.png', 0.45],
      ['./images/cloud3.png', 0.4],
      ['./images/cloud4.png', 0.3],
      ['./images/cloud5.png', 0.3],
      ['./images/cloud6.png', 0.25]];
    this.speed = 0.5;
    this.selectRandSprite();
  }

  selectRandSprite() {
    const randomInt = Math.round(Math.random() * 5);
    this.image.src = this.sources[randomInt][0];
    this.speed = this.sources[randomInt][1];
  }
}

export class BulletParticle extends StaticParticle {
  constructor(posX, posY, mirror, speed, knockback, damage, particles, entities) {
    super({ posX, posY, imagePath: './images/big_bullet.png' });
    this.mirror = mirror;
    if (this.mirror) this.vel_x = -speed;
    else this.vel_x = speed;
    this.knockback = knockback;
    this.damage = damage;
    this.collisionBlocks = collisionBlocks;
    this.particles = particles;
    this.entities = entities;
  }

  draw() {
    if (this.height !== 0) {
      const cropbox = {
        pos: {
          x: 0,
          y: (this.height / 2) * this.mirror,
        },
        width: this.width,
        height: this.height / 2,
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
        this.height / 2,
      );
    }
    this.pos.x += this.vel_x;
    if (this.pos.x > canvasWidth || this.pos.x < -20) this.alive = false;
  }

  drawSpriteBox() {
    this.context.fillStyle = 'rgba(0, 255, 0, 0.25)';
    this.context.fillRect(this.pos.x, this.pos.y, this.width, this.height / 2);
  }

  checkHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i += 1) {
      const collisionBlock = this.collisionBlocks[i];

      if (this.pos.x <= collisionBlock.pos.x + collisionBlock.width
                && this.pos.x + this.width >= collisionBlock.pos.x
                && this.pos.y + this.height / 2 >= collisionBlock.pos.y
                && this.pos.y <= collisionBlock.pos.y + collisionBlock.height) {
        this.alive = false;
        const diffuse = 2 - Math.random() * 4;
        if (this.damage >= 25) {
          if (this.mirror) {
            this.particles.push(new BulletSplashParticle(
              collisionBlock.pos.x + collisionBlock.width + diffuse - 16,
              this.pos.y - 8 + diffuse,
            ));
          } else {
            this.particles.push(new BulletSplashParticle(
              collisionBlock.pos.x + diffuse - 16,
              this.pos.y - 8 + diffuse,
            ));
          }
        } else if (this.mirror) {
          this.particles.push(new BulletSplashParticle(
            collisionBlock.pos.x + collisionBlock.width + diffuse - 8,
            this.pos.y - 4 + diffuse,
            true,
          ));
        } else {
          this.particles.push(new BulletSplashParticle(
            collisionBlock.pos.x + diffuse - 8,
            this.pos.y - 4 + diffuse,
            true,
          ));
        }
        break;
      }
    }

    for (let i = 1; i < this.entities.length; i += 1) {
      const entity = this.entities[i];

      if (this.pos.x <= entity.hitbox.pos.x + entity.hitbox.width
                && this.pos.x + this.width >= entity.hitbox.pos.x
                && this.pos.y + this.height / 2 >= entity.hitbox.pos.y
                && this.pos.y <= entity.hitbox.pos.y + entity.hitbox.height) {
        this.alive = false;
        entity.reduceHP(this.damage);
        const diffuse = 2 - Math.random() * 4;
        if (this.damage >= 25) {
          if (this.mirror) {
            this.particles.push(new BulletSplashParticle(
              entity.hitbox.pos.x + entity.hitbox.width + diffuse - 16,
              this.pos.y - 8 + diffuse,
            ));
            entity.vel.x -= this.knockback;
            entity.vel.y -= this.knockback;
          } else {
            this.particles.push(new BulletSplashParticle(
              entity.hitbox.pos.x + diffuse - 16,
              this.pos.y - 8 + diffuse,
            ));
            entity.vel.x += this.knockback;
            entity.vel.y -= this.knockback;
          }
        } else if (this.mirror) {
          this.particles.push(new BulletSplashParticle(
            entity.hitbox.pos.x + entity.hitbox.width + diffuse - 8,
            this.pos.y - 4 + diffuse,
            true,
          ));
          entity.vel.x -= this.knockback;
          entity.vel.y -= this.knockback;
        } else {
          this.particles.push(new BulletSplashParticle(
            entity.hitbox.pos.x + diffuse - 8,
            this.pos.y - 4 + diffuse,
            true,
          ));
          entity.vel.x += this.knockback;
          entity.vel.y -= this.knockback;
        }
        break;
      }
    }
  }
}
