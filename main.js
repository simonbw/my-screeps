var myUtil = require('my-util');
var bodies = require('bodies');

// The Main Loop
module.exports.loop = function() {
    var roleCounts = myUtil.countRoles(Game.creeps);
    console.log('Counts:', JSON.stringify(roleCounts));
    
    if (!roleCounts.harvester || roleCounts.harvester < 4) {
        createHarvester(Game.spawns['Spawn1']); 
    } else {
        console.log('We have enough harvesters');
    }

    myUtil.fulfillRoles(Game.creeps);
    myUtil.clearMemory();
}


function createHarvester(spawner) {
    console.log('attempting to create harvester');
    if (!spawner) {
        console.warn('Cannot create harvester with null spawner', spawner);
        return;
    }
    var result = spawner.createCreep(bodies.harvester, undefined, {role: 'harvester'});
    if (result != 0) {
        console.log('Cannot create harvester:', result);
    }
}

