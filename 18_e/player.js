export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imag) {
        super(scene, x, y, imag);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true).setBounce(0.2);
        this.body.checkCollision.up = false;

        this.cursor = scene.input.keyboard.createCursorKeys();
        this.cursor.up = scene.input.keyboard.addKey('SPACE');
        this.puntuacion = 0;

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        })
        scene.anims.create({
            key:'right',
            frames: scene.anims.generateFrameNumbers('dude', {start: 5, end:8}),
            frameRate: 10,
            repeat: -1
        })


        this.cursor.left.on('down', () => {
            this.body.setVelocityX(-160);

            this.play('left');
        })
        this.cursor.right.on('down', () => {
            this.body.setVelocityX(160);

            this.play('right');
        })

        this.sonidoSalto = scene.sound.add('jump');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if(this.cursor.right.isUp && this.cursor.left.isUp) {
            this.body.setVelocityX(0);
            this.play('turn');
        }

        if (this.cursor.up.isDown && this.body.touching.down) {
            this.sonidoSalto.play();
            this.body.setVelocityY(-450);
        }
    }

}