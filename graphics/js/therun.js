// Custom variables and replicants
var player1Data = [];
var player2Data = [];
const player1DataRep = nodecg.Replicant('player1Data');
const player2DataRep = nodecg.Replicant('player2Data');

// Listen for live data from therun.gg
nodecg.listenFor('therunP1', (newVal) => {
    console.log(newVal);
    //player1Data.push(updateSplitData(newVal));
    //player1DataRep.value = player1Data;
});
nodecg.listenFor('therunP2', (newVal) => {
    console.log(newVal);
    //player2Data.push(updateSplitData(newVal));
    //player2DataRep.value = player2Data;
});

// Function to update all data for a player and add to array
function updateSplitData(data)
{
    // Random Math Stuff
    var  possibleTimesave = data.run.splits[data.run.currentSplitIndex].pbSplitTime - data.run.splits[data.run.currentSplitIndex].bestPossible;
    var pbDelta = data.run.currentTime - data.run.splits[data.run.currentSplitIndex].total.time;

    return {
        'pbTime'            : msToTime(data.run.pb),
        'pbDelta'           : showPlusMinus(pbDelta, msToTime(pbDelta)),
        'sumOfBest'         : msToTime(data.run.sob),
        'bestPossibleTime'  : msToTime(data.run.bestPossible),
        'possibleTimeSave'  : msToTime(possibleTimesave),
        'currentTime'       : data.run.currentTime // used for delta against other runner
    };
}

// Util function to convert ms to more readable time format
function msToTime(duration)
{
    var milliseconds    = Math.floor((duration % 1000) / 100),
        seconds         = Math.floor((duration / 1000) % 60),
        minutes         = Math.floor((duration / (1000 * 60)) % 60),
        hours           = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours   = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    if (hours == "00")
        return minutes + ":" + seconds + "." + milliseconds;
    else
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function showPlusMinus(input, msToTimeOutput)
{
    if (input < 0)
        return "-" + msToTimeOutput;
    else
        return "+" + msToTimeOutput;
}