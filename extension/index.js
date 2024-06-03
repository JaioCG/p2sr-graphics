const LiveWebSocket = require('therungg').LiveWebSocket;

module.exports = async function (nodecg) {
    // Variables for Twitch usernames
    let twitchUsernames = [];

    // Populate variables from usernames taken from speedcontrol
    // sendMessage call is in `graphics/js/common.js`
    nodecg.listenFor('twitchUsernames', (newVal) => {
        twitchUsernames = newVal;

        // TheRunGG nonsense
        console.log(twitchUsernames[0]);
        const ws1 = new LiveWebSocket(twitchUsernames[0]);
        const ws2 = new LiveWebSocket(twitchUsernames[1]);
        ws1.onOpen = () => { console.log('Connected to TheRunGG for player 1'); }
        ws2.onOpen = () => { console.log('Connected to TheRunGG for player 2'); }
        ws1.onMessage = (data) => { nodecg.sendMessage('therunP1', data); }
        ws2.onMessage = (data) => { nodecg.sendMessage('therunP2', data); }
    });
};
