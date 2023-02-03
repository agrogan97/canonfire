class CannonBall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.purpose = undefined;
        this.r = 15;
        const options = {
            friction : 0.0,
            frictionStatic : 0.0,
            restitution : 0.2
        }
        this.body = Bodies.circle(this.x, this.y, this.r, options);
        Composite.add(engine.world, this.body);
    }

    fire(a0) {
        /*
            Inputs:
                - a0: firing angle
        */
        let xModifier = 0;
        let yModifier = 0;
        a0 = a0*(180/Math.PI)

        if (a0%180 == 0){
            // Firing upwards or downwards
            xModifier = 0.01 * Common.choose([1, -1]);
            a0 == 0 ? yModifier = 1 : yModifier = -5;
        } else if (a0 == 90 || a0 == -90) {
            // Firing vertically
            a0 == 90 ? xModifier = 1 : xModifier = -1;
            yModifier = -1;
        } else if (a0 > 0 && a0 < 90) {
            // Aiming towards top right
            xModifier = 1;
            yModifier = -5
        } else if (a0 >= 90 && a0 < 180) {
            // Aiming towards bottom right
            yModifier = -1.2
            xModifier = 0.5
        } else if (a0 < 360 && a0 > 270) {
            // Aiming towards top left
            xModifier = -1;
            yModifier = -5;
        } else if (a0 > 180 && a0 < 270) {
            // Aiming towards bottom left
            yModifier = 1;
            xModifier = -0.75;
        } else {
            console.log(`Error, received angle ${a0}`)
        }

        Body.applyForce(
            this.body,
            this.body.position,
            {
                x : (0.03) * xModifier,
                y : (0.008) * yModifier
            }
        );
    }

    remove() {
        /*
            Detect when the ball has gone below the ground and remove it from
            both matter and p5
        */
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y)
        fill(255);
        circle(0, 0, this.r*2); // p5 uses diameter instead of radius
        pop();
    }
}