
// GameBoard code below

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

class Circle {
    constructor(game, color, radius) {
        this.player = 1;
        this.radius = radius;
        this.visualRadius = 500;
        this.colors = ["Red", "Green", "Blue", "White"];
        this.color = color;
        // this.setNotIt();
        Entity.call(this, game, this.radius + Math.random() * (800 - this.radius * 2), this.radius + Math.random() * (800 - this.radius * 2));
        this.velocity = { x: Math.random() * 1000, y: Math.random() * 1000 };
        var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (speed > maxSpeed) {
            var ratio = maxSpeed / speed;
            this.velocity.x *= ratio;
            this.velocity.y *= ratio;
        }
    }
    setIt() {
        this.it = true;
        this.color = "Red";
        this.visualRadius = 500;
    }
    setNotIt() {
        this.it = false;
        this.color = 3;
        this.visualRadius = 200;
    }
    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    }
    collideLeft() {
        return (this.x - this.radius) < 0;
    }
    collideRight() {
        return (this.x + this.radius) > 800;
    }
    collideTop() {
        return (this.y - this.radius) < 0;
    }
    collideBottom() {
        return (this.y + this.radius) > 800;
    }
    update() {
        Entity.prototype.update.call(this);
        //  console.log(this.velocity);
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        if (this.collideLeft() || this.collideRight()) {
            this.velocity.x = -this.velocity.x * friction;
            if (this.collideLeft())
                this.x = this.radius;
            if (this.collideRight())
                this.x = 800 - this.radius;
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }
        if (this.collideTop() || this.collideBottom()) {
            this.velocity.y = -this.velocity.y * friction;
            if (this.collideTop())
                this.y = this.radius;
            if (this.collideBottom())
                this.y = 800 - this.radius;
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && this.collide(ent)) {
                var temp = { x: this.velocity.x, y: this.velocity.y };
                var dist = distance(this, ent);
                var delta = this.radius + ent.radius - dist;
                var difX = (this.x - ent.x) / dist;
                var difY = (this.y - ent.y) / dist;
                this.x += difX * delta / 2;
                this.y += difY * delta / 2;
                ent.x -= difX * delta / 2;
                ent.y -= difY * delta / 2;
                this.velocity.x = ent.velocity.x * friction;
                this.velocity.y = ent.velocity.y * friction;
                ent.velocity.x = temp.x * friction;
                ent.velocity.y = temp.y * friction;
                this.x += this.velocity.x * this.game.clockTick;
                this.y += this.velocity.y * this.game.clockTick;
                ent.x += ent.velocity.x * this.game.clockTick;
                ent.y += ent.velocity.y * this.game.clockTick;
                // if (this.it) {
                //     this.radius += 10;
                //     ent.removeFromWorld = true;
                // }
                // else if (ent.it) {
                //     this.setIt();
                //     ent.setNotIt();
                // }

                // creates new circles w random colors
                if (this.color === ent.color) {
                    console.log('same color');
                    var circleArr = [this, ent];
                    var randColor1 = this.colors[Math.floor(Math.random() * this.colors.length)];
                    var randColor2 = this.colors[Math.floor(Math.random() * this.colors.length)];
                    var randSize1 = Math.floor(Math.random() * 10);
                    var randSize2 = Math.floor(Math.random() * 10);
                    // randCircle.color = randColor;
                    var thisSmallCircle = new Circle(this.game, randColor1, randSize1);
                    var entSmallCircle = new Circle(this.game, randColor2, randSize2);
                    this.game.addEntity(thisSmallCircle);
                    this.game.addEntity(entSmallCircle);
                    this.removeFromWorld = true;
                    ent.removeFromWorld = true;
                }


                if (this.radius >= ent.radius && this.color !== ent.color) {
                    this.radius += ent.radius; // add radii together
                    ent.removeFromWorld = true;
                }
                else if (this.radius < ent.radius && this.color !== ent.color) {// && ent.radius < 200) {
                    ent.radius += this.radius; // add radii together
                    this.removeFromWorld = true;
                } else {
                    var randColor1 = this.colors[Math.floor(Math.random() * this.colors.length)];
                    var randColor2 = this.colors[Math.floor(Math.random() * this.colors.length)];
                    var thisSmallCircle = new Circle(this.game, randColor1, 10);
                    var entSmallCircle = new Circle(this.game, randColor2, 10);
                    this.game.addEntity(thisSmallCircle);
                    this.game.addEntity(entSmallCircle);
                    this.removeFromWorld = true;
                    ent.removeFromWorld = true;
                }
                
                
                
                
                //else if (this.color == ent.color) {
                //     console.log('same color');
                //     var circleArr = [this, ent];
                //     var randColor = colors[Math.floor(Math.random() * colors.length)];
                //     var randCircle = circleArr[Math.floor(Math.random() * circleArr.length)];
                //     randCircle.color = randColor;
                // }
                
                
                
                
                // else if (this.radius === ent.radius) {//|| (this.radius + ent.radius) > 200) {
                // // } if ((this.radius + ent.radius) > 200) {
                //     var thisSmallCircle = new Circle(this.game, "Red", this.radius/4);
                //     var thisSmallOtherCircle = new Circle(this.game, "Blue", this.radius/4);
                //     var entSmallCircle = new Circle(this.game, "Green", ent.radius/4);
                //     var entSmallOtherCircle = new Circle(this.game, "White", this.radius/4);
                //     this.game.addEntity(thisSmallCircle);
                   
                //         this.game.addEntity(thisSmallOtherCircle);
                //         this.game.addEntity(entSmallCircle);
                //         this.game.addEntity(entSmallOtherCircle);
                //     this.removeFromWorld = true;
                //     ent.removeFromWorld = true;
                // }


                /////////////////////////////////////////////////////////////////////
                // else if (this.radius === ent.radius) {
                //     console.log('equal radii');
                //     console.log(this.radius/2);
                //     console.log(this.color);
                //     var thisSmallCircle = new Circle(this.game, this.color, this.radius/2);
                //     var thisSmallOtherCircle = new Circle(this.game, this.color, this.radius/2);
                //     var entSmallCircle = new Circle(this.game, ent.color, ent.radius/2);
                //     var entSmallOtherCircle = new Circle(this.game, this.color, this.radius/2);
                //     this.removeFromWorld = true;
                //     ent.removeFromWorld = true;
                //     this.game.addEntity(thisSmallCircle);
                   
                //     this.game.addEntity(thisSmallOtherCircle);
                //     this.game.addEntity(entSmallCircle);
                //     this.game.addEntity(entSmallOtherCircle);
                // }


                // // this works
                // this.radius += 10;
                // ent.removeFromWorld = true;
            }
            if (ent != this && this.collide({ x: ent.x, y: ent.y, radius: this.visualRadius })) {
                var dist = distance(this, ent);
                if (this.it && dist > this.radius + ent.radius + 10) {
                    var difX = (ent.x - this.x) / dist;
                    var difY = (ent.y - this.y) / dist;
                    this.velocity.x += difX * acceleration / (dist * dist);
                    this.velocity.y += difY * acceleration / (dist * dist);
                    var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
                    if (speed > maxSpeed) {
                        var ratio = maxSpeed / speed;
                        this.velocity.x *= ratio;
                        this.velocity.y *= ratio;
                    }
                }
                if (ent.it && dist > this.radius + ent.radius) {
                    var difX = (ent.x - this.x) / dist;
                    var difY = (ent.y - this.y) / dist;
                    this.velocity.x -= difX * acceleration / (dist * dist);
                    this.velocity.y -= difY * acceleration / (dist * dist);
                    var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
                    if (speed > maxSpeed) {
                        var ratio = maxSpeed / speed;
                        this.velocity.x *= ratio;
                        this.velocity.y *= ratio;
                    }
                }
            }
        }
        this.velocity.x -= (1 - friction) * this.game.clockTick * this.velocity.x;
        this.velocity.y -= (1 - friction) * this.game.clockTick * this.velocity.y;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }
}
;

Circle.prototype = new Entity();
Circle.prototype.constructor = Circle;



// the "main" code begins here
var friction = 1;
var acceleration = 1000000;
var maxSpeed = 200;

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');


    var gameEngine = new GameEngine();
    var redCircle = new Circle(gameEngine, "Red");
    redCircle.setIt();
    gameEngine.addEntity(redCircle);


    // blueCircle = new Circle(gameEngine, "Blue");
    // gameEngine.addEntity(blueCircle);
    for (var i = 0; i < 5; i++) {
        blueCircle = new Circle(gameEngine, "Blue", 10);
        gameEngine.addEntity(blueCircle);
    }
    for (var i = 0; i < 5; i++) {
        greenCircle = new Circle(gameEngine, "Green", 10);
        gameEngine.addEntity(greenCircle);
    }
    for (var i = 0; i < 5; i++) {
        redCircle = new Circle(gameEngine, "Red", 10);
        gameEngine.addEntity(redCircle);
    }
    for (var i = 0; i < 5; i++) {
        whiteCircle = new Circle(gameEngine, "White", 10);
        gameEngine.addEntity(whiteCircle);
    }
    gameEngine.init(ctx);
    gameEngine.start();
});
