export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imag) { //imag es el sprite que se va a cargar
        super(scene, x, y, imag);
        this.scene.add.existing(this); //le dice a la scene Game que existe
        this.scene.physics.add.existing(this);
        this.body.checkCollision.up = false; //no mira las colisiones por encima
        this.body.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.puntuacion = 0;

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors.left.on('down', () => {
            this.body.setVelocityX(-160);

            this.play('left');
        })

        this.cursors.right.on('down', () => {
            this.body.setVelocityX(160);

            this.play('right');
        })
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if(this.cursors.right.isUp && this.cursors.left.isUp) {
            this.body.setVelocityX(0);

            this.play('turn');
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.body.setVelocityY(-500);
        }
    }
}