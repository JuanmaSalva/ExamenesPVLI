export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imag) {
        super(scene, x, y, imag);
        scene.add.existing(this);
        scene.matter.add.gameObject(this);
        this.setScale(7.5);
        this.body.ignoreGravity = true;

        this.cursor = scene.input.keyboard.createCursorKeys();
        this.setFixedRotation(true);
    }


    preUpdate() {
        var x = 0;
        var y = 0;

        if (this.cursor.up.isDown) {
            y = -10
        }
        else if (this.cursor.down.isDown) {
            y = 10
        }
        if (this.cursor.left.isDown) {
            x = -10;
        }
        else if (this.cursor.right.isDown) {
            x = 10;
        }


        this.setVelocity(x, y);
    }

} 