import 'phaser';

import LoadScene from './scenes/LoadScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';
import WinScene from './scenes/WinScene';
import Player from './characters/player';
import Enemy from './characters/enemy';
import Priest from './characters/priest';
import BulletManager from './handlers/BulletManager';
import EnemyManager from './handlers/EnemyHandler';
import UIManager from './handlers/UIHandler';


const config:GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 960,
  height: 720,
  resolution: 1,
  pixelArt: true,
  backgroundColor: "#2a1133",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700 },
      // debug: true
      debug: false
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