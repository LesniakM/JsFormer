let box_visibility = false;


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
        entities.push(new Slime({
            pos: {x: x, y: y},
            collisionBlocks,
            imageSrc: './images/slime/idleRight.png',
            frameCount: 4,
            animations: {
                path: "./images/slime/",
                idleRight: {
                    frameCount: 4,
                    animationDelay: 10,
                    loop: true},
                idleLeft: {
                    frameCount: 4,
                    animationDelay: 10,
                    loop: true},
                jumpRight: {
                    frameCount: 1,
                    animationDelay: 8,
                    loop: false},
                jumpLeft: {
                    frameCount: 1,
                    animationDelay: 8,
                    loop: false},
            }}));
    }
}