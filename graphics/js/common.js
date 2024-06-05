'use strict';
$(() => {	
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

    // JQuery selectors (statistics)
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
	
    // Update on-screen information from custom replicants
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
            // Send Twitch information to extension
            var twitchUsernames;
            var team = newVal.teams[0];
            if (team) twitchUsernames = team.players.map((player) => player.social.twitch);
            nodecg.sendMessage('twitchUsernames', twitchUsernames);

            // Set game title (usually tournament match number)
            if (gameTitle.length) gameTitle.html(newVal.game);

            // Update player names wherever neccesary
            if (players.length || player1.length) {
                var playerNames;
                var team = newVal.teams[0];
                if (team) players.html(team.players.map((player) => player.name).join(', '));
                if (team) playerNames = team.players.map((player) => player.name);
                console.log(playerNames);
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

    // Update Statistics
    const player1DataRep = nodecg.Replicant('player1Data');
    const player2DataRep = nodecg.Replicant('player2Data');
    player1DataRep.on('change', (newVal) => {
        let arr = JSON.parse(JSON.stringify(newVal));
        console.log(arr);
        updateStats(1, arr);
    });
    player2DataRep.on('change', (newVal) => {
        let arr = JSON.parse(JSON.stringify(newVal));
        console.log(arr);
        updateStats(2, arr);
    });
    function updateStats(player, data)
    {
        let len = data.length - 1;
        console.log(len);
        if (player == 1) {
            console.log(data[len].pbDelta);
            p1StatsPB.html(data[len].pbTime);
            p1StatsPBDelta.html(data[len].pbDelta);
            p1StatsSOB.html(data[len].sumOfBest);
            p1StatsBPT.html(data[len].bestPossibleTime);
            p1StatsTimesave.html(data[len].possibleTimeSave);
        } else if (player == 2) {
            p2StatsPB.html(data[len].pbTime);
            p2StatsPBDelta.html(data[len].pbDelta);
            p2StatsSOB.html(data[len].sumOfBest);
            p2StatsBPT.html(data[len].bestPossibleTime);
            p2StatsTimesave.html(data[len].possibleTimeSave);
        }
    }
});