class Sprite {
    constructor ({pos, imageSrc, frameCount = 1}) {
        this.pos = pos;
        this.image = new Image();
        this.frameCount = frameCount;
        this.currentFrame = 0;
        this.tickCounter = 0;
        this.tickDivider = 8;
        // Base values before loading ends.
        this.height = 32;
        this.width = 32;
        this.loaded = false;

        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameCount;
            this.height = this.image.height;}
        this.image.src = imageSrc;
    }
        
    draw() {
        if (this.loaded) {
            const cropbox = {
                pos: {
                    x: this.width * this.currentFrame,
                    y: 0,
                },
                width: this.width,
                height: this.height}
            c.drawImage(this.image, 
                        cropbox.pos.x, 
                        cropbox.pos.y, 
                        cropbox.width, 
                        cropbox.height, 
                        this.pos.x, 
                        this.pos.y,
                        this.width,
                        this.height);
        }

        this.updateFrameCount()
    }

    updateFrameCount() {
        this.tickCounter++;
        if (this.tickCounter % this.tickDivider === 0){
            this.currentFrame++;
            if (this.currentFrame >= this.frameCount) {
                this.currentFrame = 0;
            }}
        
    }
}