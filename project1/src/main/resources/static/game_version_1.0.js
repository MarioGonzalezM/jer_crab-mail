
  // Definición de la configuración del juego
  const config = {
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
    scene: {
      preload: preload,
      create: create,
      update: update,
      }


   
  };

  // Inicialización del juego
    const game = new Phaser.Game(config);

  // Variables
    var personaje;
    var fondo;
    var impresora;

    function maquina(tipo) {
        this.tipo = tipo;
    }

 
  function preload() {
      this.load.image('personaje', 'Assets/cangrejo.png');
      this.load.image('fondo', 'Assets/fondoPlaya.png');
      this.load.image('impresora', 'Assets/Impresora.png');
  }

  
  function create() {
         // Agregar el fondo al juego
         fondo = this.add.image(960, 540, 'fondo');

      // Añado la impresora
      var tipo = 'Espera';
      impresora = new maquina(tipo);

      impresora = this.physics.add.image(400, 400, 'impresora').setScale(0.07);
      impresora.angle = -90;

        // Agregar personaje al juego
      personaje = this.physics.add.image(400, 600, 'personaje').setScale(0.4);

        // Configuración de las colisiones para que el personaje no se salga del mundo
      personaje.setCollideWorldBounds(true);

      
;  }

   
function update() {
    impresora.setSize(2300, 3000);
    impresora.setOffset(1400, 900)

    // Control del personaje
    const cursors = this.input.keyboard.createCursorKeys();
    const teclaA = this.input.keyboard.addKey('A');
    const teclaD = this.input.keyboard.addKey('D');
    const teclaW = this.input.keyboard.addKey('W');
    const teclaS = this.input.keyboard.addKey('S');
    const teclaE = this.input.keyboard.addKey('E');

    // Control de la rotación
    if (teclaA.isDown) {
        personaje.setAngularVelocity(-200);

    } else if (teclaD.isDown) {
        personaje.setAngularVelocity(200);

    } else {
        personaje.setAngularVelocity(0);
    }

    // Control del movimiento
    if (teclaW.isDown) {
        // Avanzar hacia adelante
        this.physics.velocityFromRotation(personaje.rotation, 250, personaje.body.velocity);
    }
    else if (teclaS.isDown) {
        // Retroceder
        this.physics.velocityFromRotation(personaje.rotation + Math.PI, 250, personaje.body.velocity);
    }
    else {
        // Detenerse si no se presionan las teclas de dirección
        personaje.setVelocity(0);
    }

    if (teclaE.isDown) {
    }
      
  }
