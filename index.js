const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16;
canvas.height = 64 * 9;


const player = new Player()

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
    c.fillStyle = 'gray';
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (actions.moveRight.pressed) player.accelerateRight();
    else if (actions.moveLeft.pressed) player.accelerateLeft();
    else player.deccelerate();

    player.update();
    player.draw();
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'Space':
            if (player.vel.y == 0) {
                console.log("Jump");
                player.vel.y = -20; };
            break
        case actions.moveRight.key:
            actions.moveRight.pressed = true;
            break
        case actions.moveLeft.key:
            actions.moveLeft.pressed = true;
            break
        default:
            console.log("Unknown key pressed")
            console.log(event.code)
}})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case actions.moveRight.key:
            actions.moveRight.pressed = false;
            break
        case actions.moveLeft.key:
            actions.moveLeft.pressed = false;
            break
}})