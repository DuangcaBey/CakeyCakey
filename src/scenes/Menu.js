class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/shooo.wav');
        this.load.audio('sfx_rocket', './assets/pop.wav');
        this.load.audio('sfx_bgm', './assets/BGM.wav');

    }

    create() {

      

      let bgm = this.sound.add('sfx_bgm');

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
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500,
            fixedHeight: 65,
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 32, 'C a k e y  💜  C a k e y', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 120, 'Use ←(A)→(D) arrows to move & ⬆(W) to fire', titleConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 128, 'Press ← for Novice or → for Expert', titleConfig).setOrigin(0.5);

        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        bgm.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {

          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {

          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyA)) {

          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {

          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
    
}