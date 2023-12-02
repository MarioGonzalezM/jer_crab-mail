class PauseMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'PauseMenu' })
    }

    preload(){
        this.load.image('resume','Assets/PauseMenu/BotonContinuar.png')
        this.load.image('options','Assets/PauseMenu/BotonOpciones.png')
    }

    create(gameScene){
        const resume = this.add.image(660, 440, 'resume').setScale(0.5);
        const options = this.add.image(1260, 640, 'options').setScale(0.5);
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
    }

    update(){

    }
}