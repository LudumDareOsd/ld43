import Player from '../characters/player';
import MapHandler from '../handlers/MapHandler';
import EnemyHandler from '../handlers/EnemyHandler';
import UIHandler from '../handlers/UIHandler';

class GameScene extends Phaser.Scene {

  public map: MapHandler = new MapHandler({ scene: this, yOffset: 80 });
  public enemyHandler = new EnemyHandler(this);
  public uiHandler = new UIHandler(this);
  public player;
  private music: any;
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload() {
    this.music = this.sound.add('playing_audio', { loop: true, volume: 0.4 });
    this.load.image('cross', '/assets/gfx/cross.png');
  }

  create() {
    this.enemyHandler.create();
    this.uiHandler.create();
    this.initPlayer();
    this.map.create();
    this.initPhysics();
    this.music.volume = 0.4;
    this.music.play('', 0, 1, true);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.enemyHandler.update(time, delta);
  }

  private initPlayer() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(100, 100, this, cursors);
  }

  private initPhysics() {
    this.map.init();
  }
}

export default GameScene;