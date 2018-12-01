import 'phaser';

import LoadScene from './scenes/LoadScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';
import WinScene from './scenes/WinScene';
import Player from './characters/player';
import BulletManager from './handlers/BulletManager';

const config:GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 960,
  height: 720,
  resolution: 1,
  pixelArt: true,
  backgroundColor: "#aaa",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700 },
      debug: true
    }
  },
  scene: [
    LoadScene,
    StartScene,
    GameScene,
    GameOverScene,
    WinScene
  ]
};

new Phaser.Game(config);
