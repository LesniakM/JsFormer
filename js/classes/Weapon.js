class Weapon {
    constructor ({pos,
                  imageSrc,
                  magSize = 1,
                  weaponOffsets,
                  reloadTime = 700,
                  shootIterval = 400,
                  knockback = 2,
                  audioObject,
                  bulletPosOffsets,
                  bulletSpeed,
                  bulletKnockback,
                  bulletDamage,
                  keepsShells = false}) {
        this.image = new Image();
        this.pos = pos;
        this.image.src = imageSrc;
        this.magSize = magSize;
        this.currentAmmo = magSize;
        this.weaponOffsets = weaponOffsets;
        this.reloadTime = reloadTime;
        this.shootIterval = shootIterval;
        this.knockback = knockback;
        this.sounds = audioObject;
        this.bulletPosOffsets = bulletPosOffsets;
        this.bulletSpeed = bulletSpeed;
        this.bulletKnockback = bulletKnockback;
        this.bulletDamage = bulletDamage;
        this.keepsShells = keepsShells;

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
        if (direction == "right") {
            collidableParticles.push(new BulletParticle(this.pos.x + this.width/2 + this.bulletPosOffsets[this.index][0], 
                                                        this.pos.y + this.height/2 + this.bulletPosOffsets[this.index][1], false,
                                                        this.bulletSpeed, this.bulletKnockback, this.bulletDamage));
            if (!this.keepsShells) {
                particles.push(new ShellParticle(this.pos.x + this.width/2 + this.bulletPosOffsets[this.index][0], 
                                                 this.pos.y + this.height/2 + this.bulletPosOffsets[this.index][1], 
                                                 -2))}
        }
        if (direction == "left") {
            collidableParticles.push(new BulletParticle(this.pos.x + this.width/2 + this.bulletPosOffsets[this.index+4][0], 
                                                        this.pos.y + this.height/2 + this.bulletPosOffsets[this.index+4][1], true,
                                                        this.bulletSpeed, this.bulletKnockback, this.bulletDamage));
            if (!this.keepsShells) {
                particles.push(new ShellParticle(this.pos.x + this.width/2 + this.bulletPosOffsets[this.index+4][0], 
                                                 this.pos.y + this.height/2 + this.bulletPosOffsets[this.index+4][1], 
                                                 2, 6))}
        }
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
               audioObject: new RevolverSounds(),
               bulletPosOffsets: [[0,0],[-20,-12],[0,0],[0,0],[0,0],[0,-12],[0,0],[0,0]],
               bulletSpeed: 14,
               bulletKnockback: 6,
               bulletDamage: 30,
               keepsShells: true});
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
               audioObject: new AKSounds(),
               bulletPosOffsets: [[0,0],[-10,-14],[0,0],[0,0],[0,0],[10,-14],[0,0],[0,0]],
               bulletSpeed: 20,
               bulletKnockback: 4,
               bulletDamage: 15});
    }
}