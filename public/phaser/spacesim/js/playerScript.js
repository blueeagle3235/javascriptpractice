var config = {
    //type: Phaser.AUTO,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    //width: 800,
    //height: 600,
    //parent: 'phaser-example',
    /*scale: {
        parent: 'phaser-example',
        width: 800,
        height: 600
    },*/
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio:{

    }
};



var bg;
var stars;
var ship;
var bullets;
var lastFired = 0;
var cursors;
var fire;
var emitter;
var emitter2;
var track;
var track2;
var track3;
var text;//test text
var tracktime;
var keyP;
var keyE;
//3 track vars until i figure out a better way ;-;
var isPaused=true;
var boost;
var boostcooldown=0;

var game = new Phaser.Game(config);




function preload ()
{
    this.load.image('background', 'assets/nebula.jpg');
    this.load.image('stars', 'https://labs.phaser.io/assets/tests/space/stars.png');
    this.load.atlas('space', 'https://labs.phaser.io/assets/tests/space/space.png', 'https://labs.phaser.io/assets/tests/space/space.json');
    this.load.audio("music", [
      "assets/soundtrackneedswork.mp3",
      "assets/soundtrackneedswork.ogg",
    ]);
    this.load.audio("music2", [
      "assets/kapellosoundtrack.mp3",
      "assets/kapellosoundtrack.ogg",
    ]);
    this.load.audio("music3", [
      "assets/duriansoundtrack.mp3",
      "assets/duriansoundtrack.ogg",
    ]);

}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function create ()
{
    var Bullet = new Phaser.Class({

        Extends: Phaser.Physics.Arcade.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'space', 'blaster');

            this.setBlendMode(1);
            this.setDepth(1);

            this.speed = 1250;
            this.lifespan = 1000;

            this._temp = new Phaser.Math.Vector2();
        },

        fire: function (ship)
        {
            this.lifespan = 1000;

            this.setActive(true);
            this.setVisible(true);
            // this.setRotation(ship.rotation);
            this.setAngle(ship.body.rotation);
            this.setPosition(ship.x, ship.y);
            this.body.reset(ship.x, ship.y);

            // ship.body.advancePosition(10, this._temp);

            // this.setPosition(this._temp.x, this._temp.y);
            // this.body.reset(this._temp.x, this._temp.y);

            //  if ship is rotating we need to add it here
            // var a = ship.body.angularVelocity;

            // if (ship.body.speed !== 0)
            // {
            //     var angle = Math.atan2(ship.body.velocity.y, ship.body.velocity.x);
            // }
            // else
            // {
                var angle = Phaser.Math.DegToRad(ship.body.rotation);
            // }

            // this.body.world.velocityFromRotation(angle, this.speed + ship.body.speed, this.body.velocity);
            this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);

            this.body.velocity.x *= 1.8;
            this.body.velocity.y *= 1.8;
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
                this.body.stop();
            }
        }

    });

    //  Prepare some spritesheets and animations

    this.textures.addSpriteSheetFromAtlas('mine-sheet', { atlas: 'space', frame: 'mine', frameWidth: 64 });
    this.textures.addSpriteSheetFromAtlas('asteroid1-sheet', { atlas: 'space', frame: 'asteroid1', frameWidth: 96 });
    this.textures.addSpriteSheetFromAtlas('asteroid2-sheet', { atlas: 'space', frame: 'asteroid2', frameWidth: 96 });
    this.textures.addSpriteSheetFromAtlas('asteroid3-sheet', { atlas: 'space', frame: 'asteroid3', frameWidth: 96 });
    this.textures.addSpriteSheetFromAtlas('asteroid4-sheet', { atlas: 'space', frame: 'asteroid4', frameWidth: 64 });

    this.anims.create({ key: 'mine-anim', frames: this.anims.generateFrameNumbers('mine-sheet', { start: 0, end: 15 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid1-anim', frames: this.anims.generateFrameNumbers('asteroid1-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid2-anim', frames: this.anims.generateFrameNumbers('asteroid2-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid3-anim', frames: this.anims.generateFrameNumbers('asteroid3-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid4-anim', frames: this.anims.generateFrameNumbers('asteroid4-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });


    //  World size is 8000 x 6000

    bg = this.add.tileSprite(400, 300, 1600, 1200, 'background').setScrollFactor(0);

    //  Add our planets, etc

    this.add.image(512, 680, 'space', 'blue-planet').setOrigin(0).setScrollFactor(0.6);
    this.add.image(2833, 1246, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6);
    this.add.image(3875, 531, 'space', 'sun').setOrigin(0).setScrollFactor(0.6);
    var galaxy = this.add.image(5345 + 1024, 327 + 1024, 'space', 'galaxy').setBlendMode(1).setScrollFactor(0.6);
    this.add.image(908, 3922, 'space', 'gas-giant').setOrigin(0).setScrollFactor(0.6);
    this.add.image(3140, 2974, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6).setScale(0.8).setTint(0x882d2d);
    this.add.image(6052, 4280, 'space', 'purple-planet').setOrigin(0).setScrollFactor(0.6);
    for (var i = 0; i < 8; i++)
    {
        this.add.image(Phaser.Math.Between(0, 8000), Phaser.Math.Between(0, 6000), 'space', 'eyes').setBlendMode(1).setScrollFactor(0.8);
    }

    stars = this.add.tileSprite(400, 300, 800, 600, 'stars').setScrollFactor(0);

    var particles = this.add.particles('space');




    emitter = particles.createEmitter({
        frame: 'blue',
        speed: 90,
        lifespan: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 0, 300) * 300;
            }
        },
        alpha: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 0, 300);
            }
        },
        angle: {
            onEmit: function (particle, key, t, value)
            {
                var v = Phaser.Math.Between(-10, 10);
                return (ship.angle - 180) + v;
            }
        },
        scale: { start: 0.34, end: 0 },
        blendMode: 'ADD'
    });

    emitter2 = particles.createEmitter({
        frame: 'blue',
        speed: 60,
        lifespan: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 0, 300) * 130;
            }
        },
        alpha: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 0, 300);
            }
        },
        angle: {
            onEmit: function (particle, key, t, value)
            {
                var v = Phaser.Math.Between(-10, 10);
                return (ship.angle - 180) + v;
            }
        },
        
        scale: { start: 0.5, end: 0 },
        blendMode: 'ADD'
    });

    
    bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 40,
        runChildUpdate: true
    });



    
    ship = this.physics.add.image(4000, 3000, 'space', 'ship').setDepth(2);

    emitter.setAlpha(0.6);
    ship.setDrag(120);
    ship.setAngularDrag(-0.00001);
    ship.setMaxVelocity(600);


    emitter.startFollow(ship);
    emitter2.startFollow(ship);
    
    track = this.sound.add("music");
    //track2 = this.sound.add("music2");
    track3 = this.sound.add("music3");
    
    //track2.stop();
    //track2.currentTime = 0;
    //track2.rate = 1;

    //track2.detune = 200;

    //track2.loop = true;
    //track2.play();

    class MyScene extends Phaser.Scene {

constructor (config)
{
    super(config);
}
preload ()
{
    this.load.spritesheet('fullscreen', 'assets/rsz_full.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('pause', 'assets/pauseandplay.png', { frameWidth: 32, frameHeight: 32 });

}

create (data)
{
        //this.spritesheet=this.add.image(data.x,data.y,'fullscreen')
        track2 = this.sound.add("music2");
        track2.stop();
        track2.currentTime = 0;
        track2.rate = 1;
        track2.loop = true;
        track2.play();
        track2.pause();
        track2.pauseOnBlur=false;
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); //pausing mechanism work later



        var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
        var button2 = this.add.image(740-16, 16, 'pause', 0).setOrigin(1, 0).setInteractive();

        text = this.add.text(10, 10, '', {
                font: '16px Courier',
                fill: '#00ff00'
            });
            
button.on('pointerup', function () {

    if (this.scale.isFullscreen)
    {
        button.setFrame(0);
        track2.pause();
        this.scale.stopFullscreen();
    }
    else
    {
        button.setFrame(1);
        track2.resume();

        this.scale.startFullscreen();
    }

}, this);
//isPaused=1;//default

button2.on('pointerdown', function () {
   
   //1 equal assignment, 2 compare, 3 comparison with type,casesensitive
    if (isPaused==true){
        track2.resume();
        button2.setFrame(1);
        console.log('true1');
    } 
    else{
        track2.pause();
        console.log('true2');
        button2.setFrame(0);
    }
    isPaused=!isPaused;
    console.log(isPaused);
    /*if (isPaused=0){
    console.log('successful!');
    track2.resume();
    button2.setFrame(1);
    isPaused=0;
    }
    else {
        button2.setFrame(0);
        isPaused=1;
        track2.pause();
        console.log('paused');
    }*/


}, this);

}
update(){
    text.setText('Speed: ' + ship.body.speed);
   
    // this.input.keyboard.on('keydown-P', function () {
    //     if (isPaused==0){
    //                 track2.pause();
    //                 isPaused=1;
    //             }
    //             else if (isPaused==1){
    //                 track2.resume();
    //                 isPaused=0;
    //             }
    // });

    if (this.input.keyboard.checkDown(keyP, 750))
    {
        if (isPaused==0){
                    track2.pause();
                    isPaused=1;
                }
                else if (isPaused==1){
                    track2.resume();
                    isPaused=0;
                }    }
    // if (isPaused==0){
    //                 track2.pause();
    //                 isPaused=1;
    //             }
    //             else if (isPaused==1){
    //                 track2.resume();
    //                 isPaused=0;
    //             }
}
}

