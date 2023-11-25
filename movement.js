
class movement extends Phaser.Scene {
  constructor( ) {
    super({ key: 'test'})
  }
  // Variables
  personaje;

  // Precarga de recursos
  preload() {
    this.load.image('personaje', 'Assets/star.png');
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

      this.personaje.setAngularVelocity(-150);

    } else if (teclaD.isDown) {
      this.personaje.setAngularVelocity(150);

    } else {
      this.personaje.setAngularVelocity(0);
    }

    // Control del movimiento
    if (teclaW.isDown) {
      // Avanzar hacia adelante
      this.physics.velocityFromRotation(this.personaje.rotation, 200, this.personaje.body.velocity);
    } else if (teclaS.isDown) {
      // Retroceder
      this.physics.velocityFromRotation(this.personaje.rotation + Math.PI, 200, this.personaje.body.velocity);
    } else {
      // Detenerse si no se presionan las teclas de dirección
      this.personaje.setVelocity(0);
    }

  }
}

