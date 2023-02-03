// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Common = Matter.Common;

// create an engine
var engine = Engine.create();
var world;
var runner;
var cannon1,
    cannon2,
    cannon3,
    cannon4,
    cannon5,
    cannon6,
    cannon7,
    cannon8;
var cannons = [];
var cannonballs = [];
var mouse;
var centreBox;
var targetBox;
var goalState;
var game;
var constants;

function setup() {
    /* 
        setup() is the first function required by p5 
    */
    constants = new Constants();
    var canvas = createCanvas(800, window.innerHeight);
    canvas.parent("gameDiv")
    rectMode(CENTER);
    angleMode(DEGREES);
    engine = Engine.create();
    world = engine.world;
    mouse = Mouse.create(canvas.elt);
    mouse.pixelRatio = pixelDensity();
    game = new Game();

    const mouseConstraint = MouseConstraint.create(engine, {mouse : mouse});

    // World contents -------------
    cannon1 = new Cannon(400, 75, 0, 'blue', 'rot45');
    cannon2 = new Cannon(400, 725, 180, 'blue', 'inv_rot45'); // Physics object is rotated for some reason?
    cannon3 = new Cannon(75, 400, 90, 'red', 'changeColour');
    cannon4 = new Cannon(725, 400, -90, 'red', 'inv_changeColour');
    cannon5 = new Cannon(75, 75, 135, 'yellow', 'toCircle');
    cannon6 = new Cannon(725, 75, 225, 'orange', 'toRect');
    cannon7 = new Cannon(75, 725, 45, 'pink', 'translateUp');
    cannon8 = new Cannon(725, 725, 315, 'white', 'translateDown');
    cannons = [cannon1, cannon2, cannon3, cannon4, cannon5, cannon6, cannon7, cannon8];
    goalState = new Goal({})
    centreBox = new Target(400, 400, 50, 50, { isStatic : true });
    // Initialise a new round where we set a target
    newRound();
    // targetBox = new Box(50, 50, 50, 50, { isStatic : true})
    // targetBox.colour = centreBox.targetState.colour;
    // targetBox.body.angle = centreBox.targetState.angle;

    // cannon event listener
    Events.on(mouseConstraint, 'mousedown', function(e) {
        var foundBodies = Matter.Query.point(
            Composite.allBodies(world), 
            e.mouse.position);
        console.log(foundBodies[0])
        // Execute the matching function on the target box
        if (foundBodies[0] != undefined && 
            foundBodies[0].purpose != undefined && 
            foundBodies[0].canFire) {
            // Spawn a cannonball and fire it from the mouth of the cannon
            let tgtCannon = foundBodies[0]
            // Create new cannonball
            cannonballs.push(new CannonBall(...tgtCannon.barrelCoords));
            // Fire cannonball from cannon barrel
            cannonballs[cannonballs.length-1].fire(tgtCannon.angle);
            setTimeout(centreBox.onHit.bind(centreBox, tgtCannon.purpose), 200);
            game.addResp(tgtCannon.id-2, tgtCannon.purpose);
        }
    });
    
    // ----------------------------
    Composite.add(world, mouseConstraint)
    // create a runner
    runner = Runner.create();
    // Run the engine
    Runner.run(runner, engine);
}

function draw() {
    // draw() is the second function required by p5
    background(51);
    cannons.forEach(cannon => {
        cannon.show();
    });

    cannonballs.forEach(cb => {
        cb.show()
    })

    goalState.show();
    let roundComplete = centreBox.show();
    // Record framecount each time the round doesn't end, so we know the frame-1 that it does end on
    if (roundComplete == false) {constants.frameCountCapture = frameCount};
    // End of round logic
    if (roundComplete) {        
        // Wait n seconds before beginning the next round
        if (frameCount - constants.frameCountCapture == constants.timeBetweenRounds){
            // Record data at end of round
            game.endRound(true) // TODO include failure mode
            // newRound logic in stages.js
            newRound();
            roundComplete = false
        }
        
    }
}

/*
    - Delete cannonballs when they leave the screen (see tutorial, he builds this for you)
    - Add styling to game
        - Simple cannon outlines
        - Glowing colour strip
        - Ambient lighting
        - Point light on cannonball
        - Win/lose player feedback
    - Fix ball fire and function apply timing (could use collision detection instead of timings)
    - Build curriculum
    - Add failure mode for running out of balls
        - Show number of balls remaining with icon in corner
        - Get number allowed based on level number
        - Listen for number in target.js
    - Messaging API!
        - CSS styling
        - Colyseus client-side
        - Colyseus server-side
        - Optional: bots 🤖

    Bugs:

    Longer term

    - Refactor into nextJS!
    - Could make the balls explode on collision instead of bounce off
        eg. on collision create little lines and apply force radially
    - Add advanced multiplayer features - such as cannon function rotation etc
*/