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
    // Get speedrun.com PB rank
    const srcClient = new SpeedrunClient();
    srcClient.runs

    // Personal Best Time (trgg)
    // Rank on Leaderboards (src) (have to learn other api ughhh)
    // Sum of Best (trgg)
    // Best Possible Time (trgg)
    // Current Split (trgg)
    // Possible Time Save (trgg) (dont know how to fucking get)
    return {
        'pbTime'            : data.run.pb,
        'srcRank'           : '',
        'sumOfBest'         : data.run.sob,
        'bestPossibleTime'  : data.run.bestPossible,
        'currentSplit'      : data.run.currentSplitName,
        'possibleTimeSave'  : '',
    };
}