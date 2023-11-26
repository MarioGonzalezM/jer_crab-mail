
  // Definición de la configuración del juego
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
  let personaje;

  // Precarga de recursos
  function preload() {
    this.load.image('personaje', 'Assets/cangrejo.png');
  }

  // Creación de elementos del juego
  function create() {
    // Agregar el personaje al juego
    personaje = this.physics.add.image(400, 300, 'personaje');

    // Configuración de las colisiones para que no se salga del mundo
    personaje.setCollideWorldBounds(true);

  }

  // Actualización del juego 
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


