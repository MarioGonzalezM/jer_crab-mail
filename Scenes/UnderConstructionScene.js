class UnderConstructionScene extends Phaser.Scene {
    constructor() {
        super({key: 'UnderConstruction',})
    }

    buttonTween;
    range = 5;
    preload()
    {
        this.load.image('backgroundU', 'Assets/UnderConstructionMenu/Background.png')
        this.load.image('chains', 'Assets/UnderConstructionMenu/Chains.png')
        this.load.image('foreground', 'Assets/UnderConstructionMenu/Foreground.png')
        this.load.image('return', 'Assets/UnderConstructionMenu/ReturnButton.png')
        this.load.image('shadow', 'Assets/UnderConstructionMenu/Shadow.png')
    }
    create() {
        //Add all images
        this.add.image(960, 540, 'backgroundU');
        var shadow = this.add.image(946, 470, 'shadow').setOrigin(0.5,-0.75);
        var chains = this.add.image(960, 540, 'chains');
        var button = this.add.image(946, 575, 'return').setOrigin(0.5,-1);
        this.add.image(960, 540, 'foreground');

        var scene = this;
        button.setInteractive();
        button.on("pointerdown",function (){
            scene.scene.start('MainMenu');
        });

        /**/button.on('pointerover',function ()
        {
            scene.buttonTween = scene.tweens.add({
                targets: [button, chains,shadow],
                angle: [0,-scene.range],
                duration: 1500,
                ease: 'Sine.inOut',
                repeat: 0,
            })
            scene.buttonTween.on('complete',function () {
                scene.buttonTween.stop();
                scene.buttonTween = scene.tweens.add({
                    targets: [button, chains,shadow],
                    angle: [-scene.range,scene.range],
                    duration: 3000,
                    ease: 'Sine.inOut',
                    yoyo: true,
                    repeat: -1,
                });
            })

        })
        button.on('pointerout', function ()
        {
            console.log("Out")
            scene.buttonTween.stop();
            scene.tweens.add({
                targets: [button, chains, shadow],
                angle: [button.angle, 0],
                duration: 800,
                ease: 'Sine.inOut',
                yoyo: false,
                repeat: 0
            });
        })//*/
    }
}