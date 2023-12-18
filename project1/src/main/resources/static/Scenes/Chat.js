class Chat extends Phaser.Scene {
    constructor() {
        super({key: 'Chat',})
    }
    
    
    
   botonEnviar;
   fondo;
   chatInput;
   chatBox;
   
   preload()
   {
	   this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
	   this.load.image('botonEnviar',"Assets/Perfil/BotonEnviar.png")
	   this.load.image('fondoChat',"Assets/Chat/fondoChat.png")
	   this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
   }
   create()
   {
	   this.fondo = this.add.image(960,540,'fondoChat');
	   this.botonEnviar = this.add.image(960,883,'botonEnviar');
	   this.botonEnviar.setInteractive();
	   this.chatBox = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            width: 600,

            scrollMode: 0,

            panel: {
                child: CreatePanel(this),
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },
        });
	   
	   this.chatInput = this.add.rexInputText(960, 551, 510, 70, {
            type: 'textArea',         
            placeholder: 'Introducir mensaje',
            backgroundColor: 'transparent',
            fontFamily: "Gill Sans",
            align: 'center',
            fontSize: '30px',
            color: '#331502',
        })

	   
	   this.botonEnviar.on('pointerdown', function () {
		   
		   
		   
		   
	   var mensajeInput = this.chatInput.text;
       var chatBox = document.getElementById('chatBox');
       var mensaje = mensajeInput.value;
       mensajeInput.value = ''; // Limpiar el campo de texto después de enviar el mensaje

      if (mensaje.trim() !== '') {
          let nuevoMensaje = document.createElement('p');
          nuevoMensaje.innerHTML = '<strong>Tu:</strong> ' + mensaje;
          chatBox.appendChild(nuevoMensaje);
        
          $.ajax({
          method: 'POST',
          url: "http://127.0.0.1:8080/envioTexto",
          contentType: 'application/json', // Utiliza 'contentType' en lugar de 'datatype'
          data: JSON.stringify(mensaje),
          }).done(function (mensaje, textStatus, jqXHR) {
          console.log("¡Éxito!");

          }).fail(function (jqXHR, textStatus, errorThrown) {
          console.log("Error:");

        });
      }
	   },this);
	 
    
    function recargarChat() {
      $.ajax({
        method: 'GET',
        url: "http://127.0.0.1:8080/recargarChat",
      }).done(function (mensajes)
        {
          let chatBox = document.getElementById('chatBox');

          while (chatBox.firstChild) {
            chatBox.removeChild(chatBox.lastChild);
          }

          for (let mensaje of mensajes) {
            if (mensaje.trim() !== '') {
              let nuevoMensaje = document.createElement('p');
              nuevoMensaje.innerHTML = `<strong>Tu:</strong> ${mensaje.slice(1,-1)}`;
              chatBox.appendChild(nuevoMensaje);
          }
        }


      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error:" + errorThrown);

      });
    }
   }
   
   update()
   {
	   
	   
   }
  
   
   
   
   
   
   }