// JQuery selectors (general)
var gameTitle = $('#gameTitle');
var players = $('#players');
var player1 = $('#player1');
var player2 = $('#player2');
var player3 = $('#player3');
var player4 = $('#player4');
var comm1 = $('#comm1');
var comm2 = $('#comm2');
var comm3 = $('#comm3');
var p1Delta = $('#p1-delta');
var p2Delta = $('#p2-delta');

// JQuery selectors (statistics field)
var statisticsContainer = $('#statistics-container');
var p1StatsName= $('#stat-1');
var p2StatsName = $('#stat-2');
var p1StatsPB = $('#stat-3');
var p2StatsPB = $('#stat-5');
var p1StatsPBDelta = $('#stat-6');
var p2StatsPBDelta = $('#stat-8');
var p1StatsSOB = $('#stat-9');
var p2StatsSOB = $('#stat-11');
var p1StatsBPT = $('#stat-12');
var p2StatsBPT = $('#stat-14');
var p1StatsTimesave = $('#stat-15');
var p2StatsTimesave = $('#stat-17');

// Update on-screen information from commentary replicants
var commNamesRep = nodecg.Replicant('commNames', {defaultValue: ['Comm 1', 'Comm 2', 'Comm 3']});
commNamesRep.on('change', function(newVal) {
    if (comm1.length) comm1.html(newVal[0]);
    if (comm2.length) comm2.html(newVal[1]);
    if (comm3.length) comm3.html(newVal[2]);
});

// Update on-screen information from speedcontrol
var runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
runDataActiveRun.on('change', (newVal) => {
	if (newVal) {
        // Set game title if exists (usually tournament match number)
        if (gameTitle.length) gameTitle.html(newVal.game);

        // Update player names if exists
        if (players.length || player1.length) {
            var playerNames;

            // Omnibar
            if (newVal.teams[0]) players.html(newVal.teams[0].players.map((player) => player.name).join(', '));

            // Game scenes
            if (newVal.teams[0]) playerNames = newVal.teams[0].players.map((player) => player.name);
            if (player1.length) player1.html(playerNames[0]);
            if (player2.length) player2.html(playerNames[1]);
            if (player3.length) player3.html(playerNames[2]);
            if (player4.length) player4.html(playerNames[3]);
            if (statisticsContainer.length) {
                p1StatsName.html(playerNames[0]);
                p2StatsName.html(playerNames[1]);
            }
        }
    }
});

// Get therun.gg statistics from extension
const player1DataRep = nodecg.Replicant('player1Data');
const player2DataRep = nodecg.Replicant('player2Data');
var player1SplitTimes = [], player2SplitTimes = [];

nodecg.listenFor('p1-reset-run', () => {
    player1SplitTimes = [];
});
nodecg.listenFor('p2-reset-run', () => {
    player2SplitTimes = [];
});

player1DataRep.on('change', (newVal) => {
    let data = JSON.parse(JSON.stringify(newVal));
    updateStats(1, data);
    player1SplitTimes.push(data[data.length - 1].currentTime);
    console.log(`Player 1 split times:`);
    console.log(player1SplitTimes);
    updateRunnerDeltas();
});
player2DataRep.on('change', (newVal) => {
    let data = JSON.parse(JSON.stringify(newVal));
    updateStats(2, data);
    player2SplitTimes.push(data[data.length - 1].currentTime);
    console.log(`Player 2 split times:`);
    console.log(player2SplitTimes);
    updateRunnerDeltas();
});

// Update statistics on screen
function updateStats(player, data)
{
    let len = data.length - 1;
    if (player == 1) {
        p1StatsPB.html(data[len].pbTime);
        p1StatsPBDelta.html(data[len].pbDelta);
        changeTextColor(p1StatsPBDelta);
        p1StatsSOB.html(data[len].sumOfBest);
        p1StatsBPT.html(data[len].bestPossibleTime);
        p1StatsTimesave.html(data[len].possibleTimeSave);
    } else if (player == 2) {
        p2StatsPB.html(data[len].pbTime);
        p2StatsPBDelta.html(data[len].pbDelta);
        changeTextColor(p2StatsPBDelta);
        p2StatsSOB.html(data[len].sumOfBest);
        p2StatsBPT.html(data[len].bestPossibleTime);
        p2StatsTimesave.html(data[len].possibleTimeSave);
    }
}

function updateRunnerDeltas()
{
    // determine which runner is ahead
    let splitNumber = Math.min(player1SplitTimes.length, player2SplitTimes.length) - 1;
    let p1Time = player1SplitTimes[splitNumber];
    let p2Time = player2SplitTimes[splitNumber];

    // calculate the delta
    let delta = p1Time - p2Time;

    console.log(`Calculating delta. Split index to compare: ${splitNumber}. Player 1 time: ${p1Time}. Player 2 time: ${p2Time}. Delta: ${delta}`);

    p1Delta.html(showPlus(delta, msToTime(delta)));
    changeTextColor(p1Delta);
    p2Delta.html(showPlus(delta * -1, msToTime(delta * -1)));
    changeTextColor(p2Delta);
}

// Util function for deltas
function changeTextColor(element)
{
    if (element.text().startsWith('-')) {
        element.css('color', '#00B50F');
    } else {
        element.css('color', '#EF0000');
    }
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