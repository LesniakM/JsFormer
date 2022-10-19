import { ShellParticle, JumpParticle } from './Particles.js';
import Entity from './Entity.js';
import { Sprite } from './Sprite.js';
import { Revolver, AK47, Karabinek } from './Weapon.js';
import { PlayerSounds } from '../../data/audio.js';

export default class Player extends Entity {
  /**
     * @param {number} posX Player's left x coordinate
     * @param {number} posY Player's top y coordinate
     */
  constructor(posX, posY, actions, particles, collidableParticles, entities) {
    super({
      pos: { x: posX, y: posY },
      playerRef: {},
      imagePath: './images/player/idleRight.png',
      frameCount: 6,
      animations: {
        path: './images/player/',
        idleRight: {
          frameCount: 6,
          animationDelay: 8,
          loop: true,
        },
        idleLeft: {
          frameCount: 6,
          animationDelay: 8,
          loop: true,
        },
        runRight: {
          frameCount: 6,
          animationDelay: 8,
          loop: true,
        },
        runLeft: {
          frameCount: 6,
          animationDelay: 8,
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
    this.actions = actions;
    this.particles = particles;
    this.collidableParticles = collidableParticles;
    this.entities = entities;
    this.ammoIndicators = [new Sprite({ pos: { x: -100, y: -100 }, imagePath: './images/ammo.png' }), new Sprite({ pos: { x: -100, y: -100 }, imagePath: './images/ammo_empty.png' })];
    this.jumping = false;
    this.shooting = false;
    this.reloading = false;
    this.shootTimer = 0;
    this.weapons = [new Revolver(this.particles, this.collidableParticles, this),
      new AK47(this.particles, this.collidableParticles, this)];
    this.weaponIndex = 0;
    this.currentWeapon = this.weapons[this.weaponIndex];
    this.stepTicks = 0;
    this.stepIndex = 0;
    this.hitbox = {
      width: 20,
      height: 38,
    };
    this.direction = 'right';
    this.sounds = new PlayerSounds();
    this.speed = 5;
    this.stats = {
      maxHP: 100,
      HP: 100,
      maxMP: 10,
      MP: 10,
      attack: 10,
      jumps: 0,
      killed: 0,
      shots: 0,
      reloads: 0,
    };
    this.invibilityFrames = 40;
    this.invibilityCounter = 0;
    this.secretActivated = false;
  }

  restoreHP(amount) {
    this.stats.HP += amount;
    if (this.stats.HP > this.stats.maxHP) this.stats.HP = this.stats.maxHP;
  }

  accelerateRight() {
    if (!this.jumping) this.switchSprite('runRight');
    if (this.jumping) this.switchSprite('jumpRight');
    this.direction = 'right';
    if (this.vel.y === 0 && !this.jumping) this.playFootsteps();
    if (this.vel.x + this.acc.x < this.speed) {
      if (this.vel.y === 0) this.vel.x += this.acc.x;
      else this.vel.x += this.acc.x / 5; // Less x controll mid-air
    } else { this.vel.x = this.speed; }
  }

  accelerateLeft() {
    if (!this.jumping) this.switchSprite('runLeft');
    if (this.jumping) this.switchSprite('jumpLeft');
    this.direction = 'left';
    if (this.vel.y === 0 && !this.jumping) this.playFootsteps();
    if (this.vel.x - this.acc.x > -this.speed) {
      if (this.vel.y === 0) this.vel.x -= this.acc.x;
      else this.vel.x -= this.acc.x / 5; // Less x controll mid-air
    } else { this.vel.x = -this.speed; }
  }

  deccelerate() {
    if (this.direction === 'right' && !this.jumping) this.switchSprite('idleRight');
    if (this.direction === 'left' && !this.jumping) this.switchSprite('idleLeft');
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
      if (this.direction === 'right') this.switchSprite('jumpRight');
      if (this.direction === 'left') this.switchSprite('jumpLeft');
      this.particles.push(new JumpParticle(this.hitbox.pos.x - 5, this.hitbox.pos.y + 6));
      this.stats.jumps += 1;
      this.vel.y = -16;
      this.jumping = true;
      Entity.playSound(this.sounds.jump);
    }
  }

  endJump() {
    this.jumping = false;
    if (this.vel.y > 21) this.reduceHP(this.vel.y);
    this.sounds.stomp.volume = Math.min(this.vel.y / 50, 0.75);
    Entity.playSound(this.sounds.stomp);
    if (this.direction === 'right') this.switchSprite('idleRight');
    if (this.direction === 'left') this.switchSprite('idleLeft');
  }

  shoot() {
    if (this.shooting || !this.alive || this.reloading) return;
    if (this.currentWeapon.currentAmmo <= 0) {
      this.currentWeapon.sounds.playEmpty();
      return;
    }
    this.shooting = true;
    this.stats.shots += 1;
    this.currentWeapon.sounds.playShot();
    if (this.direction === 'right') {
      this.vel.x -= this.currentWeapon.knockback;
      this.currentWeapon.shoot('right', this.entities);
    } else {
      this.vel.x += this.currentWeapon.knockback;
      this.currentWeapon.shoot('left', this.entities);
    }
    this.vel.y -= this.currentWeapon.knockback / 2;
    setTimeout(() => { this.endShoot(); }, this.currentWeapon.shootIterval);
  }

  endShoot() {
    this.shooting = false;
  }

  reload() {
    if (this.reloading || this.shooting) return;
    this.stats.reloads += 1;
    if (this.currentWeapon.keepsShells) {
      if (this.direction === 'right') {
        for (let i = 0; i < this.currentWeapon.magSize - this.currentWeapon.currentAmmo; i += 1) {
          this.particles.push(new ShellParticle(
            this.currentWeapon.pos.x + this.currentWeapon.width / 2
            + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index][0],
            this.currentWeapon.pos.y + this.currentWeapon.height / 2
            + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index][1],
            -2,
          ));
        }
      }
      if (this.direction === 'left') {
        for (let i = 0; i < this.currentWeapon.magSize - this.currentWeapon.currentAmmo; i += 1) {
          this.particles.push(new ShellParticle(
            this.currentWeapon.pos.x + this.currentWeapon.width / 2
            + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index + 4][0],
            this.currentWeapon.pos.y + this.currentWeapon.height / 2
            + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index + 4][1],
            2,
            6,
          ));
        }
      }
    }
    this.reloading = true;
    this.currentWeapon.sounds.playReload1();
    setTimeout(() => { this.endReload(); }, this.currentWeapon.reloadTime);
  }

  endReload() {
    this.currentWeapon.currentAmmo = this.currentWeapon.magSize;
    this.currentWeapon.sounds.playReload2();
    this.reloading = false;
  }

  changeWeapon() {
    if (this.reloading) return;
    Entity.playSound(this.sounds.switch);
    this.weaponIndex += 1;
    if (this.weaponIndex >= this.weapons.length) this.weaponIndex = 0;
    this.currentWeapon = this.weapons[this.weaponIndex];
  }

  changeWeaponSecret() {
    if (this.secretActivated) return;
    this.weaponIndex = 0;
    this.stats.maxHP = 200;
    this.stats.HP = 200;
    this.weapons = [new Karabinek(this.particles, this.collidableParticles, this)];
    this.currentWeapon = this.weapons[0];
    this.secretActivated = true;
  }

  drawAmmo(posX, posY) {
    const space = (6 - this.currentWeapon.magSize / 100) + 120 / this.currentWeapon.magSize;
    for (let i = 0; i < this.currentWeapon.magSize; i += 1) {
      if (i < this.currentWeapon.currentAmmo) this.ammoIndicators[0].draw(posX + space * i, posY);
      else this.ammoIndicators[1].draw(posX + space * i, posY);
    }
  }

  playFootsteps() {
    this.stepTicks += 1;
    if (this.stepTicks % 6 === 0) {
      if (this.stepIndex === 0) {
        this.sounds.step1.play();
        this.stepIndex += 1;
      } else if (this.stepIndex === 1) {
        this.sounds.step2.play();
        this.stepIndex += 1;
      } else if (this.stepIndex === 2) {
        this.sounds.step3.play();
        this.stepIndex += 1;
      } else {
        this.sounds.step4.play();
        this.stepIndex = 0;
      }
    }
  }

  teleportFromWater() {
    this.sounds.splash.play();
    this.reduceHP(25);
    this.pos.x = 500;
    this.pos.y = 200;
    this.vel.y = 0;
  }

  enemyCollision() {
    for (let i = 1; i < this.entities.length; i += 1) {
      const entity = this.entities[i];

      if (this.hitbox.pos.x <= entity.hitbox.pos.x + entity.hitbox.width
                && this.hitbox.pos.x + this.hitbox.width >= entity.hitbox.pos.x
                && this.hitbox.pos.y + this.hitbox.height / 2 >= entity.hitbox.pos.y
                && this.hitbox.pos.y <= entity.hitbox.pos.y + entity.hitbox.height
                && this.invibilityCounter === 0) {
        const enemyAttack = entity.stats.attack;
        this.invibilityCounter = this.invibilityFrames;
        this.reduceHP(enemyAttack);
        const playerCenter = this.hitbox.pos.x + this.hitbox.width / 2;
        const entityCenter = entity.hitbox.pos.x + entity.hitbox.width / 2;

        if (playerCenter > entityCenter) this.vel.x += enemyAttack / 4;
        else this.vel.x -= enemyAttack / 3;
        this.vel.y -= enemyAttack / 3;
        break;
      }
    }
  }

  update() {
    if (this.pos.y > 470) this.teleportFromWater();

    // Rounding to whole pixel prevets pixel-art diffusion.
    this.pos.x = Math.round(this.pos.x + this.vel.x);

    this.hitbox.pos = {
      x: this.pos.x + (this.width - this.hitbox.width) / 2,
      y: this.pos.y + (this.height - this.hitbox.height) / 2,
    };

    if (this.actions.shoot.pressed) this.shoot();

    this.checkHorizontalCollisions();

    this.pos.y += this.vel.y;
    this.applyGravity();

    this.hitbox.pos = {
      x: this.pos.x + (this.width - this.hitbox.width) / 2,
      y: this.pos.y + (this.height - this.hitbox.height) / 2,
    };

    this.checkVerticalCollisions();

    if (this.invibilityCounter !== 0) this.invibilityCounter -= 1;
  }
}
