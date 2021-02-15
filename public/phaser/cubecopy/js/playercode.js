var config={
    width:800,
    height:600,
    physics:{
        default:"arcade"
    },
    scene: {
                preload: preload,
                create: create,
                update: update
            }
}
var game=new Phaser.Game(config);
var player;
console.warn('Failed to load Javascript. If this error persists, restart your machine');
var items;
var fire;
var lastFired=0;
var keyA;
var keyD;
var bullets;
var reticle;
var funkycarts;

var Bullet = new Phaser.Class({

Extends: Phaser.GameObjects.Image,

initialize:

// Bullet Constructor
function Bullet (scene)
{
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    this.speed = 1;
    this.born = 0;
    this.direction = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.setSize(12, 12, true);
},

// Fires a bullet from the player to the reticle
fire: function (shooter, target)
{
    this.setPosition(shooter.x, shooter.y); // Initial position
    this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

    // Calculate X and y velocity of bullet to moves it from shooter to target
    if (target.y >= this.y)
    {
        this.xSpeed = this.speed*Math.sin(this.direction);
        this.ySpeed = this.speed*Math.cos(this.direction);
    }
    else
    {
        this.xSpeed = -this.speed*Math.sin(this.direction);
        this.ySpeed = -this.speed*Math.cos(this.direction);
    }

    this.rotation = shooter.rotation; // angle bullet with shooters rotation
    this.born = 0; // Time since new bullet spawned
},

// Updates the position of the bullet each cycle
update: function (time, delta)
{
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.born += delta;
    if (this.born > 1800)
    {
        this.setActive(false);
        this.setVisible(false);
    }
}

});


function preload(){
    this.load.image('player','assets/star.png');
    this.load.image('bomb','assets/bomb.png');
    this.load.image('bullet','assets/bomb.png');
    this.load.image('target', 'assets/ball.png');


};
function touchbomb(player,item){
        item.disableBody(true,true);
        console.info(config);
        //console.log('you touched the bomb');
    }
function create(){
    reticle = this.physics.add.sprite(800, 700, 'target');
    player=this.physics.add.image(400,300,'player');
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);


    funkycarts = this.physics.add.group({
        classType: Funkycart,
        maxSize: 40,
        physicsType:'arcade',
        runChildUpdate: true
    });
    console.info(funkycarts);
    console.info(bullets);
    //new Funkycart;
    items = this.physics.add.group({
                key: "bomb",
                repeat: 1,
                setXY: {
                    x: Phaser.Math.Between(0,800),
                    y: Phaser.Math.Between(0,600),
                }
            });
    this.physics.add.overlap(player, items, touchbomb, null, this);
    // bullet=new Phaser.Class({
    //     initialize:
    //     function Bullet(scene){
    //         new Image(scene,0,0,'bullet');

    //     },
    //     fire:function(player){
    //         this.lifespan=1200;
    //         this.setActive=true;
    //         this.setVisible=true;
    //         this.setAngle(player.body.rotation);
    //         this.setPosition(player.x,player.y);
    //         this.body.reset(player.x,player.y);
    //         var angle=Phaser.Math.DegToRad(player.body.rotation);

    //         this.scene.physics.velocityFromRotation(angle,this.speed,this.body.velocity);
    //     },
    //     update: function (time, delta)
    //     {
    //         this.lifespan -= delta;

    //         if (this.lifespan <= 0)
    //         {
    //             this.setActive(false);
    //             this.setVisible(false);
    //             this.body.stop();
    //         }
    //     }
    // })
    // var Bullet = new Phaser.Class({
    //     Extends: Phaser.Physics.Arcade.Image,
        
    //     initialize:

    //     function Bullet (scene){
    //         Phaser.Physics.Arcade.Image.call(this,scene,0,0,'bullet','bullet');
            
    //         this.setBlendMode(1);
    //         this.setDepth(1);

    //         this.speed=300;
    //         this.lifespan=1200;

    //         this._temp= new Phaser.Math.Vector2();
    //     },
        
    //     fire: function(player)
    //     {
        
    //     this.lifespan=1200;
        
    //     this.setActive(true);
    //     this.setVisible(true);
    //     this.setAngle(player.body.rotation);
    //     this.setPosition(player.x,player.y);
    //     this.body.reset(player.x,player.y);
        


    //     var angle=Phaser.Math.DegToRad(player.body.rotation);

    //     this.scene.physics.velocityFromRotation(angle,this.speed,this.body.velocity);

    //     this.body.velocity.x*=1.8;
    //     this.body.velocity.y*=1.8;
        
    //     },
    //     update: function (time, delta)
    //     {
    //         this.lifespan -= delta;

    //         if (this.lifespan <= 0)
    //         {
    //             this.setActive(false);
    //             this.setVisible(false);
    //             this.body.stop();
    //         }
    //     }
    // });
    bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 40,
        runChildUpdate: true
    });

    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_E', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;
        }
    }, this);
    this.input.keyboard.on('keydown_F', function (event) {
        var funkcar=funkycarts.get().setActive(true).setVisible(true);
        if (funkcar){
            new Funkycart;
        }
    }, 0, this);
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = bullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(player, reticle);
            //this.physics.add.collider(enemy, bullet, enemyHitCallback);
        }
    }, this);
};
function update(time,delta){
    time++;
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.setAcceleration(0);
    player.setAngularVelocity(0);

    if (cursors.left.isDown){
        player.setVelocityX(-100);
    }
    if (cursors.right.isDown){
        player.setVelocityX(100);

    }
    if (cursors.up.isDown){
        player.setVelocityY(-100);
    }
    if (cursors.down.isDown){
        player.setVelocityY(100);
    }
    // if (fire.isDown && time > lastFired)
    // {
    //     var bullet = bullets.get();

    //     if (bullet)
    //     {
    //         bullet.fire(player,reticle);

    //         lastFired = time + 70;
    //     }
    // }
    
};
