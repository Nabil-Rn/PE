document.getElementById('filterBtn').addEventListener('click', async () => {
    const part1 = "Pt";
    const part2 = "72";
    const part3 = "utto+VYw0Dk0J39I3g==";
    const part4 = "ZrgZBfxWACoLNuYS";
    const sauce = part1 + part2 + part3 + part4;
    const muscle = document.getElementById('muscle').value;
    const type = document.getElementById('type').value;
    // const offset   = 2;${offset   ? '&offset=' + offset   : 0}
    let  apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}${type ? '&type=' + type : ''}`;

    if (type) {
        apiUrl += `&type=${type}`;
    }

    $.ajax({
        method: 'GET',
        url: apiUrl,
        headers: { 'X-Api-Key': sauce }, // Replace with your actual API key
        contentType: 'application/json',
        success: function(result) {
            console.log(result); // Log the response
            displayExercises(result); // Call displayExercises with the result
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
});

function displayExercises(exercises) {
    const tableBody = document.getElementById('exerciseTable');
    tableBody.innerHTML = ''; // Clear previous results

    if (Array.isArray(exercises) && exercises.length > 0) {
        exercises.forEach(exercise => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${exercise.name}</td>
                <td>${exercise.type}</td>
                <td>${exercise.muscle}</td>
                <td>${exercise.equipment}</td>
                <td>${exercise.difficulty}</td>
                <td>${exercise.instructions}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">No exercises found or an error occurred.</td>`;
        tableBody.appendChild(row);
    }
}