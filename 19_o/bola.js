export default class Bola extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, diametro, rebote) {
        super(scene, x, y, diametro, diametro, 0x00ff00);
        scene.add.existing(this);
        scene.matter.add.gameObject(this);
        this.body.ignoreGravity = true;
        this.setVelocity(Math.floor(Math.random() * 20) - 10, Math.floor(Math.random() * 20) - 10).setFrictionAir(0).setBounce(1).setMass(0.1);
        if (rebote == 0) this.setScale(3);
        else if (rebote == 1) this.setScale(2);

        this.rebotes = rebote;
    }
}