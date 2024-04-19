// Create replicants
const commNamesRep = nodecg.Replicant('commNames', {defaultValue: ['Comm 1', 'Comm 2', 'Comm 3']});

// Update replicants
commNamesRep.on('change', function(newValue) {
    console.log('Updating commentary');
    document.getElementById('comm1').innerHTML = newValue[0];
    document.getElementById('comm2').innerHTML = newValue[1];
    document.getElementById('comm3').innerHTML = newValue[2];
});