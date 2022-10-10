class VisualParticle extends Sprite {
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

class JumpParticle extends VisualParticle {
    constructor(pos_x, pos_y) {
        super({pos_x, pos_y, 
               imageSrc: './images/jumpDust.png', 
               frameCount: 3, 
               loops: 1, 
               ticksPerFrame: 2});
    }
}

class CloudParticle extends VisualParticle {
    constructor(pos_x, pos_y) {
        super({pos_x, pos_y, 
               imageSrc: './images/cloud1.png', 
               frameCount: 1, 
               loops: -1, 
               ticksPerFrame: 1});
        this.sources = [['./images/cloud1.png', 0.5],
                        ['./images/cloud2.png', 0.45],
                        ['./images/cloud3.png', 0.4],
                        ['./images/cloud4.png', 0.3],
                        ['./images/cloud5.png', 0.3],
                        ['./images/cloud6.png', 0.25]];
        this.speed = 0.5;
        this.selectRandSprite();
    }

    draw() {
        if (this.loaded) {
            c.drawImage(this.image, 
                        this.pos.x, 
                        this.pos.y);
        }
    }

    selectRandSprite() {
        let rnd_int = Math.round(Math.random()*5);
        console.log("Assigned cloud type:", rnd_int);
        this.image.src = this.sources[rnd_int][0];
        this.speed = this.sources[rnd_int][1];
    }
}
