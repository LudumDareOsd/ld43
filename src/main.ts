import 'phaser';

import LoadScene from './scenes/LoadScene';

const config:GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 960,
    height: 720,
    resolution: 1,
    backgroundColor: "#aaa",
    scene: [
      LoadScene
    ]
};

new Phaser.Game(config);
