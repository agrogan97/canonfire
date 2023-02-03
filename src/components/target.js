class Target {
    /*
        Within here we create a MatterJS box rigid body,
        add it to the composite,
        then define a function to create a p5 rectangle
    */
    constructor(x, y, w, h, options={}){
        this.initX = x;
        this.initY = y;
        this.defaultState = {
            angle : 0,
            colour: 'rgba(255,255,255,1)',
            type: 'rect',
            translation : 0
        }
        this.w = w;
        this.h = h;
        this.colour = this.defaultState.colour
        this.angle = this.defaultState.angle
        this.type = "rect";
        this.translation = 0;
        this.body = Bodies.rectangle(x, y, w, h, options);
        Body.setAngle(this.body, this.angle*(Math.PI/180))
        this.visible = true;

        Composite.add(engine.world, this.body);
    }

    reset() {
        /*
            Return the target to it's default state
        */
        this.angle = this.defaultState.angle;
        Body.setAngle(this.body, this.defaultState.angle)
        Body.setPosition(this.body, {x : this.initX, y : this.initY})
        this.colour = this.defaultState.colour;
    }

    setTargetState(targetState) {
        /*
            Define the target state that signals end of level
        */
        const keys = Object.keys(targetState);
        const reqdFields = ["angle", "colour", "type", "translation"];
        reqdFields.forEach(r => {
            if (!keys.includes(r)){
                throw new Error(`Error at target.js:40 -- targetState missing required field ${r}`)
            }
        })
        this.targetState = targetState;
    }

    onHit(purpose) {
        // Execute functionality when hit by cannon
        const pos = {x : this.body.position.x, y : this.body.position.y};

        switch(purpose) {
            case "rot45":
                this.angle += 45;
                this.translation += 1;
                Body.setAngle(this.body, this.angle);
                break;
            case "inv_rot45":
                this.angle -= 45;
                this.translation -= 1;
                Body.setAngle(this.body, this.angle);
                break;
            case "changeColour":
                this.colour = [26, 255, 0]
                break;
            case "inv_changeColour":
                this.colour = [255, 119, 0]
                break;
            case "toCircle":
                this.type = "circle";
                break;
            case "toRect":
                this.type = "rect";
                break;
            case "translateUp":
                // Move upwards
                Body.setPosition(this.body, {x : pos.x, y : pos.y + this.h});
                break;
            case "translateDown":
                // Move downwards
                Body.setPosition(this.body, {x : pos.x, y : pos.y - this.h});
                break;
            default:
                console.log("Invalid name")
        }
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(...this.colour);
        if (this.type == 'rect' || this.type == 'rectangle') {
            this.visible && rect(0, 0, this.w, this.h);
        } else if (this.type == 'circle') {
            this.visible && circle(0, 0, this.w);
        }
        
        stroke('red')
        strokeWeight(3);
        this.visible && line(0, 0, 0, -this.h/2)
        pop();

        // Monitor target state
        // TODO add failure state for running out of cannonballs
        if (this.targetState != undefined) {
            // Compare current state to target state
            // Completion criteria is level based so switch based on that
            const ts = this.targetState;
            switch(game.level) {
                case 1:
                    // angle
                    if (this.angle == ts.angle) {return true}
                    break;
                case 2:
                    // angle, colour
                    if (this.angle == ts.angle && 
                        this.colour.toString() == ts.colour.toString()){
                            return true;}
                    break;
                case 3:
                    // angle, colour, type
                    if (this.angle == ts.angle &&
                        this.colour.toString() == ts.colour.toString()&&
                        this.type == ts.type){
                            return true;
                        }
                    break;
                case 4:
                    // angle, colour, type, translation
                    if (this.angle == ts.angle &&
                        this.colour.toString() == ts.colour.toString() &&
                        this.type == ts.type &&
                        this.translation == translation){
                            return true;
                        }
                    break;
                default:
                    throw new Exception("Level not recognised");
            }
        }
        return false;
    }
    
}