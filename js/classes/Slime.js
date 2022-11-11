import audioManager from './AudioManager.js';
import { canvasWidth } from '../Canvas.js';
import Entity from './Entity.js';

class Slime extends Entity {
  /**
     * @param {number} pos_x Entity's left x coordinate
     * @param {number} pos_y Entity's top y coordinate
     */
  constructor({
    posX,
    posY,
    playerRef,
    imagePath = './images/slimeGreen/idleRight.png',
    frameCount = 4,
    animations = {
      path: './images/slimeGreen/',
      idleRight: {
        frameCount: 4,
        animationDelay: 10,
        loop: true,
      },
      idleLeft: {
        frameCount: 4,
        animationDelay: 10,
        loop: true,
      },
      jumpRight: {
        frameCount: 1,
        animationDelay: 8,
        loop: false,
      },
      jumpLeft: {
        frameCount: 1,
        animationDelay: 8,
        loop: false,
      },
    },
    speed = 2,
    jumpDelay = 150,
  }) {
    super({
      pos: { x: posX, y: posY },
      playerRef,
      imagePath,
      frameCount,
      animations,
    });
    this.speed = speed;
    this.jumping = false;
    this.vel = {
      x: 1,
      y: 0.8,
    };
    this.hitbox = {
      width: 26,
      height: 22,
    };
    this.jumpTicks = 1;
    this.jumpDivier = jumpDelay;
    this.sounds = audioManager;
  }

  reduceHP(damage) {
    this.stats.HP -= damage;
    const rand = Math.random();
    if (rand < 0.33) this.sounds.play('slime', 'damage1');
    else if (rand < 0.67) this.sounds.play('slime', 'damage2');
    else this.sounds.play('slime', 'damage3');
    if (this.stats.HP <= 0) {
      this.alive = false;
      this.stats.HP = 0;
    }
  }

  deccelerate() {
    if (this.image.currentSrc.includes('runRight')) this.switchSprite('idleRight');
    if (this.image.currentSrc.includes('runLeft')) this.switchSprite('idleLeft');
    if (this.vel.x > this.acc.x) {
      if (this.vel.y === 0) this.vel.x -= this.acc.x;
      else this.vel.x -= this.acc.x / 8; // Less x controll mid-air
    } else if (this.vel.x < -this.acc.x) {
      if (this.vel.y === 0) this.vel.x += this.acc.x;
      else this.vel.x += this.acc.x / 8; // Less x controll mid-air
    } else { this.vel.x = 0; }
  }

  jump() {
    if (!this.jumping && this.vel.y < 5) {
      this.vel.y = -8 - this.speed - Math.random();
      if (this.player.pos.x > this.pos.x) this.vel.x = 8 + Math.random();
      else this.vel.x = -5 - this.speed - Math.random();
      this.jumping = true;
      this.sounds.play('slime', 'jump');
      this.jumpTicks += 1;
    }
  }

  endJump() {
    this.jumping = false;
    this.sounds.play('slime', 'stomp');
    if (this.vel.x >= 0) this.switchSprite('idleRight');
    if (this.vel.x < 0) this.switchSprite('idleLeft');
  }

  teleportFromWater() {
    this.pos.x = canvasWidth * Math.random();
    this.pos.y = 0;
    this.sounds.play('slime', 'splash');
  }

