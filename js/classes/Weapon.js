class Weapon {
    constructor ({pos,
                  imageSrc,
                  magSize = 1,
                  weaponOffsets,
                  reloadTime = 700,
                  shootIterval = 400,
                  knockback = 2,
                  bulletPosOffsets,
                  audioObject}) {
        this.image = new Image();
        this.pos = pos;
        this.image.src = imageSrc;
        this.magSize = magSize;
        this.currentAmmo = magSize;
        this.weaponOffsets = weaponOffsets;
        this.reloadTime = reloadTime;
        this.shootIterval = shootIterval;
        this.knockback = knockback;
        this.bulletPosOffsets = bulletPosOffsets;
        this.sounds = audioObject;

        this.height = 32;
        this.width = 32;
        this.loaded = false;
        this.handOffsets = [[22, -11], [-4, -11]];
        this.mirror = false;
        this.index = 1;
        
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / 4;
            this.height = this.image.height / 2;}
    }
        
    draw() {
        if (this.loaded) {
            if (player.image.currentSrc.includes("Right")) {
                this.pos.x = player.hitbox.pos.x - this.weaponOffsets[0][0] + this.handOffsets[0][0];
                this.mirror = false;}
            else {
                this.pos.x = player.hitbox.pos.x - this.weaponOffsets[1][0] + this.handOffsets[1][0];
                this.mirror = true;}

            this.pos.y = player.hitbox.pos.y + this.weaponOffsets[0][1] - (this.height / 2) + this.handOffsets[0][1];

            if (player.shooting) {
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
            if (player.reloading) {
                const cropbox = {
                    pos: {
                        x: this.width * 0,
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

    drawForGUI(pos_x, pox_y) {
        const cropbox = {
            pos: {
                x: this.width,
                y: 0,
            },
            width: this.width,
            height: this.height}
        c.drawImage(this.image, 
                    cropbox.pos.x, 
                    cropbox.pos.y, 
                    cropbox.width, 
                    cropbox.height, 
                    pos_x, 
                    pox_y - this.height/2,
                    this.width,
                    this.height);
    

    }   

    shoot(direction) {
        this.currentAmmo--;
        if (direction == "Right") collidableParticles.push(new BulletParticle(this.pos.x + this.width/2 + this.bulletPosOffsets[this.index][0], 
                                                                    this.pos.y + this.height/2 + this.bulletPosOffsets[this.index][1]));
        if (direction == "Left") collidableParticles.push(new BulletParticle(this.pos.x + this.width/2 + this.bulletPosOffsets[this.index+4][0], 
                                                                   this.pos.y + this.height/2 + this.bulletPosOffsets[this.index+4][1], true));
    }
}


class Revolver extends Weapon {
    constructor() {
        super({pos: {x: -100, y:-100}, 
               imageSrc: './images/Revolver.png',
               magSize: 6, 
               weaponOffsets: [[16, 40], [33, 40]],
               reloadTime: 700,
               shootIterval: 500,
               knockback: 4,
               bulletPosOffsets: [[0,0],[-20,-12],[0,0],[0,0],[0,0],[0,-12],[0,0],[0,0]],
               audioObject: new RevolverSounds()});
    }
}


class AK47 extends Weapon {
    constructor() {
        super({pos: {x: -100, y:-100}, 
               imageSrc: './images/AK47.png',
               magSize: 30, 
               weaponOffsets: [[32, 46], [65, 46]],
               reloadTime: 1000,
               shootIterval: 90,
               knockback: 2,
               bulletPosOffsets: [[0,0],[-10,-14],[0,0],[0,0],[0,0],[10,-14],[0,0],[0,0]],
               audioObject: new AKSounds()});
    }
}