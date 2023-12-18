class Perfil extends Phaser.Scene {
    constructor() {
        super({key: 'Perfil',})
    }

    buttonTween;
    inicioSesion;
    range = 5;
    sendButton;
    volverBoton;
    usernameInput;
    cambioBoton;
    fondo
    resaltoEnviar
    resaltoVolver
    passwordInput;
    
    updateButton;
    deleteButton;
    currentPasswordInput;
    newPasswordInput;
    sendButtonUpdate;
    userName;
    confirmDelete;
    buttonYes;
    buttonNo;
    preload()
    {
        this.inicioSesion = true;
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);

        this.load.spritesheet('cambioBoton',"Assets/Perfil/CambioBoton.png",{ frameWidth: 241, frameHeight: 36 })
        this.load.image('resaltoEnviar',"Assets/Perfil/resaltoEnviar.png")
        this.load.image('resaltoVolver',"Assets/Perfil/resaltoVolver.png")
        this.load.image('botonVolver',"Assets/Perfil/BotonVolver.png")
        this.load.image('botonEnviar',"Assets/Perfil/BotonEnviar.png")
        this.load.image('fondoInicioSesion',"Assets/Perfil/FondoInicioSesion.png")
        this.load.image('fondoRegistrarse',"Assets/Perfil/FondoRegistrarse.png")
        this.load.image('fondo',"Assets/Chat/fondoChat.png")
        
		/*
        this.load.image('backgroundU', 'Assets/UnderConstructionMenu/Background.png')
        this.load.image('chains', 'Assets/UnderConstructionMenu/Chains.png')
        this.load.image('foreground', 'Assets/UnderConstructionMenu/Foreground.png')
        this.load.image('return', 'Assets/UnderConstructionMenu/ReturnButton.png')
        this.load.image('shadow', 'Assets/UnderConstructionMenu/Shadow.png')
        */
    }
    create(data) {

        let prevScene = data[0];
        let gameScene = data[1]
        

        this.fondo = this.add.image(960,540,'fondoInicioSesion');
        this.resaltoEnviar = this.add.image(960,883,'resaltoEnviar')
        this.resaltoVolver = this.add.image(294,120,'resaltoVolver')
        this.resaltoEnviar.visible = false;
        this.resaltoVolver.visible = false;
     //#region BOTON UPDATE 
        this.updateButton = this.add.image(960,400,'botonEnviar');
        this.updateButton.visible = false;
        
         this.updateButton.on('pointerdown', ()=> {
         
         this.currentPasswordInput.setActive(true).setVisible(true);
         this.newPasswordInput.setActive(true).setVisible(true);
         
         
         this.deleteButton.disableInteractive();
         this.deleteButton.visible = false;
          this.sendButtonUpdate = this.add.image(960,883,'resaltoEnviar');
          this.sendButtonUpdate.setInteractive();
          this.sendButtonUpdate.on('pointerdown',function () {
			const currentPassword = this.currentPasswordInput.text;
            const newPassword = this.newPasswordInput.text;
            
            if(currentPassword.length === 0 || newPassword.length === 0){
                console.log("Alguno de los campos esta vacio")
                return;
            }

            const data = {
                username: currentPassword,
                password: newPassword
            };
            var IP = "127.0.0.1";
            
            	$.ajax({
    	method: 'PUT',
    	url: "http://"+IP+":8080/actualizar",
    	contentType: 'application/json', 
    	data: JSON.stringify(data),
		}).done( (data)=> {
			
    	console.log("¡Éxito!");
    	console.log(data);
    	if(data==="actualizada")
    	{
			if(typeof prevScene !== "string"){
                this.scene.start('MainMenu')
                this.userName=null;
           } else {		
                console.log(prevScene)
                this.scene.wake(prevScene);
            }
         }   	
		},this).fail(function () {
    	console.log("Error:");	
		});		
		},this);       
         },this);
    //#endregion 
   
   
        this.deleteButton = this.add.image(960,800,'botonEnviar');
        this.deleteButton.visible = false;
        this.confirmDelete = this.add.image(960,400,'botonEnviar')//que ponga quieres borrar la cuenta?
        this.confirmDelete.visible = false;
        this.buttonNo = this.add.image(600,800,'botonEnviar')
        this.buttonYes = this.add.image(1200,800,'botonEnviar')
        this.buttonNo.visible = false;
        this.buttonYes.visible = false;
        
        this.deleteButton.on('pointerdown', ()=> {
			
			this.updateButton.visible = false;
			this.updateButton.disableInteractive();
			this.deleteButton.visible=false;
			this.deleteButton.disableInteractive();
			
			this.confirmDelete.visible = true;
			this.buttonNo.visible = true;
			this.buttonNo.setInteractive();
        	this.buttonYes.visible = true;
        	this.buttonYes.setInteractive();
        	
        	this.buttonYes.on('pointerdown', ()=> {
				var IP = "127.0.0.1";
				 $.ajax({
    			method: 'DELETE',
    			url: "http://"+IP+":8080/borrarCuenta",
    
				}).done( (data)=> {
    			console.log("¡Éxito!");
    			console.log(data);   	
  				if(typeof prevScene !== "string"){
                this.scene.start('MainMenu')
                this.userName=null;
           		} else {		
                console.log(prevScene)
                this.scene.wake(prevScene);
            	}
				}).fail(function () {
    			console.log("Error:");
    
				});
				
			},this);
			
				this.buttonNo.on('pointerdown', ()=> {
					
					this.confirmDelete.visible = false;
					this.buttonNo.visible = false;
					this.buttonNo.disableInteractive();
        			this.buttonYes.visible = false;
        			this.buttonYes.disableInteractive();
					
					this.updateButton.visible = true;
					this.updateButton.setInteractive();
					this.deleteButton.visible=true;
					this.deleteButton.setInteractive();
					
				},this);
			
			
			
		},this);
        
        
        

        this.sendButton = this.add.image(960,883,'botonEnviar');
        this.sendButton.setInteractive();
        this.sendButton.on('pointerover',function () {
            //this.resalto.setPosition(this.sendButton.x, this.sendButton.y);
            this.resaltoEnviar.visible = true;
        },this)
        this.sendButton.on('pointerout',function () {
            this.resaltoEnviar.visible = false;
        },this)
        this.sendButton.on('pointerdown',  () => {
            const username = this.usernameInput.text;
            const password = this.passwordInput.text;

            if(username.length === 0 || password.length === 0){
                console.log("Alguno de los campos esta vacio")
                return;
            }

            const data = {
                username: username,
                password: password
            };

            var IP = "127.0.0.1"

            if(this.inicioSesion) {
                $.ajax({
                    method: 'POST',
                    url: "http://" + IP + ":8080/login",
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                }).done((data) => {
                    console.log("¡Exito!");
                    console.log(data);
					if(data === "Login exitoso")
					{
						this.userName = username;
						this.fondo.setTexture("fondo");
						//desactivamos
						this.sendButton.disableInteractive()
						this.sendButton.visible = false;
						this.cambioBoton.disableInteractive();
						this.cambioBoton.visible = false;
						this.resaltoEnviar.visible=false;
						this.usernameInput.setActive(false).setVisible(false);
						this.passwordInput.setActive(false).setVisible(false);
						//activamos
						this.updateButton.setInteractive();
        				this.updateButton.visible = true;
        				this.deleteButton.setInteractive();
        				this.deleteButton.visible = true;
        				
        										
					}
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("Error:");

                });
            }else{
                $.ajax({
                    method: 'POST',
                    url: "http://" + IP + ":8080/register",
                    contentType: 'application/json', // Utiliza 'contentType' en lugar de 'datatype'
                    data: JSON.stringify(data),
                }).done(function (data) {
                    console.log("¡Éxito!");
                    console.log(data);

                }).fail(function () {
                    console.log("Error:");
                });
            }
        },this)

        this.cambioBoton = this.add.image(960,961,'cambioBoton').setFrame(0);
        this.cambioBoton.setInteractive();

        this.cambioBoton.on('pointerdown', function () {
            this.inicioSesion = !this.inicioSesion;
            if(this.inicioSesion) {
                this.cambioBoton.setFrame(0)
                this.fondo.setTexture("fondoInicioSesion")
            }
            else {
                this.cambioBoton.setFrame(1);
                this.fondo.setTexture("fondoRegistrarse")
            }
        },this)


        this.volverBoton = this.add.image(294,120,'botonVolver');
        this.volverBoton.setInteractive();
        this.volverBoton.on('pointerover',function () {
            //this.resalto.setPosition(this.sendButton.x, this.sendButton.y);
            this.resaltoVolver.visible = true;
        },this)
        this.volverBoton.on('pointerout',function () {
            this.resaltoVolver.visible = false;
        },this)
        this.volverBoton.on("pointerdown",function () {
            if(typeof prevScene !== "string")
                this.scene.start('MainMenu')
            else {
                console.log(prevScene)
                this.scene.wake(prevScene);
            }
            this.scene.sleep();
        },this)


        //#region TEXT INPUT REGION
        this.usernameInput = this.add.rexInputText(960, 551, 510, 70, {
            type: 'text',
            //text: 'Maldita sea',
            placeholder: 'Introducir usuario',

            backgroundColor: 'transparent',
            fontFamily: "Gill Sans",

            align: 'center',
            fontSize: '30px',
            color: '#331502',
        }).on('textchange', function(inputText, e)
        {
            inputText.align = inputText.text.length <= 0 ? 'center' : 'start';
        }, this);

        this.passwordInput = this.add.rexInputText(960, 711, 510, 70, {
            type: 'password',
            //text: 'Maldita sea',
            placeholder: 'Introducir contraseña',

            fontFamily: "Gill Sans",

            align: 'center',
            fontSize: '30px',
            color: '#331502',
        }).on('textchange', function(inputText, e)
        {
            inputText.align = inputText.text.length <= 0 ? 'center' : 'start';
        }, this);
        
         this.currentPasswordInput = this.add.rexInputText(960, 551, 510, 70, {
            type: 'text',
            //text: 'Maldita sea',
            placeholder: 'Introducir contraseña actual',

            backgroundColor: 'transparent',
            fontFamily: "Gill Sans",

            align: 'center',
            fontSize: '30px',
            color: '#331502',
        }).on('textchange', function(inputText, e)
        {
            inputText.align = inputText.text.length <= 0 ? 'center' : 'start';
        }, this);
        this.currentPasswordInput.setActive(false).setVisible(false);
        
        this.newPasswordInput = this.add.rexInputText(960, 700, 510, 70, {
            type: 'text',
            //text: 'Maldita sea',
            placeholder: 'Introducir contraseña nueva',

            backgroundColor: 'transparent',
            fontFamily: "Gill Sans",

            align: 'center',
            fontSize: '30px',
            color: '#331502',
        }).on('textchange', function(inputText, e)
        {
            inputText.align = inputText.text.length <= 0 ? 'center' : 'start';
        }, this);
        this.newPasswordInput.setActive(false).setVisible(false);
        
        
    //#endregion

    }
    update(){

    }
}