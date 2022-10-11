class Sprite {
    constructor ({pos, imageSrc = "", frameCount = 1, animations = {}}) {
        this.pos = pos;
        this.image = new Image();
        this.frameCount = frameCount;
        this.currentFrame = 0;
        this.tickCounter = 0;
        this.tickDivider = 8;
        this.animations = animations;
        // Base values before loading ends.
        this.height = 32;
        this.width = 32;
        this.loaded = false;

        this.image.src = imageSrc;
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameCount;
            this.height = this.image.height;}
        

        if (this.animations) {
            for (let key in this.animations) {
                if (key == "path") continue;
                const image = new Image()
                image.src = (this.animations.path + key + ".png")
                this.animations[key].image= image
            }
        };
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

    switchSprite(name) {
        if (!this.image.currentSrc.includes(name)){
            this.image = this.animations[name].image;
            this.frameCount = this.animations[name].frameCount;
            this.tickDivider = this.animations[name].animationDelay;
            this.currentFrame = 0;};
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
