
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
        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


function preload()
{
    this.load.image('background', 'assets/MainMenu/FondoMP.png');
    this.load.image('post', 'assets/MainMenu/PosteMP.png');
    this.load.image('gameLogo', 'assets/MainMenu/GameLogoMP.png');
    this.load.spritesheet('buttons', 'assets/MainMenu/SpriteSheetBotonesMP.png', { frameWidth: 619, frameHeight: 239 });
}

var buttons;
var buttonMinX = 309.5
var buttonMaxX = 414.5
function OnOverButton(object)
{
    var pos = object.position.x
    console.log(pos)
    console.log("bb" + b)
    //if(button.pos<buttonMaxX)
    //button.setXY(100,100)
}
function create()
{
    //Add all images
    this.add.image(990, 540, 'background');
    this.add.image(990, 540, 'gameLogo');
    buttons = this.add.group({
        key: 'buttons',
        repeat: 3,
        //(1080/2 + 239*2)A - (239/2)B
        //Part A is to find the point where there origin should be and part B is to center it (the position of a sprite is
        //situated on it's center
        setXY: { x: buttonMinX, y: 898.5, stepY: -239 }
    });
    buttons.children.iterate(function (child) {
        child.setInteractive();

        child.on('pointerover',function ()
        {
            this.setTint(Math.random() * 16000000);
            MainMenu.tweens.add({
            targets: this,
            x: 700,
            duration: 2000,
            repeat: -1,
            hold: 500,
            repeatDelay: 500,
            ease: 'linear'
        });
        })

    });

    //We want the buttons to be partially hidden behind the post
    this.add.image(990, 540, 'post');
}

function update() {}
