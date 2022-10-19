import { context } from '../Canvas.js';
import collisionsData from '../../data/collisions.js';

class CollisionBlock {
  constructor({ pos }) {
    this.pos = pos;
    this.width = 32;
    this.height = 32;
  }

  draw() {
    context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

function parseListToArray(data) {
  const collisionsList = data.collisionsLevel1;
  const rows = [];
  for (let i = 0; i < collisionsList.length; i += 32) {
    rows.push(collisionsList.slice(i, i + 32));
  }
  return rows;
}

function createColliders(parsedCollisions) {
  const colliders = [];
  parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        // push a new collision into collisionblocks array
        colliders.push(new CollisionBlock({
          pos: {
            x: x * 32,
            y: y * 32,
          },
        }));
      }
    });
  });
  return colliders;
}

const parsedCollisions = parseListToArray(collisionsData);
// eslint-disable-next-line import/prefer-default-export
export const collisionBlocks = createColliders(parsedCollisions);
