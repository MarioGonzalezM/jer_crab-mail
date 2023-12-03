
class EndScene extends Phaser.Scene {
    constructor(...args) {
        super({ key: 'EndScene', ...args })
    }
    /*buttons
    buttonMaxX = 384.5
    buttonMinX= 279.5
    buttonScenes = ['UnderConstruction','OfflineGame','UnderConstruction','OptionsMenu']*/
    preload() {
        this.load.image('pantallafin', 'Assets/EndScene/pantalla final.png');
        console.log('Pantalla cargada');

    }

    /*OnOverButton(object)
    {
        var pos = object.position.x
        console.log(pos)
        console.log("bb" + b)
        //if(button.pos<buttonMaxX)
        //button.setXY(100,100)
    }*/
    create() {
        //Add all images
        this.add.image(960, 540, 'pantallafin');
        console.log('Pantalla a�adida');
        const buttonArea = this.add.rectangle(1584, 865, 460, 180, 0x00ff00);
        buttonArea.setAlpha(0.00001);
        console.log('Bot�n creado');
        buttonArea.setInteractive();
        // Agrega un evento de clic al bot�n
        buttonArea.on('pointerdown', this.volverAlMenu, this);
        create(this.puntuacion);

    }

    volverAlMenu() {
        // Cambia a la escena del men� principal
        this.scene.sleep('EndScene');
        this.scene.start('MainMenu');
    }

    update() {

    }
}


/*var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }

    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: EndScene
};
const game = new Phaser.Game(config);*/