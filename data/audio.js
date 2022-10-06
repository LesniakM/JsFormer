class Sounds{
    constructor (){
        this.jump = new Audio('./data/wavs/Jump.wav');
        this.jump.volume = 0.25;
        this.splash = new Audio('./data/wavs/BigSplash.wav');
        this.splash.volume = 0.33;
        this.stomp = new Audio('./data/wavs/Stomp.wav');
        this.stomp.volume = 0.25;
    }
}