class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
        //this.sfxBGM = scene.sound.add('sfx_bgm', './assets/bgm.mp3');
    }

    preload() {

        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/shooo.wav');
        this.load.audio('sfx_rocket', './assets/pop.wav');

    }

    create() {

        let titleConfig = {
            fontFamily: 'Couier New',
            fontSize: '20px',
            
            color: '#8AF9D4',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let menuConfig = {
            fontFamily: 'Cursive',
            fontSize: '40px',
            backgroundColor: '#C5BBFF',
            color: '#843BA7',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        
        

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 32, 'C a k e y  💜  C a k e y', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 120, 'Use ←→ arrows to move & (F) to fire', titleConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 128, 'Press ← for Novice or → for Expert', titleConfig).setOrigin(0.5);


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {

          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          //this.sfxBGM.play();
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {

          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          //this.sfxBGM.play();
          this.scene.start("playScene");    
        }
      }
}