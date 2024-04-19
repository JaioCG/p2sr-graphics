// Create replicants
const comm1Rep = nodecg.Replicant('comm1', {defaultValue: 'Comm 1'});
const comm2Rep = nodecg.Replicant('comm2', {defaultValue: 'Comm 2'});
const comm3Rep = nodecg.Replicant('comm3', {defaultValue: 'Comm 3'});

// Update replicants
document.getElementById('submit').addEventListener('click', function() {
    console.log('Updating commentary');
    comm1Rep.value = document.getElementById('comm1').value;
    comm2Rep.value = document.getElementById('comm2').value;
    comm3Rep.value = document.getElementById('comm3').value;
});