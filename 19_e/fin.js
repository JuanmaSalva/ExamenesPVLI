export default class Fin extends Phaser.Scene {
    constructor() {
        super({ key: 'end' });
    }

    preLoad() {

    }

    create(){
        this.add.text(50,50,'HAS PERDIDO PAQUETE');
    }

}