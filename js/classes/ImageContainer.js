const directPaths = [
  './images/AK47.png',
  './images/ammo_empty.png',
  './images/ammo.png',
  './images/background1.png',
  './images/big_bullet.png',
  './images/bullet_splash_small.png',
  './images/bullet_splash.png',
  './images/cloud1.png',
  './images/cloud2.png',
  './images/cloud3.png',
  './images/cloud4.png',
  './images/cloud5.png',
  './images/cloud6.png',
  './images/empty_shell.png',
  './images/hpBar.png',
  './images/jumpDust.png',
  './images/Revolver.png',
  './images/background1.png',
];

const entitiesPaths = [
  './images/player/',
  './images/slimeGreen/',
  './images/slimeBlue/',
  './images/slimeRed/',
];

const entitiesElements = [
  'idleLeft.png',
  'idleRight.png',
  'runLeft.png',
  'runRight.png',
  'jumpLeft.png',
  'jumpRight.png',
];

export default class ImageContainer {
  /**
   * This class creates and load images from source for each path
   * listed in paths. They are later available as part of ImageContainer instance.
   * Each element have it's own identifier, constructed from path.
   * For example for path: './images/big_bullet.png':
   * identifier is: 'imagesbig_bullet'
   * created propety can be referenced by this.imagesbig_bullet or instance.imagesbig_bullet,
   * or just by using getter getImage(path).
   */
  constructor() {
    this.imageCounter = 0;
    this.loaded = 0;
    this.notFound = 0;
    directPaths.forEach((path) => {
      this.imageCounter += 1;
      const newProp = ImageContainer.getIdentifier(path);
      this[newProp] = new Image();
      // eslint-disable-next-line no-console
      this[newProp].addEventListener('error', () => { console.error('Not found image with path: ', path); });
      this[newProp].addEventListener('load', () => { this.loaded += 1; });
      this[newProp].src = path;
    });
    entitiesPaths.forEach((Beginpath) => {
      entitiesElements.forEach((endPath) => {
        this.imageCounter += 1;
        const completePath = Beginpath + endPath;
        const newProp = ImageContainer.getIdentifier(completePath);
        this[newProp] = new Image();
        this[newProp].addEventListener('error', () => { this.notFound += 1; });
        this[newProp].addEventListener('load', () => { this.loaded += 1; });
        this[newProp].src = completePath;
      });
    });
  }

  /**
   * Creates unique name based on path to file.
   * @param {string} Full path to file.
   * @returns {string} Shortened string used as property name.
   */
  static getIdentifier(path) {
    const identifier = path.slice(1, path.length - 4).replaceAll('/', '');
    return identifier;
  }

  /**
   * Returns image object identified by path.
   * @param {string} path Full path to file.
   * @returns {HTMLImageElement} Image reference.
   */
  getImage(path) {
    return this[ImageContainer.getIdentifier(path)];
  }

  loadProgress() {
    return (this.loaded + this.notFound) / this.imageCounter;
  }
}
