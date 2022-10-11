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
        this.shot = new Audio('./data/wavs/Gunshot5.wav');
        this.shot.volume = 0.30;
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