import Bola from './bola.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('jugador', 'jugador.png');
    this.load.image('bola', 'bola.png');
  }

  create() {
    this.play = true;
    this.paredes = this.physics.add.staticGroup();
    this.paredes.add(this.add.rectangle(50, 0, 100, 1600, 0x0000ff));
    this.paredes.add(this.add.rectangle(0, 50, 2600, 100, 0x0000ff));
    this.paredes.add(this.add.rectangle(1350, 0, 100, 2000, 0x0000ff))
    this.paredes.add(this.add.rectangle(300, 750, 2000, 100, 0x0000ff))

    this.player = this.physics.add.sprite(200, 200, 'jugador');

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cursors.up.on('down', () => {
      if (this.play) this.player.body.setVelocityY(-160);
    })
    this.cursors.down.on('down', () => {
      if (this.play) this.player.body.setVelocityY(160);
    })
    this.cursors.left.on('down', () => {
      if (this.play) this.player.body.setVelocityX(-160);
    })
    this.cursors.right.on('down', () => {
      if (this.play) this.player.body.setVelocityX(160);
    })

    this.cursors.up.on('up', () => {
      this.player.body.setVelocityY(0);
    })
    this.cursors.down.on('up', () => {
      this.player.body.setVelocityY(0);
    })
    this.cursors.left.on('up', () => {
      this.player.body.setVelocityX(0);
    })
    this.cursors.right.on('up', () => {
      this.player.body.setVelocityX(0);
    })

    this.bolas = this.add.group();
    this.bolas.add(new Bola(this, Math.floor(Math.random() * 1100) + 150, Math.floor(Math.random() * 300) + 150, 'bola', 0));
    this.bolas.add(new Bola(this, Math.floor(Math.random() * 1100) + 150, Math.floor(Math.random() * 300) + 150, 'bola', 0));

    this.bolasRestantes = 2;

    this.physics.add.collider(this.bolas, this.paredes);
    this.physics.add.collider(this.player, this.paredes);

    this.physics.add.overlap(this.player, this.bolas, this.divide, null, this);

    this.space = this.input.keyboard.addKey('space');

    this.space.on('down', () => {
      if (!this.play) {
        this.scene.restart();
      }
    })

    this.segundos = 30;

    this.cunataAtras = this.add.text(100, 100, 'Timepo restante: ' + this.segundos);

    this.time.addEvent({ delay: 1000, callback: this.segundo, callbackScope: this, loop: 30 });
  }

  segundo() {
    if (this.segundos == 0) {
      this.add.text(700, 375, 'HAS PERDIDO');
      this.play = false;
      this.player.body.setVelocityY(0);
      this.player.body.setVelocityX(0);

      var gameObjects = this.bolas.getChildren();
      for(var i=0;i<gameObjects.length;i++){
        gameObjects[i].body.setVelocityX(0).setVelocityY(0);
      }
    }
    else {
      this.segundos--;
      this.cunataAtras.text = 'Timepo restante: ' + this.segundos;
    }
  }

  divide(player, bola) {
    var des = bola.destrucciones + 1;
    bola.destroy();
    if (des < 3) {
      this.bolas.add(new Bola(this, Math.floor(Math.random() * 1100) + 150, Math.floor(Math.random() * 300) + 150, 'bola', des));
      this.bolas.add(new Bola(this, Math.floor(Math.random() * 1100) + 150, Math.floor(Math.random() * 300) + 150, 'bola', des));
      this.bolasRestantes += 1;
    }
    else {
      this.bolasRestantes -= 1;
      if (this.bolasRestantes === 0) {
        this.add.text(700, 375, 'HAS GANADO');
        this.play = false;
        this.player.body.setVelocityY(0);
        this.player.body.setVelocityX(0);
      }
    }
  }

  update(time, delta) {
  }
}