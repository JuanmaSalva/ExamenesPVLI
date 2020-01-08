export default class Estrella extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,imag){
        super(scene,x,y,imag);
        scene.add.existing(this);
    }
}