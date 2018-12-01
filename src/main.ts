import 'phaser';

import LoadScene from './scenes/LoadScene';

const config:GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 960,
    height: 704,
    resolution: 1,
    backgroundColor: "#aaa",
    scene: [
      LoadScene
    ],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: true
      }
    },
};

new Phaser.Game(config);
