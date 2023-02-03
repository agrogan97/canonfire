class Constants {
    constructor() {

        // Constant-valued objects
        this.defaultTargetOpts = {
            /*
                The default states for the target cube
            */
            angle : 0,
            colour : 'rgba(255,255,255,1)',
            type : 'rect',
            translation : 0
        }

        this.hideTimes = {
            1 : 4000,
            2 : 3000,
            3 : 2000,
            4 : 1000,
        }

        // Single parameter constants
        this.numTillMoveLevel = 10;
        this.frameCountCapture = 0;
        this.timeBetweenRounds = 120; // in seconds
    }

    getAngle(){
        return Common.choose([45, -45, 90, -90, 135, -135])
    }

    getColour() {
        return Common.choose([[26, 255, 0], [255, 119, 0]])
    }

    getType() {
        return Common.choose(['circle, rect'])
    }

    getTranslation() {
        return Common.choose([-1, 0, 1])
    }
}

