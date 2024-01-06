class PauseMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'PauseMenu' })
    }

    preload(){
        this.load.image('resume','Assets/PauseMenu/BotonContinuar.png')
        this.load.image('options','Assets/PauseMenu/BotonOpciones.png')
        this.load.image('exit','Assets/PauseMenu/BotonSalir.png')
        this.load.image('bg','Assets/PauseMenu/Background.png')

    }

    create(gameScene){
        //this.add.image(960,538,'bg').setScale(0.835)

        const resume = this.add.image(660, 290, 'resume').setScale(0.5);
        const options = this.add.image(1260, 490, 'options').setScale(0.5);
        const self = this;
        resume.setInteractive();
        resume.on("pointerdown",function (){
            self.scene.resume(gameScene);
            self.scene.stop()
        });
        options.setInteractive();
        options.on("pointerdown",function (){
            self.scene.launch('OptionsMenu', ['PauseMenu',gameScene]);
            self.scene.sleep();
        });
        this.events.on('wake',function () {
            try {
                let sc = this.scene.get(gameScene);
                sc.ajustarVolumen();
            }catch (e) {
                console.log("No se pudo ajustar el volumen debido a: " + e)
            }
        },this)

        let quitButton = this.add.image(660, 790, 'exit').setScale(0.5);
        quitButton.setInteractive();
        quitButton.on("pointerdown", () =>{
            this.scene.stop(gameScene);
            this.scene.start('MainMenu');
        },this)
    }

    update(){

    }
}