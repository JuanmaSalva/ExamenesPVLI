import Player from './player.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('fondo', 'fondo.png');
    this.load.image('plataforma', 'plataforma.png');
    this.load.image('estrella', 'star.png')
    this.load.image('base', 'base.png');
    this.load.spritesheet('dude', './dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(0, 0, 'fondo').setScale(3.5);

    this.plataformas = this.physics.add.staticGroup();

    this.vectorP = [];

    this.plataformas.create(700, 780, 'plataforma').setScale(3.5).refreshBody();
    this.vectorP.push(this.plataformas.create(500, 500, 'plataforma'));
    this.physics.add.sprite(500, 460, 'base').setGravityY(-400);
    this.vectorP.push(this.plataformas.create(800, 300, 'plataforma'));
    this.physics.add.sprite(800, 260, 'base').setGravityY(-400);
    this.vectorP.push(this.plataformas.create(1000, 600, 'plataforma'));
    this.physics.add.sprite(1000, 560, 'base').setGravityY(-400);
    this.vectorP.push(this.plataformas.create(300, 150, 'plataforma'));
    this.physics.add.sprite(300, 110, 'base').setGravityY(-400);
    this.vectorP.push(this.plataformas.create(1100, 150, 'plataforma'));
    this.physics.add.sprite(1100, 110, 'base').setGravityY(-400);

    this.player = new Player(this, 100, 100, 'dude');
    this.physics.add.collider(this.player, this.plataformas)

    this.estrellas = this.physics.add.sprite(10, 10, 'estrella');
    this.generarEStrella();

    this.physics.add.overlap(this.player, this.estrellas, () => {
      this.generarEStrella();
      this.player.puntuacion += 1;
      this.puntuacionText.text = 'Puntuacion: ' + this.player.puntuacion;

      if (this.player.puntuacion > 9) {
        this.scene.start('end');
      }
    })

    this.physics.add.collider(this.estrellas, this.plataformas)

    this.puntuacionText = this.add.text(10, 10, 'Puntuacion: ' + this.player.puntuacion);
  }

  update(time, delta) {
  }

  generarEStrella() {
    var anterior = this.plataDestino;
    while (anterior == this.plataDestino) this.plataDestino = Math.floor(Math.random() * 5);
    this.estrellas.x = this.vectorP[this.plataDestino].x;
    this.estrellas.y = this.vectorP[this.plataDestino].y - 50;
  }
}