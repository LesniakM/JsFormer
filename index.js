const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let lastTimeFPS = new Date();

const parsedCollisions = parseListToArray(collisionsLevel1)
const collisionBlocks = createColliders(parsedCollisions)

const backgroundLevel1 = new Sprite({pos: {x: 0, y:0},
                                    imageSrc: './images/background1.png'})

const sounds = new WorldSounds();

const player = new Player({
    pos: {x: 110, y: 140},
    collisionBlocks,
    imageSrc: './images/player/idleRight.png',
    frameCount: 6,
    animations: {
        path: "./images/player/",
        idleRight: {
            frameCount: 6,
            animationDelay: 8,
            loop: true},
        idleLeft: {
            frameCount: 6,
            animationDelay: 8,
            loop: true},
        runRight: {
            frameCount: 6,
            animationDelay: 8,
            loop: true},
        runLeft: {
            frameCount: 6,
            animationDelay: 8,
            loop: true},
        jumpRight: {
            frameCount: 1,
            animationDelay: 8,
            loop: false},
        jumpLeft: {
            frameCount: 1,
            animationDelay: 8,
            loop: false},
    }});

let entities = [player];

function showFPS() {
    const thisTimeFPS = new Date();
    const fps = 1000 / (thisTimeFPS - lastTimeFPS);
    lastTimeFPS = thisTimeFPS;
    const fpsStr = "FPS: " + Math.round(fps);
    c.fillText(fpsStr, 500, 30);
}

function showEnemyAmount() {
    c.font = "30px Arial";
    c.fillStyle = 'black';
    const slimeStr = "Enemy counter: " + entities.length -1;
    c.fillText(slimeStr, 10, 30);
}

function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'red';
    c.fillRect(0,0, canvas.width, canvas.height);

    backgroundLevel1.draw();
    
    if (actions.moveRight.pressed) player.accelerateRight();
    else if (actions.moveLeft.pressed) player.accelerateLeft();
    else player.deccelerate();

    showEnemyAmount();
    showFPS();

    for (let i = 0; i < entities.length; i++) {
        if (entities[i].alive == true) {
            entities[i].update();
            entities[i].draw();
            if (box_visibility) {
                entities[i].drawSpriteBox();
                entities[i].drawHitBox();}}
        else {
            delete entities[i];
            entities.splice(i, 1);
        }}
}

animate()
