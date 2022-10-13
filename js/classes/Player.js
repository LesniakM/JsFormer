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
        this.ammoIndicators = [new Sprite({pos: {x: -100, y: -100}, imageSrc: "./images/ammo.png"}), new Sprite({pos: {x: -100, y: -100}, imageSrc: "./images/ammo_empty.png"})]
        this.jumping = false;
        this.shooting = false;
        this.reloading = false;
        this.shootTimer = 0;
        this.weapons = [new Revolver(), new AK47()]
        this.weaponIndex = 0;
        this.currentWeapon = this.weapons[this.weaponIndex]
        this.stepTicks = 0;
        this.stepIndex = 0;
        this.hitbox = {width: 20,
                       height: 38};
        this.direction = "right";
        this.sounds = new PlayerSounds();
        this.speed = 5;
        this.stats = {
            maxHP: 100,
            HP: 100,
            maxMP: 10,
            MP: 10,
            attack: 10,
            jumps: 0,
            killed: 0,
            shots: 0,
            reloads: 0
        }
    };


    accelerateRight() {
        if (!this.jumping) this.switchSprite('runRight');
        if (this.jumping) this.switchSprite('jumpRight');
        this.direction = "right";
        if (this.vel.y === 0 && !this.jumping) this.playFootsteps();
        if (this.vel.x + this.acc.x < this.speed) {
            if (this.vel.y === 0) this.vel.x += this.acc.x;
            else this.vel.x += this.acc.x / 5;  // Less x controll mid-air
        } else {this.vel.x = this.speed}};

    accelerateLeft() {
        if (!this.jumping) this.switchSprite('runLeft');
        if (this.jumping) this.switchSprite('jumpLeft');
        this.direction = 'left';
        if (this.vel.y === 0 && !this.jumping) this.playFootsteps();
        if (this.vel.x - this.acc.x > -this.speed) {
            if (this.vel.y === 0) this.vel.x -= this.acc.x;
            else this.vel.x -= this.acc.x / 5;  // Less x controll mid-air
        } else {this.vel.x = -this.speed}};

    deccelerate() {
        if (this.direction == "right" && !this.jumping) this.switchSprite('idleRight');
        if (this.direction == "left" && !this.jumping) this.switchSprite('idleLeft');
        if (this.vel.x > this.acc.x) {
            if (this.vel.y === 0) this.vel.x -= this.acc.x;
            else this.vel.x -= this.acc.x / 8;  // Less x controll mid-air
        } else if (this.vel.x < -this.acc.x) {
            if (this.vel.y === 0) this.vel.x += this.acc.x;
            else this.vel.x += this.acc.x / 8;  // Less x controll mid-air
        } else {this.vel.x = 0}};

    jump() {
        if (!this.jumping && this.vel.y < 5) {
            if (this.direction == "right") this.switchSprite('jumpRight');
            if (this.direction == "left") this.switchSprite('jumpLeft');
            particles.push(new JumpParticle(this.hitbox.pos.x-5, this.hitbox.pos.y+6))
            this.stats.jumps++;
            this.vel.y = -16;
            this.jumping = true;
            this.playSound(this.sounds.jump);
            this.sounds.jump.play();
        }
    };

    endJump() {
        this.jumping = false;
        if (this.vel.y > 21) this.reduceHP(this.vel.y);
        this.sounds.stomp.volume = Math.min(this.vel.y/50, 0.75);
        this.sounds.stomp.play();
        if (this.direction == "right") this.switchSprite('idleRight');
        if (this.direction == "left") this.switchSprite('idleLeft');
    };

    shoot() {
        if (this.shooting || !this.alive || this.reloading) return
        if (this.currentWeapon.currentAmmo <= 0) {
            this.currentWeapon.sounds.playEmpty();
            return }
        this.shooting = true;
        this.stats.shots++;
        this.currentWeapon.sounds.playShot();
        if (this.direction == "right") {
            this.vel.x -= this.currentWeapon.knockback;
            this.currentWeapon.shoot("right")}
        else {
            this.vel.x += this.currentWeapon.knockback;
            this.currentWeapon.shoot("left")}
        this.vel.y -= this.currentWeapon.knockback/2;
        setTimeout(() => {this.endShoot();}, this.currentWeapon.shootIterval);
    }

    endShoot() {
        this.shooting = false;
    }

    reload() {
        if (this.reloading || this.shooting) return;
        this.stats.reloads++;
        if (this.currentWeapon.keepsShells) {
            if (this.direction == "right")  {
                for (let i = 0; i < this.currentWeapon.magSize - this.currentWeapon.currentAmmo; i++) {
                    particles.push(new ShellParticle(this.currentWeapon.pos.x + this.currentWeapon.width/2 + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index][0], 
                                                 this.currentWeapon.pos.y + this.currentWeapon.height/2 + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index][1], 
                                                 -2))
                }
            }
            if (this.direction == "left")  {
                for (let i = 0; i < this.currentWeapon.magSize - this.currentWeapon.currentAmmo; i++) {
                    particles.push(new ShellParticle(this.currentWeapon.pos.x + this.currentWeapon.width/2 + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index+4][0], 
                                                 this.currentWeapon.pos.y + this.currentWeapon.height/2 + this.currentWeapon.bulletPosOffsets[this.currentWeapon.index+4][1], 
                                                 2, 6))
                }
            }

        }
        this.reloading = true;
        this.currentWeapon.sounds.playReload1();
        setTimeout(() => {this.endReload();}, this.currentWeapon.reloadTime);
    }

    endReload() {
        this.currentWeapon.currentAmmo = this.currentWeapon.magSize;
        this.currentWeapon.sounds.playReload2();
        this.reloading = false;
    }

    changeWeapon() {
        if (this.reloading) return;
        this.playSound(this.sounds.switch);
        this.weaponIndex++;
        if (this.weaponIndex >= this.weapons.length) this.weaponIndex = 0;
        this.currentWeapon = this.weapons[this.weaponIndex];
    }

    drawAmmo(pos_x, pos_y) {
        let space = 10 + 60 / this.currentWeapon.magSize;
        for (let i = 0; i < this.currentWeapon.magSize; i++) {
            if (i < this.currentWeapon.currentAmmo) this.ammoIndicators[0].draw(pos_x + space*i, pos_y);
            else this.ammoIndicators[1].draw(pos_x + space*i, pos_y);
        }
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

        if (actions.shoot.pressed) this.shoot();

        this.checkHorizontalCollisions();

        this.pos.y += this.vel.y;
        this.applyGravity();

        this.hitbox.pos = {x: this.pos.x + (this.width-this.hitbox.width)/2,
                           y: this.pos.y + (this.height-this.hitbox.height)/2};
        
        this.checkVerticalCollisions();
    }
}