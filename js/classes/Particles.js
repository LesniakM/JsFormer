class AnimatedParticle extends AnimatedSprite {
    /**
     * @param {number} pos_x Particle left pos.
     * @param {number} pos_y Particle top  pos.
     * @param {string} imageSrc Path to image.
     * @param {number} frameCount Amount of frames on image.
     * @param {number} loops How many times animation have to be played. -1 for infinity.
     * @param {number} ticksPerFrame How long one frame should stay on screen.
     */
    constructor({pos_x, pos_y, imageSrc, frameCount = 1, loops = 1, ticksPerFrame = 4}) {
        super({pos: {x: pos_x, y: pos_y}, imageSrc, frameCount});
        this.loops = loops;
        this.tickDivider = ticksPerFrame;
        this.alive = true;
    }

    drawSpriteBox() {
        c.fillStyle = 'rgba(0, 255, 0, 0.25)';
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    updateFrameCount() {
        this.tickCounter++;
        if (this.tickCounter % this.tickDivider === 0){
            this.currentFrame++;
            if (this.currentFrame >= this.frameCount) {
                this.currentFrame = 0; 
                this.loops--;
                if (this.loops == 0) this.alive = false;
            }
        }
    }
}

class StaticParticle extends Sprite {
    /**
     * @param {number} pos_x Particle left pos.
     * @param {number} pos_y Particle top  pos.
     * @param {string} imageSrc Path to image.
     */
    constructor({pos_x, pos_y, imageSrc}) {
        super({pos: {x: pos_x, y: pos_y}, imageSrc});
        this.alive = true;
    }

    drawSpriteBox() {
        c.fillStyle = 'rgba(0, 255, 0, 0.25)';
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

class JumpParticle extends AnimatedParticle {
    constructor(pos_x, pos_y) {
        super({pos_x, pos_y, 
               imageSrc: './images/jumpDust.png', 
               frameCount: 3, 
               loops: 1, 
               ticksPerFrame: 2});
    }
}

class BulletSplashParticle extends AnimatedParticle {
    constructor(pos_x, pos_y, small = false) {
        super({pos_x, pos_y, 
               imageSrc: ((small == true) ? './images/bullet_splash_small.png' : './images/bullet_splash.png'), 
               frameCount: 3, 
               loops: 1, 
               ticksPerFrame: 2});
    }
}

class ShellParticle extends AnimatedParticle {
    constructor(pos_x, pos_y, vel_x, startFrame = 2, vel_y = - 8, acc_y = 1, rotation = 5) {
        super({pos_x, pos_y, 
               imageSrc: './images/empty_shell.png', 
               frameCount: 8, 
               loops: -1, 
               ticksPerFrame: rotation});
        this.vel_x = vel_x - 1 + Math.random()*2;
        this.vel_y = vel_y - 2 + Math.random()*3;
        this.acc_y = acc_y;
        this.currentFrame = startFrame;
    }
    move() {
        if (this.pos.y > 600) {
            this.alive = false;
            return}
        this.pos.x += this.vel_x;
        this.vel_y += this.acc_y;
        this.pos.y += this.vel_y;
    }
}

class CloudParticle extends StaticParticle {
    constructor(pos_x, pos_y) {
        super({pos_x, pos_y, imageSrc: './images/cloud1.png', });

        this.sources = [['./images/cloud1.png', 0.5],
                        ['./images/cloud2.png', 0.45],
                        ['./images/cloud3.png', 0.4],
                        ['./images/cloud4.png', 0.3],
                        ['./images/cloud5.png', 0.3],
                        ['./images/cloud6.png', 0.25]];
        this.speed = 0.5;
        this.selectRandSprite();
    }

    selectRandSprite() {
        let rnd_int = Math.round(Math.random()*5);
        this.image.src = this.sources[rnd_int][0];
        this.speed = this.sources[rnd_int][1];
    }
}

class BulletParticle extends StaticParticle {
    constructor(pos_x, pos_y, mirror = false, speed, knockback, damage) {
        super({pos_x, pos_y, imageSrc: './images/big_bullet.png', });
        this.mirror = mirror;
        if (this.mirror) this.vel_x = -speed;
        else this.vel_x = speed;
        this.knockback = knockback
        this.damage = damage
    }

    draw() {
        if (this.loaded) {
            const cropbox = {
                pos: {
                    x: 0,
                    y: this.height / 2 * this.mirror,
                },
                width: this.width,
                height: this.height / 2}
            c.drawImage(this.image, 
                        cropbox.pos.x, 
                        cropbox.pos.y, 
                        cropbox.width, 
                        cropbox.height, 
                        this.pos.x, 
                        this.pos.y,
                        this.width,
                        this.height / 2);
        }
        this.pos.x += this.vel_x;
        if (this.pos.x > canvas.width || this.pos.x < -20) this.alive = false;
    }

    drawSpriteBox() {
        c.fillStyle = 'rgba(0, 255, 0, 0.25)';
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height / 2);
    }

    checkHorizontalCollisions() {
        for (let i = 0; i < collisionBlocks.length; i++) {
            const collisionBlock = collisionBlocks[i]
            
            if (this.pos.x <= collisionBlock.pos.x + collisionBlock.width && 
                this.pos.x + this.width >= collisionBlock.pos.x &&
                this.pos.y + this.height/2 >= collisionBlock.pos.y &&
                this.pos.y <= collisionBlock.pos.y + collisionBlock.height)
                {
                this.alive = false;
                let diffuse = 2 - Math.random()*4;
                if (this.damage >= 25) {
                    if (this.mirror) particles.push(new BulletSplashParticle(collisionBlock.pos.x + collisionBlock.width + diffuse - 16, this.pos.y-8 + diffuse));
                    else particles.push(new BulletSplashParticle(collisionBlock.pos.x + diffuse - 16, this.pos.y-8 + diffuse));
                }
                else {
                    if (this.mirror) particles.push(new BulletSplashParticle(collisionBlock.pos.x + collisionBlock.width + diffuse - 8, this.pos.y-4 + diffuse, true));
                    else particles.push(new BulletSplashParticle(collisionBlock.pos.x + diffuse - 8, this.pos.y-4 + diffuse, true));
                }
                
            }
        }

        for (let i = 1; i < entities.length; i++) {
            const entity = entities[i]
            
            if (this.pos.x <= entity.hitbox.pos.x + entity.hitbox.width && 
                this.pos.x + this.width >= entity.hitbox.pos.x &&
                this.pos.y + this.height/2 >= entity.hitbox.pos.y &&
                this.pos.y <= entity.hitbox.pos.y + entity.hitbox.height)
                {
                this.alive = false;
                entity.reduceHP(this.damage);
                let diffuse = 2 - Math.random()*4;
                if (this.damage >= 25) {
                    if (this.mirror) {
                        particles.push(new BulletSplashParticle(entity.hitbox.pos.x + entity.hitbox.width + diffuse - 16, this.pos.y-8 + diffuse));
                        entity.vel.x -= this.knockback;
                        entity.vel.y -= this.knockback;}
                    else {
                        particles.push(new BulletSplashParticle(entity.hitbox.pos.x + diffuse - 16, this.pos.y-8 + diffuse));
                        entity.vel.x += this.knockback;
                        entity.vel.y -= this.knockback;}
                }
                else {
                    if (this.mirror) {
                        particles.push(new BulletSplashParticle(entity.hitbox.pos.x + entity.hitbox.width + diffuse - 8, this.pos.y-4 + diffuse, true));
                        entity.vel.x -= this.knockback;
                        entity.vel.y -= this.knockback;}
                    else {
                        particles.push(new BulletSplashParticle(entity.hitbox.pos.x + diffuse - 8, this.pos.y-4 + diffuse, true));
                        entity.vel.x += this.knockback;
                        entity.vel.y -= this.knockback;}
                }
            }
        }
    }
}