game.scene.add('myScene', MyScene, true, { x: 760, y: 40 });

    /*getRandomInt(0,3)
    if (getRandomInt(0,3)=1)
    {
        track.stop();
        track.currentTime = 0;
        track.loop = true;
        track.play();
        }
            else if (getRandomInt(0,3)=2){
                track2.stop();
            track2.currentTime = 0;
            track2.loop = true;
            track2.play();
            }
                else{
                track3.stop();
                track3.currentTime = 0;
                track3.loop = true;
                track3.play();
        }*/
    //emitter2.followOffset = new Phaser.Math.Vector2(-30,0);

    this.cameras.main.startFollow(ship); 
    //this.cameras.main.zoomTo(0.62,duration=0);

    this.cameras.main.zoomTo(0.62,duration=0);

    cursors = this.input.keyboard.createCursorKeys();
    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


    this.add.sprite(4300, 3000).play('asteroid1-anim');

    this.tweens.add({
        targets: galaxy,
        angle: 360,
        duration: 100000,
        ease: 'Linear',
        loop: -1
    });

}

function update (time, delta)
{   
    //var track2=
    //console.log(track2.currentTime); local var so cannot getvalue, try finding out later ;) i need this to work
    ship.setAcceleration(ship.body.acceleration * 0.7);
    if (cursors.left.isDown)
    {
        ship.setAngularVelocity(-150);
    }
    else if (cursors.right.isDown)
    {
        ship.setAngularVelocity(150);
    }
    else
    {
        ship.setAngularVelocity(0);
    }

    if (cursors.up.isDown)
    {   
        emitter.visible=true;
        emitter2.setAlpha(0.5);
        this.physics.velocityFromRotation(ship.rotation, 500, ship.body.acceleration);
    }
    else if (cursors.down.isDown)
    {
        this.physics.velocityFromRotation(ship.rotation, -70, ship.body.acceleration);
        ship.setAcceleration(ship.body.acceleration*0.2);

    }
    else
    {
        emitter.visible=false;
        emitter2.setAlpha(0.3);

        ship.setAcceleration(0);
    }

    if (fire.isDown && time > lastFired)
    {
        var bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(ship);

            lastFired = time + 70;
        }
    }
    if (keyE.isDown && time > boostcooldown)
    {
        var i;
        for (i=0;i<229;i++){
            ship.setMaxVelocity(1200);
            this.speed=1200;
            this.physics.velocityFromRotation(ship.rotation, 32767, ship.body.acceleration);
            
        }
            boostcooldown = time + 300;
        ship.setMaxVelocity(600);

    }
    bg.tilePositionX += ship.body.deltaX() * 0.5;
    bg.tilePositionY += ship.body.deltaY() * 0.5;

    // this.input.keyboard.on('keydown-E', function (event)
    // {   
    //     var i;
    //     for (i=0;i<229;i++){
    //         ship.physics.velocityFromRotation(ship.rotation, 12000/i, ship.body.acceleration);
            
    //     }
    // });

    stars.tilePositionX += ship.body.deltaX() * 2;
    stars.tilePositionY += ship.body.deltaY() * 2;
}
