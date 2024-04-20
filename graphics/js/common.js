'use strict';
$(() => {
    // Create replicants
    const commNamesRep = nodecg.Replicant('commNames', {defaultValue: ['Comm 1', 'Comm 2', 'Comm 3']});
    const playerNamesRep = nodecg.Replicant('playerNames', {defaultValue: ['Player 1', 'Player 2', 'Player 3', 'Player 4']});

    // Update replicants
    commNamesRep.on('change', function(newValue) {
        console.log('Updating commentary');
        document.getElementById('comm1').innerHTML = newValue[0];
        document.getElementById('comm2').innerHTML = newValue[1];
        document.getElementById('comm3').innerHTML = newValue[2];
    });
    playerNamesRep.on('change', function(newValue) {
        console.log('Updating players');
        document.getElementById('player1').innerHTML = newValue[0];
        document.getElementById('player2').innerHTML = newValue[1];
        document.getElementById('player3').innerHTML = newValue[2];
        document.getElementById('player4').innerHTML = newValue[3];
    });

	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors.
	var gameTitle = $('#gameTitle');
    var players = $('#players');
	var player1 = $('#player1');
    var player2 = $('#player2');
    var player3 = $('#player3');
    var player4 = $('#player4');
	
	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
        console.log(runData);
		gameTitle.html(runData.game);

		// Checks if we are on the player.html/twitch.html page.
		// This is done by checking if the #player/#twitch span exists.
		if (players.length || player1.length) {
			var team = runData.teams[0];
			
			// If a team has multiple players, this currently just outputs them in a comma'd list.
			if (team) {
				players.html(team.players.map((player) => player.name).join(', '));
                // player1.html(team.players[0].name);
                // player2.html(team.players[1].name);
                // player3.html(team.players[2].name);
                // player4.html(team.players[3].name);
			}
		}
	}
});