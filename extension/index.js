const LiveWebSocket = require('therungg').LiveWebSocket;

module.exports = async function (nodecg) {
    // Variables for Twitch usernames
    let usernames = [];
    var player1Data = [], player2Data = [];
    const player1DataRep = nodecg.Replicant('player1Data');
    const player2DataRep = nodecg.Replicant('player2Data');

    // Reset all arrays from dashboard panel
    nodecg.listenFor('resetAllArrays', () => {
        player1Data = [];
        player2Data = [];
        player1DataRep.value = player1Data;
        player2DataRep.value = player2Data;
        console.log("Arrays reset from dashboard");
    });

    // Populate variables from usernames taken from speedcontrol
    // sendMessage call is in `graphics/js/common.js`
    nodecg.listenFor('twitchUsernames', (newVal) => {
        // If the value hasn't changed, don't do anything
        if (arrayEquals(newVal, usernames)) {
            console.log('No change in usernames');
            return;
        }
        // Else, add new Twitch usernames to array, clear splits arrays, and continue
        player1Data = [];
        player2Data = [];
        player1DataRep.value = player1Data;
        player2DataRep.value = player2Data;
        usernames = newVal;
        console.log(usernames[0], usernames[1]);

        // Connect to therun.gg API
        const ws1 = new LiveWebSocket(usernames[0]);
        const ws2 = new LiveWebSocket(usernames[1]);
        ws1.onOpen = () => { console.log(`Connected to therun.gg for ${usernames[0]}`); }
        ws2.onOpen = () => { console.log(`Connected to therun.gg for ${usernames[1]}`); }

        // When data is recieved, add data to replicants
        ws1.onMessage = (data) => {
            console.log(`Data recieved for ${usernames[0]}. Current split: ${data.run.currentSplitName}`);
            
            // If at start of run, clear the array from previous run
            if (data.run.currentSplitIndex == 0) {
                player1Data = [];
                player1DataRep.value = player1Data;
            }

            // Update the array with new data
            player1Data.push(updateSplitData(data));
            player1DataRep.value = player1Data;
            console.log("Getting the data worked");
        }
        ws2.onMessage = (data) => {
            console.log(`Data recieved for ${usernames[1]}. Current split: ${data.run.currentSplitName}`);
            
            // If at start of run, clear the array from previous run
            if (data.run.currentSplitIndex == 0) {
                player2Data = [];
                player2DataRep.value = player2Data;
            }

            // Update the array with new data
            player2Data.push(updateSplitData(data));
            player2DataRep.value = player2Data;
            console.log("Getting the data worked");
        }
    });
};

// Function to update all data for a player and add to array
function updateSplitData(data)
{
    // Random Math Stuff
    var possTimesave = data.run.splits[data.run.currentSplitIndex].single.time - data.run.splits[data.run.currentSplitIndex].single.bestAchievedTime;

    return {
        'pbTime'            : msToTime(data.run.pb),
        'pbDelta'           : showPlus(data.run.delta, msToTime(data.run.delta)),
        'sumOfBest'         : msToTime(data.run.sob),
        'bestPossibleTime'  : msToTime(data.run.bestPossible),
        'possibleTimeSave'  : msToTime(possTimesave),
        'currentTime'       : data.run.currentTime // used for delta against other runner
    };
}

// Util function to convert ms to more readable time format
function msToTime(duration)
{
    var newDir, isNegative = false;
    if (duration < 0) {
        isNegative = true;
        newDir = duration * -1;
    } else {
        newDir = duration;
    }

    var milliseconds    = Math.floor((newDir % 1000) / 100),
        seconds         = Math.floor((newDir / 1000) % 60),
        minutes         = Math.floor((newDir / (1000 * 60)) % 60),
        hours           = Math.floor((newDir / (1000 * 60 * 60)) % 24);
  
    hours   = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (isNegative) {
        if (hours == "00")
            return `-${minutes}:${seconds}.${milliseconds}`;
        else
            return `-${hours}:${minutes}:${seconds}.${milliseconds}`;
    } else {
        if (hours == "00")
            return `${minutes}:${seconds}.${milliseconds}`;
        else
            return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
}

// Used for deltas and stuff
function showPlus(delta, msToTimeOutput)
{
    if (delta < 0)
        return msToTimeOutput;
    else
        return "+" + msToTimeOutput;
}

// Util function to compare arrays (used for twitch usernames)
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}