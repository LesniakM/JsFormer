const actions = {
  any: {
    pressed: false,
  },
  moveRight: {
    key: 'KeyD',
    pressed: false,
  },
  moveLeft: {
    key: 'KeyA',
    pressed: false,
  },
  playerShoot: {
    key: 'KeyF',
    pressed: false,
  },
  playerJump: {
    key: 'Space',
    pressed: false,
  },
  playerReload: {
    key: 'KeyR',
    pressed: false,
  },
  playerChangeWpn: {
    key: 'KeyQ',
    pressed: false,
  },
  debugMode: {
    key: 'KeyU',
    toggled: false,
  },
  spawnEnemy: {
    key: 'KeyP',
    pressed: false,
  },
  secretMode: {
    key: 'KeyB',
    toggled: false,
  },
};

window.addEventListener('keydown', (event) => {
  actions.any.pressed = true;
  switch (event.code) {
    case actions.playerJump.key:
      actions.playerJump.pressed = true;
      break;
    case actions.moveRight.key:
      actions.moveRight.pressed = true;
      break;
    case actions.moveLeft.key:
      actions.moveLeft.pressed = true;
      break;
    case actions.debugMode.key:
      actions.debugMode.toggled = !actions.debugMode.toggled;
      break;
    case actions.spawnEnemy.key:
      actions.spawnEnemy.pressed = true;
      // spawnEnemy(entities, player, 500, 0, 'Slime', 10);
      break;
    case actions.playerReload.key:
      actions.playerReload.pressed = true;
      break;
    case actions.playerChangeWpn.key:
      actions.playerChangeWpn.pressed = true;
      break;
    case actions.secretMode.key:
      actions.secretMode.toggled = true;
      // backgroundColor = '#405668';
      // fogColor = '#00000050';
      // sounds.bgmusic.volume = 0.05;
      // sounds.Epicbgmusic.play();
      // player.changeWeaponSecret();
      break;
    case actions.playerShoot.key:
      actions.playerShoot.pressed = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('Unknown key down');
      // eslint-disable-next-line no-console
      console.log(event.code);
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case actions.moveRight.key:
      actions.moveRight.pressed = false;
      break;
    case actions.moveLeft.key:
      actions.moveLeft.pressed = false;
      break;
    case actions.playerShoot.key:
      actions.playerShoot.pressed = false;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('Unknown key up');
      // eslint-disable-next-line no-console
      console.log(event.code);
  }
});
