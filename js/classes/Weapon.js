class Weapon {
    constructor ({pos, imageSrc = "", magSize = 1, weaponOffsets = [[1, 2], [3, 2]], reloadTime = 700, shootIterval = 500, knockback = 3}) {
        this.pos = pos;
        this.image = new Image();
        this.height = 32;
        this.width = 32;
        this.loaded = false;
        this.magSize = magSize;
        this.currentAmmo = magSize;
        this.weaponOffsets = weaponOffsets;
        this.handOffsets = [[22, -11], [-4, -11]];
        this.mirror = false;
        this.index = 1;
        this.shootIterval = shootIterval;
        this.reloadTime = reloadTime;
        this.knockback = knockback

        this.image.src = imageSrc;
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / 4;
            this.height = this.image.height / 2;}
    }
        
    draw() {
        if (player.shooting) {
            if (player.image.currentSrc.includes("Right")) {
                this.pos.x = player.hitbox.pos.x - this.weaponOffsets[0][0] + this.handOffsets[0][0];
                this.mirror = false;}
            else {
                this.pos.x = player.hitbox.pos.x - this.weaponOffsets[1][0] + this.handOffsets[1][0];
                this.mirror = true;}


            this.pos.y = player.hitbox.pos.y + this.weaponOffsets[0][1] - (this.height / 2) + this.handOffsets[0][1];
        
            if (this.loaded) {
                const cropbox = {
                    pos: {
                        x: this.width * this.index,
                        y: this.height * this.mirror,
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
        }
    }
}


class Revolver extends Weapon {
    constructor() {
        super({pos: {x: -100, y:-100}, 
               imageSrc: './images/Revolver.png',
               magSize: 6, 
               weaponOffsets: [[16, 40], [33, 40]]});
    }
}
