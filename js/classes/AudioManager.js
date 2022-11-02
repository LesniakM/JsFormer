const bgMusicList = [
  ['background1', './data/wavs/itch-io_not-jam-music-pack_KleptoLindaMountain.wav', 0.2],
  ['background2', './data/wavs/weapons/secret/EpicBg.wav', 0.3]];

const slimeSounds = [
  ['jump', './data/wavs/Squishy2.wav', 0.2],
  ['splash', './data/wavs/BigSplash.wav', 0.2],
  ['stomp', './data/wavs/Squishy5.wav', 0.2],
  ['damage1', './data/wavs/Squishy3.wav', 0.33],
  ['damage2', './data/wavs/Squishy6.wav', 0.33],
  ['damage3', './data/wavs/Squishy6.wav', 0.33]];

const playerSounds = [
  ['jump', './data/wavs/Jump.wav', 0.25],
  ['splash', './data/wavs/BigSplash.wav', 0.33],
  ['stomp', './data/wavs/Stomp.wav', 0.25],
  ['step1', './data/wavs/StepGrass1.wav', 0.2],
  ['step2', './data/wavs/StepGrass2.wav', 0.2],
  ['step3', './data/wavs/StepGrass3.wav', 0.2],
  ['step4', './data/wavs/StepGrass4.wav', 0.2],
  ['switch', './data/wavs/weapons/Click2.wav', 0.25],
  ['damage1', './data/wavs/Male5.wav', 0.33],
  ['damage2', './data/wavs/Male6.wav', 0.33],
  ['damage3', './data/wavs/Male7.wav', 0.33],
];

const weaponSounds = [
  ['empty', './data/wavs/weapons/Click6.wav', 0.3],
  ['AK47_shot', './data/wavs/weapons/Gunshot6.wav', 0.27],
  ['AK47_reload1', './data/wavs/weapons/GunMagazine1.wav', 0.35],
  ['AK47_reload2', './data/wavs/weapons/GunMagazine2.wav', 0.35],
  ['Revolver_shot', './data/wavs/weapons/Gunshot5.wav', 0.35],
  ['Revolver_reload1', './data/wavs/weapons/GunBarrelRoll1.wav', 0.35],
  ['Revolver_reload2', './data/wavs/weapons/GunBarrel1.wav', 0.35],
  ['Karabinek_shot1', './data/wavs/weapons/secret/gunshot1.wav', 0.3],
  ['Karabinek_shot2', './data/wavs/weapons/secret/gunshot2.wav', 0.3],
  ['Karabinek_shot3', './data/wavs/weapons/secret/gunshot3.wav', 0.3],
  ['Karabinek_shot4', './data/wavs/weapons/secret/gunshot4.wav', 0.3],
  ['Karabinek_shot5', './data/wavs/weapons/secret/gunshot5.wav', 0.3],
  ['Karabinek_shot6', './data/wavs/weapons/secret/gunshot6.wav', 0.3],
  ['Karabinek_reload1', './data/wavs/weapons/GunMagazine1.wav', 0.35],
  ['Karabinek_reload2', './data/wavs/weapons/GunMagazine2.wav', 0.35],
  ['Karabinek_scream', './data/wavs/weapons/secret/warScream.wav', 0.3],
];

class AudioManager {
  /**
     * Creates object that preloads and plays all the music and sound effect.
     */
  constructor() {
    this.audioContext = new AudioContext();
    this.audioCounter = 0;
    this.loaded = 0;
    this.bulkLoad('bgMusic', bgMusicList);
    this.bulkLoad('slime', slimeSounds);
    this.bulkLoad('player', playerSounds);
    this.bulkLoad('weapon', weaponSounds);
  }

  bulkLoad(name, list) {
    this[name] = {};
    list.forEach((element) => {
      const subname = element[0];
      const url = element[1];
      const volume = element[2];
      this.audioCounter += 1;

      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => this.audioContext.decodeAudioData(buffer))
        .then((buffer) => {
          this[name][subname] = buffer;
          this[name][subname].volume = volume;
          this.loaded += 1;
        });
    });
  }

  /**
   * Play sound with Web Audio API.
   * @param {string} category Category name of sound. bgMusic | slime | player | weapon.
   * @param {string} name Name of choosen sound.
   * @param {bool} loop True for infinity loop.
   * @param {bool} volumeOverride If provided, overrides default sound volume.
   */
  play(category, name, loop = false, volumeOverride = false) {
    const track = this.audioContext.createBufferSource();
    track.buffer = this[category][name];
    const gainNode = this.audioContext.createGain();
    track.connect(gainNode);
    gainNode.gain.value = volumeOverride || this[category][name].volume;
    gainNode.connect(this.audioContext.destination);
    track.loop = loop;
    track.start(0);
  }

  loadProgress() {
    return this.loaded / this.audioCounter;
  }
}

const audioManager = new AudioManager();
export default audioManager;
