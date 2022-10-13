function updateEntities() {
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].alive == true) {
            entities[i].update();
            entities[i].draw();
            if (debug_mode) {
                entities[i].drawSpriteBox();
                entities[i].drawHitBox();}}
        else {
            player.stats.killed++;
            delete entities[i];
            entities.splice(i, 1);}
    }
}

function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].alive == true) {
            if (particles[i].constructor.name == "ShellParticle") particles[i].move();
            particles[i].draw();
            if (debug_mode) {
                particles[i].drawSpriteBox();}}
        else {
            delete particles[i];
            particles.splice(i, 1);}
    }
}

function updateCollidableParticles() {
    for (let i = 0; i < collidableParticles.length; i++) {
        if (collidableParticles[i].alive == true) {
            collidableParticles[i].draw();
            collidableParticles[i].checkHorizontalCollisions();
            if (debug_mode) {
                collidableParticles[i].drawSpriteBox();}}
        if (collidableParticles[i].alive == false) {
            delete collidableParticles[i];
            collidableParticles.splice(i, 1);}
    }
}

function updateClouds() {
    for (let i = 0; i < clouds.length; i++) {
        if (clouds[i].pos.x < -100) {
            clouds[i].pos.x = canvas.width;
            clouds[i].selectRandSprite();}
        clouds[i].pos.x -= clouds[i].speed;
        clouds[i].draw();
        if (debug_mode) {
            clouds[i].drawSpriteBox();}
    }
}