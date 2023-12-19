class PauseMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'PauseMenu' })
    }

    preload(){
        this.load.image('resume','Assets/PauseMenu/BotonContinuar.png')
        this.load.image('options','Assets/PauseMenu/BotonOpciones.png')
    }

    create(gameScene){
        //this.quitButton.on("pointerdown",function () {
        //    if(typeof gameScene === "string"){
        //        this.scene.stop(prevScene);
        //        this.scene.stop(gameScene);
        //    }
        //    this.scene.start('MainMenu');
        //},this)

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
        this.events.on('wake',function () {
            try {
                let sc = this.scene.get(gameScene);
                sc.ajustarVolumen();
            }catch (e) {
                console.log("No se pudo ajustar el volumen debido a: " + e)
            }
        },this)
    }

    update(){

    }
}