class Slime extends Entity {
    constructor({pos, collisionBlocks = [], imageSrc , frameCount, animations}) {
        super({pos, collisionBlocks, imageSrc, frameCount, animations});
        this.speed = 3;
        this.jumping = false;
        this.stepTicks = 0;
        this.stepIndex = 0;
        this.hitbox = {width: 28,
                       height: 22};
    }

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
            sounds.jump.play();
        }
    };

    endJump() {
        this.jumping = false;
        sounds.stomp.volume = Math.min(this.vel.y/50, 0.75);
        sounds.stomp.play();
        if (this.vel.x >= 0) this.switchSprite('idleRight');
        if (this.vel.x < 0) this.switchSprite('idleLeft');
    };

    teleportFromWater() {
        sounds.splash.play();
        this.pos.x = 500;
        this.pos.y = 200;
    }

    update() {
        if (this.pos.y > 480) this.alive = false;
        this.pos.x = Math.round(this.pos.x + this.vel.x); // Rounding to whole pixel prevets pixel-art diffusion.

        this.hitbox.pos = {x: this.pos.x + (this.width-this.hitbox.width)/2,
                           y: this.pos.y + (this.height-this.hitbox.height)/2};

        this.checkHorizontalCollisions();

        this.pos.y += this.vel.y;
        this.applyGravity();

        this.hitbox.pos = {x: this.pos.x + (this.width-this.hitbox.width)/2,
                           y: this.pos.y + (this.height-this.hitbox.height)/2};
        
        this.checkVerticalCollisions();

        if (this.jumping) {
            if (this.vel.x >= 0) this.switchSprite('jumpRight');
            if (this.vel.x < 0) this.switchSprite('jumpLeft');
        };
    }
}
