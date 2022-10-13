class Entity extends AnimatedSprite {
    constructor({pos, imageSrc = "", frameCount = 1, animations = {}}) {
        super({pos, imageSrc, frameCount, animations});
        this.vel = {
            x: 0,
            y: 0
        };
        this.acc = {
            x: 1,
            y: 1
        };
        this.typeCollOffset = {
            verticalTop: -0.1,
            verticalBottom: 2,
            horizontalRight: -1,
            horizontalLeft: 1}
        this.speed = 5;
        this.jumping = false;
        this.collisionBlocks = collisionBlocks;
        this.alive = true;
        this.stats = {
            maxHP: 30,
            HP: 30,
            maxMP: 0,
            MP: 0,
            attack: 10,
            defense: 0,
        }
    }

    reduceHP(damage) {
        if (debug_mode) console.log(this.constructor.name, "took", damage, "dmg.")
        this.stats.HP -= damage;
        this.sounds.playDamage();
        if (this.stats.HP <= 0) {
            this.alive = false;
            this.stats.HP = 0;}
    }

    reduceMP(cost) {
        if (debug_mode) console.log(this.constructor.name, "used", cost, "mp.")
        this.stats.MP -= cost;
        if (this.stats.MP <= 0) {
            this.stats.MP = 0;}
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
                    this.pos.x = collisionBlock.pos.x - hb_offset_left + collisionBlock.width + this.typeCollOffset.horizontalLeft;
                    this.vel.x = 0;
                    break}  
                if (this.vel.x > 0) {
                    const hb_offset_right = (this.hitbox.pos.x - this.pos.x);
                    this.pos.x = collisionBlock.pos.x - this.hitbox.width - hb_offset_right + this.typeCollOffset.horizontalRight;
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
                if (this.vel.y < 0) {
                    const hb_offset = this.hitbox.pos.y - this.pos.y;
                    this.pos.y = collisionBlock.pos.y + collisionBlock.height - hb_offset + this.typeCollOffset.verticalBottom;
                    this.vel.y = 0;
                    break}  
                if (this.vel.y > 0) {
                    const hb_offset = this.hitbox.pos.y - this.pos.y + this.hitbox.height;
                    if (this.jumping || this.vel.y > 10) this.endJump();
                    this.pos.y = collisionBlock.pos.y - hb_offset + this.typeCollOffset.verticalTop;
                    this.vel.y = 0;
                    break}
            }
        }
    }

    /**
   * Used to play overlaping sound effects.
   * @param  {HTMLAudioElement} sound Audio
   */
    playSound(sound) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }

    update() {console.log("No update logic for this Entity.")}
}