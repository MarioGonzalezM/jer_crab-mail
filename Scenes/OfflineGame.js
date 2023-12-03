function Maquina(nombre, tipo, orientacion, imagen, collider) {
    this.nombre = nombre
    this.tipo = tipo;
    this.orientacion = orientacion;
    this.imagen = imagen;
    this.collider = collider;
    this.interactuable = false;
}

// Prototipos objetos
function Objeto(nombre, peso) {
    this.nombre = nombre;
    this.impresa = false;
    this.sobre = false;
    this.peso = peso;
    this.empaquetado = false;
    this.direccion = false;
    this.sello = undefined;
}





class OfflineGame extends Phaser.Scene {

    constructor( ) {
        super({ key: 'OfflineGame' })
    }

    width = 1920;
    height = 1080;


    // Variables
    personaje = {
        t: false
    };

    personaje2 = {
        t: false
    };


    fondo;
    star;
    objetos;
    objetosCinta;
    arrayObjetosCinta;
    currentSpritesheet = 'personaje';

    // Variables maquinas
    maquinas;
    numMaquinas;

    impresora;
    bascula;
    buzonCartas;
    buzonPaquetes;
    cajaSobres;
    mesaSellos;
    reciclado;
    papelera;
    ordenador;
    cinta;
    empaquetado;

    // Variables mesas
    mesaArriba1;
    mesaArriba2;
    mesaArriba3;

    mesaAbajo1;
    mesaAbajo2;
    mesaAbajo3;

    mesaIzq1;
    mesaIzq2;

    mesaDcha1;
    mesaDcha2;

    mesaCentral1;
    mesaCentral2;

    // Contadores
    contadorImpresora;
    contadorEmpaquetado;

    //Barras de carga
    barraImpresora;
    barraEmpaquetado;

    //Sonidos
    sonidoImpresora;
    sonidoBuzones;
    sonidoReinicio;
    sonidoPapelera;
    sonidoOrdenador;
    sonidoCaja;
    sonidoSellos;
    sonidoEmpaquetado;
    sonidoFondo;
    sonidoFondoRapido;
    sonidoAlarma;


    pesado;
    puntuacion;
    textoPuntuacion;
    tiempoJuego;
    tiempoTranscurrido;
    texto;


