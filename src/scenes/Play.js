class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('plate', './assets/plate.png');
        this.load.image('plate_p2', './assets/plate_p2.png');
        this.load.image('cake', './assets/cake.png');
        this.load.image('bg', './assets/bg.png');

        
        this.load.spritesheet('kaboom', './assets/kaboom.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('kaboom_1', './assets/kaboom_1.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }


    create() {

        

        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);


        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xD3FAFF).setOrigin(0, 0);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffc0ca).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xffc0ca).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffc0ca).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffc0ca).setOrigin(0 ,0);


        
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'plate').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket_p2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'plate_p2').setOrigin(0.5, 0);


        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'cake', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'cake', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'cake', 0, 10).setOrigin(0,0);


        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);



        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('kaboom_1', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });


        this.p1Score = 0;
        this.p2Score = 0;


        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#C5BBFF',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        

        this.scoreLeft = this.add.text(borderUISize + borderPadding + 455, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig);


        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        

    }

    update() {

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.p1Score);
            this.sound.play('sfx_select');
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.bg.tilePositionX -= 4;

        if(!this.gameOver) {
            this.p1Rocket.update(); 
            this.p2Rocket.update(); 
            this.ship01.update(); 
            this.ship02.update();
            this.ship03.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplodep1(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplodep1(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplodep1(this.ship01);
        } 

        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplodep2(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplodep2(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplodep2(this.ship01);
        } 

        
    }

    checkCollision(plate, ship) {

        if (plate.x < ship.x + ship.width && 
            plate.x + plate.width > ship.x && 
            plate.y < ship.y + ship.height &&
            plate.height + plate.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    checkCollision(plate_p2, ship) {

        if (plate_p2.x < ship.x + ship.width && 
            plate_p2.x + plate_p2.width > ship.x && 
            plate_p2.y < ship.y + ship.height &&
            plate_p2.height + plate_p2.y > ship. y) {
                return true;
        } else {
            return false;
        }
        
    }

    shipExplodep1(ship) {

        ship.alpha = 0;                         

        let boom = this.add.sprite(ship.x, ship.y, 'kaboom_1').setOrigin(0, 0);
        boom.anims.play('explode');            
        boom.on('animationcomplete', () => {   
            ship.reset();                       
            ship.alpha = 1;                    
            boom.destroy();                     
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_explosion');
    }

    shipExplodep2(ship) {

        ship.alpha = 0;                         

        let boom = this.add.sprite(ship.x, ship.y, 'kaboom_1').setOrigin(0, 0);
        boom.anims.play('explode');            
        boom.on('animationcomplete', () => {   
            ship.reset();                       
            ship.alpha = 1;                    
            boom.destroy();                     
        });

        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        
        this.sound.play('sfx_explosion');
    }
    
}