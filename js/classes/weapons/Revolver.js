import Weapon from '../Weapon.js';
import { RevolverSounds } from '../../../data/audio.js';

export default class Revolver extends Weapon {
  constructor(particles, collidableParticles, playerRef) {
    super({
      pos: { x: -100, y: -100 },
      imageSrc: './images/Revolver.png',
      magSize: 6,
      weaponOffsets: [[16, 40], [33, 40]],
      reloadTime: 700,
      shootIterval: 500,
      knockback: 4,
      audioObject: new RevolverSounds(),
      bulletPosOffsets: [[0, 0], [-20, -12], [0, 0], [0, 0], [0, 0], [0, -12], [0, 0], [0, 0]],
      bulletSpeed: 14,
      bulletKnockback: 6,
      bulletDamage: 30,
      keepsShells: true,
      particles,
      collidableParticles,
      playerRef,
    });
  }
}
