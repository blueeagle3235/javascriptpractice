class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,key,type){
        super(scene,x,y,key);
        this.scene=scene;
        this.scene.add.existing(this);
        this.scene.physics.enableBody(this,0);
    }

};
class Funkycart extends Phaser.Class{
    constructor(x,y,key,type){
        super(x,y,key);
        this.states={
            WANDER:"WANDER",
            CHASE:"CHASE"
        };
        this.state=this.states.WANDER;
    }
    update(){
        if (Phaser.Math.Distance.Between(
            this.x,
            this.y,
            player.x,
            player.y
        )<420){
            this.state=this.states.CHASE;
        }
        if (this.state==this.states.CHASE){
            var destx=player.x-this.x;
            var desty=player.y-this.y;

        }
    }
};
class test extends Phaser.Class{
    constructor(msg){
        super(msg);
        console.log(msg);
    }
};