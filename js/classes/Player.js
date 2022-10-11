class Player extends Entity {
    /**
     * @param {number} pos_x Player's left x coordinate
     * @param {number} pos_y Player's top y coordinate
     */
    constructor(pos_x, pos_y) {
        super({pos: {x: pos_x, y: pos_y}, 
               imageSrc: './images/player/idleRight.png', 
               frameCount: 6, 
               animations: {
                            path: "./images/player/",
                            idleRight: {
                                frameCount: 6,
                                animationDelay: 8,
                                loop: true},
                            idleLeft: {
                                frameCount: 6,
                                animationDelay: 8,
                                loop: true},
                            runRight: {
                                frameCount: 6,
                                animationDelay: 8,
                                loop: true},
                            runLeft: {
                                frameCount: 6,
                                animationDelay: 8,
                                loop: true},
                            jumpRight: {
                                frameCount: 1,
                                animationDelay: 8,
                                loop: false},
                            jumpLeft: {
                                frameCount: 1,
                                animationDelay: 8,
                                loop: false}}});

        this.jumping = false;
        this.shooting = false;
        this.shootTimer = 0;
        this.currentWeapon = new Revolver();
        this.stepTicks = 0;
        this.stepIndex = 0;
        this.hitbox = {width: 20,
                       height: 38};
        this.sounds = new PlayerSounds();
        this.speed = 5;
        this.stats = {
            maxHP: 100,
            HP: 100,
            maxMP: 10,
            MP: 10,
            attack: 10,
            defense: 0,
        }
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
            this.reduceMP(1);
            particles.push(new JumpParticle(this.hitbox.pos.x-5, this.hitbox.pos.y+6))
            this.vel.y = -16;
            this.jumping = true;
            this.sounds.jump.play();
        }
    };

    endJump() {
        this.jumping = false;
        if (this.vel.y > 20) this.reduceHP(this.vel.y / 2);
        this.sounds.stomp.volume = Math.min(this.vel.y/50, 0.75);
        this.sounds.stomp.play();
        if (this.vel.x >= 0) this.switchSprite('idleRight');
        if (this.vel.x < 0) this.switchSprite('idleLeft');
    };

    shoot() {
        if (this.shooting || !this.alive) return
        this.shooting = true;
        this.sounds.shot.play()
        if (player.image.currentSrc.includes("Right")) this.vel.x -= this.currentWeapon.knockback;
        else this.vel.x += this.currentWeapon.knockback;
        this.vel.y -= this.currentWeapon.knockback;
        setTimeout(() => {this.endShoot();}, this.currentWeapon.shootIterval);
    }

    endShoot() {
        this.shooting = false;
    }

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
        this.reduceHP(25);
        this.pos.x = 500;
        this.pos.y = 200;
        this.vel.y = 0;
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