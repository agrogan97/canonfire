class Goal {
    constructor(opts = {}) {
        // Goal state is a set of the 4 learnable states
        // Set default if not provided
        this.visible = false;
        this.w = 50;
        this.h = 50;
        if (Object.keys(opts).length == 0) {
            this.opts = {
                angle : 0,
                colour : 'white',
                type : 'rect',
                translation : 0
            }
        } else {
            this.opts = opts;
        }
    }

    setOpts(opts) {
        this.opts = opts;
    }

    show() {
        push();
        translate(400, 400 + (this.h*this.opts.translation));
        rotate(this.opts.angle);
        fill(this.opts.colour);
        
        if (this.opts.type == 'rect' || this.opts.type == 'rectangle') {
            this.visible && rect(0, 0, this.w, this.h)
        } else if (this.opts.type == 'circle') {
            this.visible && circle(0, 0, this.w);
        }

        stroke('red')
        strokeWeight(3);
        this.visible && line(0, 0, 0, -this.h/2)

        pop();
    }
}