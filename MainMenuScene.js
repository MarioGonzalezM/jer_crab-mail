
class MainMenuScene extends Phaser.Scene{
    buttons
    buttonMaxX = 414.5
    buttonMinX= 309.5
    buttonScenes = ['movement']
    preload()
    {
        this.load.image('background', 'assets/MainMenu/FondoMP.png');
        this.load.image('post', 'assets/MainMenu/PosteMP.png');
        this.load.image('gameLogo', 'assets/MainMenu/GameLogoMP.png');
        this.load.spritesheet('buttons', 'assets/MainMenu/SpriteSheetBotonesMP.png', { frameWidth: 619, frameHeight: 239 });

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
        this.add.image(990, 540, 'background');
        this.add.image(990, 540, 'gameLogo');
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
            let link = scene.buttonScenes[child.currentFrame];
            child.setInteractive();
            if(link !=  null) child.on("onmousedown",function (){
                scene.scene.start(link);
            })
            child.on('pointerover',function ()
            {
                if(this.x - scene.buttonMinX < 0.1)
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
        this.add.image(990, 540, 'post');
    }

    update() {}
}


var config = {
    type: Phaser.AUTO,
    width: 1980,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }

    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainMenuScene]
};
const game = new Phaser.Game(config);



