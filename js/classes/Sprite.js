class Sprite {
    constructor ({postition, imageSrc}) {
        this.postition = postition;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true};
        this.image.src = imageSrc;
        this.loaded = false;
    }
        
    draw() {
        if (this.loaded) {
        c.drawImage(this.image, this.postition.x, this. postition.y);
        }
    }
}