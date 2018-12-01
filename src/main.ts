import 'phaser';

import LoadScene from './scenes/LoadScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import Player from './characters/player';
import Knife from './characters/objects/knife';

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 960,
  height: 720,
  resolution: 1,
  backgroundColor: "#aaa",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
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
