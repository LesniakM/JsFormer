// eslint-disable-next-line no-unused-vars
export class WorldSounds {
  constructor() {
    this.bgmusic = new Audio('./data/wavs/itch-io_not-jam-music-pack_KleptoLindaMountain.wav');
    this.bgmusic.volume = 0.2;
  }
}

// eslint-disable-next-line no-unused-vars
export class PlayerSounds {
  constructor() {
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
    this.damage1 = new Audio('./data/wavs/Male5.wav');
    this.damage1.volume = 0.33;
    this.damage2 = new Audio('./data/wavs/Male6.wav');
    this.damage2.volume = 0.33;
    this.damage3 = new Audio('./data/wavs/Male7.wav');
    this.damage3.volume = 0.33;
  }

  playDamage() {
    const rand = Math.random();
    let sound;
    if (rand < 0.33) sound = this.damage1;
    else if (rand < 0.67) sound = this.damage2;
    else sound = this.damage3;
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

// eslint-disable-next-line no-unused-vars
export class SlimeSounds {
  constructor() {
    this.jump = new Audio('./data/wavs/Squishy2.wav');
    this.jump.volume = 0.2;
    this.splash = new Audio('./data/wavs/BigSplash.wav');
    this.splash.volume = 0.2;
    this.stomp = new Audio('./data/wavs/Squishy5.wav');
    this.stomp.volume = 0.2;
    this.damage1 = new Audio('./data/wavs/Squishy3.wav');
    this.damage1.volume = 0.33;
    this.damage2 = new Audio('./data/wavs/Squishy6.wav');
    this.damage2.volume = 0.33;
    this.damage3 = new Audio('./data/wavs/Squishy2.wav');
    this.damage3.volume = 0.33;
  }

  playDamage() {
    const rand = Math.random();
    let sound;
    if (rand < 0.33) sound = this.damage1;
    else if (rand < 0.67) sound = this.damage2;
    else sound = this.damage3;
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

class WeaponSounds {
  constructor() {
    this.empty = new Audio('./data/wavs/weapons/Click6.wav');
    this.empty.volume = 0.3;
  }

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

  playEmpty() {
    this.empty.play();
  }
}

// eslint-disable-next-line no-unused-vars
export class AKSounds extends WeaponSounds {
  constructor() {
    super();
    this.shot = new Audio('./data/wavs/weapons/Gunshot6.wav');
    this.shot.volume = 0.27;
    this.reload1 = new Audio('./data/wavs/weapons/GunMagazine1.wav');
    this.reload1.volume = 0.35;
    this.reload2 = new Audio('./data/wavs/weapons/GunMagazine2.wav');
    this.reload2.volume = 0.35;
  }
}

// eslint-disable-next-line no-unused-vars
export class RevolverSounds extends WeaponSounds {
  constructor() {
    super();
    this.shot = new Audio('./data/wavs/weapons/Gunshot5.wav');
    this.shot.volume = 0.35;
    this.reload1 = new Audio('./data/wavs/weapons/GunBarrelRoll1.wav');
    this.reload1.volume = 0.35;
    this.reload2 = new Audio('./data/wavs/weapons/GunBarrel1.wav');
    this.reload2.volume = 0.35;
  }
}
