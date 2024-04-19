// Create replicants
const commNamesRep = nodecg.Replicant('commNames', {defaultValue: ['Comm 1', 'Comm 2', 'Comm 3']});
const runnerNamesRep = nodecg.Replicant('runnerNames', {defaultValue: ['Runner 1', 'Runner 2', 'Runner 3', 'Runner 4']});

// Update replicants
commNamesRep.on('change', function(newValue) {
    console.log('Updating commentary');
    document.getElementById('comm1').innerHTML = newValue[0];
    document.getElementById('comm2').innerHTML = newValue[1];
    document.getElementById('comm3').innerHTML = newValue[2];
});

runnerNamesRep.on('change', function(newValue) {
    console.log('Updating runners');
    document.getElementById('runner1').innerHTML = newValue[0];
    document.getElementById('runner2').innerHTML = newValue[1];
    document.getElementById('runner3').innerHTML = newValue[2];
    document.getElementById('runner4').innerHTML = newValue[3];
});