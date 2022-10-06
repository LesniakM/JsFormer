class CollisionBlock {
    constructor({ pos }) {
        this.pos = pos;
        this.width = 32;
        this.height = 32;
    };

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    };
}
