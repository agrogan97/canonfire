class Ball {
    constructor(x, y) {
        this.r = Math.random(0, 1)*35 + 10;
        this.colour = `rgba(255, 255, 255, ${Math.random()})`
        this.body = Bodies.circle(x, y, this.r);
        Composite.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(this.colour);
        circle(0, 0, this.r*2);
        pop();
    }
}