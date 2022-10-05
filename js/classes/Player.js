class Player {
    constructor() {
        this.pos = {
            x: 100,
            y: 100
        };
        this.vel = {
            x: 0.0,
            y: -10
        };
        this.acc = {
            x: 1.5,
            y: 1
        };
        
        this.speed = 10;
        this.width = 64;
        this.height = 64;
        
    }

    draw() {
        c.fillStyle = 'green';
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    };

    accelerateRight() {
        if (this.vel.x + this.acc.x < this.speed) {
            if (this.vel.y === 0) this.vel.x += this.acc.x;
            else this.vel.x += this.acc.x / 5;  // Less x controll mid-air
        } else {this.vel.x = this.speed}};

    accelerateLeft() {
        if (this.vel.x - this.acc.x > -this.speed) {
            if (this.vel.y === 0) this.vel.x -= this.acc.x;
            else this.vel.x -= this.acc.x / 5;  // Less x controll mid-air
        } else {this.vel.x = -this.speed}};

    deccelerate() {
        if (this.vel.x > this.acc.x) {
            if (this.vel.y === 0) this.vel.x -= this.acc.x;
            else this.vel.x -= this.acc.x / 8;  // Less x controll mid-air
        } else if (this.vel.x < -this.acc.x) {
            if (this.vel.y === 0) this.vel.x += this.acc.x;
            else this.vel.x += this.acc.x / 8;  // Less x controll mid-air
        } else {this.vel.x = 0}};

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (player.pos.y + player.height < canvas.height){
            player.vel.y += player.acc.y;
        }
        else {
            player.pos.y = canvas.height - player.height;
            player.vel.y = 0;
        };
    }
}
