class Player {
    constructor() {
        this.pos = {
            x: 100,
            y: 400
        };
        this.vel = {
            x: 0.0,
            y: -10
        };
        this.acc = {
            x: 2.0,
            y: 10
        };

        this.width = 100;
        this.height = 100;
        
    }

    draw() {
        c.fillStyle = 'green';
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    };

    update() {
        if (player.pos.y + player.height < canvas.height){
            player.vel.y += player.acc.y / 30;
            player.pos.y += player.vel.y;
        }
        else {
            player.pos.y = canvas.height - player.height;
            player.vel.y = 0;
        };
    }
}
