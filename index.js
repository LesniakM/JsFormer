const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 64 * 16;
canvas.height = 64 * 9;


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
    updateCollidableParticles();

    player.currentWeapon.draw();

    if (debug_mode) showEnemyAmount();
    if (debug_mode) showParticleAmount();
    if (debug_mode) showFPS();

    drawHpBar(5, 5, (player.stats.HP/player.stats.maxHP*100), (player.stats.MP/player.stats.maxMP*100));
    drawGuiWeapon(player.currentWeapon);
}


const parsedCollisions = parseListToArray(collisionsLevel1)
const collisionBlocks = createColliders(parsedCollisions)

const backgroundLevel1 = new Sprite({pos: {x: 0, y:0},
                                    imageSrc: './images/background1.png'})

const sounds = new WorldSounds();

const player = new Player(110, 140);
const entities = [player];
const particles = [];
const collidableParticles = [];
const clouds = [new CloudParticle(150, 100), new CloudParticle(600, 200), new CloudParticle(250, 300), new CloudParticle(400, 50), new CloudParticle(950, 80), new CloudParticle(920, 300)];

gameLoop()