  update() {
    if (this.pos.y > 480) this.teleportFromWater();
    if (this.jumpTicks % this.jumpDivier === 0) this.jump();

    // Rounding to whole pixel prevents pixel-art diffusion.
    this.pos.x = Math.round(this.pos.x + this.vel.x);
    this.deccelerate();

    this.hitbox.pos = {
      x: this.pos.x + (this.width - this.hitbox.width) / 2,
      y: this.pos.y + (this.height - this.hitbox.height) / 2,
    };

    if (this.jumping) {
      if (Math.abs(this.vel.x) < 1) {
        if (this.player.pos.x > this.pos.x) this.vel.x = 1;
        else this.vel.x = -1;
      }
      if (this.vel.x >= 0) this.switchSprite('jumpRight');
      if (this.vel.x < 0) this.switchSprite('jumpLeft');
    } else { this.jumpTicks += 1; }

    this.checkHorizontalCollisions();

    this.pos.y += this.vel.y;
    this.applyGravity();

    this.hitbox.pos = {
      x: this.pos.x + (this.width - this.hitbox.width) / 2,
      y: this.pos.y + (this.height - this.hitbox.height) / 2,
    };

    this.checkVerticalCollisions();
  }
}
export class GreenSlime extends Slime {
  /**
     * @param {number} posX Entity's left x coordinate
     * @param {number} posY Entity's top y coordinate
     */
  constructor(posX, posY, playerRef) {
    super({
      posX,
      posY,
      playerRef,
      imagePath: './images/slimeGreen/idleRight.png',
      animations: {
        path: './images/slimeGreen/',
        idleRight: {
          frameCount: 4,
          animationDelay: 12,
          loop: true,
        },
        idleLeft: {
          frameCount: 4,
          animationDelay: 12,
          loop: true,
        },
        jumpRight: {
          frameCount: 1,
          animationDelay: 8,
          loop: false,
        },
        jumpLeft: {
          frameCount: 1,
          animationDelay: 8,
          loop: false,
        },
      },
    });
    this.stats = {
      maxHP: 10,
      HP: 10,
      attack: 10,
    };
  }
}

export class BlueSlime extends Slime {
  /**
     * @param {number} posX Entity's left x coordinate
     * @param {number} posY Entity's top y coordinate
     */
  constructor(posX, posY, playerRef) {
    super({
      posX,
      posY,
      playerRef,
      imagePath: './images/slimeBlue/idleRight.png',
      animations: {
        path: './images/slimeBlue/',
        idleRight: {
          frameCount: 4,
          animationDelay: 8,
          loop: true,
        },
        idleLeft: {
          frameCount: 4,
          animationDelay: 8,
          loop: true,
        },
        jumpRight: {
          frameCount: 1,
          animationDelay: 6,
          loop: false,
        },
        jumpLeft: {
          frameCount: 1,
          animationDelay: 6,
          loop: false,
        },
      },
      speed: 3,
      jumpDelay: 100,
    });
    this.stats = {
      maxHP: 30,
      HP: 30,
      attack: 15,
    };
  }
}

export class RedSlime extends Slime {
  /**
     * @param {number} posX Entity's left x coordinate
     * @param {number} posY Entity's top y coordinate
     */
  constructor(posX, posY, playerRef) {
    super({
      posX,
      posY,
      playerRef,
      imagePath: './images/slimeRed/idleRight.png',
      animations: {
        path: './images/slimeRed/',
        idleRight: {
          frameCount: 4,
          animationDelay: 6,
          loop: true,
        },
        idleLeft: {
          frameCount: 4,
          animationDelay: 6,
          loop: true,
        },
        jumpRight: {
          frameCount: 1,
          animationDelay: 5,
          loop: false,
        },
        jumpLeft: {
          frameCount: 1,
          animationDelay: 5,
          loop: false,
        },
      },
      speed: 3.5,
      jumpDelay: 50,
    });
    this.stats = {
      maxHP: 50,
      HP: 50,
      attack: 20,
    };
  }

  reduceHP(damage) {
    this.stats.HP -= damage;
    const rand = Math.random();
    if (rand < 0.33) this.sounds.play('slime', 'damage1');
    else if (rand < 0.67) this.sounds.play('slime', 'damage2');
    else this.sounds.play('slime', 'damage3');
    if (this.stats.HP <= 0) {
      this.alive = false;
      this.player.restoreHP(10);
      this.stats.HP = 0;
    }
  }
}
