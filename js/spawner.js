/* eslint-disable no-param-reassign */
import { GreenSlime, BlueSlime, RedSlime } from './classes/Slime.js';

export default function spawnEnemy(entities, playerRef, x = 200, y = 100, type = 'Slime', amount = 1) {
  for (let i = 0; i < amount; i += 1) {
    if (type === 'Slime') {
      const rand = Math.random();
      if (rand < 0.5) entities.push(new GreenSlime(x + i * 10, y, playerRef));
      else if (rand < 0.8) entities.push(new BlueSlime(x + i * 10, y, playerRef));
      else entities.push(new RedSlime(x + i * 10, y, playerRef));
    }
  }
}
