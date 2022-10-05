class Player {
    constructor({
        collisionBlocks = [] 
    }) {
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
        this.jumping = false;
        
        this.collisionBlocks = collisionBlocks
        console.log(this.collisionBlocks)
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

    jump() {
        if (!this.jumping) {
            this.vel.y = -20;
        }
    }

    checkHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            if (this.pos.x <= collisionBlock.pos.x + collisionBlock.width && 
                this.pos.x + this.width >= collisionBlock.pos.x &&
                this.pos.y + this.height >= collisionBlock.pos.y &&
                this.pos.y <= collisionBlock.pos.y + collisionBlock.height)
                {
                if (this.vel.x < 0) {
                    this.pos.x = collisionBlock.pos.x + collisionBlock.width + 0.01;
                    this.vel.x = 0;
                    break}  
                if (this.vel.x > 0) {
                    this.pos.x = collisionBlock.pos.x - collisionBlock.width - 0.01
                    this.vel.x = 0;
                    break}
            }
        }
    }

    checkVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            if (this.pos.x <= collisionBlock.pos.x + collisionBlock.width && 
                this.pos.x + this.width >= collisionBlock.pos.x &&
                this.pos.y + this.height >= collisionBlock.pos.y &&
                this.pos.y <= collisionBlock.pos.y + collisionBlock.height)
                {
                if (this.vel.y < -1) {
                    this.pos.y = collisionBlock.pos.y + collisionBlock.height + 0.01;
                    this.vel.y = 0;
                    this.jumping = false;
                    break}  
                if (this.vel.y > 0) {
                    this.pos.y = collisionBlock.pos.y - collisionBlock.height - 0.01;
                    this.vel.y = 0;
                    this.jumping = false;
                    break}
            }
        }
    }

    applyGravity() {
        if (player.pos.y + player.height < canvas.height){
            player.vel.y += player.acc.y;
        }
        else {
            player.pos.y = canvas.height - player.height;
            player.vel.y = 0;
            this.jumping = false;
        };
    }

    update() {
        this.pos.x += this.vel.x;
        this.checkHorizontalCollisions()

        this.pos.y += this.vel.y;
        this.applyGravity()
        
        this.checkVerticalCollisions()
    }
}
