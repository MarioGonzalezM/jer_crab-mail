class Juego extends Phaser.Scene {


    barrita;

    preload() {
        
        this.load.spritesheet('carga', 'assets/carga.png', { frameWidth: 32, frameHeight: 32 });

    }

    create() {


        this.barrita = this.physics.add.sprite(500, 500, 'carga');

        this.anims.create({
            key: 'barra',
            frames: this.anims.generateFrameNumbers('carga', { start: 0, end: 16 }),
            frameRate: 20 //define la velocidad de completar la barra                
        });

        
        
    }


    update() {
    
        const teclaR = this.input.keyboard.addKey('R');

        if (teclaR.isDown) {

            this.barrita.anims.play('barra');

        }

       

    }
   

}