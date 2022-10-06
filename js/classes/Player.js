class Player extends Sprite {
    constructor({pos, collisionBlocks = [], imageSrc , frameCount, animations}) {
        super({pos, imageSrc, frameCount, animations});
        this.vel = {
            x: 0.0,
            y: -10
        };
        this.acc = {
            x: 1.2,
            y: 1
        };
        this.speed = 5;
        this.jumping = false;
        this.collisionBlocks = collisionBlocks
    }


    accelerateRight() {
        this.switchSprite('runRight');
        if (this.vel.x + this.acc.x < this.speed) {
            if (this.vel.y === 0) this.vel.x += this.acc.x;
            else this.vel.x += this.acc.x / 5;  // Less x controll mid-air
        } else {this.vel.x = this.speed}};

    accelerateLeft() {
        this.switchSprite('runLeft');
        if (this.vel.x - this.acc.x > -this.speed) {
            if (this.vel.y === 0) this.vel.x -= this.acc.x;
            else this.vel.x -= this.acc.x / 5;  // Less x controll mid-air
        } else {this.vel.x = -this.speed}};

    deccelerate() {
        if (this.image.currentSrc.includes("runRight")) this.switchSprite('idleRight');
        if (this.image.currentSrc.includes("runLeft")) this.switchSprite('idleLeft');
        if (this.vel.x > this.acc.x) {
            if (this.vel.y === 0) this.vel.x -= this.acc.x;
            else this.vel.x -= this.acc.x / 8;  // Less x controll mid-air
        } else if (this.vel.x < -this.acc.x) {
            if (this.vel.y === 0) this.vel.x += this.acc.x;
            else this.vel.x += this.acc.x / 8;  // Less x controll mid-air
        } else {this.vel.x = 0}};

    jump() {
        if (!this.jumping && this.vel.y < 5) {
            this.vel.y = -16;
            this.jumping = true;
        }
    };

    endJump() {
        this.jumping = false;
        if (this.vel.x >= 0) this.switchSprite('idleRight');
        if (this.vel.x < 0) this.switchSprite('idleLeft');
    };

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
                    const hb_offset_right = hb_offset_left + this.hitbox.width
                    this.pos.x = collisionBlock.pos.x - hb_offset_right - 1;
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
                if (this.vel.y < -1) {
                    const hb_offset = this.hitbox.pos.y - this.pos.y;
                    this.pos.y = collisionBlock.pos.y + collisionBlock.height - hb_offset + 0.01;
                    this.vel.y = 0;
                    if (this.jumping) this.endJump();
                    break}  
                if (this.vel.y > 0) {
                    const hb_offset = this.hitbox.pos.y - this.pos.y + this.hitbox.height;
                    this.pos.y = collisionBlock.pos.y - hb_offset - 0.01;
                    this.vel.y = 0;
                    if (this.jumping) this.endJump();
                    break}
            }
        }
    }

    applyGravity() {
        if (this.pos.y + this.height < canvas.height){
            this.vel.y += this.acc.y;
        }
        else {
            this.pos.y = canvas.height - this.height;
            this.vel.y = 0;
            if (this.jumping) this.endJump();
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

    switchSprite(name) {
        if (!this.image.currentSrc.includes(name)){
            this.image = this.animations[name].image;
            this.frameCount = this.animations[name].frameCount;
            this.tickDivider = this.animations[name].animationDelay;
            this.currentFrame = 0;};
    }

    update() {
        if (this.pos.y > 470){
            this.pos.x = 500;
            this.pos.y = 200;
        }
        this.pos.x = Math.round(this.pos.x + this.vel.x); // Rounding to whole pixel prevets pixel-art diffusion.

        this.hitbox = {
            pos: {
                x: this.pos.x + (this.width-26)/2,
                y: this.pos.y + (this.height-38)/2},
            width: 26,
            height: 38};

        this.checkHorizontalCollisions();

        this.pos.y += this.vel.y;
        this.applyGravity();

        this.hitbox = {
            pos: {
                x: this.pos.x + (this.width-26)/2,
                y: this.pos.y + (this.height-38)/2},
            width: 26,
            height: 38};
        
        this.checkVerticalCollisions();

        if (this.jumping) {
            if (this.vel.x >= 0) this.switchSprite('jumpRight');
            if (this.vel.x < 0) this.switchSprite('jumpLeft');
        };
    }
}
