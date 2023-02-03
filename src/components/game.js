class Game {
    /*
        Trackers and utils for storing data about the game
    */
    constructor() {
        this.attempt = 0;
        this.round = 0;
        this.restarts = 0;
        this.correct = 0;
        this.level = 1;
        this.roundData = {};
    }

    newRound(targetOpts, isRestart=false) {
        this.attempt++;
        if (!isRestart) {
            this.round++
            this.restarts = 0;
        };
        this.roundData[this.attempt] =  {
            attempt : this.attempt,
            restart : this.restarts,
            round : this.round,
            level : this.level,
            startTime : Date.now(),
            endTime : undefined,
            targetOpts : targetOpts,
            passed : false,
            isRestart : false,
            resp : {
                move : [],
                purpose : [],
                timestamp : []
            }
        }
    }

    endRound(didPass) {
        /*
            Process the end of the round and populate missing data
        */
        // Fill round endtime
        this.roundData[this.attempt].endTime = Date.now();
        // Fill passed or not
        this.roundData[this.attempt].passed = didPass;
        // If correct update tracking num
        didPass && this.correct++;
        // process correct scores to see if player progresses to next level
        if (this.correct/constants.numTillMoveLevel == 1){
            this.nextLevel();
        }
    }

    nextLevel() {
        this.level++;
        this.correct = 0;
        console.log(`Called with ${game.correct} correct`)
    }

    addResp(cannon, purpose) {
        /*
            Add an entry to the resp dict, an object that stores move-by-move data
            for each round
            Takes `cannon` as input, the cannon number from 1-8 as defined in sketch.js,
            as well as `purpose` the string that defines the cannon's function.
        */
        const r = this.roundData[this.attempt].resp;
        r.move.push(cannon);
        r.purpose.push(purpose)
        r.timestamp.push(Date.now());
    }

}