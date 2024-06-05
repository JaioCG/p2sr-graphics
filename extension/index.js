const LiveWebSocket = require('therungg').LiveWebSocket;

module.exports = async function (nodecg) {
    // Variables for Twitch usernames
    let usernames = [];

    // Populate variables from usernames taken from speedcontrol
    // sendMessage call is in `graphics/js/common.js`
    nodecg.listenFor('twitchUsernames', (newVal) => {
        // If the value hasn't changed, don't do anything
        if (arrayEquals(newVal, usernames)) {
            console.log('No change in usernames');
            return;
        }

        // Update the twitchUsernames value for reference later
        usernames = newVal;

        // TheRunGG nonsense
        console.log(usernames[0], usernames[1]);
        const ws1 = new LiveWebSocket(usernames[0]);
        const ws2 = new LiveWebSocket(usernames[1]);
        ws1.onOpen = () => { console.log(`Connected to therun.gg for ${usernames[0]}`); }
        ws2.onOpen = () => { console.log(`Connected to therun.gg for ${usernames[1]}`); }
        ws1.onMessage = (data) => { nodecg.sendMessage('therunP1', data); }
        ws2.onMessage = (data) => { nodecg.sendMessage('therunP2', data); }
    });
};

// Util function to compare arrays (used for twitch usernames)
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}