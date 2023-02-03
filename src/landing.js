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

var canvas
var engine = Engine.create();
var world;
var runner;
var balls = [];

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("bgCanvas");
    rectMode(CENTER);
    angleMode(DEGREES);
    engine = Engine.create();
    world = engine.world;

    canvas.mouseMoved(e => {
        if (frameCount != undefined && frameCount != null){
            if (frameCount % 5 == 0){
                balls.push(new Ball(e.clientX, e.clientY))
            }
        }
    })

    // Create a runner
    runner = Runner.create();
    // Run the engine
    Runner.run(runner, engine)
}

function draw() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background('rgba(0, 0, 0, 0.45)')

    balls.forEach(b => {
        b.show();
    })
}