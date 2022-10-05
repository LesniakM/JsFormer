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
}});

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case actions.moveRight.key:
            actions.moveRight.pressed = false;
            break
        case actions.moveLeft.key:
            actions.moveLeft.pressed = false;
            break
}});