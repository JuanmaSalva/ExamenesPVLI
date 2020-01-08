export default class Pared extends Phaser.Physics.Matter.Image{
    constructor(scene,x,y,w,h){
        super(scene.matter.world,x,y,'pared');
        scene.add.existing(this);
        this.displayWidth = w;
        this.displayHeight = h;
        this.setStatic(true);
    }
}