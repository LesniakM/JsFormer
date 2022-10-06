const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16;
canvas.height = 64 * 9;


const parsedCollisions = parseListToArray(collisionsLevel1)
const collisionBlocks = createColliders(parsedCollisions)

const backgroundLevel1 = new Sprite({pos: {x: 0, y:0},
                                    imageSrc: './images/background1.png'})

const player = new Player({
    pos: {x: 100, y: 0},
    collisionBlocks,
    imageSrc: './images/player/idle.png',
    frameCount: 6,
    animations: {
        idleRight: {
            frameCount: 6,
            imageSrc: 'src',
            animationDelay: 8},
        idleLeft: {
            frameCount: 6,
            imageSrc: 'src',
            animationDelay: 8},
        runRight: {
            frameCount: 6,
            imageSrc: 'src',
            animationDelay: 8},
        runLeft: {
            frameCount: 6,
            imageSrc: 'src',
            animationDelay: 8},
    }})

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
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()});

    if (actions.moveRight.pressed) player.accelerateRight();
    else if (actions.moveLeft.pressed) player.accelerateLeft();
    else player.deccelerate();

    player.update();
    player.draw();
    //player.drawSpriteBox();
    //player.drawHitBox();
}

animate()
