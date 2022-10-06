class Player extends Sprite {
    constructor({collisionBlocks = [], imageSrc , frameCount}) {
        super({imageSrc, frameCount});
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
        this.jumping = false;
        this.collisionBlocks = collisionBlocks
    }


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
            this.jumping = true;
        }
    }

    checkHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            if (this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.width && 
                this.hitbox.pos.x + this.hitbox.width >= collisionBlock.pos.x &&
                this.hitbox.pos.y + this.hitbox.height >= collisionBlock.pos.y &&
                this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.height)
                {
                const hb_offset_left = this.hitbox.pos.x - this.pos.x;
                if (this.vel.x < 0) {
                    this.pos.x = collisionBlock.pos.x - hb_offset_left + collisionBlock.width + 1;
                    this.vel.x = 0;
                    break}  
                if (this.vel.x > 0) {
                    const hb_offset_right = this.width - hb_offset_left - this.hitbox.width
                    this.pos.x = collisionBlock.pos.x + hb_offset_right - collisionBlock.width - 1;
                    this.vel.x = 0;
                    break}
            }
        }
    }

    checkVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            if (this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.width && 
                this.hitbox.pos.x + this.hitbox.width >= collisionBlock.pos.x &&
                this.hitbox.pos.y + this.hitbox.height >= collisionBlock.pos.y &&
                this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.height)
                {
                const hb_offset = this.hitbox.pos.y - this.pos.y + this.hitbox.height;
                if (this.vel.y < -1) {
                    this.pos.y = collisionBlock.pos.y + hb_offset + 0.01;
                    this.vel.y = 0;
                    this.jumping = false;
                    break}  
                if (this.vel.y > 0) {
                    this.pos.y = collisionBlock.pos.y - hb_offset - 0.01;
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

    drawSpriteBox() {
        c.fillStyle = 'rgba(0, 0, 255, 0.25)';
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    drawHitBox() {
        c.fillStyle = 'rgba(255, 0, 0, 0.33)';
        c.fillRect(this.hitbox.pos.x, this.hitbox.pos.y, this.hitbox.width, this.hitbox.height);
    }

    update() {
        this.pos.x = Math.round(this.pos.x + this.vel.x); // Rounding to whole pixel prevets pixel-art diffusion.

        this.hitbox = {
            pos: {
                x: this.pos.x + this.width/4,
                y: this.pos.y + this.height/4},
            width: 30,
            height: 40};

        this.checkHorizontalCollisions();

        this.pos.y += this.vel.y;
        this.applyGravity();

        this.hitbox = {
            pos: {
                x: this.pos.x + this.width/4,
                y: this.pos.y + this.height/4},
            width: 30,
            height: 40};
        
        this.checkVerticalCollisions();
    }
}
