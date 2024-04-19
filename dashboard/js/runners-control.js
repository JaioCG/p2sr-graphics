// Create replicants
const runnerNamesRep = nodecg.Replicant('runnerNames', {defaultValue: ['Runner 1', 'Runner 2', 'Runner 3']});

// Update replicants
document.getElementById('submit').addEventListener('click', function() {
    console.log('Updating runners');
    runnerNamesRep.value = [
        document.getElementById('runner1').value,
        document.getElementById('runner2').value,
        document.getElementById('runner3').value
    ];
});