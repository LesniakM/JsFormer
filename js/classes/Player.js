class Player extends Entity {
    constructor({pos, collisionBlocks = [], imageSrc , frameCount, animations}) {
        super({pos, collisionBlocks, imageSrc, frameCount, animations});
        this.speed = 5;
        this.jumping = false;
        this.stepTicks = 0;
        this.stepIndex = 0;
        this.hitbox = {width: 20,
                       height: 38};
        
        this.sounds = new PlayerSounds();
    };


    accelerateRight() {
        this.switchSprite('runRight');
        if (this.vel.y === 0 && !this.jumping) this.playFootsteps();
        if (this.vel.x + this.acc.x < this.speed) {
            if (this.vel.y === 0) this.vel.x += this.acc.x;
            else this.vel.x += this.acc.x / 5;  // Less x controll mid-air
        } else {this.vel.x = this.speed}};

    accelerateLeft() {
        this.switchSprite('runLeft');
        if (this.vel.y === 0 && !this.jumping) this.playFootsteps();
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
            this.sounds.jump.play();
        }
    };

    endJump() {
        this.jumping = false;
        this.sounds.stomp.volume = Math.min(this.vel.y/50, 0.75);
        this.sounds.stomp.play();
        if (this.vel.x >= 0) this.switchSprite('idleRight');
        if (this.vel.x < 0) this.switchSprite('idleLeft');
    };

    playFootsteps() {
        this.stepTicks++;
        if (this.stepTicks % 6 == 0)
            if (this.stepIndex === 0) {
                this.sounds.step1.play();
                this.stepIndex++;}
            else if (this.stepIndex === 1){
                this.sounds.step2.play();
                this.stepIndex++;}
            else if (this.stepIndex === 2){
                this.sounds.step3.play();
                this.stepIndex++;}
            else {
                this.sounds.step4.play();
                this.stepIndex = 0;}
    };

    teleportFromWater() {
        this.sounds.splash.play();
        this.pos.x = 500;
        this.pos.y = 200;
    };

    update() {
        if (this.pos.y > 470) this.teleportFromWater();

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
