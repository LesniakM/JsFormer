window.addEventListener('keydown', (event) => {
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