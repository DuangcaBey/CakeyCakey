let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP, keyR, keyLEFT, keyRIGHT;
let keyW, keyA, keyD;

//Mods/Changes for this Assignment
// [60] Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
// [30] Implement a simultaneous two-player mode
// [10] Replace the UI borders with new artwork
// [10] Create a new title screen (e.g., new artwork, typography, layout)
// [5] Add your own (copyright-free) background music to the Play scene
// [5] Create a new scrolling tile sprite for the background