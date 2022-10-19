export class WorldSounds {
  constructor() {
    this.bgmusic = new Audio('./data/wavs/itch-io_not-jam-music-pack_KleptoLindaMountain.wav');
    this.bgmusic.volume = 0.2;
    this.Epicbgmusic = new Audio('./data/wavs/weapons/secret/EpicBg.wav');
    this.Epicbgmusic.volume = 0.3;
  }
}

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

export class KarabinekSounds extends WeaponSounds {
  constructor() {
    super();
    this.shot1 = new Audio('./data/wavs/weapons/secret/gunshot1.wav');
    this.shot1.volume = 0.3;
    this.shot2 = new Audio('./data/wavs/weapons/secret/gunshot2.wav');
    this.shot2.volume = 0.3;
    this.shot3 = new Audio('./data/wavs/weapons/secret/gunshot3.wav');
    this.shot3.volume = 0.3;
    this.shot4 = new Audio('./data/wavs/weapons/secret/gunshot4.wav');
    this.shot4.volume = 0.3;
    this.shot5 = new Audio('./data/wavs/weapons/secret/gunshot5.wav');
    this.shot5.volume = 0.3;
    this.shot6 = new Audio('./data/wavs/weapons/secret/gunshot6.wav');
    this.shot6.volume = 0.3;
    this.shotIndex = 0;
    this.reload1 = new Audio('./data/wavs/weapons/GunMagazine1.wav');
    this.reload1.volume = 0.35;
    this.reload2 = new Audio('./data/wavs/weapons/GunMagazine2.wav');
    this.reload2.volume = 0.35;
    this.empty = new Audio('./data/wavs/weapons/Click6.wav');
    this.empty.volume = 0.3;
    this.scream = new Audio('./data/wavs/weapons/secret/warScream.wav');
    this.scream.volume = 0.3;
    this.scream.play();
  }

  playShot() {
    switch (this.shotIndex) {
      case 0:
        this.shot1.play();
        break;
      case 1:
        this.shot2.play();
        break;
      case 2:
        this.shot3.play();
        break;
      case 3:
        this.shot4.play();
        break;
      case 4:
        this.shot5.play();
        break;
      case 5:
        this.shot6.play();
        break;
      default:
        this.shot1.play();
        this.shotIndex = 0;
    }
    this.shotIndex += 1;
    if (this.shotIndex >= 6) this.shotIndex = 0;
  }
}

class EntitySoundsPlayer {
  constructor() {
    this.slimePlayers = 5;
    this.slimeAudioPool = [];
    for (let i = 0; i < this.slimePlayers; i += 1) {
      this.slimeAudioPool.push(new SlimeSounds());
    }
    this.index = {
      jump: 0,
      splash: 0,
      stomp: 0,
      damage1: 0,
      damage2: 0,
      damage3: 0,
    };
  }

  playJump() {
    const sound = 'jump';
    this.slimeAudioPool[this.index[sound]][sound].pause();
    this.slimeAudioPool[this.index[sound]][sound].currentTime = 0;
    this.slimeAudioPool[this.index[sound]][sound].play();
    this.index[sound] += 1;
    if (this.index[sound] >= this.slimePlayers) this.index[sound] = 0;
  }

  playSplash() {
    const sound = 'splash';
    this.slimeAudioPool[this.index[sound]][sound].pause();
    this.slimeAudioPool[this.index[sound]][sound].currentTime = 0;
    this.slimeAudioPool[this.index[sound]][sound].play();
    this.index[sound] += 1;
    if (this.index[sound] >= this.slimePlayers) this.index[sound] = 0;
  }

  playStomp() {
    const sound = 'stomp';
    this.slimeAudioPool[this.index[sound]][sound].pause();
    this.slimeAudioPool[this.index[sound]][sound].currentTime = 0;
    this.slimeAudioPool[this.index[sound]][sound].play();
    this.index[sound] += 1;
    if (this.index[sound] >= this.slimePlayers) this.index[sound] = 0;
  }

  playDamage() {
    const rand = Math.random();
    if (rand < 0.33) this.playDamage1();
    else if (rand < 0.67) this.playDamage2();
    else this.playDamage3();
  }

  playDamage1() {
    const sound = 'damage1';
    this.slimeAudioPool[this.index[sound]][sound].pause();
    this.slimeAudioPool[this.index[sound]][sound].currentTime = 0;
    this.slimeAudioPool[this.index[sound]][sound].play();
    this.index[sound] += 1;
    if (this.index[sound] >= this.slimePlayers) this.index[sound] = 0;
  }

  playDamage2() {
    const sound = 'damage2';
    this.slimeAudioPool[this.index[sound]][sound].pause();
    this.slimeAudioPool[this.index[sound]][sound].currentTime = 0;
    this.slimeAudioPool[this.index[sound]][sound].play();
    this.index[sound] += 1;
    if (this.index[sound] >= this.slimePlayers) this.index[sound] = 0;
  }

  playDamage3() {
    const sound = 'damage3';
    this.slimeAudioPool[this.index[sound]][sound].pause();
    this.slimeAudioPool[this.index[sound]][sound].currentTime = 0;
    this.slimeAudioPool[this.index[sound]][sound].play();
    this.index[sound] += 1;
    if (this.index[sound] >= this.slimePlayers) this.index[sound] = 0;
  }

  playEmpty() {
    this.empty.play();
  }
}

export const SharedSlimePlayer = new EntitySoundsPlayer();
