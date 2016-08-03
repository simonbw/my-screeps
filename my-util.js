var roles = require('roles');

exports.clearMemory = function clearMemory() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}


// Return a count of each type of role
exports.countRoles = function countRoles(creeps) {
    var counts = {};
    for (var role in roles) {
        if (roles.hasOwnProperty(role)) {
            counts[role] = 0;
        }
    }
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        var role = creep.memory.role;
        if (!counts.hasOwnProperty(role)) {
            counts[role] = 0;
        }
        counts[role] += 1;
    }
    return counts;
}


// Run the role of each creep
exports.fulfillRoles = function fulfillRoles(creeps) {
    var counts = {};
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        var role = creep.memory.role;
        if (role) {
            if (roles.hasOwnProperty(role)) {
                roles[role](creep);
            } else {
                console.log('Warning: Creep without a role');
            }
        } else {
            console.log('Warning: Creep without a role:', creep.name);
        }
    }
}