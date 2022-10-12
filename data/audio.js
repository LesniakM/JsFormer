class WorldSounds{
    constructor (){
        this.bgmusic = new Audio('./data/wavs/itch-io_not-jam-music-pack_KleptoLindaMountain.wav');
        this.bgmusic.volume = 0.2;
    }
}

class PlayerSounds{
    constructor (){
        this.jump = new Audio('./data/wavs/Jump.wav');
        this.jump.volume = 0.25;
        this.splash = new Audio('./data/wavs/BigSplash.wav');
        this.splash.volume = 0.33;
        this.stomp = new Audio('./data/wavs/Stomp.wav');
        this.stomp.volume = 0.25;
        this.step1 = new Audio('./data/wavs/StepGrass1.wav');
        this.step1.volume = 0.20;
        this.step2 = new Audio('./data/wavs/StepGrass2.wav');
        this.step2.volume = 0.20;
        this.step3 = new Audio('./data/wavs/StepGrass3.wav');
        this.step3.volume = 0.20;
        this.step4 = new Audio('./data/wavs/StepGrass4.wav');
        this.step4.volume = 0.20;
        this.switch = new Audio('./data/wavs/weapons/Click2.wav');
        this.switch.volume = 0.25;
    }
}

class SlimeSounds{
    constructor (){
        this.jump = new Audio('./data/wavs/Jump.wav');
        this.jump.volume = 0.2;
        this.splash = new Audio('./data/wavs/BigSplash.wav');
        this.splash.volume = 0.2;
        this.stomp = new Audio('./data/wavs/Stomp.wav');
        this.stomp.volume = 0.2;
    }
}


class WeaponSounds{
    playShot() {
        this.shot.pause();
        this.shot.currentTime = 0;
        this.shot.play();
    }

    playReload1() {
        this.reload1.pause();
        this.reload1.currentTime = 0;
        this.reload1.play();
    }
    playReload2() {
        this.reload2.pause();
        this.reload2.currentTime = 0;
        this.reload2.play();
    }
}

class AKSounds extends WeaponSounds{
    constructor (){
        super()
        this.shot = new Audio('./data/wavs/weapons/Gunshot6.wav');
        this.shot.volume = 0.3;
        this.reload1 = new Audio('./data/wavs/weapons/GunMagazine1.wav');
        this.reload1.volume = 0.25;
        this.reload2 = new Audio('./data/wavs/weapons/GunMagazine2.wav');
        this.reload2.volume = 0.25;
    }
}

class RevolverSounds extends WeaponSounds{
    constructor (){
        super()
        this.shot = new Audio('./data/wavs/weapons/Gunshot5.wav');
        this.shot.volume = 0.35;
        this.reload1 = new Audio('./data/wavs/weapons/GunBarrelRoll1.wav');
        this.reload1.volume = 0.25;
        this.reload2 = new Audio('./data/wavs/weapons/GunBarrel1.wav');
        this.reload2.volume = 0.25;
    }
}