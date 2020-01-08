import Bola from './bola.js'
import Pared from './paredes.js'
import Player from './player.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('pared', 'pared.png');
    this.load.image('dude', 'dude.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#FFFFFF');

    new Bola(this,  Math.floor(Math.random() * 1200)+100, Math.floor(Math.random() * 600)+100,50, 0);

    new Pared(this, 0, 0, 50, 1600);
    new Pared(this, 0, 0, 2800, 50);
    new Pared(this, 1400, 0, 50, 1600);
    new Pared(this, 0, 800, 2800, 50);

    this.player = new Player(this, 500, 100, 'dude');

    this.matter.world.on('collisionstart', (evento, cuerpo1, cuerpo2) => {
      if (cuerpo1 == this.player.body || cuerpo2 == this.player.body && (cuerpo1.gameObject.type == 'Ellipse' || cuerpo2.gameObject.type == 'Ellipse')) {
        if (cuerpo1.gameObject.type == 'Ellipse') this.destruccion(cuerpo1.gameObject);
        else this.destruccion(cuerpo2.gameObject);
      }
    })

    this.segundos = 30;
    this.colisiones = 7;
    this.cuentaAtras = this.add.text(30, 30, 'Tiempo restante: ' + this.segundos + ' colisiones: ' + this.colisiones).setColor('#000000').setFontSize(30);
    this.time.addEvent({ delay: 1000, callback: this.segundo, callbackScope: this, loop: true });

    this.play = true;
    this.spacio = this.input.keyboard.addKey('space');
    this.spacio.on('down', () => {
      if (!this.play) {
        this.scene.restart();
      }
    })

  }

  destruccion(obj) {
    this.colisiones--;
    if (this.colisiones == 0) {
      this.play = false;
      this.add.text(600, 350, 'HAS GANADO').setColor('#000000').setFontSize(30);
      this.matter.world.pause();
    }
    this.cuentaAtras.text = 'Tiempo restante: ' + this.segundos + ' colisiones: ' + this.colisiones;
    if (obj.rebotes < 2) {
      new Bola(this, obj.x, obj.y, 50, obj.rebotes + 1);
      new Bola(this, obj.x, obj.y, 50, obj.rebotes + 1);
    }
    obj.destroy();
  }

  segundo() {
    if (this.play) {
      this.segundos--;
      this.cuentaAtras.text = 'Tiempo restante: ' + this.segundos + ' colisiones: ' + this.colisiones;
      if (this.segundos == 0) {
        this.play = false;
        this.add.text(600, 350, 'HAS PERDIDO').setColor('#000000').setFontSize(30);
        this.matter.world.pause();
      }
    }

  }

  update(time, delta) {
  }
}