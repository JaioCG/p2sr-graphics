// Create replicants
const commNamesRep = nodecg.Replicant('commNames', {defaultValue: ['Comm 1', 'Comm 2', 'Comm 3']});
const playerNamesRep = nodecg.Replicant('playerNames', {defaultValue: ['Player 1', 'Player 2', 'Player 3', 'Player 4']});

// Update replicants
document.getElementById('submit').addEventListener('click', function() {
    console.log('Updating commentary');
    commNamesRep.value = [
        document.getElementById('comm1').value,
        document.getElementById('comm2').value,
        document.getElementById('comm3').value
    ];
});

function updatePlayers() {
    console.log('Updating players');
    playerNamesRep.value = [
        document.getElementById('player1').value,
        document.getElementById('player2').value,
        document.getElementById('player3').value,
        document.getElementById('player4').value
    ];
}