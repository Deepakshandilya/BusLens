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

// Form Submission with Enhanced UX
document.getElementById('busForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Add success animation
    addSuccessAnimation();

    // Show loading state
    showSpinner();
    
    // Disable form during search
    const submitButton = document.getElementById('findButton');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Searching... 🔍';
    submitButton.style.opacity = '0.7';

    // Remove "Sector" prefix before sending
    const stop1 = stop1Input.value.replace(/^Sector /, '');
    const stop2 = stop2Input.value.replace(/^Sector /, '');

    fetch('http://127.0.0.1:5000/bus-routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stop1, stop2 }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        hideSpinner();
        const busTable = document.getElementById('busTable');
        busTable.innerHTML = '';

        if (data.length === 0) {
            busTable.innerHTML = `
                <div class="no-results">
                    <div style="font-size: 48px; margin-bottom: 16px;">🚫</div>
                    <h3>No routes found</h3>
                    <p>We couldn't find any direct bus routes between these stops.</p>
                    <p>Try searching for nearby stops or different locations.</p>
                </div>
            `;
        } else {
            // Add results header
            const resultsHeader = document.createElement('div');
            resultsHeader.innerHTML = `
                <h2>Found ${data.length} Route${data.length > 1 ? 's' : ''}</h2>
                <p style="color: var(--text-muted); margin-bottom: 24px;">Here are the best bus routes for your journey</p>
            `;
            busTable.appendChild(resultsHeader);

            data.forEach((bus, index) => {
                const busCard = document.createElement('div');
                busCard.className = 'bus-card';
                busCard.style.animationDelay = `${index * 0.1}s`;
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
        hideSpinner();
        console.error('Error:', error);
        const busTable = document.getElementById('busTable');
        busTable.innerHTML = `
            <div class="no-results">
                <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                <h3>Oops! Something went wrong</h3>
                <p>We couldn't connect to our servers. Please check your internet connection and try again.</p>
                <button onclick="location.reload()" style="margin-top: 16px; padding: 12px 24px; background: var(--gradient-primary); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    })
    .finally(() => {
        // Re-enable form
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
    });
});

// ********************************************
// Enhanced Loading States
function showSpinner() {
    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = "flex";
    spinner.style.opacity = "1";
}

function hideSpinner() {
    const spinner = document.getElementById("loading-spinner");
    spinner.style.opacity = "0";
    setTimeout(() => {
        spinner.style.display = "none";
    }, 500);
}

// Page Load Animation
document.addEventListener("DOMContentLoaded", function() {
    showSpinner();
    
    // Simulate initial page load
    setTimeout(() => {
        hideSpinner();
    }, 1500);
});

// Hide spinner when page is fully loaded
window.addEventListener("load", function() {
    hideSpinner();
});

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add keyboard navigation for suggestions
document.addEventListener('keydown', function(e) {
    const suggestions = document.querySelector('.suggestions');
    if (suggestions.style.display === 'block') {
        const items = suggestions.querySelectorAll('.suggestion-item');
        const activeItem = suggestions.querySelector('.suggestion-item.active');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeItem) {
                activeItem.classList.remove('active');
                const next = activeItem.nextElementSibling || items[0];
                next.classList.add('active');
            } else if (items[0]) {
                items[0].classList.add('active');
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeItem) {
                activeItem.classList.remove('active');
                const prev = activeItem.previousElementSibling || items[items.length - 1];
                prev.classList.add('active');
            } else if (items[items.length - 1]) {
                items[items.length - 1].classList.add('active');
            }
        } else if (e.key === 'Enter' && activeItem) {
            e.preventDefault();
            activeItem.click();
        } else if (e.key === 'Escape') {
            suggestions.style.display = 'none';
        }
    }
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Add success animation to form submission
function addSuccessAnimation() {
    const form = document.getElementById('busForm');
    form.classList.add('success-animation');
    setTimeout(() => {
        form.classList.remove('success-animation');
    }, 600);
}

