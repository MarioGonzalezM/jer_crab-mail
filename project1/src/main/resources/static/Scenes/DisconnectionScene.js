
class DisconnectionScene extends Phaser.Scene {

    constructor() {
        super({key: 'DisconnectedScreen'})
    }
    preload(){
        this.load.image('sign', 'Assets/Disconnection/desconectado.png');
        this.load.image('fondoRojo', 'Assets/Disconnection/fondoRojo.png');
    }
    create(data){
        this.add.image(960, 540, 'fondoRojo');
        this.add.image(960, 540, 'sign');
        this.input.keyboard.on("keydown", (event)=>{
            this.scene.stop(data[0])
            this.input.keyboard.removeAllListeners()
            this.scene.start('MainMenu');
            //self.scene.pause();
        });
    }
    update(){}
}