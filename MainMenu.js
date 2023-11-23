var config = {
    type: Phaser.AUTO,
    width: 2048,
    height: 1536,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var MainMenu = new Phaser.Game(config);

function preload()
{
    this.load.image('background', 'assets/MainMenu/FondoMP.png');
    this.load.image('post', 'assets/MainMenu/PosteMP.png');
    this.load.image('crab', 'assets/MainMenu/CangrejitoMP.png');
    this.load.spritesheet('buttons', 'assets/MainMenu/SpriteSheetBotonesMP.png', { frameWidth: 580, frameHeight: 203 });
}

var buttons;

function create()
{
    //Add all images
    this.add.image(1024, 768, 'background');
    this.add.image(1024, 768, 'post');
    this.add.image(1024, 768, 'crab');
    buttons = this.add.group({
        key: 'buttons',
        repeat: 3,
        setXY: { x: 416, y: 350, stepY: 269 }
    });
}

function update() {}
