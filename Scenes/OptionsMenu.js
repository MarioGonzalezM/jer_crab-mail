class OptionsMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'OptionsMenu' })
    }

    preload(){
        this.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true);

        this.load.image('optionsBackground','Assets/OptionsMenu/OptionsBackground.png')
        this.load.image('optionsReturn','Assets/OptionsMenu/OptionsReturn.png')
        this.load.image('optionsQuit','Assets/OptionsMenu/OptionsQuit.png')
        this.load.image('optionsForeground','Assets/OptionsMenu/OptionsForeground.png')
        this.load.spritesheet('sliderCrab','Assets/OptionsMenu/OptionsSlider.png', { frameWidth: 185, frameHeight: 142 });
        this.delay = 0;
    }
    sliders
    sliderCrab1;
    sliderCrab2;
    sliderCrab3;
    cursorsKey
    delay;
    returnButton;
    quitButton;
    create(data){
        let prevScene = data[0];
        let gameScene = data[1]
        this.sliders = new Array(3);
        /*
        let spacing = 0;
        let self = this;
        for(let slider of this.sliders){
            //Create and position
            slider = self.add.sprite(960, 475 + spacing, 'sliderCrab')
            spacing += 250;
            //Add label
            slider.text = self.add.text(0,0, '', {
                fontSize: '20px',
                align: 'center',
                fontFamily: 'cursive'
            });
            //Add slider functionality
            slider.slider = self.plugins.get('rexsliderplugin').add(slider, {
                endPoints: [{
                    x: slider.x - 520,
                    y: slider.y
                },
                    {
                        x: slider.x + 520,
                        y: slider.y
                    }
                ],
                value: 1.0
            });
            //Add slider embellishments
            slider.delay = 0.0;
            slider.slider.on('valuechange', function(newValue, prevValue)
            {
                slider.delay += 0.34;
                if(self.delay < 1)  return
                self.delay = 0;
                let sign =Math.sign((newValue*10.0 - prevValue*10.0))
                console.log(sign )
                let nextFrame = (slider.frame.name + sign)%8;
                if(nextFrame < 0) nextFrame = 7;
                console.log("UwU" + nextFrame)
                slider.setFrame(nextFrame);
            });
        }*/
        this.add.image(960, 540, 'optionsBackground');
        this.sliderCrab1 = this.add.sprite(960, 475, 'sliderCrab')
        this.sliderCrab2 = this.add.sprite(960, 695, 'sliderCrab')
        this.sliderCrab3 = this.add.sprite(960, 915, 'sliderCrab')

        /**/
        //#region SET SLIDERS region
        this.sliderCrab1.slider = this.plugins.get('rexsliderplugin').add(this.sliderCrab1, {
            endPoints: [{
                x: this.sliderCrab1.x - 520,
                y: this.sliderCrab1.y
            },
                {
                    x: this.sliderCrab1.x + 520,
                    y: this.sliderCrab1.y
                }
            ],
            value: 1.0
        });
        this.sliderCrab2.slider = this.plugins.get('rexsliderplugin').add(this.sliderCrab2, {
            endPoints: [{
                x: this.sliderCrab2.x - 520,
                y: this.sliderCrab2.y
            },
                {
                    x: this.sliderCrab2.x + 520,
                    y: this.sliderCrab2.y
                }
            ],
            value: 1.0
        });
        this.sliderCrab3.slider = this.plugins.get('rexsliderplugin').add(this.sliderCrab3, {
            endPoints: [{
                x: this.sliderCrab3.x - 520,
                y: this.sliderCrab3.y
            },
                {
                    x: this.sliderCrab3.x + 520,
                    y: this.sliderCrab3.y
                }
            ],
            value: 1.0
        });

        let self = this;
        this.sliderCrab1.slider.on('valuechange', function(newValue, prevValue)
        {
            self.delay += 0.34;
            if(self.delay < 1)  return
            self.delay = 0;
            let sign =Math.sign((newValue*10.0 - prevValue*10.0))
            let nextFrame = (self.sliderCrab1.frame.name + sign)%8;
            if(nextFrame < 0) nextFrame = 7;
            self.sliderCrab1.setFrame(nextFrame);
            eventManager.emit('master-sound-change',self.sliderCrab1.slider.value)
        });
        this.sliderCrab2.slider.on('valuechange', function(newValue, prevValue)
        {
            self.delay += 0.34;
            if(self.delay < 1)  return
            self.delay = 0;
            let sign =Math.sign((newValue*10.0 - prevValue*10.0))
            let nextFrame = (self.sliderCrab2.frame.name + sign)%8;
            if(nextFrame < 0) nextFrame = 7;
            self.sliderCrab2.setFrame(nextFrame);
            eventManager.emit('master-sound-change',self.sliderCrab2.slider.value)
        });
        this.sliderCrab3.slider.on('valuechange', function(newValue, prevValue)
        {
            self.delay += 0.34;
            if(self.delay < 1)  return
            self.delay = 0;
            let sign =Math.sign((newValue*10.0 - prevValue*10.0))
            let nextFrame = (self.sliderCrab3.frame.name + sign)%8;
            if(nextFrame < 0) nextFrame = 7;
            self.sliderCrab3.setFrame(nextFrame);
            eventManager.emit('master-sound-change',self.sliderCrab3.slider.value)
        });
        this.text1 = this.add.text(0,0, '', {
            fontSize: '20px',
            align: 'center',
            fontFamily: 'cursive'
        });
        this.text2 = this.add.text(0,0, '', {
            fontSize: '20px',
            align: 'center',
            fontFamily: 'cursive'
        });
        this.text3 = this.add.text(0,0, '', {
            fontSize: '20px',
            align: 'center',
            fontFamily: 'cursive'
        });
        //#endregion
        //*/

        this.quitButton = this.add.image(351, 120, 'optionsQuit');
        this.returnButton =  this.add.image(1569, 120, 'optionsReturn');
        
        this.quitButton.setInteractive()
        this.quitButton.on("pointerdown",function () {
            if(typeof gameScene === "string"){
                this.scene.stop(prevScene);
                this.scene.stop(gameScene);
            }
            this.scene.start('MainMenu');
        },this)
        this.returnButton.setInteractive()
        this.returnButton.on("pointerdown",function () {
            if(typeof prevScene !== "string")
                this.scene.start('MainMenu')
            else {
                console.log(prevScene)
                this.scene.wake(prevScene);
            }
            this.scene.sleep();
        },this)
        this.add.image(960, 540, 'optionsForeground');
        this.cursorsKey = this.input.keyboard.createCursorKeys()
    }

    update(){

        /*for(let slider of this.sliders){
            slider.text.setText(Math.floor(slider.slider.value*100));
            slider.text.x = slider.x - (this.text.width/2);
            slider.text.y = slider.y - 5;
        }//*/

        /**/this.text1.setText(Math.floor(this.sliderCrab1.slider.value*100));
        this.text1.x = this.sliderCrab1.x-(this.text1.width/2)
        this.text1.y = this.sliderCrab1.y - 5

        this.text2.setText(Math.floor(this.sliderCrab2.slider.value*100));
        this.text2.x = this.sliderCrab2.x-(this.text2.width/2)
        this.text2.y = this.sliderCrab2.y - 5

        this.text3.setText(Math.floor(this.sliderCrab3.slider.value*100));
        this.text3.x = this.sliderCrab3.x-(this.text3.width/2)
        this.text3.y = this.sliderCrab3.y - 5
        //*/
    }
}