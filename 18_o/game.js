export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
  }

  create() {
    this.espacio = this.input.keyboard.addKey('space');
    this.s = this.input.keyboard.addKey('S');
    this.d = this.input.keyboard.addKey('D');

    this.isSelected = true;

    this.matter.world.setBounds().disableGravity();

    this.cajas = [];
    var caja = this.add.polygon(500, 500, '0 0 75 0 75 75 0 75', 0xffffff);
    this.matter.add.gameObject(caja);
    caja.setVelocity(Math.floor(Math.random() * 20) - 10, Math.floor(Math.random() * 20) - 10).setFriction(0, 0, 0).setBounce(1).setAngularVelocity(0.01);
    this.cajas.push(caja);

    this.cajaSeleccionada = caja.setFillStyle(0xff0000);

    this.d.on('down', () => {
      if (this.isSelected) {
        this.deleteOBJ(this.cajaSeleccionada);
        if (this.cajas.length > 0) {
          this.cajaSeleccionada = this.cajas[0].setFillStyle(0xff0000);
        }
        else this.cajaSeleccionada = null;
      }
    })

    this.espacio.on('down', () => {
      this.añadirCaja();
      if (this.cajaSeleccionada == null) {
        this.cajaSeleccionada = this.cajas[0].setFillStyle(0xff0000);
        this.isSelected = true;
      }
    })


    this.cursor = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.I,
      down: Phaser.Input.Keyboard.KeyCodes.K,
      left: Phaser.Input.Keyboard.KeyCodes.J,
      right: Phaser.Input.Keyboard.KeyCodes.L
    });
  }

  añadirCaja() {
    var caja = this.add.polygon(Math.floor(Math.random() * 1400), Math.floor(Math.random() * 800), '0 0 75 0 75 75 0 75', 0xffffff);
    this.matter.add.gameObject(caja);
    caja.setVelocity(Math.floor(Math.random() * 20) - 10, Math.floor(Math.random() * 20) - 10).setFriction(0, 0, 0).setBounce(1).setAngularVelocity(0.01);
    this.cajas.push(caja);
  }

  deleteOBJ(obj) {
    var i = 0;
    var encontrada = false;
    while (i < this.cajas.length && !encontrada) {

      if (this.cajas[i] == obj) {
        this.cajas[i].destroy();
        this.cajas.splice(i, 1);
        encontrada = true;
      }
      else i++;
    }
    if (this.cajas.length == 0) this.isSelected = false;
  }

  update(time, delta) {
    if (this.s.isDown && this.isSelected) this.cajaSeleccionada.rotation = this.cajaSeleccionada.rotation + 0.05;

    if (this.cursor.up.isDown) {
      this.cajaSeleccionada.applyForce({ x: 0, y: -0.05 });
    }
    else if (this.cursor.down.isDown) {
      this.cajaSeleccionada.applyForce({ x: 0, y: 0.05 });
    }
    else if (this.cursor.left.isDown) {
      this.cajaSeleccionada.applyForce({ x: -0.05, y: 0 });
    }
    else if (this.cursor.right.isDown) {
      this.cajaSeleccionada.applyForce({ x: 0.05, y: 0 });
    }
  }
}