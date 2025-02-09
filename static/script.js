// Dark Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', themeToggle.checked ? 'dark' : 'light');
});

// Autocomplete Suggestions Data (with Sector prefix)
const stops = [
    "10/11", "10/15 Panchkula Bus Stand", "10/16", "11 (65 Market Outer)", 
    // ... (add all your other stops from the list)
    "Zirakpur"
].map(stop => stop.match(/^\d/) ? `Sector ${stop}` : stop);

// Get DOM elements
const stop1Input = document.getElementById('stop1');
const stop2Input = document.getElementById('stop2');
const suggestionsDiv = document.createElement('div');
suggestionsDiv.className = 'suggestions';
document.querySelector('.container').appendChild(suggestionsDiv);

// Show suggestions
function showSuggestions(inputElement, matches) {
    suggestionsDiv.innerHTML = '';
    matches.forEach(match => {
        const div = document.createElement('div');
        div.textContent = match;
        div.className = 'suggestion-item';
        div.onclick = () => {
            inputElement.value = match;
            suggestionsDiv.innerHTML = '';
        };
        suggestionsDiv.appendChild(div);
    });
    suggestionsDiv.style.display = 'block';
}

// Filter stops based on input
function filterStops(input, originalStops) {
    return originalStops.filter(stop => {
        const cleanStop = stop.replace(/^Sector /, '');
        return cleanStop.toLowerCase().startsWith(input.toLowerCase());
    });
}

// Handle input events
function handleInput(inputElement) {
    const value = inputElement.value.replace(/^Sector /, '');
    
    if (value.length >= 2) {
        const matches = filterStops(value, stops).slice(0, 5);
        const rect = inputElement.getBoundingClientRect();
        suggestionsDiv.style.top = `${rect.bottom + window.scrollY}px`;
        suggestionsDiv.style.left = `${rect.left + window.scrollX}px`;
        showSuggestions(inputElement, matches);
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

// Event listeners for inputs
stop1Input.addEventListener('input', () => handleInput(stop1Input));
stop2Input.addEventListener('input', () => handleInput(stop2Input));

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('input') && !e.target.closest('.suggestions')) {
        suggestionsDiv.style.display = 'none';
    }
});

// Form Submission
document.getElementById('busForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Remove "Sector" prefix before sending
    const stop1 = stop1Input.value.replace(/^Sector /, '');
    const stop2 = stop2Input.value.replace(/^Sector /, '');

    fetch('/bus-routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stop1, stop2 }),
    })
    .then(response => response.json())
    .then(data => {
        const busTable = document.getElementById('busTable');
        busTable.innerHTML = '';

        if (data.length === 0) {
            busTable.innerHTML = '<p class="no-results">No buses found. 🚫</p>';
        } else {
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