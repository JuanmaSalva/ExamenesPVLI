export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
  }

  create() {
    this.matter.world.setBounds().disableGravity();
    this.cuadrados = []

    this.cuadrado = this.add.polygon(500, 300, '0 0 75 0 75 75 0 75', 0xffffff);
    this.matter.add.gameObject(this.cuadrado);
    this.cuadrado.setVelocity(Math.floor(Math.random() * 20) - 10, Math.floor(Math.random() * 20) - 10).setFriction(0, 0, 0).setBounce(1).setAngularVelocity(0.01);
    this.cuadrados.push(this.cuadrado);

    this.space = this.input.keyboard.addKey('space');
    this.s = this.input.keyboard.addKey('S');
    this.d = this.input.keyboard.addKey('D');

    this.space.on('down', () => {
      this.c = this.add.polygon(Math.floor(Math.random() * 1400), Math.floor(Math.random() * 800), '0 0 75 0 75 75 0 75', 0xffffff);
      this.matter.add.gameObject(this.c);
      this.c.setVelocity(Math.floor(Math.random() * 20) - 10, Math.floor(Math.random() * 20) - 10).setFriction(0, 0, 0).setBounce(1).setAngularVelocity(0.01);
      this.cuadrados.push(this.c);
      if (this.cuadrados.length == 1) {
        this.cajaSelecionada = this.cuadrados[0];
        this.cajaSelecionada.setFillStyle(0xff0000)
      }
    })

    this.d.on('down', () => {
      for (var i = 0; i < this.cuadrados.length; i++) {
        if (this.cuadrados[i] == this.cajaSelecionada) this.cuadrados.splice(i, 1);
      }
      this.cajaSelecionada.destroy();
      if (this.cuadrados.length > 0) {
        this.cajaSelecionada = this.cuadrados[0];
        this.cajaSelecionada.setFillStyle(0xff0000)
      }
    })

    this.cajaSelecionada = this.cuadrado;
    this.cuadrado.setFillStyle(0xff0000)

    this.cursor = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.I,
      down: Phaser.Input.Keyboard.KeyCodes.K,
      left: Phaser.Input.Keyboard.KeyCodes.J,
      right: Phaser.Input.Keyboard.KeyCodes.L
    });
  }

  update(time, delta) {
    if (this.cuadrados.length > 0) {
      if (this.s.isDown) {
        this.cajaSelecionada.rotation += 0.1;
      }
      else if(this.cursor.up.isDown){
        this.cajaSelecionada.applyForce({x:0,y:-0.05});
      }
      else if(this.cursor.down.isDown){
        this.cajaSelecionada.applyForce({x:0,y:0.05});
      }
      else if(this.cursor.left.isDown){
        this.cajaSelecionada.applyForce({x:-0.05,y:0});        
      }
      else if(this.cursor.right.isDown){
        this.cajaSelecionada.applyForce({x:0.05,y:0});               
      }
    }
  }
}