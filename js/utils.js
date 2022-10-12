let debug_mode = false;
let lastTimeFPS = new Date();
const barImage = new Image()
barImage.src = './images/hpBar.png'


function parseListToArray(collisions_list) {
    const rows = [];
    for (let i = 0; i < collisions_list.length; i += 32) {
        rows.push(collisions_list.slice(i, i + 32))};
    return rows
}

function createColliders(parsed_collisions) {
    colliders = []
    parsed_collisions.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol != 0) {
                // push a new collision into collisionblocks array
                colliders.push(new CollisionBlock({
                    pos: {
                        x: x*32,
                        y: y*32,
                    }
                }))
            }
        })
    });
    return colliders
}

function spawnEnemy(x = 200, y = 100, type = "Slime") {
    if (type === "Slime") {
        entities.push(new Slime(x, y));
    }
}

function showFPS() {
    const thisTimeFPS = new Date();
    const fps = 1000 / (thisTimeFPS - lastTimeFPS);
    lastTimeFPS = thisTimeFPS;
    const fpsStr = "FPS: " + Math.round(fps);
    c.fillText(fpsStr, 900, 30);
}

function showEnemyAmount() {
    c.font = "30px Arial";
    c.fillStyle = 'black';
    const enemyStr = "Enemy counter: " + (entities.length - 1);
    c.fillText(enemyStr, 180, 30);
}

function showParticleAmount() {
    c.font = "30px Arial";
    c.fillStyle = 'black';
    const particleStr = "Particles: " + (particles.length);
    c.fillText(particleStr, 180, 60);
}

/**
* @param {number} pos_x Bar's left x coordinate
* @param {number} pos_y Bar's top y coordinate
* @param {number} pos_x Actual HP %, value from 0 to 100
* @param {number} pos_y Actual MP %, value from 0 to 100
*/
function drawHpBar(pos_x, pos_y, hp, mp) {
    let bl_x = pos_x+14, tl_x = pos_x+25, top_y = pos_y+2, bot_y = pos_y + 15;
    c.fillStyle = "#224422"; // HP dark bacground
    c.beginPath(); c.lineTo(bl_x, bot_y); c.lineTo(bl_x+152, bot_y); c.lineTo(tl_x+152, top_y); c.lineTo(tl_x, top_y); c.fill();
    c.fillStyle = "#47D866"; // HP red bar
    c.beginPath(); c.lineTo(bl_x, bot_y); c.lineTo(bl_x+hp*1.52, bot_y); c.lineTo(tl_x+hp*1.52, top_y); c.lineTo(tl_x, top_y); c.fill();

    bl_x = pos_x, tl_x = pos_x+10, top_y = pos_y+17, bot_y = pos_y + 27;
    c.fillStyle = "#222244"; // MP dark bacground
    c.beginPath(); c.lineTo(bl_x, bot_y); c.lineTo(bl_x+153, bot_y); c.lineTo(tl_x+153, top_y); c.lineTo(tl_x, top_y); c.fill();
    c.fillStyle = "#4B84D8"; // MP red bar
    c.beginPath(); c.lineTo(bl_x, bot_y); c.lineTo(bl_x+mp*1.53, bot_y); c.lineTo(tl_x+mp*1.53, top_y); c.lineTo(tl_x, top_y); c.fill();

    c.drawImage(barImage, pos_x, pos_y)
}

function drawGuiWeapon(weapon) {
    weapon.drawForGUI(200, 25);
    player.drawAmmo(310, 5);
}