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

    // Personal Best Time (trgg)
    // Sum of Best (trgg)
    // Best Possible Time (trgg)
    // Current Split (trgg)
    // Possible Time Save (trgg)
    return {
        'pbTime'            : msToTime(data.run.pb),
        'sumOfBest'         : msToTime(data.run.sob),
        'bestPossibleTime'  : msToTime(data.run.bestPossible),
        'currentSplit'      : data.run.currentSplitName,
        'possibleTimeSave'  : msToTime(possibleTimesave)
    };
}

// Util function to convert ms to more readable time format
function msToTime(duration)
{
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    if (hours == "00") {
      return minutes + ":" + seconds + "." + milliseconds;
    } else {
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
}