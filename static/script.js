// Dark Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', themeToggle.checked ? 'dark' : 'light');
});

// Fetch Bus Routes
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
        const busTable = document.getElementById('busTable');
        busTable.innerHTML = '';

        if (data.length === 0) {
            busTable.innerHTML = '<p class="no-results">No buses found. 🚫</p>';
        } else {
            // Create bus cards for each route
            data.forEach(bus => {
                const busCard = document.createElement('div');
                busCard.className = 'bus-card';
                busCard.innerHTML = `
                    <h3>Route ${bus.route_number}</h3>
                    <p><strong>From:</strong> ${bus.start_point}</p>
                    <p><strong>To:</strong> ${bus.end_point}</p>
                    <p><strong>Start Time:</strong> ${bus.start_time}</p>
                    <p><strong>End Time:</strong> ${bus.end_time}</p>
                    <p><strong>Frequency:</strong> ${bus.frequency}</p>
                    <p><strong>Number of Buses:</strong> ${bus.num_buses}</p>
                    <p><strong>Route Length:</strong> ${bus.route_length} km</p>
                `;
                busTable.appendChild(busCard);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});