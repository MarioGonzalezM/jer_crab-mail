const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0xc27f4c;
const COLOR_LIGHT = 0xf2c7b1;
const COLOR_DARK = 0x291003;
class Chat extends Phaser.Scene {
    constructor() {
        super({key: 'Chat',})
    }


    botonEnviar;
    botonJugar
    fondo;
    chatInput;
    chatBox;
    volverBoton;
    resaltoVolver;
    //Websocket
    temporizador;
    roomID;
    wsConnection

    preload() {
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        this.load.image('botonEnviar', "Assets/Perfil/BotonEnviar.png")
        this.load.image('fondoChat', "Assets/Chat/fondoChat.png")
        this.load.image('botonVolver', "Assets/Perfil/BotonVolver.png")
        this.load.image('botonEsperando', "Assets/Chat/esperandoBoton.png")
        this.load.image('botonJugar', "Assets/Chat/preparadoBoton.png")
        this.load.image('resaltoVolver', "Assets/Perfil/resaltoVolver.png")
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    consoleLog(string){
        console.log(string)
    }
   create() {
        this.roomID = -11;
       WebFont.load({
           google: {
               families: ['Lobster']
           }
       });

       this.fondo = this.add.image(960, 540, 'fondoChat');
       this.resaltoVolver = this.add.image(265, 120, 'resaltoVolver').setScale(0.8)
       this.resaltoVolver.visible = false;
       this.volverBoton = this.add.image(265, 120, 'botonVolver').setScale(0.8);

       //#region REGION_BOTON_ENVIAR
       //960,883
       this.botonEnviar = this.add.image(760, 883, 'botonEnviar');
       this.botonEnviar.setInteractive();
       this.chatBox = this.rexUI.add.scrollablePanel({
           x: 960, y: 440,
           height: 720,
           width: 1000,

           scrollMode: 0,

           background: this.rexUI.add.roundRectangle({
               strokeColor: '#fff',
               radius: 10
           }),

           panel: {
               child: createPanel(this, "Conectado al chat."),

               mask: {padding: 1,},
           },

           slider: {
               track: this.rexUI.add.roundRectangle({width: 20, radius: 10, color: COLOR_DARK}),
               thumb: this.rexUI.add.roundRectangle({radius: 13, color: COLOR_LIGHT})
           },

           mouseWheelScroller: {
               focus: false,
               speed: 0.1
           },

           header: this.rexUI.add.label({
               space: {left: 5, right: 5, top: 5, bottom: 5},
               background: this.rexUI.add.roundRectangle({color: COLOR_PRIMARY}),
               text: this.add.text(0, 0, 'Chat Online', {fontSize: 20, fontFamily: 'Lobster'})
           }),

           footer: this.rexUI.add.label({
               space: {left: 5, right: 5, top: 50, bottom: 50},
               background: this.rexUI.add.roundRectangle({color: COLOR_PRIMARY}),
           }),

           space: {left: 20, right: 20, top: 20, bottom: 20, panel: 3, header: 5, footer: 5}
       })
           .layout()

       this.botonEnviar.on('pointerdown', function () {
           var mensaje = [dataSettings.user, this.chatInput.text.trimEnd().trimStart()];

           if (mensaje[1].trim() !== '') {
               this.chatBox.getElement('panel').add(createMessage(this, mensaje))
               this.chatInput.text = ''; // Limpiar el campo de texto después de enviar el mensaje
               this.chatBox.layout()

               $.ajax({
                   method: 'POST',
                   url: "http://" + dataSettings.IP + ":8080/envioTexto",
                   contentType: 'application/json', // Utiliza 'contentType' en lugar de 'datatype'
                   data: JSON.stringify(mensaje),
               }).done(function (mensaje, textStatus, jqXHR) {
                   console.log("¡Éxito!");

               }).fail(function (jqXHR, textStatus, errorThrown) {
                   console.log("Error:");
               });
           }
       }, this)

       //endregion

       this.chatInput = this.add.rexInputText(960, 728, 900, 70, {
           type: 'textarea',
           placeholder: 'Introducir mensaje',
           backgroundColor: 'transparent',
           fontFamily: "Lobster",
           align: 'center',
           fontSize: '25px',
           color: COLOR_DARK,
       })




       this.volverBoton.setInteractive();
       this.volverBoton.on('pointerover', function () {
           //this.resalto.setPosition(this.sendButton.x, this.sendButton.y);
           this.resaltoVolver.visible = true;
       }, this)
       this.volverBoton.on('pointerout', function () {
           this.resaltoVolver.visible = false;
       }, this)
       this.volverBoton.on("pointerdown", function () {
           if (typeof prevScene !== "string")
               this.scene.start('MainMenu')

           else {
               console.log(prevScene)
               this.scene.wake(prevScene);
           }
           this.scene.sleep();
        }, this)

       //#region WEBSOCKET REGION
       $.ajax({
           url: 'http://'+dataSettings.IP+':8080',
           method: 'GET',
       }).done((data)=> {
           this.wsConnection = new WebSocket(`ws://${dataSettings.IP}:8080/juego`);
           this.wsConnection.ready = true;

           this.wsConnection.onopen = (event) => {
               console.log('Conexión WebSocket abierta:', event);
               let json = {"roomID": this.roomID, "roomInfo": false}
               this.temporizador = this.time.addEvent({
                   delay: 20,  // El intervalo en milisegundos
                   callback: ()=>{
                       let json = {"roomID": this.roomID, "roomInfo": false};
                       this.wsConnection.send(JSON.stringify(json));
                   },
                   callbackScope: this,
                   loop: true  //true para que el evento se repita
               });
           };


           this.wsConnection.onmessage = (event) => {
               console.log('Mensaje recibido desde el servidor:', event.data);
               let dato = JSON.parse(event.data);

               if (dato.roomStatus != null) {
                   switch (dato.roomStatus) {
                       case 0:
                           //Both players are ready
                           //this.time.delayedCall(10,this.scene.start("OfflineGame", [this.wsConnection, this.roomID]),null,this)
                           this.scene.start("OfflineGame", [this.wsConnection, this.roomID])

                           break;
                       case 1:
                           //Other player is ready.
                           console.log("Other player is ready")
                           break;
                       case 2:
                           //Other player is no longer ready.
                           console.log("Other player is no longer ready")
                           break;
                       case 3:
                           //Assign room.
                           this.roomID = dato.roomID;
                           console.log("Assigned room number " + this.roomID)
                           break;
                       case 4:
                           //No rooms available, request a room after a delay.
                           console.warn("No rooms were available")
                           break;
                   }
               }

           };

           this.wsConnection.onclose = (event)=> {
               console.log('Conexión WebSocket cerrada:', event);
               if(this.scene.isActive('Chat')) {
                   this.scene.launch("DisconnectedScreen", ["Chat"]);
                   this.scene.pause();
               }else if(this.scene.isActive('OfflineGame')) {
                   this.scene.launch("DisconnectedScreen", ["OfflineGame"]);
                   this.scene.pause();
               }else{
                   console.log(this.key)
               }
           };

           this.wsConnection.onerror = function (event) {
               console.error('Error en la conexión WebSocket:', event);
           };


       },this).fail((error)=>
       {
           console.error('Error en la solicitud HTTP:', error);
       },this);
       //endregion

       this.botonJugar = this.add.image(1160, 883, 'botonJugar').setScale(0.8);
       this.botonJugar.setInteractive();
        this.botonJugar.on('pointerdown', function () {
            let isReady = this.botonJugar.texture.key === "botonJugar";
            this.botonJugar.setTexture(isReady ? "botonEsperando" : "botonJugar")
            let json = {
                "roomInfo": true,
                "roomID": this.roomID,
                "isReady": isReady
            }
            this.wsConnection.send(JSON.stringify(json));
        },this)

   }

   update()
   {
        this.reloadChat()
   }

   reloadChat(){
            $.ajax({
                method: 'GET',
                url: "http://" + dataSettings.IP + ":8080/recargarChat",
            }).done((mensajes) => {
                try {
                let scroll = this.chatBox.t;
                this.chatBox.getElement('panel').removeAll(true)

                for (let mensaje of mensajes) {
                    if (mensaje[1].trim() !== '') {
                        let userMessage = (mensaje[0] === null) ? '<Anonimo>: ' : `<${mensaje[0]}>: `;

                        this.chatBox.getElement('panel').add(createMessage(this, userMessage + mensaje[1]));
                        this.chatBox.layout();
                    }
                }
                this.chatBox.setT(scroll, true);


                }catch (error){ }
            }, this).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Error:" + errorThrown);
            });
   }
}

//#region helper_functions
let createPanel = function (scene, text) {

    var textBox = scene.add.text(0,0,text);
    return  scene.rexUI.add.sizer({
        orientation: 'y',
        space: { top: 15, bottom: 15, item: 5 }
    })
        .add(textBox)
        .setSize(200, textBox.height);
}
var createMessage = function (scene, text) {

    let textBox = scene.add.text(0, 0, text,{fontSize:25,fontFamily:'Lobster'});

    let w = Phaser.Math.Clamp(textBox.width,10,900);
    let h = (Math.ceil(textBox.width/w))*textBox.height;

    let background = scene.rexUI.add.roundRectangle(0, 0, w, h-15, 10, COLOR_PRIMARY);
    textBox.destroy()
    return scene.rexUI.add.label({
        x:0, y:0,
        orientation: 'x',
        width: w + 10,
        height: h,

        background: background,
        space: { left: 5, right: 5, top: 5, bottom: 5},

        align: 'start'
    })
    .add(scene.rexUI.wrapExpandText(scene.add.text(0, 0, text,{fontSize: 25,fontFamily:'Lobster'})),
        {
            proportion: 1,
            expand: true
        }).layout()
}
//endregion