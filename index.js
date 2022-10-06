const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16;
canvas.height = 64 * 9;


const parsedCollisions = parseListToArray(collisionsLevel1)
const collisionBlocks = createColliders(parsedCollisions)

const backgroundLevel1 = new Sprite({pos: {x: 0, y:0},
                                    imageSrc: './images/background1.png'})

const player = new Player({
    pos: {x: 100, y: 100},
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

const actions = {
    moveRight: {
        key: 'KeyD',
        pressed: false,
    },
    moveLeft: {
        key: 'KeyA',
        pressed: false,
    },
};

function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'red'
    c.fillRect(0,0, canvas.width, canvas.height);

    backgroundLevel1.draw();
    
    if (actions.moveRight.pressed) player.accelerateRight();
    else if (actions.moveLeft.pressed) player.accelerateLeft();
    else player.deccelerate();

    player.update();
    player.draw();
    // player.drawSpriteBox();
    // player.drawHitBox();
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw()});
}

animate()
