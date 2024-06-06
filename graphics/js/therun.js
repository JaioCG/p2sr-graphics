// Custom variables and replicants
var player1Data = [];
var player2Data = [];
const player1DataRep = nodecg.Replicant('player1Data');
const player2DataRep = nodecg.Replicant('player2Data');

// Listen for live data from therun.gg
nodecg.listenFor('therunP1', (newVal) => {
    console.log(newVal);
    if (newVal.run.currentSplitIndex == 0) {
        player1Data = [];
        player1DataRep.value = player1Data;
    }
    player1Data.push(updateSplitData(newVal));
    player1DataRep.value = player1Data;
});
nodecg.listenFor('therunP2', (newVal) => {
    console.log(newVal);
    if (newVal.run.currentSplitIndex == 0) {
        player2Data = [];
        player2DataRep.value = player2Data;
    }
    player2Data.push(updateSplitData(newVal));
    player2DataRep.value = player2Data;
});

// Function to update all data for a player and add to array
function updateSplitData(data)
{
    // Random Math Stuff
    var  possTimesave = data.run.splits[data.run.currentSplitIndex].single.time - data.run.splits[data.run.currentSplitIndex].single.bestAchievedTime;

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
            return "-" + minutes + ":" + seconds + "." + milliseconds;
        else
            return "-" + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    } else {
        if (hours == "00")
            return minutes + ":" + seconds + "." + milliseconds;
        else
            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
}

function showPlus(delta, msToTimeOutput)
{
    if (delta < 0)
        return msToTimeOutput;
    else
        return "+" + msToTimeOutput;
}