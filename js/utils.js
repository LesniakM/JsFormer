function parseListToArray(collisions_list) {
    const rows = [];
    for (let i = 0; i < collisions_list.length; i += 16) {
        rows.push(collisions_list.slice(i, i + 16))};
    return rows
}

function createColliders(parsed_collisions) {
    colliders = []
    parsed_collisions.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol != 0) {
                // push a new collision into collisionblocks array
                colliders.push(new CollisionBlock({
                    position: {
                        x: x*64,
                        y: y*64,
                    }
                }))
            }
        })
    });
    return colliders
}