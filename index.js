const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 64 * 16;
canvas.height = 64 * 9;


function updateEntities() {
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].alive == true) {
            entities[i].update();
            entities[i].draw();
            if (debug_mode) {
                entities[i].drawSpriteBox();
                entities[i].drawHitBox();}}
        else {
            delete entities[i];
            entities.splice(i, 1);}
    }
}

function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].alive == true) {
            particles[i].draw();
            if (debug_mode) {
                particles[i].drawSpriteBox();}}
        else {
            delete particles[i];
            particles.splice(i, 1);}
    }
}

function updateClouds() {
    for (let i = 0; i < clouds.length; i++) {
        if (clouds[i].pos.x < -100) clouds[i].pos.x = canvas.width;
        clouds[i].pos.x -= clouds[i].speed;
        clouds[i].draw();
        if (debug_mode) {
            clouds[i].drawSpriteBox();}
    }
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = '#64BEC8'
    c.fillRect(0,0, canvas.width, canvas.height);

    updateClouds();

    backgroundLevel1.draw();
    
    if (actions.moveRight.pressed) player.accelerateRight();
    else if (actions.moveLeft.pressed) player.accelerateLeft();
    else player.deccelerate();

    updateEntities();
    updateParticles();

    if (debug_mode) showEnemyAmount();
    if (debug_mode) showParticleAmount();
    if (debug_mode) showFPS();

    drawHpBar(5, 5, (player.stats.HP/player.stats.maxHP*100), (player.stats.MP/player.stats.maxMP*100))
}


const parsedCollisions = parseListToArray(collisionsLevel1)
const collisionBlocks = createColliders(parsedCollisions)

const backgroundLevel1 = new Sprite({pos: {x: 0, y:0},
                                    imageSrc: './images/background1.png'})

const sounds = new WorldSounds();

const player = new Player(110, 140);
let entities = [player];
let particles = [];
let clouds = [new CloudParticle(150, 100), new CloudParticle(600, 200), new CloudParticle(250, 300), new CloudParticle(400, 50), new CloudParticle(950, 80), new CloudParticle(920, 300)];

gameLoop()