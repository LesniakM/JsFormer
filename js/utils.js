let box_visibility = false;
let lastTimeFPS = new Date();


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
    c.fillText(slimeStr, 10, 30);
}