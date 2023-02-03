class Cannon {
    /*
        Class for the ball-firing cannons
    */
    constructor(x, y, angle, colour, purpose) {
        // Set params
        this.purpose = purpose;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.w = 75;
        this.h = 125;
        this.colour = colour;

        // Create rigid body
        this.body = Bodies.rectangle(x, y, this.w, this.h, { isStatic : true, friction : 0});
        Body.setAngle(this.body, this.angle*(Math.PI/180));
        // Body.rotate(this.body, this.angle);
        Composite.add(engine.world, this.body);
        // Add body props
        this.body.purpose = purpose;
        this.body.barrelCoords = this.getBarrelCoords();
        this.body.canFire = false;
    }

    getBarrelCoords() {
        /*
            Determine the orientation of the cannon by angle, so we know which side
            the cannon ball should be fired from
        */
        const bounds = this.body.bounds
        switch(this.angle){
            case 0:
                // Top to bottom
                // Want the lowest (max) y point in the bounds, and the middle of the x bounds
                return [bounds.min.x+(this.w/2), bounds.max.y]
            case 180:
                // Bottom to top
                return [bounds.min.x+(this.w/2), bounds.min.y]
            case 90:
                // Left to right
                return [bounds.max.x-(this.w/4), bounds.min.y+(this.w/2)]
            case -90:
                // Right to left
                return [bounds.min.x, bounds.min.y+(this.w/2)]
            case 135:
                // Top left to bottom right
                return [bounds.max.x-(this.w/4), bounds.max.y-(this.w/4)];
            case 225:
                // Top right to bottom left
                return [bounds.min.x+(this.w/3), bounds.max.y-(this.w/4)];
            case 45:
                // Bottom left to top right
                return [bounds.max.x-(this.w/3), bounds.min.y+(this.w/2)];
            case 315:
                // Bottom right to top left
                return [bounds.min.x+(this.w/3), bounds.min.y+(this.w/2)];
            default:
                console.log(`Cannot process angle ${this.angle}`);
        }
    }

    show() {
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(this.angle);
        fill(this.colour);
        rect(0, 0, this.w, this.h);
        pop();
    }
}