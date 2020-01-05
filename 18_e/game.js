import Estrella from './estrella.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('fondo', 'fondo.png');
    this.load.image('plataforma', 'plataforma.png');
    this.load.image('estrella', 'star.png');
    this.load.spritesheet('dude', './dude.png', { frameWidth: 32, frameHeight: 48 });
    
    this.load.audio('jump', './menuclick.wav');
    this.load.audio('coin', './Rebote.wav');
  }

  create() {
    this.add.image(0, 0, 'fondo').setScale(3.5);
    var plataformas = this.physics.add.staticGroup();

    plataformas.create(700, 780, 'plataforma').setScale(3.5).refreshBody();
    plataformas.create(500, 500, 'plataforma');
    plataformas.create(800, 300, 'plataforma');

    this.estrellas = this.physics.add.staticGroup();

    this.estrellas.add(new Estrella(this, 500, 430, 'estrella'));
    this.estrellas.add(new Estrella(this, 800, 250, 'estrella'));

    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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


    this.player.body.checkCollision.up = false;
    this.physics.add.collider(this.player, plataformas);

    this.cursors = this.input.keyboard.createCursorKeys(); //añade las flechas

    this.space = this.input.keyboard.addKey('SPACE');

    this.physics.add.overlap(this.estrellas, this.player, this.collectStar, null, this);

    this.puntuacion = 0;
    this.puntuacionTexto = this.add.text(50,50, 'Puntuacion: ' + this.puntuacion);

    
    this.jumpSonido = this.sound.add('jump');
    this.monedaSonido = this.sound.add('coin');

  }

  collectStar(player, star) {
    this.monedaSonido.play();
    this.puntuacion++;
    this.puntuacionTexto.text = 'Puntuacion: ' + this.puntuacion;
    star.destroy();
  }

  update(time, delta) {

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.space.isDown && this.player.body.touching.down) {
      this.jumpSonido.play();
      this.player.setVelocityY(-500);
    }
  }
}