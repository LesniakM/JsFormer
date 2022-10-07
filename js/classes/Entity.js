class Entity extends Sprite {
    constructor({pos, collisionBlocks = [], imageSrc , frameCount, animations}) {
        super({pos, imageSrc, frameCount, animations});
        this.vel = {
            x: 0,
            y: 0
        };
        this.acc = {
            x: 1,
            y: 1
        };
        this.speed = 5;
        this.jumping = false;
        this.collisionBlocks = collisionBlocks;
        this.alive = true;
    }

    applyGravity() {
        if (this.pos.y + this.height < canvas.height){
            this.vel.y += this.acc.y;
        }
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
                    // if (this.jumping) this.endJump();
                    break}  
                if (this.vel.y > 0) {
                    const hb_offset = this.hitbox.pos.y - this.pos.y + this.hitbox.height;
                    if (this.jumping || this.vel.y > 10) this.endJump();
                    this.pos.y = collisionBlock.pos.y - hb_offset - 0.01;
                    this.vel.y = 0;
                    break}
            }
        }
    }

    update() {console.log("No update logic for this Entity.")}
}