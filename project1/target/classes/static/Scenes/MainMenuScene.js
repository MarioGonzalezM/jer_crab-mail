
class MainMenuScene extends Phaser.Scene{
    constructor( ...args ) {
        super({ key: 'MainMenu', ...args })
    }
    //Botones
    buttons
    buttonMaxX = 384.5
    buttonMinX= 279.5
    buttonScenes = ['UnderConstruction', 'OfflineGame', 'Perfil', 'OptionsMenu']
   //Sonidos
    sonidoFondo
    sonidoBoton
    preload()
    {
        //this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        this.load.image('background', 'Assets/MainMenu/FondoMP.png');
        this.load.image('post', 'Assets/MainMenu/PosteMP.png');
        this.load.image('gameLogo', 'Assets/MainMenu/GameLogoMP.png');
        this.load.spritesheet('buttons', 'Assets/MainMenu/SpriteSheetBotonesMP.png', { frameWidth: 700, frameHeight: 239 });
        this.load.audio('sonidoBoton', ['Sounds/botones.mp3']);
        this.load.audio('fondoSonido', ['Sounds/fondo.mp3']);
    }


    create()
    {
        this.sonidoFondo = this.sound.add('fondoSonido');

        this.sonidoFondo.loop = true;
        this.sonidoFondo.setVolume(dataSettings.master *dataSettings.music/10000.0)
        this.sonidoFondo.play();

        //Add all images
        this.add.image(960, 540, 'background');
        this.add.image(960, 540, 'gameLogo');
        this.sonidoBoton = this.sound.add('sonidoBoton');
        this.sonidoBoton.setVolume(dataSettings.master *dataSettings.sfx/10000.0);

        /**/this.buttons = this.add.group({
            key: 'buttons',
            frame: [ 3,2,1,0 ],
            //repeat: 3,
            //(1080/2 + 239*2)A - (239/2)B
            //Part A is to find the point where there origin should be and part B is to center it (the position of a sprite is
            //situated on it's center
            setXY: { x: this.buttonMinX, y: 898.5, stepY: -239 }
        });//*/
        let scene = this;
        this.buttons.children.iterate(function (child) {
            let link = scene.buttonScenes[child.frame.name];
            child.setInteractive();

            if(typeof link !==  "undefined") child.on("pointerdown",function (){

                scene.sonidoFondo.stop();
                scene.sonidoBoton.play();
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

    update() {
        this.sonidoFondo.setVolume(dataSettings.master *dataSettings.music/10000.0)
        console.log(dataSettings.master *dataSettings.music/10000.0)
        this.sonidoBoton.setVolume(dataSettings.master *dataSettings.sfx/10000.0);

    }
}

let divId = document.getElementById("gameDiv");
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'gameDiv',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }

    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    scene: [MainMenuScene, OfflineGame, Perfil, OptionsMenu, PauseMenu, EndScene],

};
const game = new Phaser.Game(config);



