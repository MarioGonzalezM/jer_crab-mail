
class MainMenuScene extends Phaser.Scene{
    constructor( ...args ) {
        super({ key: 'MainMenu', ...args })
    }
    buttons
    buttonMaxX = 384.5
    buttonMinX= 279.5
    buttonScenes = ['UnderConstruction','Test','UnderConstruction','UnderConstruction']
    preload()
    {
        this.load.image('background', 'Assets/MainMenu/FondoMP.png');
        this.load.image('post', 'Assets/MainMenu/PosteMP.png');
        this.load.image('gameLogo', 'Assets/MainMenu/GameLogoMP.png');
        this.load.spritesheet('buttons', 'Assets/MainMenu/SpriteSheetBotonesMP.png', { frameWidth: 700, frameHeight: 239 });

    }

    OnOverButton(object)
    {
        var pos = object.position.x
        console.log(pos)
        console.log("bb" + b)
        //if(button.pos<buttonMaxX)
        //button.setXY(100,100)
    }
    create()
    {
        //Add all images
        this.add.image(960, 540, 'background');
        this.add.image(960, 540, 'gameLogo');
        /**/this.buttons = this.add.group({
            key: 'buttons',
            frame: [ 3,2,1,0 ],
            //repeat: 3,
            //(1080/2 + 239*2)A - (239/2)B
            //Part A is to find the point where there origin should be and part B is to center it (the position of a sprite is
            //situated on it's center
            setXY: { x: this.buttonMinX, y: 898.5, stepY: -239 }
        });//*/
        var scene = this;
        this.buttons.children.iterate(function (child) {
            let link = scene.buttonScenes[child.frame.name];
            child.setInteractive();
            if(typeof link !==  "undefined") child.on("pointerdown",function (){
                console.log(link)
                scene.scene.start(link);
            });
            child.on('pointerover',function ()
            {

                scene.tweens.add({
                    targets: child,
                    x: scene.buttonMaxX,
                    duration: 200,
                    repeat: 0,
                    //hold: 500,
                    //repeatDelay: 500,
                    ease: 'linear'
                });
            })
            child.on('pointerout',function ()
            {

                    scene.tweens.add({
                        targets: child,
                        x: scene.buttonMinX,
                        duration: 200,
                        repeat: 0,
                        //hold: 500,
                        //repeatDelay: 500,
                        ease: 'linear'
                    });
            })

        });

        //We want the buttons to be partially hidden behind the post
        this.add.image(960, 540, 'post');
    }

    update() {}
}


var config = {
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
    scene: [MainMenuScene, Movement, UnderConstructionScene]
};
const game = new Phaser.Game(config);



