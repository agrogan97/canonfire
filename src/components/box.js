class Box {
    /*
        Within here we create a MatterJS box rigid body,
        add it to the composite,
        then define a function to create a p5 rectangle
    */
    constructor(x, y, w, h, options={}){
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        this.colour = 'white'
        // world.add(world, this.body)
        Composite.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        // rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(this.colour);
        rect(0, 0, this.w, this.h);

        pop();
    }
}