const LiveWebSocket = require('therungg').LiveWebSocket;

module.exports = async function (nodecg) {
    // Script variables
    let ws1, ws2;
    var player1Data = [], player2Data = [];
    const player1DataRep = nodecg.Replicant('player1Data');
    const player2DataRep = nodecg.Replicant('player2Data');

    nodecg.listenFor('startTRGGWebsocketServer', usernames => {
        // Connect to therun.gg API
        ws1 = new LiveWebSocket(usernames[0]);
        ws2 = new LiveWebSocket(usernames[1]);
        ws1.onOpen = () => { console.log(`Connected to therun.gg for ${usernames[0]}`); }
        ws2.onOpen = () => { console.log(`Connected to therun.gg for ${usernames[1]}`); }
        ws1.onClose = () => { console.log(`Disconnected from therun.gg for ${usernames[0]}`); }
        ws2.onClose = () => { console.log(`Disconnected from therun.gg for ${usernames[1]}`); }

        // Listen for data from therun.gg API
        ws1.onMessage = (data) => {
            console.log(`Data recieved for ${usernames[0]}. Current split: ${data.run.currentSplitName}. Split index: ${data.run.currentSplitIndex}`);
            
            // If at start of run, clear the array from previous run
            if (data.run.currentSplitIndex < 0) {
                player1Data = [];
                player1DataRep.value = player1Data;
                nodecg.sendMessage('p1-reset-run');
            }
            // Update the array with new data
            if (data.run.currentSplitIndex > 0)
                player1Data[data.run.currentSplitIndex] = updateSplitData(data);
            player1DataRep.value = player1Data;
        }
        ws2.onMessage = (data) => {
            console.log(`Data recieved for ${usernames[1]}. Current split: ${data.run.currentSplitName}. Split index: ${data.run.currentSplitIndex}`);
            
            // If at start of run, clear the array from previous run
            if (data.run.currentSplitIndex < 0) {
                player2Data = [];
                player2DataRep.value = player2Data;
                nodecg.sendMessage('p2-reset-run');
            }
            // Update the array with new data
            if (data.run.currentSplitIndex > 0)
                player2Data[data.run.currentSplitIndex] = updateSplitData(data);
            player2DataRep.value = player2Data;
        }
    });

    nodecg.listenFor('stopTRGGWebsocketServer', () => {
        // Disconnect from therun.gg API
        ws1.connection.close();
        ws2.connection.close();
    });
};

// Function to update all data for a player and add to array
function updateSplitData(data)
{
    // Random Math Stuff
    let possTimesave;
    if (data.run.currentSplitIndex == 0)
        possTimesave = data.run.splits[data.run.currentSplitIndex].single.time - data.run.splits[data.run.currentSplitIndex].single.bestAchievedTime;
    else if (data.run.currentSplitIndex == -1)
        possTimesave = 0;
    else {
        if (data.run.runPercentage != 1)
            possTimesave = data.run.splits[data.run.currentSplitIndex - 1].single.time - data.run.splits[data.run.currentSplitIndex - 1].single.bestAchievedTime;
        else
            possTimesave = 0;
    }

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