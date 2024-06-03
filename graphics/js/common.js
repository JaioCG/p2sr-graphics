'use strict';
$(() => {	
	// JQuery selectors.
	var gameTitle = $('#gameTitle');
    var players = $('#players');
	var player1 = $('#player1');
    var player2 = $('#player2');
    var player3 = $('#player3');
    var player4 = $('#player4');
    var comm1 = $('#comm1');
    var comm2 = $('#comm2');
    var comm3 = $('#comm3');
	
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

            // Update omnibar
            if (players.length) {
                var team = newVal.teams[0];
                if (team) players.html(team.players.map((player) => player.name).join(', '));
            }
        }
	});
});