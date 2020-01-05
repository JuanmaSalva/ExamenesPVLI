export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imag, teclas, vida) { //imag es el sprite que se va a cargar
        super(scene, x, y, imag);
        this.scene.add.existing(this); //le dice a la scene Game que existe
        this.scene.physics.add.existing(this); //le otorga presencia fisica
        this.body.setCollideWorldBounds(); //colisiona con los bordes de la partida
        this.body.setBounce(0.2);

        this.jump = scene.input.keyboard.addKey(teclas.jump);
        this.left = scene.input.keyboard.addKey(teclas.left);
        this.right = scene.input.keyboard.addKey(teclas.right);

        this.vida = vida;
        this.movable = true;

        this.scena = scene;
        this.reboto = false;
    }



    preUpdate() {
        if (this.movable) {
            if (this.left.isDown) {
                this.play('left');
                this.body.setVelocityX(-300);
            }
            else if (this.right.isDown) {

                this.play('right');
                this.body.setVelocityX(300);
            }
            else {
                this.body.setVelocityX(0);
                this.play('turn');
            }

            if (this.jump.isDown && this.body.touching.down) {
                this.body.setVelocityY(-330);
            }
        }
    }

    colision(){
        this.vida -= 1;
        this.body.setVelocityX(-this.body.velocity.x);
        this.movable = false;
        this.scena.time.delayedCall(1000,() => {
            this.movable = true;
        });
    }

}