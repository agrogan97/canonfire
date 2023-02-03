/*
    Module for key game stages, eg. start, end, restart level, new level
*/

function newRound(type="test") {
    /*
        Reset the centrebox and set a new target state
        Show the goal state for 2 seconds, then hide it
            and render the init state
        Can specify train, test, and transfer levels
    */

    // Move up the level if number correct is satisfied
    
    const levelBasedOpts = {
        /*
            Number of concepts increases with increasing level
            Defaulta are defined within constants.js
        */
        1 : {
            angle : constants.getAngle(),
            colour : constants.defaultTargetOpts.colour,
            type : constants.defaultTargetOpts.type,
            translation : constants.defaultTargetOpts.translation
        },
        2 : {
            angle : constants.getAngle(),
            colour : constants.getColour(),
            type : constants.defaultTargetOpts.type,
            translation : constants.defaultTargetOpts.translation
        },
        3 : {
            angle : constants.getAngle(),
            colour : constants.getColour(),
            type : constants.getType(),
            translation : constants.defaultTargetOpts.translation
        },
        4 : {
            angle : constants.getAngle(),
            colour : constants.getColour(),
            type : constants.getType(),
            translation : constants.getTranslation()
        }
    }

    // Generate new goal state opts
    // TODO this needs to be dynamic and based on level
    const opts = {
        angle : Common.choose([45, -45, 90, -90, 135, -135]),
        colour: Common.choose([[26, 255, 0], [255, 119, 0]]),
        type: Common.choose(['rect', 'circle']),
        translation: Common.choose([-1, 0, 1])
    }

    // Basically just flesh this out into a hard coded level mapping

    // Hide centre box
    centreBox.visible = false

    // Lock cannon fire (so we dont have to move centre physics box)
    cannons.forEach(c => c.body.canFire = false);
    
    // Show goal state for 2 seconds
    goalState.setOpts(levelBasedOpts[game.level]);

    // Set centre box internal target state for success monitoring
    centreBox.setTargetState(levelBasedOpts[game.level]);

    // Make goal state visible
    goalState.visible = true;

    setTimeout(function() {
        // Hide goal state
        goalState.visible = false;
        // Show centre box at default
        centreBox.reset();
        centreBox.visible = true;
        // Unlock certain cannons depending on level
        for (let i=0; i<game.level*2; i++) {
            cannons[i].body.canFire = true;
        }

        game.newRound(levelBasedOpts[game.level]);
    }, constants.hideTimes[game.level])    
    
}