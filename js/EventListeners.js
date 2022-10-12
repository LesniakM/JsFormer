const actions = {
    moveRight: {
        key: 'KeyD',
        pressed: false,
    },
    moveLeft: {
        key: 'KeyA',
        pressed: false,
    },
    shoot: {
        key: 'KeyF',
        pressed: false,
    },
};


window.addEventListener('keydown', (event) => {
    sounds.bgmusic.play();
    switch (event.code) {
        case 'Space':
            player.jump()
            break
        case actions.moveRight.key:
            actions.moveRight.pressed = true;
            break
        case actions.moveLeft.key:
            actions.moveLeft.pressed = true;
            break
        case "F2":
            debug_mode = !debug_mode;
            break
        case "F4":
            spawnEnemy(player.pos.x + 10, player.pos.y - 20);
            break
        case "KeyR":
            player.reload();
            break
        case "KeyQ":
            player.changeWeapon();
            break
        case actions.shoot.key:
            actions.shoot.pressed = true;
            break
        default:
            console.log("Unknown key pressed")
            console.log(event.code)
}});

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case actions.moveRight.key:
            actions.moveRight.pressed = false;
            break
        case actions.moveLeft.key:
            actions.moveLeft.pressed = false;
            break
        case actions.shoot.key:
            actions.shoot.pressed = false;
            break
}});