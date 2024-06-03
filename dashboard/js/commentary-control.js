// Create replicants
var commNamesRep = nodecg.Replicant('commNames', {defaultValue: ['Comm 1', 'Comm 2', 'Comm 3']});

// Update replicants
document.getElementById('submit').addEventListener('click', function() {
    console.log('Updating commentary');
    commNamesRep.value = [
        document.getElementById('comm1').value,
        document.getElementById('comm2').value,
        document.getElementById('comm3').value
    ];
});