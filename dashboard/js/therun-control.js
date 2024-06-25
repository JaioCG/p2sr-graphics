// Script Variables
let isWebsocketRunning = false;

// Update Twitch Username information from speedcontrol
let twitchUsernames = [];
var runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
runDataActiveRun.on('change', (newVal) => {
	if (newVal) {
        if (newVal.teams[0]) twitchUsernames = newVal.teams[0].players.map((player) => player.social.twitch);
        document.getElementById('p1-username').innerHTML = twitchUsernames[0];
        document.getElementById('p2-username').innerHTML = twitchUsernames[1];
        nodecg.sendMessage('stopTRGGWebsocketServer');
    }
});

function startWebsocket()
{
    console.log(twitchUsernames)
    console.log("Starting Websocket")
    // Check if the websocket is already running
    if (isWebsocketRunning)
        alert("Websocket is already running!");
    else {
        nodecg.sendMessage('startTRGGWebsocketServer', twitchUsernames);
        isWebsocketRunning = true;
    }
}

function stopWebsocket()
{
    console.log("Stopping Websocket");
    if (isWebsocketRunning) {
        nodecg.sendMessage('stopTRGGWebsocketServer');
        isWebsocketRunning = false;
    } else
        alert("Websocket is not running!");
}