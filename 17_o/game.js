import Player from './player.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('fondo', 'fondo.png');
    this.load.image('plataforma', 'plataforma.png');
    this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(0, 0, 'fondo').setScale(3.5);

    var plataforma = this.physics.add.sprite(700, 780, 'plataforma').setScale(3.5).setGravityY(-400).setImmovable(true);

    this.player1 = new Player(this, 100, 100, 'dude', { jump: 'W', left: 'A', right: 'D' }, 10);

    this.player2 = new Player(this, 800, 100, 'dude', { jump: 'I', left: 'J', right: 'L' }, 5);

    this.physics.add.collider(this.player1,plataforma);
    this.physics.add.collider(this.player2,plataforma);

    this.physics.add.overlap(this.player1,this.player2, () => {
      this.player1.colision();
      this.player2.colision();
      this.puntuacionP1.text = 'PuntuacionP1: ' + this.player1.vida;
      this.puntuacionP2.text = 'PuntuacionP2: ' + this.player2.vida;
    });



    this.puntuacionP1 = this.add.text(50, 50, 'PuntuacionP1: ' + this.player1.vida);
    this.puntuacionP2 = this.add.text(1200, 50, 'PuntuacionP2: ' + this.player2.vida);



    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }



  update(time, delta) {

  }
}