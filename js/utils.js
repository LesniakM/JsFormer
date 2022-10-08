let box_visibility = false;
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
    const slimeStr = "Enemy counter: " + (entities.length - 1);
    c.fillText(slimeStr, 130, 30);
}

/**
* @param {number} pos_x Bar's left x coordinate
* @param {number} pos_y Bar's top y coordinate
* @param {number} pos_x Actual HP %, value from 0 to 100
* @param {number} pos_y Actual MP %, value from 0 to 100
*/
function drawHpBar(pos_x, pos_y, hp, mp) {
    c.fillStyle = "#224422"; // HP dark bacground
    c.beginPath(); c.lineTo(pos_x+9, pos_y+10); c.lineTo(pos_x+110, pos_y+10); c.lineTo(pos_x+118, pos_y+1); c.lineTo(pos_x+17, pos_y+1); c.fill();
    c.fillStyle = "#47D866"; // HP red bar
    c.beginPath(); c.lineTo(pos_x+9, pos_y+10); c.lineTo(pos_x+10+hp, pos_y+10); c.lineTo(pos_x+18+hp, pos_y+1); c.lineTo(pos_x+17, pos_y+1); c.fill();

    c.fillStyle = "#222244"; // MP dark bacground
    c.beginPath(); c.lineTo(pos_x+3, pos_y+16); c.lineTo(pos_x+104, pos_y+16); c.lineTo(pos_x+109, pos_y+11); c.lineTo(pos_x+7, pos_y+11); c.fill();
    c.fillStyle = "#4B84D8"; // MP red bar
    c.beginPath(); c.lineTo(pos_x+3, pos_y+16); c.lineTo(pos_x+4+mp, pos_y+16); c.lineTo(pos_x+9+mp, pos_y+11); c.lineTo(pos_x+7, pos_y+11); c.fill();

    c.drawImage(barImage, pos_x, pos_y)
}