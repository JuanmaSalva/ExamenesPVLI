import Estrella from './estrella.js'
import Player from './player.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('plataforma', 'plataforma.png');
    this.load.image('fondo', 'fondo.png')
    this.load.image('estrella', 'star.png')
    this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 })

    this.load.audio('jump' ,'./menuclick.wav');
    this.load.audio('coin', './Rebote.wav')
  }

  create() {
    this.add.image(0, 0, 'fondo').setScale(3.5);
    var plataformas = this.physics.add.staticGroup();

    plataformas.create(700, 780, 'plataforma').setScale(3.5).refreshBody();
    plataformas.create(500, 500, 'plataforma');
    plataformas.create(800, 300, 'plataforma');
    plataformas.create(250, 150, 'plataforma');

    this.estrellas = this.physics.add.staticGroup();
    this.estrellas.add(new Estrella(this, 800, 250, 'estrella'))
    this.estrellas.add(new Estrella(this, 250, 100, 'estrella'))
    this.estrellas.add(new Estrella(this, 500, 450, 'estrella'))

    this.player = new Player(this, 100, 500, 'dude');

    this.physics.add.collider(this.player, plataformas)
    this.physics.add.overlap(this.player, this.estrellas, this.collisionEstrellas, null, this)

    this.puntuacionTexto = this.add.text(10,10, 'Puntuacion: ' + this.player.puntuacion)

    this.monedaSonido = this.sound.add('coin');
  }

  collisionEstrellas(player, estrella) {
    this.monedaSonido.play();
    this.player.puntuacion += 1;
    this.puntuacionTexto.text = 'Puntuacion: ' + this.player.puntuacion;
    estrella.destroy();
  }

  update(time, delta) {

  }
}