    preload() {
        //Sprites sin objetos
        //#region REGION SPRITESHEET
        this.load.spritesheet('personaje', 'Assets/spritesheet_crab.png',
            { frameWidth: 470, frameHeight: 538 }
        );

        this.load.spritesheet('personaje2', 'Assets/spritesheet_crab2.png',
            { frameWidth: 482, frameHeight: 555 }
        );

        //Sprites cangrejo carta / cangrejo papel blanco
        this.load.spritesheet('cangrejo_carta', 'Assets/Personajes/carta/spritesheet_crabc.png',
            { frameWidth: 532, frameHeight: 555 } //EL SPRITE DEL CANGREJO CON LA CARTA Y CON EL FOLIO EN BLANCO ES EL MISMO!!!
        );

        this.load.spritesheet('cangrejo2_carta', 'Assets/Personajes/carta/spritesheet_crab2c.png',
            { frameWidth: 532, frameHeight: 555 } //EL SPRITE DEL CANGREJO CON LA CARTA Y CON EL FOLIO EN BLANCO ES EL MISMO!!!
        );

        //Sprites cangrejo carta con la dirección
        this.load.spritesheet('cangrejo_carta_dir', 'Assets/Personajes/carta_dir/spritesheet_crabcdir.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        this.load.spritesheet('cangrejo2_carta_dir', 'Assets/Personajes/carta_dir/spritesheet_crab2cdir.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        //Sprites cangrejo con carta con sello
        this.load.spritesheet('cangrejo_carta_sello', 'Assets/Personajes/carta_sello/spritesheet_crabcartasello.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        this.load.spritesheet('cangrejo2_carta_sello', 'Assets/Personajes/carta_sello/spritesheet_crab2cartasello.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        //Sprites cangrejo carta con dirección y sello
        this.load.spritesheet('cangrejo_carta_dir_sello', 'Assets/Personajes/carta_dir_sello/spritesheet_crabcdirsello.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        this.load.spritesheet('cangrejo2_carta_dir_sello', 'Assets/Personajes/carta_dir_sello/spritesheet_crab2cdirsello.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        //Sprites cangrejo con papel escrito
        this.load.spritesheet('cangrejo_papel_escrito', 'Assets/Personajes/papel_escrito/spritesheet_papelescrito.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        this.load.spritesheet('cangrejo2_papel_escrito', 'Assets/Personajes/papel_escrito/spritesheet_papelescrito2.png',
            { frameWidth: 532, frameHeight: 555 }
        );

        //Sprites cangrejo con el paquete
        this.load.spritesheet('cangrejo_caja', 'Assets/Personajes/paquete/spritesheet_cangrejocaja.png',
            { frameWidth: 614, frameHeight: 523 }
        );

        this.load.spritesheet('cangrejo2_caja', 'Assets/Personajes/paquete/spritesheet_cangrejo2caja.png',
            { frameWidth: 614, frameHeight: 523 }
        );

        //Sprites cangrejo con el paquete con dirección
        this.load.spritesheet('cangrejo_caja_dir', 'Assets/Personajes/paquete_dir/spritesheet_crabcajadir.png',
            { frameWidth: 614, frameHeight: 523 }
        );

        this.load.spritesheet('cangrejo2_caja_dir', 'Assets/Personajes/paquete_dir/spritesheet_crab2cajadir.png',
            { frameWidth: 614, frameHeight: 523 }
        );

        //Sprites cangrejo con el paquete con sello
        this.load.spritesheet('cangrejo_caja_sello', 'Assets/Personajes/paquete_sello/spritesheet_crabcajasello.png',
            { frameWidth: 614, frameHeight: 523 }
        );
        this.load.spritesheet('cangrejo2_caja_sello', 'Assets/Personajes/paquete_sello/spritesheet_crab2cajasello.png',
            { frameWidth: 614, frameHeight: 523 }
        );
        //Sprites cangrejo con el paquete con dirección y sello
        this.load.spritesheet('cangrejo_caja_dir_sello', 'Assets/Personajes/paquete_dir_sello/spritesheet_crabcajadirsello.png',
            { frameWidth: 614, frameHeight: 523 }
        );

        this.load.spritesheet('cangrejo2_caja_dir_sello', 'Assets/Personajes/paquete_dir_sello/spritesheet_crab2cajadirsello.png',
            { frameWidth: 614, frameHeight: 523 }
        );
        //#endregion

        //this.load.image('personaje2', 'Assets/Personajes/crab2 prueba.png');   esto era la prueba pero el cangrejo 2 sin animar
        this.load.image('fondo', 'Assets/playaGrande.png');
        this.load.image('star', 'Assets/star.png');//objeto temporal
        this.load.image('impresora', 'Assets/Impresora/Impresora1.png');
        this.load.image('impresora2', 'Assets/Impresora/Impresora2.png');
        this.load.image('bascula', 'Assets/Bascula/bascula.png');
        this.load.image('buzonCartas', 'Assets/Buzon cartas/Buzon1.png');
        this.load.image('buzonPaquetes', 'Assets/Buzon paquetes/Buzon paquetes.png');
        this.load.image('cajaSobres', 'Assets/Caja sobres/caja.png');
        this.load.image('mesaSellos', 'Assets/Mesa sellos/mesa.png');
        this.load.image('reciclado', 'Assets/Estacion reciclado/reciclado.png');
        this.load.image('papelera', 'Assets/Papelera/Papelera.png');
        this.load.image('ordenador', 'Assets/Ordenador/ordenador.png');
        this.load.image('cinta', 'Assets/Cinta/Cinta.png');
        this.load.image('empaquetado', 'Assets/Empaquetado/Empaquetado.png');

        this.load.image('mesa', 'Assets/mesa.png');
        this.load.image('mesacentral', 'Assets/mesaesquina.png');


        this.load.spritesheet('carga', 'assets/carga.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('paquete', 'Assets/Buzon paquetes/Paquete.png', { frameWidth: 32, frameHeight: 32 });

        //Objetos
        this.load.image('mancuerna', 'Assets/Objetos/mancuerna.png');
        this.load.image('ps5', 'Assets/Objetos/Play.png');
        this.load.image('ps5Game', 'Assets/Objetos/ps5Game.png');
        this.load.image('yunque', 'Assets/Objetos/yunque.png');


        // Sonidos
        this.load.audio('impresora', ['Sounds/impresoraSonido.mp3']);
        this.load.audio('buzones', ['Sounds/sonidoBuzones.mp3']);
        this.load.audio('reinicio', ['Sounds/reinicioSonido.mp3']);
        this.load.audio('papelera', ['Sounds/papeleraSonido.mp3']);
        this.load.audio('ordenador', ['Sounds/ordenadorSonido.mp3']);
        this.load.audio('caja', ['Sounds/cajaSonido.mp3']);
        this.load.audio('sellos', ['Sounds/sonidoSellos.mp3']);
        this.load.audio('empaquetado', ['Sounds/empaquetadoSonido.mp3']);

        this.load.audio('fondoSonido', ['Sounds/lento.mp3']);
        this.load.audio('fondoSonidoRapido', ['Sounds/rapido.mp3']);
        this.load.audio('sonidoAlarma', ['Sounds/alarma.mp3']);


    }

    create() {

        this.arrayObjetosCinta = ["yunque", "mancuerna",'ps5', 'ps5Game'];//ids de los objetos que salen de la cinta

        //Code to pause the menu
        let self = this;
        this.input.keyboard.on("keydown-P", function (event){
            console.log("Paused")
            self.scene.launch('PauseMenu', 'OfflineGame')
            self.scene.pause();
        });

        this.scale.displaySize.setAspectRatio(this.width / this.height);
        this.scale.refresh();

        this.fondo = this.add.image(960, 540, 'fondo');//Fondo

        //////////////////////////////////////////////////////
        ///////////AÑADO LAS MAQUINAS Y LAS MESAS////////////

        this.maquinas = [];
        this.numMaquinas = 0;
        this.puntuacion = 0;

        // MESAS
        // Agregamos las mesas
        //#region REGION MESAS
        this.mesaArriba1 = this.physics.add.image(420, 75, 'mesa').setScale(0.2).setImmovable();
        this.mesaArriba1.scaleX = 0.5;
        this.mesaArriba1.setSize(1035, 220);
        this.mesaArriba1.setOffset(240, 180);

        this.mesaArriba2 = this.physics.add.image(935, 75, 'mesa').setScale(0.2).setImmovable();
        this.mesaArriba2.scaleX = 0.5;
        this.mesaArriba2.setSize(1035, 220);
        this.mesaArriba2.setOffset(240, 180);

        this.mesaArriba3 = this.physics.add.image(1450, 75, 'mesa').setScale(0.2).setImmovable();
        this.mesaArriba3.scaleX = 0.5;
        this.mesaArriba3.setSize(1035, 220);
        this.mesaArriba3.setOffset(240, 180);

        this.mesaAbajo1 = this.physics.add.image(420, 880, 'mesa').setScale(0.2).setImmovable();
        this.mesaAbajo1.scaleX = 0.5;
        this.mesaAbajo1.setSize(1035, 220);
        this.mesaAbajo1.setOffset(240, 180);

        this.mesaAbajo2 = this.physics.add.image(935, 880, 'mesa').setScale(0.2).setImmovable();
        this.mesaAbajo2.scaleX = 0.5;
        this.mesaAbajo2.setSize(1035, 220);
        this.mesaAbajo2.setOffset(240, 180);

        this.mesaAbajo3 = this.physics.add.image(1450, 880, 'mesa').setScale(0.2).setImmovable();
        this.mesaAbajo3.scaleX = 0.5;
        this.mesaAbajo3.setSize(1035, 220);
        this.mesaAbajo3.setOffset(240, 180);

        this.mesaIzq1 = this.physics.add.image(140, 312, 'mesa').setScale(0.2).setImmovable();
        this.mesaIzq1.scaleX = 0.5;
        this.mesaIzq1.rotation = -Math.PI / 2;
        this.mesaIzq1.setSize(75, 2570);
        this.mesaIzq1.setOffset(720, -1000);

        this.mesaIzq2 = this.physics.add.image(140, 643, 'mesa').setScale(0.2).setImmovable();
        this.mesaIzq2.scaleX = 0.5;
        this.mesaIzq2.rotation = -Math.PI / 2;
        this.mesaIzq2.setSize(75, 2570);
        this.mesaIzq2.setOffset(720, -1000);

        this.mesaDcha1 = this.physics.add.image(1725, 312, 'mesa').setScale(0.2).setImmovable();
        this.mesaDcha1.scaleX = 0.5;
        this.mesaDcha1.rotation = -Math.PI / 2;
        this.mesaDcha1.setSize(75, 2570);
        this.mesaDcha1.setOffset(720, -1000);

        this.mesaDcha2 = this.physics.add.image(1725, 643, 'mesa').setScale(0.2).setImmovable();
        this.mesaDcha2.scaleX = 0.5;
        this.mesaDcha2.rotation = -Math.PI / 2;
        this.mesaDcha2.setSize(75, 2570);
        this.mesaDcha2.setOffset(720, -1000);

        // Agregamos las mesas centrales
        this.mesaCentral1 = this.physics.add.image(1050, 395, 'mesacentral').setScale(0.35).setImmovable();
        this.mesaCentral1.rotation = Math.PI / 2;
        this.mesaCentral1.setSize(1200, 220);
        this.mesaCentral1.setOffset(-290, 340);
        this.mesaCentral1.colliderExtra = this.physics.add.image(1182, 415).setImmovable();
        this.mesaCentral1.colliderExtra.setSize(77, 172);

        this.mesaCentral2 = this.physics.add.image(850, 555, 'mesacentral').setScale(0.35).setImmovable();
        this.mesaCentral2.rotation = -Math.PI / 2;
        this.mesaCentral2.setSize(1200, 220);
        this.mesaCentral2.setOffset(-70, 859);
        this.mesaCentral2.colliderExtra = this.physics.add.image(718, 535).setImmovable();
        this.mesaCentral2.colliderExtra.setSize(77, 172);
        //#endregion

        //#region REGION MAQUINAS

        // Agregamos el buzon de cartas
        this.buzonCartas = new Maquina("buzon cartas", "interaccion", -1, this.physics.add.image(267, 767, 'buzonCartas').setScale(0.08).setImmovable(), this.physics.add.image(252, 765).setScale(1, 4.7));
        this.buzonCartas.imagen.setSize(1020, 2350);
        this.buzonCartas.imagen.setOffset(400, 70);
        Phaser.Utils.Array.Add(this.maquinas, this.buzonCartas);
        this.numMaquinas++;
        this.buzonCartas.estado = "cerrado"; // 2 posibles estados: cerrado y abierto

        // Agregamos el buzon de los paquetes
        this.buzonPaquetes = new Maquina("buzon paquetes", "interaccion", 1, this.physics.add.image(1600, 767, 'buzonPaquetes').setScale(0.08).setImmovable(), this.physics.add.image(1615, 765).setScale(1, 4.7));
        this.buzonPaquetes.imagen.setSize(1020, 2350);
        this.buzonPaquetes.imagen.setOffset(2100, 70);
        this.buzonPaquetes.imagen.rotation = Math.PI;
        Phaser.Utils.Array.Add(this.maquinas, this.buzonPaquetes);
        this.numMaquinas++;


        // Agregamos la caja de sobres
        this.cajaSobres = new Maquina("caja sobres", "interaccion", 1, this.physics.add.image(320, 400, 'cajaSobres').setScale(0.07).setImmovable(), this.physics.add.image(300, 407).setScale(0.9, 4));
        this.cajaSobres.imagen.setSize(2020, 1850);
        this.cajaSobres.imagen.setOffset(10, 920);
        Phaser.Utils.Array.Add(this.maquinas, this.cajaSobres);
        this.numMaquinas++;
        this.buzonPaquetes.estado = "cerrado"; // 2 posibles estados: abierto y cerrado


        // Agregamos la mesa de sellos
        this.mesaSellos = new Maquina("mesa sellos", "interaccion", 1, this.physics.add.image(940, 150, 'mesaSellos').setScale(0.16).setImmovable(), this.physics.add.image(300, 8007).setScale(0.9, 4));
        this.mesaSellos.imagen.setSize(3330, 500);
        this.mesaSellos.imagen.setOffset(100, 870);
        this.mesaSellos.colliderCartas = this.physics.add.image(738, 175).setScale(2, 0.7);
        this.mesaSellos.colliderPaquetes1 = this.physics.add.image(878, 175).setScale(2, 0.7);
        this.mesaSellos.colliderPaquetes2 = this.physics.add.image(1023, 175).setScale(2, 0.7);
        this.mesaSellos.colliderPaquetes3 = this.physics.add.image(1155, 175).setScale(2, 0.7);
        Phaser.Utils.Array.Add(this.maquinas, this.mesaSellos);
        this.numMaquinas++;

        // Agregamos la estacion de reciclado
        this.reciclado = new Maquina("reciclado", "interaccion", 1, this.physics.add.image(1220, 807, 'reciclado').setScale(0.04).setImmovable(), this.physics.add.image(1213, 757).setScale(2, 0.7));
        this.reciclado.imagen.setSize(2400, 2350);
        this.reciclado.imagen.setOffset(1100, 720);
        this.reciclado.imagen.rotation = -Math.PI;
        Phaser.Utils.Array.Add(this.maquinas, this.reciclado);
        this.numMaquinas++;

        // Agregamos la papelera
        this.papelera = new Maquina("papelera", "interaccion", 1, this.physics.add.image(1340, 807, 'papelera').setScale(0.04).setImmovable(), this.physics.add.image(1335, 757).setScale(2, 0.7));
        this.papelera.imagen.setSize(2400, 2350);
        this.papelera.imagen.setOffset(1150, 720);
        this.papelera.imagen.rotation = -Math.PI;
        Phaser.Utils.Array.Add(this.maquinas, this.papelera);
        this.numMaquinas++;


        // Agregamos el ordenador
        this.ordenador = new Maquina("ordenador", "interaccion", 1, this.physics.add.image(950, 645, 'ordenador').setScale(0.05).setImmovable(), this.physics.add.image(950, 597).setScale(4, 0.7));
        this.ordenador.imagen.rotation = -Math.PI;
        Phaser.Utils.Array.Add(this.maquinas, this.ordenador);
        this.numMaquinas++;

        // Agregamos la bascula
        this.bascula = new Maquina("bascula", "interaccion", 1, this.physics.add.image(980, 310, 'bascula').setScale(0.05).setImmovable(), this.physics.add.image(965, 350).setScale(2.5, 0.7));
        Phaser.Utils.Array.Add(this.maquinas, this.bascula);
        this.numMaquinas++;
        this.bascula.estado = "sin objeto"; // 2 posibles estados: sin objeto, con objeto

        // Añado la cinta
        this.cinta = new Maquina("cinta", "undefined", 1, this.physics.add.image(1680, 160, 'cinta').setScale(0.08).setImmovable(), this.physics.add.image(5065, 350).setScale(2.5, 0.7));
        this.cinta.imagen.rotation = -Math.PI / 2;
        this.cinta.imagen.setSize(800, 2950);
        this.cinta.imagen.setOffset(1960, 420);
        this.cinta.colliderExtra = this.physics.add.image(1674, 303).setScale(6.8, 1.8).setImmovable();

        // Añado la estacion de empaquetado
        this.empaquetado = new Maquina("empaquetado", "timer", 1, this.physics.add.image(1673, 510, 'empaquetado').setScale(0.06).setImmovable(), this.physics.add.image(5065, 350).setScale(2.5, 0.7));
        this.empaquetado.imagen.rotation = -Math.PI / 2;
        this.empaquetado.imagen.setSize(1200, 4100);
        this.empaquetado.imagen.setOffset(1900, -300);
        this.empaquetado.colliderInicio = this.physics.add.image(1630, 445).setScale(0.5, 3.7);
        this.empaquetado.colliderFin = this.physics.add.image(1630, 575).setScale(0.5, 3.7);
        this.empaquetado.colliderExtra = this.physics.add.image(1674, 513).setScale(4.6, 1.5).setImmovable();
        Phaser.Utils.Array.Add(this.maquinas, this.empaquetado);
        this.barraEmpaquetado = this.add.sprite(this.empaquetado.imagen.x + 80, this.empaquetado.imagen.y, 'carga').setScale(2).setAngle(90);
        this.numMaquinas++;

        this.empaquetado.estado = "parado"; // 3 posibles estados : parado, funcionando, finalizado
        this.empaquetado.estadoObjeto = "sin objeto"; // 2 posibles objetos: sin objeto, con objeto

        //// Agregamos la impresora al juego
        this.impresora = new Maquina("impresora", "timer", "down", this.physics.add.image(500, 800, 'impresora').setScale(0.06).setImmovable(), this.physics.add.image(497, 758).setScale(2.9, 1));
        this.impresora.imagen.setSize(2750, 1650);
        this.impresora.imagen.setOffset(1075, 1350);
        this.impresora.imagen.rotation = -Math.PI;
        Phaser.Utils.Array.Add(this.maquinas, this.impresora);
        this.numMaquinas++;
        this.impresora.estado = "parada"; // 3 posibles estados : parada, funcionando, finalizada
        this.impresora.estadoPapel = "sin papel"; // 2 posibles estados : sin papel, con papel
        this.barraImpresora = this.add.sprite(this.impresora.imagen.x, this.impresora.imagen.y+80, 'carga').setScale(2);
        //#endregion

        ///////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////

        this.personaje = this.physics.add.sprite(400, 600, 'personaje').setScale(0.1).refreshBody();//Personaje
        this.personaje.t = false;
        this.personaje2 = this.physics.add.sprite(400, 700, 'personaje2').setScale(0.1).refreshBody();//Personaje 2
        this.personaje.setPushable(false);
        this.personaje2.setPushable(false);

        //se crean todas las animaciones
        //#region REGION ANIMACIONES
        //Animaciones del cangrejo sin nada
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk2',
            frames: this.anims.generateFrameNumbers('personaje2', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo con carta / papel en blanco
        this.anims.create({ //es la misma que el cangrejo con el papel en blanco
            key: 'walk_cangrejo_carta',
            frames: this.anims.generateFrameNumbers('cangrejo_carta', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({ //es la misma que el cangrejo con el papel en blanco
            key: 'walk_cangrejo2_carta',
            frames: this.anims.generateFrameNumbers('cangrejo2_carta', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo carta con dirección
        this.anims.create({
            key: 'walk_cangrejo_carta_dir',
            frames: this.anims.generateFrameNumbers('cangrejo_carta_dir', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_carta_dir',
            frames: this.anims.generateFrameNumbers('cangrejo2_carta_dir', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo carta con sello

        this.anims.create({
            key: 'walk_cangrejo_carta_sello',
            frames: this.anims.generateFrameNumbers('cangrejo_carta_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_carta_sello',
            frames: this.anims.generateFrameNumbers('cangrejo2_carta_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo carta con dirección y sello

        this.anims.create({
            key: 'walk_cangrejo_carta_dir_sello',
            frames: this.anims.generateFrameNumbers('cangrejo_carta_dir_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_carta_dir_sello',
            frames: this.anims.generateFrameNumbers('cangrejo2_carta_dir_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo con papel escrito
        this.anims.create({
            key: 'walk_cangrejo_papel_escrito',
            frames: this.anims.generateFrameNumbers('cangrejo_papel_escrito', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_papel_escrito',
            frames: this.anims.generateFrameNumbers('cangrejo2_papel_escrito', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo con paquete
        this.anims.create({
            key: 'walk_cangrejo_caja',
            frames: this.anims.generateFrameNumbers('cangrejo_caja', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_caja',
            frames: this.anims.generateFrameNumbers('cangrejo2_caja', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo paquete con dirección
        this.anims.create({
            key: 'walk_cangrejo_caja_dir',
            frames: this.anims.generateFrameNumbers('cangrejo_caja_dir', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_caja_dir',
            frames: this.anims.generateFrameNumbers('cangrejo2_caja_dir', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo paquete con sello
        this.anims.create({
            key: 'walk_cangrejo_caja_sello',
            frames: this.anims.generateFrameNumbers('cangrejo_caja_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_caja_sello',
            frames: this.anims.generateFrameNumbers('cangrejo2_caja_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones cangrejo paquete con dirección y sello
        this.anims.create({
            key: 'walk_cangrejo_caja_dir_sello',
            frames: this.anims.generateFrameNumbers('cangrejo_caja_dir_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_cangrejo2_caja_dir_sello',
            frames: this.anims.generateFrameNumbers('cangrejo2_caja_dir_sello', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        //Animacion barra carga
        this.anims.create({
            key: 'barra',
            frames: this.anims.generateFrameNumbers('carga', { start: 0, end: 16 }),
            frameRate: 5 //define la velocidad de completar la barra
        });
        this.personaje.anims.play('walk');
        this.personaje2.anims.play('walk2');
        //this.personaje.anims.play('walk_letter');
        //#endregion

        this.personaje.objeto = undefined
        //this.personaje.objeto = new Objeto("carta", 0);
        //this.personaje.objeto = new Objeto("paquete", 12.5);

        this.objetos = this.physics.add.group(); //objetos que el jugador puede tener en la mano

        this.objetosCinta = this.physics.add.group();//objetos de la cinta

        //this.cinta = this.physics.add.staticImage(800, 600, 'cinta').setScale(0.07).refreshBody();//cinta
        //this.cinta.body.setSize(300, 75);

        this.objetos.children.iterate(function (objeto) { //asignamos una variable t a todos los objeto
            objeto.t = false;//t indica si el objeto está siendo llevado por el personaje
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        // Configuración de las colisiones para el personaje
        this.personaje.setCollideWorldBounds(true);
        this.personaje2.setCollideWorldBounds(true);
        this.physics.add.collider(this.personaje, this.personaje2);


        //  Colisiones con las maquinas
        // Personaje 1
        this.physics.add.collider(this.personaje, [this.impresora.imagen,this.buzonCartas.imagen,this.buzonPaquetes.imagen,
            this.cajaSobres.imagen,this.mesaSellos.imagen,this.reciclado.imagen,this.papelera.imagen,this.cinta.imagen,
            this.cinta.colliderExtra,this.empaquetado.imagen,this.empaquetado.colliderExtra,this.mesaArriba1,this.mesaArriba2,
            this.mesaArriba3,this.mesaAbajo1,this.mesaAbajo2,this.mesaAbajo3,this.mesaIzq1,this.mesaIzq2,this.mesaDcha1,
            this.mesaDcha2,this.mesaCentral1,this.mesaCentral1.colliderExtra,this.mesaCentral2,this.mesaCentral2.colliderExtra]);

        // Personaje 2
        this.physics.add.collider(this.personaje2, [this.impresora.imagen, this.buzonCartas.imagen, this.buzonPaquetes.imagen,
                this.cajaSobres.imagen, this.mesaSellos.imagen, this.reciclado.imagen, this.papelera.imagen, this.cinta.imagen,
                this.cinta.colliderExtra, this.empaquetado.imagen, this.empaquetado.colliderExtra, this.mesaArriba1, this.mesaArriba2,
                this.mesaArriba3, this.mesaAbajo1, this.mesaAbajo2, this.mesaAbajo3, this.mesaIzq1, this.mesaIzq2, this.mesaDcha1,
                this.mesaDcha2, this.mesaCentral1, this.mesaCentral1.colliderExtra, this.mesaCentral2, this.mesaCentral2.colliderExtra]);



        //funcion que se ejecuta cada cierto tiempo
        this.time.addEvent({
            delay: 2000,  // El intervalo en milisegundos
            callback: this.crearObjetosCinta,
            callbackScope: this,
            loop: true  //true para que el evento se repita
        });

        // Sonidos
        this.sonidoImpresora = this.sound.add('impresora');
        this.sonidoBuzones = this.sound.add('buzones');
        this.sonidoReinicio = this.sound.add('reinicio');
        this.sonidoPapelera = this.sound.add('papelera');
        this.sonidoOrdenador = this.sound.add('ordenador');
        this.sonidoCaja = this.sound.add('caja');
        this.sonidoSellos = this.sound.add('sellos');
        this.sonidoEmpaquetado = this.sound.add('empaquetado');

        this.sonidoFondo = this.sound.add('fondoSonido');
        this.sonidoFondoRapido = this.sound.add('fondoSonidoRapido');
        this.sonidoAlarma = this.sound.add('sonidoAlarma');


        this.sonidoFondo.loop = true;
        this.sonidoFondo.setVolume(0.04);
        this.sonidoFondo.play();

        this.time.delayedCall(120000, this.cambioMusica, null, this)
        //Texto
        this.pesado = this.add.text(1009, 294, '0.00', { fontSize: '19px', fill: '#FF0000' }, { font: "Monospace" });
        this.textoPuntuacion = this.add.text(1000, 950, 'Puntuación: 0', { fontSize: '30px', fill: '#000000' }, { font: "Monospace" });

        //Temporizador
        this.tiempoJuego = 180; //tiempo de partida en segundos
        this.tiempoTranscurrido = 0;   
        this.time.addEvent({
            delay: 100,
            callback: function () {
                if (this.tiempoTranscurrido >= this.tiempoJuego) {
                    this.texto.setText('Tiempo Restante: 0:00');
                    this.scene.start('EndScene', this.ppuntuacion);
                } else {
                    var minuto = Math.floor((this.tiempoJuego - this.tiempoTranscurrido) / 60);
                    var segundo = this.tiempoJuego - 60 * minuto - this.tiempoTranscurrido;
                    var cero = (segundo >= 10) ? '' : '0';
                    this.texto.setText('Tiempo Restante: ' + minuto + ":" + cero + segundo);
                    this.tiempoTranscurrido += 1;
                }
            },
            callbackScope: this,
            loop: true
        });

        this.texto = this.add.text(160, 60, 'Tiempo Restante: 3:00', { fontSize: '35px', fill: '#fff' });

    }


    cambioMusica() {

        this.sonidoFondo.stop();
        this.sonidoAlarma.setVolume(0.04)
        this.sonidoAlarma.play();
        this.sonidoFondoRapido.loop = true;
        this.sonidoFondoRapido.setVolume(0.04);
        this.sonidoFondoRapido.play();

    }



    update() {
        this.actualizarInteraccion();

        // Control del personaje
        const teclaA = this.input.keyboard.addKey('A');
        const teclaD = this.input.keyboard.addKey('D');
        const teclaW = this.input.keyboard.addKey('W');
        const teclaS = this.input.keyboard.addKey('S');
        const teclaE = this.input.keyboard.addKey('E');
        const teclaZ = this.input.keyboard.addKey('Z');
        const teclaX = this.input.keyboard.addKey('X');
        const teclaC = this.input.keyboard.addKey('C');
        const teclaV = this.input.keyboard.addKey('V');
        const teclaB = this.input.keyboard.addKey('B');


        // Control de la rotación
        //personaje 2
        if (this.cursors.left.isDown) {

            this.personaje2.setAngularVelocity(-150);


        } else if (this.cursors.right.isDown) {
            this.personaje2.setAngularVelocity(150);

        } else {
            this.personaje2.setAngularVelocity(0);
        }

        //personaje 1
        if (teclaA.isDown) {

            this.personaje.setAngularVelocity(-150);


        } else if (teclaD.isDown) {
            this.personaje.setAngularVelocity(150);

        } else {
            this.personaje.setAngularVelocity(0);
        }


        // Control del movimiento
        //personaje 1
        if (teclaW.isDown) {
            // Avanzar hacia adelante
            this.physics.velocityFromRotation(this.personaje.rotation, 200, this.personaje.body.velocity);
        }
        else if (teclaS.isDown) {
            // Retroceder
            this.physics.velocityFromRotation(this.personaje.rotation + Math.PI, 200, this.personaje.body.velocity);
        }
        else {
            // Detenerse si no se presionan las teclas de dirección
            this.personaje.setVelocity(0);
        }
        //personaje 2
        if (this.cursors.up.isDown) {
            // Avanzar hacia adelante
            this.physics.velocityFromRotation(this.personaje2.rotation, 200, this.personaje2.body.velocity);
        }
        else if (this.cursors.down.isDown) {
            // Retroceder
            this.physics.velocityFromRotation(this.personaje2.rotation + Math.PI, 200, this.personaje2.body.velocity);
        }
        else {
            // Detenerse si no se presionan las teclas de dirección
            this.personaje2.setVelocity(0);
        }

        //interactuar con los objetos
        if (Phaser.Input.Keyboard.JustDown(teclaE)) {
            if(!this.interaccionMaquinas())
                this.cogerObjeto();
        }

        //mueve y rota el objeto llevado delante del personaje
        this.objetos.children.iterate(function (objeto) {
            if (objeto.t) {

                objeto.x = this.personaje.x + Math.cos(this.personaje.rotation) * 15;
                objeto.y = this.personaje.y + Math.sin(this.personaje.rotation) * 15;
                objeto.setRotation(this.personaje.rotation);

            }
        }, this);


        //#region FUNCIONES DE PRUEBA DE CAMBIO DE SPRITES


        if (Phaser.Input.Keyboard.JustDown(teclaZ)) { //cambia la animación del cangrejo1 al cangrejo con la carta
            if (this.currentSpritesheet !== 'cangrejo_carta') {
                this.personaje.setTexture('cangrejo_carta');
                this.currentSpritesheet = 'cangrejo_carta';
                this.personaje.anims.play('walk_cangrejo_carta');
            } else {
                this.personaje.setTexture('personaje');
                this.currentSpritesheet = 'personaje';
                this.personaje.anims.play('walk');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(teclaX)) { //cambia la animación del cangrejo1 al cangrejo con la carta
            if (this.currentSpritesheet !== 'cangrejo_carta_dir') {
                this.personaje.setTexture('cangrejo_carta_dir');
                this.currentSpritesheet = 'cangrejo_carta_dir';
                this.personaje.anims.play('walk_cangrejo_carta_dir');
            } else {
                this.personaje.setTexture('personaje');
                this.currentSpritesheet = 'personaje';
                this.personaje.anims.play('walk');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(teclaC)) { //cambia la animación del cangrejo1 al cangrejo con la carta
            if (this.currentSpritesheet !== 'cangrejo_carta_dir_sello') {
                this.personaje.setTexture('cangrejo_carta_dir_sello');
                this.currentSpritesheet = 'cangrejo_carta_dir_sello';
                this.personaje.anims.play('walk_cangrejo_carta_dir_sello');
            } else {
                this.personaje.setTexture('personaje');
                this.currentSpritesheet = 'personaje';
                this.personaje.anims.play('walk');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(teclaV)) { //cambia la animación del cangrejo1 al cangrejo con la carta
            if (this.currentSpritesheet !== 'cangrejo_papel_escrito') {
                this.personaje.setTexture('cangrejo_papel_escrito');
                this.currentSpritesheet = 'cangrejo_papel_escrito';
                this.personaje.anims.play('walk_cangrejo_papel_escrito');
            } else {
                this.personaje.setTexture('personaje');
                this.currentSpritesheet = 'personaje';
                this.personaje.anims.play('walk');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(teclaB)) { //cambia la animación del cangrejo1 al cangrejo con la carta
            if (this.currentSpritesheet !== 'cangrejo_caja') {
                this.personaje.setTexture('cangrejo_caja');
                this.currentSpritesheet = 'cangrejo_caja';
                this.personaje.anims.play('walk_cangrejo_caja');
            } else {
                this.personaje.setTexture('personaje');
                this.currentSpritesheet = 'personaje';
                this.personaje.anims.play('walk');
                this.personaje.anims.play('walk');
            }

        }
        //#endregion

        var auxObjeto1;//variable auxiliar
        this.objetosCinta.children.iterate(function (objeto) {
            if (objeto.t) {
                objeto.x = this.personaje.x + Math.cos(this.personaje.rotation) * 15;
                objeto.y = this.personaje.y + Math.sin(this.personaje.rotation) * 15;
                objeto.setRotation(this.personaje.rotation);
                auxObjeto1 = objeto;
            }
        }, this);
        //si el personaje coge el objeto, cambiamos dicho objeto de la lista de objetosCinta a objetos
        if (auxObjeto1 != null) {
            this.objetosCinta.remove(auxObjeto1);
            this.objetos.add(auxObjeto1);
        }

    }

    actualizarInteraccion() {
        for (var i = 0; i < this.numMaquinas; i++) {
            if (this.maquinas[i].nombre !== "empaquetado") {
                this.personaje.distanciaMaquina = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.maquinas[i].collider.x, this.maquinas[i].collider.y);
                this.maquinas[i].interactuable = this.personaje.distanciaMaquina < 40;
            }

            if (this.maquinas[i].nombre === "mesa sellos") {
                this.personaje.distanciaMaquina = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.maquinas[i].colliderCartas.x, this.maquinas[i].colliderCartas.y);
                this.maquinas[i].cartasInteractuable = this.personaje.distanciaMaquina < 40;
                this.personaje.distanciaMaquina = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.maquinas[i].colliderPaquetes1.x, this.maquinas[i].colliderPaquetes1.y);
                this.maquinas[i].paquetes1Interactuable = this.personaje.distanciaMaquina < 40;
                this.personaje.distanciaMaquina = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.maquinas[i].colliderPaquetes2.x, this.maquinas[i].colliderPaquetes2.y);
                this.maquinas[i].paquetes2Interactuable = this.personaje.distanciaMaquina < 40;
                this.personaje.distanciaMaquina = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.maquinas[i].colliderPaquetes3.x, this.maquinas[i].colliderPaquetes3.y);
                this.maquinas[i].paquetes3Interactuable = this.personaje.distanciaMaquina < 40;
            }

            if (this.maquinas[i].nombre === "empaquetado") {
                this.personaje.distanciaMaquina = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.maquinas[i].colliderInicio.x, this.maquinas[i].colliderInicio.y);
                this.maquinas[i].inicioInteractuable = this.personaje.distanciaMaquina < 40;
                this.personaje.distanciaMaquina = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.maquinas[i].colliderFin.x, this.maquinas[i].colliderFin.y);
                this.maquinas[i].finInteractuable = this.personaje.distanciaMaquina < 40;
            }

        }
    }

    interaccionMaquinas() {
        //if(this.personaje.t) {
        //}else{
        //    console.log('Se necesita un objeto para interaccionar con las maquinas')
        //}
        return this.interaccionImpresora() || this.interaccionReciclado() || this.interaccionPapelera() ||
            this.interaccionOrdenador() || this.interaccionEmpaquetado() || this.interaccionBuzonPaquetes() ||
            this.interaccionBascula() || this.interaccionMesaSellos() || this.interaccionCajaSobres() || this.interaccionBuzonCartas();
    }

    interaccionImpresora() {

        if (this.personaje.objeto === undefined) return;
        if(this.personaje.objeto.nombre === 'paquete') {
            if(this.impresora.interactuable)
                console.log('No puedes imprimir en una paquete')
            return;
        }
        if (this.impresora.interactuable && (this.personaje.rotation < 2.4) && (this.personaje.rotation > 0.6) && (this.impresora.estado === "parada")) {
            console.log(this.personaje.objeto.nombre);
            if (this.impresora.estadoPapel === "sin papel") {
                if (!this.personaje.objeto.sobre) {
                    if (!this.personaje.objeto.impresa) {
                        console.log("Has puesto el papel");
                        this.impresora.estadoPapel = "con papel";
                        this.impresora.estado = "funcionando";
                        this.sonidoImpresora.play();
                        this.barraImpresora.anims.play('barra',true)
                        console.log("Imprimiendo documento");
                        //this.contadorImpresora = setInterval(this.finImpresora(this), 3000);
                        this.contadorImpresora = null;
                        this.time.delayedCall(3000,this.finImpresora,null,this)
                    } else {
                        console.log("No puedes volver a imprimir");
                    }
                } else {
                    console.log("No puedes imprimir si el papel esta en el sobre")
                }
            } else if (this.impresora.estadoPapel === "con papel") {
                this.personaje.objeto.impresa = true;
                console.log("Has quitado el papel recien impreso");
                this.impresora.imagen.setTexture('impresora');
                this.impresora.estadoPapel = "sin papel";
            }
            return true;
        }
        if (this.impresora.estado === "finalizada") {

            this.impresora.estado = "parada";
        }
    }


    finImpresora() {
        this.impresora.estado = "finalizada";
        //clearInterval(this.contadorImpresora);
        console.log("La impresora ha terminado de imprimir");
        this.impresora.imagen.setTexture('impresora2');
    }

    interaccionEmpaquetado() {
        if ((((this.personaje.rotation < 0.6) && (this.personaje.rotation > - 0.6)))) {

            if (this.empaquetado.inicioInteractuable && this.empaquetado.estado === "parado" && this.empaquetado.obj === undefined) {
                try{
                    if(this.personaje.objeto.nombre !== 'paquete' || this.personaje.objeto.empaquetado)  return
                } catch (e){
                    console.log('No tienes nada en la mano')
                    return
                }
                this.sonidoEmpaquetado.play();
                let obj = this.objetoEnMano()
                obj.t = false
                this.personaje.objeto = undefined
                this.personaje.t = false;
                obj.x = this.empaquetado.imagen.x;
                let tween = this.tweens.add({
                    targets: obj,
                    y: [obj.y,this.empaquetado.imagen.y],
                    duration: 1000,
                    repeat: 0
                });
                //this.empaquetado.estadoObjeto
                let paquete = this.physics.add.image(-100,-100,'paquete').setScale(0.08).refreshBody();
                paquete.t = false
                paquete.obj = new Objeto(obj.obj.nombre,obj.obj.peso)
                paquete.obj.empaquetado = true;
                this.empaquetado.obj = paquete;
                console.log("Has puesto el objeto en la maquina");
                tween.on('complete',function () {
                    obj.destroy();
                    this.empaquetado.estado = "funcionando";
                    console.log("Empaquetando objeto, espere");
                    //this.contadorEmpaquetado = setInterval(finEmpaquetado, 5000);
                    this.barraEmpaquetado.anims.play('barra',true)

                    this.time.delayedCall(3000, this.finEmpaquetado, [paquete], this)

                },this);

                return true;
            } else if (this.empaquetado.estado === "finalizado" && this.empaquetado.finInteractuable) {
                this.empaquetado.estado = "sin objeto";
                this.empaquetado.obj.t = true;
                this.personaje.t = true;
                this.personaje.objeto = this.empaquetado.obj.obj;

                this.empaquetado.estado = "parado";
                console.log("Has recogido tu objeto recien empaquetado");
                this.objetos.add(this.empaquetado.obj);
                this.empaquetado.obj = undefined
                return true;
            }else {
                console.log('Estado: ' + this.empaquetado.estado + ' Es interactuable: ' + this.empaquetado.finInteractuable)
            }
        }

    }

    finEmpaquetado(paquete) {
        paquete.x = this.empaquetado.imagen.x
        paquete.y = this.empaquetado.imagen.y
        let tween = this.tweens.add({
            targets: paquete,
            y: '+=100',
            duration: 1000,
            repeat: 0
        });
        console.log('Paquete 2: ' + paquete)
        this.empaquetado.estado = "finalizado";
        clearInterval(this.contadorEmpaquetado);
        console.log("Su paquete ha sido empaquetado y esta a la espera de ser recogido");
    }

    interaccionReciclado() {
        if (this.personaje.objeto !== undefined) {
            if (this.reciclado.interactuable && (this.personaje.rotation < 2.4) && (this.personaje.rotation > 0.6)) {
                this.reciclarObjeto()
                this.sonidoReinicio.play();
                console.log("Has reciclado tu " + this.personaje.objeto.nombre);
                return true;
            }
        }
    }

    reciclarObjeto() {
        this.personaje.objeto.impresa = false;
        this.personaje.objeto.sobre = false;
        this.personaje.objeto.sello = undefined;
        this.personaje.objeto.direccion = false;
        //this.personaje.objeto = undefined
    }


    interaccionPapelera() {
        if (this.papelera.interactuable && (this.personaje.rotation < 2.4) && (this.personaje.rotation > 0.6)) {
            if (this.personaje.objeto !== undefined) {
                this.sonidoPapelera.play();
                this.personaje.objeto = undefined;
                console.log("Has tirado tu pedido");
            }
            return true;
        }
    }

    interaccionOrdenador() {
        if (this.personaje.objeto !== undefined) {
            if (this.ordenador.interactuable && (this.personaje.rotation < 2.4) && (this.personaje.rotation > 0.6)) {
                if (!this.personaje.objeto.direccion) {
                    if (this.personaje.objeto.nombre === "carta") {
                        if (this.personaje.objeto.sobre) {
                            this.sonidoOrdenador.play();
                            console.log("introducido la direccion");
                            this.personaje.objeto.direccion = true;
                        } else {
                            console.log("debes meter el papel en el sobre primero")
                        }
                    } else if (this.personaje.objeto.nombre === "paquete") {
                        if (this.personaje.objeto.empaquetado !== false) {
                            this.sonidoOrdenador.play();
                            console.log("introducido la direccion");
                            this.personaje.objeto.direccion = true;
                        } else {
                            console.log("debes meter el objeto en el paquete primero")
                        }
                    }

                } else {
                    console.log("Ya has introducido la direccion");
                }

                return true;
            }
        }

    }

    interaccionBuzonPaquetes() {
        if (this.personaje.objeto !== undefined) {
            if(this.personaje.objeto.nombre === 'carta') {
                if(this.buzonPaquetes.interactuable)
                    console.log('Las cartas van en el buzón de cartas')
                return;
            }
            if (this.buzonPaquetes.estado === "cerrado") {
                if (this.buzonPaquetes.interactuable && (this.personaje.rotation < 0.6) && (this.personaje.rotation > -0.6)) {
                    console.log("Has abierto el buzon de los paquetes");
                    this.sonidoBuzones.play();
                    this.buzonPaquetes.estado = "abierto";
                    return true;
                }
            } else if (this.buzonPaquetes.estado === "abierto") {
                if (this.buzonPaquetes.interactuable && (this.personaje.rotation < 0.6) && (this.personaje.rotation > -0.6)) {
                    if (this.personaje.objeto === 'paquete') {
                        console.log("Has introducido un paquete");
                        console.log("Has cerrado el buzon");
                        this.sonidoBuzones.play();
                        this.buzonPaquetes.estado = "cerrado";
                    } else {
                        console.log("Mete el objeto en la caja");
                    }
                    this.comprobarCaja();
                    return true;
                }
            }
        }


    }

    comprobarCaja() {

        if (this.personaje.objeto.empaquetado) {
            this.puntuacion += 100;
        }

        if (this.personaje.objeto.sello === "sello cartas") {
            this.puntuacion -= 100;
        }

        if (this.personaje.objeto.peso <= 5 && this.personaje.objeto.sello === "sellos paquetes 1") {
            this.puntuacion += 100;
        }

        if (this.personaje.objeto.peso > 5 && this.personaje.objeto.peso <= 10 && this.personaje.objeto.sello === "sellos paquetes 2") {
            this.puntuacion += 100;
        }

        if (this.personaje.objeto.peso > 10 && this.personaje.objeto.sello === "sellos paquetes 3") {
            this.puntuacion += 100;
        }

        if (this.personaje.objeto.direccion){
            this.puntuacion += 100;
        }

        let obj = this.objetoEnMano()
        this.personaje.t = false
        this.personaje.objeto = undefined
        obj.destroy()

        this.textoPuntuacion.setText('puntuación: ' + this.puntuacion);
        console.log("Has ganado " + this.puntuacion + " puntos con este paquete");
    }

    interaccionBuzonCartas() {
        let aux;
        if (this.personaje.objeto !== undefined) {
            if(this.personaje.objeto.nombre === 'paquete') {
                if(this.buzonCartas.interactuable)
                    console.log('Los paquetes van en el buzón de paquetes')
            return;
        }
            aux = ((this.personaje.rotation < -2.6) && (this.personaje.rotation > -3.6)) || ((this.personaje.rotation < 3.1) && (this.personaje.rotation > 2.4));
            if(!aux) return;

            if (this.buzonCartas.estado === "cerrado") {

                if (this.buzonCartas.interactuable) {
                    console.log("Has abierto el buzon de las cartas");
                    this.sonidoBuzones.play();
                    this.buzonCartas.estado = "abierto";
                }

            } else if (this.buzonCartas.estado === "abierto") {

                if (this.buzonCartas.interactuable) {
                    if (this.personaje.objeto.sobre) {
                        console.log("Has introducido una carta");
                        console.log("Has cerrado el buzon");
                        this.sonidoBuzones.play();
                        this.buzonCartas.estado = "cerrado";

                        this.comprobarSobre();
                        this.personaje.objeto = undefined
                        //this.reciclarObjeto()
                    } else {
                        console.log("Mete el papel en el sobre");
                    }
                }

            }
            return true;
        }




    }

    comprobarSobre() {

        if (this.personaje.objeto.impresa) {
            this.puntuacion += 50;
        }

        if (this.personaje.objeto.sobre) {
            this.puntuacion += 50;
        }

        if (this.personaje.objeto.sello === "sello cartas") {
            this.puntuacion += 50;
        }

        if (this.personaje.objeto.direccion) {
            this.puntuacion += 50;
        }

        console.log("Has ganado " + this.puntuacion + " puntos");
    }

    interaccionBascula() {
        if (this.bascula.estado === "sin objeto" && this.personaje.t) {
            if (this.bascula.interactuable && (this.personaje.rotation < -0.6) && (this.personaje.rotation > -2.6)) {
                console.log("Has puesto el objeto en la bascula");
                console.log("Tu objeto pesa " + this.personaje.objeto.peso);
                this.pesado.setText(this.personaje.objeto.peso);
                let obj;
                this.objetos.children.iterate(function (objeto) {
                    if(objeto.t) {
                        objeto.t = false;
                        obj = objeto
                    }
                }, this);
                this.personaje.objeto = undefined
                this.personaje.t = false;

                obj.x = this.bascula.imagen.x - 15;
                obj.y = this.bascula.imagen.y - 5;

                this.bascula.obj = obj;
                this.bascula.estado = "con objeto";
                return true;
            }
        } else if (this.bascula.estado === "con objeto") {
            if (this.bascula.interactuable && (this.personaje.rotation < -0.6) && (this.personaje.rotation > -2.6)) {
                console.log("Has quitado el objeto de la bascula");
                this.pesado.setText('0.00');
                this.bascula.estado = "sin objeto";
                this.bascula.obj.t = true;
                this.personaje.t = true;
                this.personaje.objeto = this.bascula.obj.obj;
                //this.bascula.obj = undefined
                return true;
            }
        }

    }

    interaccionCajaSobres() {
        if (this.personaje.objeto !== undefined) {
            if(this.personaje.objeto.nombre === 'paquete') {
                if(this.buzonCartas.interactuable)
                    console.log('No se pueden meter paquetes en sobres')
                return;
            }
            let aux = (this.personaje.rotation < -2.6) && (this.personaje.rotation > -3.6) || (this.personaje.rotation < 3.1) && (this.personaje.rotation > 2.4)
            if(!aux)    return;

            if (this.cajaSobres.interactuable) {
                if (!this.personaje.objeto.sobre) {
                    this.sonidoCaja.play();
                    console.log("Has metido el papel en el sobre");
                    this.personaje.objeto.sobre = true;
                } else {
                    console.log("Ya has metido el papel en el sobre");
                }
            }
            return true;
        }

    }

    interaccionMesaSellos() {
        if (this.personaje.objeto !== undefined) {

            if (this.mesaSellos.cartasInteractuable && (this.personaje.rotation < -0.6) && (this.personaje.rotation > - 2.6)) {
                if (this.personaje.objeto.sello === undefined) {

                    if (this.personaje.objeto.nombre === "carta") {
                        if (this.personaje.objeto.sobre) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de las cartas");
                            this.personaje.objeto.sello = "sello cartas";
                        } else {
                            console.log("Sobre primero")
                        }
                    } else if (this.personaje.objeto.nombre === "paquete") {
                        if (this.personaje.objeto.empaquetado) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de las cartas");
                            this.personaje.objeto.sello = "sello cartas";
                        } else {
                            console.log("Caja primero")
                        }
                    }

                }
                return true;
            } else if (this.mesaSellos.paquetes1Interactuable && (this.personaje.rotation < -0.6) && (this.personaje.rotation > - 2.6)) {
                if (this.personaje.objeto.sello === undefined) {
                    if (this.personaje.objeto.nombre === "carta") {
                        if (this.personaje.objeto.sobre) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de paquete de tipo 1");
                            this.personaje.objeto.sello = "sello paquetes 1";
                        } else {
                            console.log("Sobre primero")
                        }
                    } else if (this.personaje.objeto.nombre === "paquete") {
                        if (this.personaje.objeto.empaquetado) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de paquete de tipo 1");
                            this.personaje.objeto.sello = "sello paquetes 1";
                        } else {
                            console.log("Caja primero")
                        }
                    }

                }
                return true;
            } else if (this.mesaSellos.paquetes2Interactuable && (this.personaje.rotation < -0.6) && (this.personaje.rotation > - 2.6)) {
                if (this.personaje.objeto.sello === undefined) {
                    if (this.personaje.objeto.nombre === "carta") {
                        if (this.personaje.objeto.sobre) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de paquete de tipo 2");
                            this.personaje.objeto.sello = "sello paquetes 2";
                        } else {
                            console.log("Sobre primero")
                        }
                    } else if (this.personaje.objeto.nombre === "paquete") {
                        if (this.personaje.objeto.empaquetado) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de paquete de tipo 2");
                            this.personaje.objeto.sello = "sello paquetes 2";
                        } else {
                            console.log("Caja primero")
                        }
                    }
                }
                return true;

            } else if (this.mesaSellos.paquetes3Interactuable && (this.personaje.rotation < -0.6) && (this.personaje.rotation > - 2.6)) {
                if (this.personaje.objeto.sello === undefined) {
                    if (this.personaje.objeto.nombre === "carta") {
                        if (this.personaje.objeto.sobre) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de paquete de tipo 3");
                            this.personaje.objeto.sello = "sello paquetes 3";
                        } else {
                            console.log("Sobre primero")
                        }
                    } else if (this.personaje.objeto.nombre === "paquete") {
                        if (this.personaje.objeto.empaquetado === true) {
                            this.sonidoSellos.play();
                            console.log("Has puesto el sello de paquete de tipo 3");
                            this.personaje.objeto.sello = "sello paquetes 3";
                        } else {
                            console.log("Caja primero")
                        }
                    }
                }

                return true;
            }
        }

    }

    objetoEnMano(){
        let obj;
        this.objetos.children.iterate(function (objeto) {
            if(objeto.t) {
                obj = objeto
            }
        }, this);
        return obj;
    }



    func1(objeto) {

        let distancia = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, objeto.x, objeto.y);

        if ((distancia < 60) && !this.personaje.t) {//si el personaje esta cerca de un objeto y no lleva nada en la mano, coge el objeto
            objeto.t = true;
            this.personaje.t = true;
            this.personaje.objeto = objeto.obj;
        }
        else if (this.personaje.t && objeto.t)// si el personaje tiene algo en la mano y es el objeto, lo suelta
        {
            objeto.t = false;
            this.personaje.t = false;
            this.personaje.objeto = undefined
            //this.reciclarObjeto()
        }
    }

    obtenerObjeto(item){
        let peso;
        let name;
        switch (item) {
            case 'yunque':
                peso = Phaser.Math.Between(30,50);
                name = 'paquete'
                break
            case 'ps5':
                peso = 5.1;
                name = 'paquete'
                break
            case 'ps5Game':
                peso = 0.2;
                name = 'paquete'
                break
            case 'mancuerna':
                peso = Phaser.Math.Between(2,15);
                name = 'paquete'
                break;
            default:
                console.error('Objeto sin tipo')
                peso = 1000000;
                name = 'error'
        }
        return new Objeto(name,peso)
    }

    cogerObjeto() {
        this.objetos.children.iterate(function (objeto) {

            this.func1(objeto);

        }, this);
        this.objetosCinta.children.iterate(function (objeto) {

            this.func1(objeto);

        }, this);


    }
    //devuelve id de un objeto aleatorio de arrayObjetosCinta
    obtenerObjetoCinta() {
        var aux = Phaser.Math.Between(0, this.arrayObjetosCinta.length - 1);
        return this.arrayObjetosCinta[aux];

    }
    crearObjetosCinta() {
        var tipoObjeto = this.obtenerObjetoCinta();

        var objeto = this.physics.add.image(this.cinta.imagen.x - 10, this.cinta.imagen.y + 80, tipoObjeto).setScale(0.08).refreshBody();//hay que escalar bien la imagen
        objeto.t = false;
        objeto.obj = this.obtenerObjeto(tipoObjeto)
        this.objetosCinta.add(objeto);

        var a = this.objetosCinta.getFirstAlive()
        //si el objeto esta fuera de la cinta, pasamos ese objeto a la lista objetos
        if (a.y < this.cinta.imagen.y - 150) {
            this.objetosCinta.remove(a);
            this.objetos.add(a);
        }
        //animacion de mover la cinta
        this.tweens.add({
            targets: this.objetosCinta.getChildren(),
            y: "-=50",
            duration: 1000,
            repeat: 0
        });
    }
}