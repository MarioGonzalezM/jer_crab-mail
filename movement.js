class Movement extends Phaser.Scene {
  constructor( ) {
    super({ key: 'Test' })
  }
  // Variables
  personaje;

  // Precarga de recursos

  preload() {
    this.load.image('personaje', 'Assets/Personajes/default/cangrejo_f1.png');
  }

  // Creación de elementos del juego

  create() {
    // Agregar el personaje al juego
    this.personaje = this.physics.add.image(960, 540, 'personaje');

    // Configuración de las colisiones para que no se salga del mundo
    this.personaje.setCollideWorldBounds(true);

    const self = this;
    this.input.keyboard.on("keydown-P", function (event){
      console.log("Paused")
      self.scene.launch('PauseMenu', 'Test')
      self.scene.pause();

    });
  }

  // Actualización del juego

  update() {
    var personaje = this.personaje;
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
    } else if (teclaS.isDown) {
      // Retroceder
      this.physics.velocityFromRotation(personaje.rotation + Math.PI, 200, personaje.body.velocity);
    } else {
      // Detenerse si no se presionan las teclas de dirección
      personaje.setVelocity(0);
    }

  }
}

