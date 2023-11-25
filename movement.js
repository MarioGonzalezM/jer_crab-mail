
class movement extends Phaser.Scene {
  // Variables
  personaje;

  // Precarga de recursos
  preload() {
    this.load.image('personaje', 'personaje.jpg');
  }

  // Creación de elementos del juego
  create() {
    // Agregar el personaje al juego
    this.personaje = this.physics.add.image(400, 300, 'personaje');

    // Configuración de las colisiones para que no se salga del mundo
    this.personaje.setCollideWorldBounds(true);

  }

  // Actualización del juego
  update() {
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

