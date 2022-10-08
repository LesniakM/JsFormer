const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 64 * 16;
canvas.height = 64 * 9;


function updateEntities() {
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].alive == true) {
            entities[i].update();
            entities[i].draw();
            if (box_visibility) {
                entities[i].drawSpriteBox();
                entities[i].drawHitBox();}}
        else {
            delete entities[i];
            entities.splice(i, 1);}
    }
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    c.clearRect(0, 0, canvas.width, canvas.height);

    backgroundLevel1.draw();
    
    if (actions.moveRight.pressed) player.accelerateRight();
    else if (actions.moveLeft.pressed) player.accelerateLeft();
    else player.deccelerate();

    updateEntities();

    if (box_visibility) showEnemyAmount();
    if (box_visibility) showFPS();

    drawHpBar(5, 5, (player.attributes.HP/player.attributes.maxHP*100), (player.attributes.MP/player.attributes.maxMP*100))
}


const parsedCollisions = parseListToArray(collisionsLevel1)
const collisionBlocks = createColliders(parsedCollisions)

const backgroundLevel1 = new Sprite({pos: {x: 0, y:0},
                                    imageSrc: './images/background1.png'})

const sounds = new WorldSounds();

const player = new Player(110, 140);
let entities = [player];

gameLoop()