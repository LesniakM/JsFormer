/* eslint-disable no-param-reassign */
export function updateEntities(entities, player, debug = false) {
  for (let i = 0; i < entities.length; i += 1) {
    if (entities[i].alive === true) {
      entities[i].update();
      entities[i].draw();
      if (debug) {
        entities[i].drawSpriteBox();
        entities[i].drawHitBox();
      }
    } else {
      player.stats.killed += 1;
      delete entities[i];
      entities.splice(i, 1);
    }
  }
}

export function updateParticles(particles, debug = false) {
  for (let i = 0; i < particles.length; i += 1) {
    if (particles[i].alive === true) {
      if (particles[i].constructor.name === 'ShellParticle') particles[i].move();
      particles[i].draw();
      if (debug) {
        particles[i].drawSpriteBox();
      }
    } else {
      delete particles[i];
      particles.splice(i, 1);
    }
  }
}

export function updateCollidableParticles(collidableParticles, debug = false) {
  for (let i = 0; i < collidableParticles.length; i += 1) {
    if (collidableParticles[i].alive === true) {
      collidableParticles[i].draw();
      collidableParticles[i].checkHorizontalCollisions();
      if (debug) {
        collidableParticles[i].drawSpriteBox();
      }
    }
    if (collidableParticles[i].alive === false) {
      delete collidableParticles[i];
      collidableParticles.splice(i, 1);
    }
  }
}

export function updateClouds(clouds, width = 1024, debug = false) {
  for (let i = 0; i < clouds.length; i += 1) {
    if (clouds[i].pos.x < -100) {
      clouds[i].pos.x = width;
      clouds[i].selectRandSprite();
    }
    clouds[i].pos.x -= clouds[i].speed;
    clouds[i].draw();
    if (debug) {
      clouds[i].drawSpriteBox();
    }
  }
}
