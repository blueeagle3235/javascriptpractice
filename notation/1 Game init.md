# Game initializing

The first step in creating a game with phaser is getting the source code script in your index.html file. You can use this code below:
```js
    <script src="//cdn.jsdelivr.net/npm/phaser@3.16.2/dist/phaser.min.js"></script>    
```

The second step would be initializing the config file, that stores config about your phaser project, saving settings for audio, scenes, width, height, and even advanced functions.

```js
var config={
    type=Phaser.AUTO
    //plus a lot more cool stuff, such as width, height, scenes, and music!
};
```
Once you have both the source code in your html, and the config file set up, you can actually initialize the game, by running the code below:
```js
var game=new Phaser.Game;
//really whatever var you want, game is for simplicity
```

Now that you have followed all of the steps, you should be ready to code with your new Phaser game! 

Note: you can put scenes before you actually config the files, just make sure you have the src ready, otherwise nothing will work.

## Basic Game Functions

When you have your game set up, you would want to set up the three functions: Preload, Create and Update. These three functions are essential for your game because if you really want a game with assets and all of your cool creations, you need these functions.

### Preload

Preload is a really important function, for as the name explains, it preloads your pictures, audio, sprites, animations, pretty much anything that it is compatible with. You can set up a preload function by using
```js
var game = new Phaser.Game(config);
//has to be after game var declaration
function preload ()
{
    this.load.image('temp1','http://labs.phaser.io/src/games/firstgame/assets/sky.png');
    //for this demo we will be loading in a default picture, the sky. You can load in pictures from the internet as illustrated, or upload from a folder or just upload, even though that is not suggested.
    this.load.image('temp2','assets/temp.png');
    //for this second demo we will load from our 'assets' folder. Keep in mind it can be named whatever, and whatever image.
}
```
When you load all of your assets, or if you just feel ready for creation, you can declare your create function.

### Create

In the create function, you can pretty much as said create your game, by using the assets loaded in the preload and putting them into your game.

```js
function create(){
    this.add.image(300,400,'temp2');
    //              x   y   image from before
}
```
This code will make your image show up in the middle of your screen, provided that you set 'x' to 800 and 'y' to 600 in your config var. When you have declared your variables and settings as this code below:


example from firstgame, found at http://labs.phaser.io/view.html?src=src\games\firstgame\part7.js
```js
function create ()
{
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
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
```
You can create all of your physics configurations and variables, cursor keys and define most of the game with the create function. Once you have configured most of your stuff, defined and/or loaded it into the game/for further use you can proceed to the update function.

### Update

The update function is really useful, since it pretty much updates at 30-60fps (30-60 frames per second!!)
You can put a lot of code into your update function, as it checks 30-60 times per second. In the firstgame project, you can see that the project has all of the physics update functions, with the cursor key checker in the update function:
```js
function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
```

Once you have completed your update function, your simple game is ready to go! If you want to learn more, check out the next in the series, Scenes. You can have multiple scenes in one project, which pretty much means you can have multiple games in one project!