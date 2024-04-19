// Create replicants
const commNamesRep = nodecg.Replicant('commNames', {defaultValue: ['Comm 1', 'Comm 2', 'Comm 3']});

// Update replicants
commNamesRep.on('change', function(newValue) {
    console.log('Updating commentary');
    $('comm1').html = newValue[0];
    $('comm2').html = newValue[1];
    $('comm3').html = newValue[2];
});