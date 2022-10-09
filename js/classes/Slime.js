class Slime extends Entity {
    /**
     * @param {number} pos_x Entity's left x coordinate
     * @param {number} pos_y Entity's top y coordinate
     */
    constructor(pos_x, pos_y) {
        super({pos: {x: pos_x, y: pos_y}, 
               imageSrc: './images/slime/idleRight.png', 
               frameCount: 4, 
               animations: {
                            path: "./images/slime/",
                            idleRight: {
                                frameCount: 4,
                                animationDelay: 10,
                                loop: true},
                            idleLeft: {
                                frameCount: 4,
                                animationDelay: 10,
                                loop: true},
                            jumpRight: {
                                frameCount: 1,
                                animationDelay: 8,
                                loop: false},
                            jumpLeft: {
                                frameCount: 1,
                                animationDelay: 8,
                                loop: false}}});
        this.speed = 3;
        this.jumping = false;
        this.vel = {
            x: 1,
            y: 0.8
        }
        this.hitbox = {width: 26,
                       height: 22};
        this.jumpTicks = 1;
        this.sounds = new SlimeSounds();
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
            this.vel.y = -12 - Math.random();
            if (player.pos.x > this.pos.x) this.vel.x = 8 + Math.random();
            else this.vel.x = -8 - Math.random();
            this.jumping = true;
            this.sounds.jump.play();
            this.jumpTicks++;
        }
    };

    endJump() {
        this.jumping = false;
        this.sounds.stomp.volume = Math.min(this.vel.y/50, 0.75);
        this.sounds.stomp.play();
        if (this.vel.x >= 0) this.switchSprite('idleRight');
        if (this.vel.x < 0) this.switchSprite('idleLeft');
    };

    kill(drown=false) {
        this.alive = false;
        if (drown) this.sounds.splash.play();
    }

    update() {
        if (this.pos.y > 480) this.kill(true);
        if (this.jumpTicks % 100 == 0) this.jump();

        this.pos.x = Math.round(this.pos.x + this.vel.x); // Rounding to whole pixel prevents pixel-art diffusion.
        this.deccelerate();

        this.hitbox.pos = {x: this.pos.x + (this.width-this.hitbox.width)/2,
                           y: this.pos.y + (this.height-this.hitbox.height)/2};
        
        if (this.jumping) {
            if (Math.abs(this.vel.x) < 1){
                if (player.pos.x > this.pos.x) this.vel.x = 1;
                else this.vel.x = -1;}
            if (this.vel.x >= 0) this.switchSprite('jumpRight');
            if (this.vel.x < 0) this.switchSprite('jumpLeft');
        }
        else {this.jumpTicks++;}
                           
        this.checkHorizontalCollisions();

        this.pos.y += this.vel.y;
        this.applyGravity();

        this.hitbox.pos = {x: this.pos.x + (this.width-this.hitbox.width)/2,
                           y: this.pos.y + (this.height-this.hitbox.height)/2};
        
        this.checkVerticalCollisions();
    }
}
