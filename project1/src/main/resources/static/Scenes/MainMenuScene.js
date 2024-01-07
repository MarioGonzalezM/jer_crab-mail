

class MainMenuScene extends Phaser.Scene{
    constructor( ...args ) {
        super({ key: 'MainMenu', ...args })
    }
    //Botones
    buttons
    buttonMaxX = 384.5
    buttonMinX= 279.5
    buttonScenes = ['Chat', 'OfflineGame', 'Perfil', 'OptionsMenu', 'TutorialCartas', 'TutorialPaquetes']
   //Sonidos
    sonidoFondo
    sonidoBoton
    sonidoMeme
    fondoMeme
    fondoNegro
    botonSalir
    gaviota
    tutorial
    
    preload()
    {
        //this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        this.load.image('background', 'Assets/MainMenu/FondoMP.png');
        this.load.image('post', 'Assets/MainMenu/PosteMP.png');
        this.load.image('gameLogo', 'Assets/MainMenu/GameLogoMP.png');
        this.load.image('crabMail2', 'Assets/crabMail2.png');
        this.load.image('negro', 'Assets/ne.png');
        this.load.image('salirMeme', 'Assets/salirMeme.png');
        this.load.image('gaviota', 'Assets/gaviota.png');
        this.load.image('tutorial', 'Assets/Tutorial/TUTORIAL.png');
        
        this.load.spritesheet('buttons', 'Assets/MainMenu/SpriteSheetBotonesMP.png', { frameWidth: 700, frameHeight: 239 });
        this.load.audio('sonidoBoton', ['Sounds/botones.mp3']);
        this.load.audio('fondoSonido', ['Sounds/fondo.mp3']);
        this.load.audio('meme', ['Sounds/megalovania.mp3']);
    }


    create()
    {

        this.input.keyboard.removeAllListeners()
        this.input.keyboard.removeAllKeys()

        this.sonidoFondo = this.sound.add('fondoSonido');
        this.sonidoFondo.loop = true;
        this.sonidoFondo.setVolume(dataSettings.master *dataSettings.music/10000.0)
        this.sonidoFondo.play();

		this.sonidoMeme = this.sound.add('meme');
		this.sonidoMeme.loop = true;
        this.sonidoMeme.setVolume(dataSettings.master *dataSettings.music/10000.0)
		


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
        
        this.gaviota = this.add.image(1360, 950, 'gaviota');
        this.gaviota.setScale(0.5)

        this.tutorial = this.add.image(1400, 750, 'tutorial');
        this.tutorial.setScale(0.8)

        
        this.gaviota.setInteractive();
        this.gaviota.on('pointerdown', function() {
			this.sonidoFondo.stop();
			this.sonidoBoton.play();
			this.scene.start('TutorialCartas');
   		},this);
        
        
        this.fondoNegro = this.add.image(960, 540, 'negro');
		this.fondoNegro.setScale(3.0,3.0);
		this.fondoNegro.visible = false;
		
		this.fondoMeme = this.add.image(960, 540, 'crabMail2');
		this.fondoMeme.setScale(0.8,0.4);
		this.fondoMeme.visible = false;
		
		this.botonSalir = this.add.image(200, 140, 'salirMeme');
		this.botonSalir.setScale(0.2,0.2);
		this.botonSalir.visible = false;
		
		this.botonSalir.on('pointerup', function() {
        this.fondoNegro.visible = false;
        this.fondoMeme.visible = false;
        this.botonSalir.visible = false;
        
        this.buttons.children.iterate(function (child) {
			 child.setInteractive();
		});
        
        this.sonidoFondo.play();
        this.sonidoMeme.stop();
   		},this);
		
		var combo = this.input.keyboard.createCombo('CRAB');
        this.input.keyboard.on('keycombomatch', function (event) {
        console.log('Combo de teclas detectado: ' + event.keyCodes);
        this.sonidoFondo.stop();
        this.fondoNegro.visible = true;
        this.fondoMeme.visible = true;
        this.botonSalir.visible = true;
        this.buttons.children.iterate(function (child) {
			 child.disableInteractive();
		});
        this.sonidoMeme.play();
        this.botonSalir.setInteractive();
    	},this);
    	
    	
        
    }

    update() {
		
        this.sonidoFondo.setVolume(dataSettings.master *dataSettings.music/10000.0)
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
    scene: [MainMenuScene, OnlineGame, Perfil, OfflineGame , TutorialCartas, TutorialPaquetes, PauseMenu, OptionsMenu, EndScene, Chat,DisconnectionScene],

};
const game = new Phaser.Game(config);






