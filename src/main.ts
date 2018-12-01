import 'phaser';

import LoadScene from './scenes/LoadScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import Player from './characters/player';
import Enemy from './characters/enemy';
import Priest from './characters/priest';
import BulletManager from './handlers/BulletManager';
import EnemyManager from './handlers/EnemyHandler';


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
    GameScene
  ]
};

new Phaser.Game(config);
