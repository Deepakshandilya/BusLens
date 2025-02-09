document.getElementById('busForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const stop1 = document.getElementById('stop1').value;
    const stop2 = document.getElementById('stop2').value;

    // Fetch data from the Flask API
    fetch('/bus-routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stop1, stop2 }),
    })
    .then(response => response.json())
    .then(data => {
        // Clear previous results
        const tableBody = document.querySelector('#busTable tbody');
        tableBody.innerHTML = '';

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No buses found.</td></tr>';
        } else {
            // Populate the table with bus route data
            data.forEach(bus => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${bus.route_number}</td>
                    <td>${bus.start_point}</td>
                    <td>${bus.end_point}</td>
                    <td>${bus.start_time}</td>
                    <td>${bus.end_time}</td>
                    <td>${bus.frequency}</td>
                    <td>${bus.num_buses}</td>
                    <td>${bus.route_length}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});