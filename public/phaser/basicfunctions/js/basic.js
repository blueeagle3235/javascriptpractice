var player;
var platforms;
var cursors;
var velocity;
class scene1 extends Phaser.Scene{

    constructor(){
        super({ key: 'scene1' });
    }
    preload(){
        console.log('preloaded');
        this.load.image('doge','assets/Doge.jpg');
    }

    create(){
        console.log('create');
        this.doge=this.add.image(400,300,'doge');
    }

    update(){
        this.input.once('pointerup', function (event) {

            this.scene.stop('scene2');
            this.scene.start('scene2');

        }, this);
    }
}

class scene2 extends Phaser.Scene{

    constructor(){
        super({ key: 'scene2' });
    }
    
    preload(){
        console.log('preloaded');
        this.load.image('djt','assets/djt.jpg');
    }

    create(){
        console.log('create');
        this.doge=this.add.image(400,300,'djt');
    }

    update(){
        this.input.once('pointerup', function (event) {

            this.scene.stop('scenegame');
            this.scene.start('scenegame');

        }, this);
    }
}

class scenegame extends Phaser.Scene{

    constructor(){
        super({
            key:"scenegame"
        })
    }

    preload(){
        console.log('READ<MJE GJHJKAHDJDDJDDSASSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
        this.load.image('sky', 'http://labs.phaser.io/src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'http://labs.phaser.io/src/games/firstgame/assets/platform.png');
        this.load.spritesheet('dude', 'http://labs.phaser.io/src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();
    
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        velocity=0;
        player = this.physics.add.sprite(100, 450, 'dude');
    
        player.setBounce(.0225);
        player.setCollideWorldBounds(true);
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    
        cursors = this.input.keyboard.createCursorKeys();
    
        this.physics.add.collider(player, platforms);
    }

    update(){
        if (cursors.left.isDown)
        {
            //player.setVelocityX(-240);
            velocity=velocity-33;
            velocity=velocity*0.904;
            player.setVelocityX(velocity);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            //player.setVelocityX(240);
            velocity=velocity+33;
            velocity=velocity*0.91;
            player.setVelocityX(velocity);
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(velocity);
            velocity=velocity*0.89;
            player.anims.play('turn');
        }
        // if (velocity>266){
        //     velocity=266;
        // }
        // else if (velocity<-266){
        //     velocity=-266;
        // }
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-430);
        }
    }

}



// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     backgroundColor: '#000000',
//     parent: 'phaser-example',
//     scene: [ scene1,scene2 ]
// };

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 520 },
            debug: true
        }
    },
    scene:
        [ scene1,scene2,scenegame ]
        // preload: preload,
        // create: create,
        // update: update,
};

var game = new Phaser.Game(config);

