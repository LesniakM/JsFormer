const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 64 * 16;
canvas.height = 64 * 9;


function gameLoop() {
    if (player.alive) window.requestAnimationFrame(gameLoop);
    else window.requestAnimationFrame(endScreen);
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

    const randomizer = Math.random() * 1000;
    if (randomizer < 5 && player.alive) spawnEnemy(canvas.width*Math.random(), 0);
}

function endScreen() {
    c.fillStyle = '#222222AA'
    c.fillRect(0,0, canvas.width, canvas.height);

    c.font = "40px Verdana";
    c.fillStyle = '#DDDDDD';
    let text = "You died.";
    c.fillText(text, canvas.width/2 - c.measureText(text).width/2, canvas.height/2 - 20);
    c.font = "30px Verdana";
    text = "<Press F5 to restart game>";
    c.fillText(text, canvas.width/2 - c.measureText(text).width/2, canvas.height/2 + 20);

    c.font = "25px Verdana";
    text = "You killed " + player.stats.killed + " slimes.";
    c.fillText(text, 160, canvas.height/2 + 100);
    text = "You shot " + player.stats.shots + " times.";
    c.fillText(text, 160, canvas.height/2 + 140);
    text = "You jumped " + player.stats.jumps + " times.";
    c.fillText(text, 160, canvas.height/2 + 180);
    text = "You reloaded " + player.stats.reloads + " times.";
    c.fillText(text, 160, canvas.height/2 + 220);
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