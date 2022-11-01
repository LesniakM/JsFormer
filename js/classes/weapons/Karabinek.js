import Weapon from '../Weapon.js';
import { BulletParticle, ShellParticle } from '../Particles.js';
import { KarabinekSounds } from '../../../data/audio.js';

export default class Karabinek extends Weapon {
  constructor(particles, collidableParticles, playerRef) {
    super({
      pos: { x: -100, y: -100 },
      imageSrc: './images/Karabinek.png',
      magSize: 120,
      weaponOffsets: [[40, 46], [50, 46]],
      reloadTime: 1000,
      shootIterval: 87,
      knockback: 0,
      audioObject: new KarabinekSounds(),
      bulletPosOffsets: [[0, 0], [-20, -16], [0, 0], [0, 0], [0, 0], [10, -16], [0, 0], [0, 0]],
      bulletSpeed: 30,
      bulletKnockback: 10,
      bulletDamage: 25,
      particles,
      collidableParticles,
      playerRef,
    });
  }

  shoot(direction, entities) {
    this.currentAmmo -= 1;
    if (!this.player.jumping) this.player.vel.y -= (1.5 + Math.random());
    if (direction === 'right') {
      this.collidableParticles.push(new BulletParticle(
        this.pos.x + this.width / 2 + this.bulletPosOffsets[this.index][0],
        this.pos.y + this.height / 2 + this.bulletPosOffsets[this.index][1],
        false,
        this.bulletSpeed,
        this.bulletKnockback,
        this.bulletDamage,
        this.particles,
        entities,
        (1 - Math.random() * 3),
      ));
      this.particles.push(new ShellParticle(
        this.pos.x + this.width / 2 + this.bulletPosOffsets[this.index][0],
        this.pos.y + this.height / 2 + this.bulletPosOffsets[this.index][1],
        -1,
      ));
    }
    if (direction === 'left') {
      this.collidableParticles.push(new BulletParticle(
        this.pos.x + this.width / 2 + this.bulletPosOffsets[this.index + 4][0],
        this.pos.y + this.height / 2 + this.bulletPosOffsets[this.index + 4][1],
        true,
        this.bulletSpeed,
        this.bulletKnockback,
        this.bulletDamage,
        this.particles,
        entities,
        (1 - Math.random() * 3),
      ));

      this.particles.push(new ShellParticle(
        this.pos.x + this.width / 2 + this.bulletPosOffsets[this.index + 4][0],
        this.pos.y + this.height / 2 + this.bulletPosOffsets[this.index + 4][1],
        1,
        6,
      ));
    }
  }
}
