import Weapon from '../Weapon.js';
import { AKSounds } from '../../../data/audio.js';

export default class AK47 extends Weapon {
  constructor(particles, collidableParticles, playerRef) {
    super({
      pos: { x: -100, y: -100 },
      imageSrc: './images/AK47.png',
      magSize: 30,
      weaponOffsets: [[32, 46], [65, 46]],
      reloadTime: 1000,
      shootIterval: 90,
      knockback: 2,
      audioObject: new AKSounds(),
      bulletPosOffsets: [[0, 0], [-10, -14], [0, 0], [0, 0], [0, 0], [10, -14], [0, 0], [0, 0]],
      bulletSpeed: 20,
      bulletKnockback: 4,
      bulletDamage: 15,
      particles,
      collidableParticles,
      playerRef,
    });
  }
}
