export default class Estrella extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y, imag) { //imag es el sprite que se va a cargar
        super(scene, x, y, imag);
        this.scene.add.existing(this); //le dice a la scene Game que existe


    }

}