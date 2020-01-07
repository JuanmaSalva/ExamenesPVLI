export default class Bola extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imag,destrucciones) { //imag es el sprite que se va a cargar
        super(scene, x, y, imag);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setBounce(1).setVelocityX(-100).setVelocityY(-100)
        if(destrucciones === 0) this.setScale(2);
        else if(destrucciones === 1)this.setScale(1.5);
        else this.setScale (1);

        this.destrucciones = destrucciones;
    }

}