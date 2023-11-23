
  // Definición de la configuración del juego
  const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  // Inicialización del juego
    const game = new Phaser.Game(config);

  // Variables
    var personaje;
    var fondo;

 
  function preload() {
      this.load.image('personaje', 'Assets/cangrejo.png');
      this.load.image('fondo', 'Assets/fondoPlaya.png');
  }

  
  function create() {
         // Agregar el fondo al juego
         fondo = this.add.image(960, 540, 'fondo');
      
        // Agregar personaje al juego
      personaje = this.physics.add.image(400, 600, 'personaje').setScale(0.1);

        // Configuración de las colisiones para que el personaje no se salga del mundo
        personaje.setCollideWorldBounds(true);

  }

   
  function update() {
    // Control del personaje
    const cursors = this.input.keyboard.createCursorKeys();
    const teclaA = this.input.keyboard.addKey('A');
    const teclaD = this.input.keyboard.addKey('D');
    const teclaW = this.input.keyboard.addKey('W');
    const teclaS = this.input.keyboard.addKey('S');

    // Control de la rotación
    if (teclaA.isDown) {
        
        personaje.setAngularVelocity(-150);
        
    } else if (teclaD.isDown) {
        personaje.setAngularVelocity(150);
        
    } else {
      personaje.setAngularVelocity(0);
    }

    // Control del movimiento
    if (teclaW.isDown) {
      // Avanzar hacia adelante
      this.physics.velocityFromRotation(personaje.rotation, 200, personaje.body.velocity);
      }
     else if (teclaS.isDown) {
      // Retroceder
      this.physics.velocityFromRotation(personaje.rotation + Math.PI, 200, personaje.body.velocity);
      }
    else {
      // Detenerse si no se presionan las teclas de dirección
          personaje.setVelocity(0);
      } 
      
  }
