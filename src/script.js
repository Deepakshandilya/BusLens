// Modern BusLens Website with 3D Elements and Advanced Features
class BusLensApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.busModel = null;
        this.animationId = null;
        this.charts = {};
        
        this.init();
        this.setupEventListeners();
        this.initializeMap();
        this.setupScrollEffects();
        this.initialize3D();
        this.initializeParticles();
        this.initializeCharts();
    }

    init() {
        // Initialize app
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(this.currentTheme);
        this.setupNavigation();
        this.setupSearch();
        this.setupAnimations();
        this.setupGSAP();
    }

    // GSAP Animations Setup
    setupGSAP() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero animations
            gsap.timeline()
                .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: "power3.out" })
                .from('.hero-description', { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.5")
                .from('.hero-search', { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.3")
                .from('.hero-stats .stat-item', { duration: 0.6, y: 30, opacity: 0, stagger: 0.1, ease: "power3.out" }, "-=0.2");

            // Scroll-triggered animations
            gsap.utils.toArray('.feature-card').forEach((card, index) => {
                gsap.from(card, {
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            gsap.utils.toArray('.insight-card').forEach((card, index) => {
                gsap.from(card, {
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }
    }

    // 3D Bus Model
    initialize3D() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded, using fallback');
            return;
        }

        const canvas = document.getElementById('bus3d-canvas');
        if (!canvas) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Create bus model
        this.createBusModel();

        // Camera position
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);

        // Start animation loop
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createBusModel() {
        const group = new THREE.Group();

        // Bus body
        const bodyGeometry = new THREE.BoxGeometry(3, 1.5, 1);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x0ea5e9,
            transparent: true,
            opacity: 0.9
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        body.castShadow = true;
        group.add(body);

        // Bus windows
        const windowGeometry = new THREE.BoxGeometry(2.5, 0.8, 0.1);
        const windowMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x87ceeb,
            transparent: true,
            opacity: 0.7
        });
        const windows = new THREE.Mesh(windowGeometry, windowMaterial);
        windows.position.set(0, 1.2, 0.51);
        group.add(windows);

        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
        const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        
        const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel1.position.set(-1, 0.3, 0.7);
        wheel1.rotation.z = Math.PI / 2;
        group.add(wheel1);

        const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel2.position.set(1, 0.3, 0.7);
        wheel2.rotation.z = Math.PI / 2;
        group.add(wheel2);

        const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel3.position.set(-1, 0.3, -0.7);
        wheel3.rotation.z = Math.PI / 2;
        group.add(wheel3);

        const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel4.position.set(1, 0.3, -0.7);
        wheel4.rotation.z = Math.PI / 2;
        group.add(wheel4);

        // Headlights
        const headlightGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        
        const headlight1 = new THREE.Mesh(headlightGeometry, headlightMaterial);
        headlight1.position.set(1.6, 0.8, 0.3);
        group.add(headlight1);

        const headlight2 = new THREE.Mesh(headlightGeometry, headlightMaterial);
        headlight2.position.set(1.6, 0.8, -0.3);
        group.add(headlight2);

        this.busModel = group;
        this.scene.add(group);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        if (this.busModel) {
            // Rotate the bus
            this.busModel.rotation.y += 0.01;
            
            // Float animation
            this.busModel.position.y = Math.sin(Date.now() * 0.002) * 0.2;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        const canvas = document.getElementById('bus3d-canvas');
        if (!canvas) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // Particle System
    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80 },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: false },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Charts and Analytics
    initializeCharts() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }

        // Route Coverage Chart
        const routeCtx = document.getElementById('routeChart');
        if (routeCtx) {
            this.charts.route = new Chart(routeCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Active Routes', 'Inactive Routes'],
                    datasets: [{
                        data: [65, 15],
                        backgroundColor: ['#0ea5e9', '#e2e8f0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

        // Peak Hours Chart
        const peakCtx = document.getElementById('peakChart');
        if (peakCtx) {
            this.charts.peak = new Chart(peakCtx, {
                type: 'line',
                data: {
                    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
                    datasets: [{
                        label: 'Bus Frequency',
                        data: [20, 80, 40, 60, 30, 50, 90, 70, 25],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true, display: false },
                        x: { display: false }
                    }
                }
            });
        }

        // City Distribution Chart
        const cityCtx = document.getElementById('cityChart');
        if (cityCtx) {
            this.charts.city = new Chart(cityCtx, {
                type: 'bar',
                data: {
                    labels: ['Chandigarh', 'Mohali', 'Panchkula'],
                    datasets: [{
                        data: [45, 30, 25],
                        backgroundColor: ['#0ea5e9', '#8b5cf6', '#ec4899'],
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { display: false },
                        x: { display: false }
                    }
                }
            });
        }
    }

    // Theme Management
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = theme === 'dark';
        }

        // Update charts theme
        this.updateChartsTheme(theme);
    }

    updateChartsTheme(theme) {
        const isDark = theme === 'dark';
        const textColor = isDark ? '#f1f5f9' : '#334155';
        const gridColor = isDark ? '#475569' : '#e2e8f0';

        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.options.plugins.legend.labels.color = textColor;
                chart.update();
            }
        });
    }

    // Navigation
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Search Functionality
    setupSearch() {
        this.stops = [
    "10/11", "10/15 Panchkula Bus Stand", "10/16", "11 (65 Market Outer)", 
            "11/10", "11/15", "11/15 Panchkula", "12/11 Panchkula", "123", "14/15",
            "15/11", "15/14", "16 Hospital", "16/10", "16/17", "17", "17 Bus Stand",
            "17/16", "17/18", "17/9", "18", "18 Market", "18/8", "19", "19 Market",
            "19/20", "19/27", "19/7", "2", "20", "20 Market", "20/21", "20/30",
            "20/33", "21", "21 Market", "21/34", "22/17", "22/23", "23 Market",
            "23/22", "24 Market", "24 Panchkula", "24/23", "24/25", "25 Panchkula",
            "25/24", "25/38", "26", "26 Panchkula", "26/27", "26/28", "27", "27 Market",
            "27/19", "27/26", "27/28", "28", "28 Market", "28 Petrol Pump",
            "28/26 Grain Market", "28/27", "29", "29 Market", "29 Nursery", "29/30",
            "29/31", "30", "30 Market", "30/20", "30/29", "30/32", "31 Market",
            "31/32", "31/32 Market", "32", "32 Market", "32 SD College", "32/31",
            "32/31 Hospital", "32/33", "33 Market", "33/32", "34 Market", "34/35",
            "35/22", "35/34", "35/36", "36 Market", "36/35", "36/37", "37 Market",
            "37/24", "37/38", "38 Market", "38 West", "38 West Light Point", "38/25",
            "38/37", "38/40", "39", "39 Market", "39/38", "39/52", "40", "40/41",
            "41", "41 Market", "41/40", "41/42", "42", "42 College", "42 Market",
            "42/43", "43", "43/42", "43/44", "44", "44 Market", "44/43", "44/45",
            "45", "45 Market", "45/46", "46", "46/45", "46/47", "47 Market",
            "47 Outer", "47/46", "48", "48 Jagatpura", "48 Market", "49", "50",
            "50/49", "51", "51 Market", "51/50", "52/53", "52/61", "60/61", "62/63",
            "63/64", "64/63", "65 Market Outer", "66", "66 Market", "66/67", "67/66",
            "67/81", "68/67", "68/69", "68/80", "69/70", "69/79", "7", "7/19",
            "8/17 Panchkula", "8/18", "9", "9 Market", "9/16 Panchkula", "9/17",
            "Airport", "Airport Chowk", "Aroma", "Attawa", "Badheri Chowk", "Balongi",
            "Bankharpur", "Behlana", "Bird Park", "Chandigarh", "City", "College",
            "Colony No. 4", "Command Hospital", "CTU Depot", "CTU Workshop",
            "Daddu Majra Village", "Dera Bassi", "Desu Majra", "Dhakoli", "Dhanas",
            "DLF Chowk", "DMC", "Eco City", "Elante Mall", "F/Chowk", "Fortis Hospital",
            "Franco Hotel", "Furniture Chowk", "GMCH-32", "Grain Market",
            "Housing Board Chowk", "Industrial Area", "Industrial Area Mohali",
            "Industrial Area Phase-1", "Industrial Area Phase-2", "ISBT-17", "ISBT-43",
            "IT Park", "IVY Hospital", "Jagatpura", "Jalvayu Tower", "Jayanti Majra",
            "Jheurheri", "Joshi Farm", "K.C. UT Secretariat", "Kaimbwala", "Kalagram",
            "Kharar", "Khuda Ali Sher", "Khuda Lahora", "Kishangarh", "Kissan Bhawan",
            "Kumbra", "Kurali", "Lake", "Lake Chowk", "Lakhnaur", "Landran",
            "Madhya Marg", "Maloya", "Maloya Sector 38 West Light Point", "Manimajra",
            "Mansa Devi", "Mata Mansa Devi", "MLA Flats", "Mubarakpur", "Mullanpur",
            "Mullanpur Eco City", "Mundi Kharar", "Nada Sahib", "New Airport Chowk",
            "New Maloya Colony", "New OPD", "Old Barrier", "Omaxe Phase-II", "OPD",
            "Panchkula", "Parol", "PEC", "PGI", "Phase-11 (65 Market Outer)",
            "Phase-5/3 Light Point Madanpur", "Phase-6", "Piccadilly Chowk", "PSPB",
            "Punjab Civil Secretariat", "Railway Crossing", "Railway Station",
            "Raily Chowk", "Raipur Kalan", "Ram Darbar", "Ramgarh", "Rani Majra",
            "Rasulpur", "Rock Garden", "Saneta", "Sector Punjab Barrier", "Singhpura",
            "Sohana", "Sohana Gurdwara Sahib", "Sukhna Lake", "Tank Chowk",
            "Todde Majra", "Transport Chowk", "Tribune Chowk", "University",
            "Victoria Enclave", "Vikas Nagar", "White House", "YPS Chowk", "Zirakpur"
].map(stop => stop.match(/^\d/) ? `Sector ${stop}` : stop);

        this.setupSearchInputs();
        this.setupFormSubmission();
    }

    setupSearchInputs() {
        const inputs = ['stop1', 'stop2', 'heroStop1', 'heroStop2'];
        const suggestionsDiv = document.getElementById('suggestions');

        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', (e) => this.handleInput(e, suggestionsDiv));
                input.addEventListener('focus', (e) => this.handleFocus(e, suggestionsDiv));
                input.addEventListener('blur', () => {
                    setTimeout(() => {
                        if (suggestionsDiv) suggestionsDiv.style.display = 'none';
                    }, 200);
                });
            }
        });

        // Keyboard navigation for suggestions
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e, suggestionsDiv));
    }

    handleInput(e, suggestionsDiv) {
        const input = e.target;
        const value = input.value.replace(/^Sector /, '');
        
        if (value.length >= 2) {
            const matches = this.filterStops(value).slice(0, 5);
            this.showSuggestions(input, matches, suggestionsDiv);
        } else {
            if (suggestionsDiv) suggestionsDiv.style.display = 'none';
        }
    }

    handleFocus(e, suggestionsDiv) {
        const input = e.target;
        const value = input.value.replace(/^Sector /, '');
        
        if (value.length >= 2) {
            const matches = this.filterStops(value).slice(0, 5);
            this.showSuggestions(input, matches, suggestionsDiv);
        }
    }

    filterStops(input) {
        return this.stops.filter(stop => {
            const cleanStop = stop.replace(/^Sector /, '');
            return cleanStop.toLowerCase().startsWith(input.toLowerCase());
        });
    }

    showSuggestions(inputElement, matches, suggestionsDiv) {
        if (!suggestionsDiv) return;

    suggestionsDiv.innerHTML = '';
        
        if (matches.length === 0) {
            suggestionsDiv.style.display = 'none';
            return;
        }

    matches.forEach(match => {
        const div = document.createElement('div');
        div.textContent = match;
        div.className = 'suggestion-item';
        div.onclick = () => {
            inputElement.value = match;
                suggestionsDiv.style.display = 'none';
        };
        suggestionsDiv.appendChild(div);
    });

        const rect = inputElement.getBoundingClientRect();
        suggestionsDiv.style.top = `${rect.bottom + window.scrollY}px`;
        suggestionsDiv.style.left = `${rect.left + window.scrollX}px`;
        suggestionsDiv.style.width = `${rect.width}px`;
        suggestionsDiv.style.display = 'block';
    }

    handleKeyboardNavigation(e, suggestionsDiv) {
        if (!suggestionsDiv || suggestionsDiv.style.display !== 'block') return;

        const items = suggestionsDiv.querySelectorAll('.suggestion-item');
        const activeItem = suggestionsDiv.querySelector('.suggestion-item.active');
        
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
        suggestionsDiv.style.display = 'none';
    }
}

    setupFormSubmission() {
        const forms = ['busForm', 'heroSearchForm'];
        
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            }
        });
    }

    handleFormSubmit(e) {
    e.preventDefault();

        const form = e.target;
        const stop1Input = form.querySelector('input[type="text"]:first-of-type');
        const stop2Input = form.querySelector('input[type="text"]:last-of-type');
        
        if (!stop1Input || !stop2Input) return;

    const stop1 = stop1Input.value.replace(/^Sector /, '');
    const stop2 = stop2Input.value.replace(/^Sector /, '');

        if (!stop1 || !stop2) {
            this.showNotification('Please enter both starting and destination stops', 'error');
            return;
        }

        this.searchRoutes(stop1, stop2);
    }

    async searchRoutes(stop1, stop2) {
        this.showSpinner();
        
        try {
            const response = await fetch('http://127.0.0.1:5000/bus-routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stop1, stop2 }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.displayResults(data);
            
        } catch (error) {
            console.error('Error:', error);
            this.showError('Failed to fetch routes. Please try again.');
        } finally {
            this.hideSpinner();
        }
    }

    displayResults(data) {
        const busTable = document.getElementById('busTable');
        if (!busTable) return;

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

            // Scroll to results
            const resultsSection = document.getElementById('results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Map Functionality
    initializeMap() {
        if (typeof L === 'undefined') {
            console.warn('Leaflet not loaded');
            return;
        }

        // Initialize map
        this.map = L.map('map').setView([30.7333, 76.7794], 11);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add sample bus stops and routes
        this.addSampleData();
    }

    addSampleData() {
        if (!this.map) return;

        // Sample bus stops for Tricity
        const busStops = [
            { name: "ISBT-17", coords: [30.7333, 76.7794], city: "chandigarh" },
            { name: "Sector 17 Bus Stand", coords: [30.7333, 76.7794], city: "chandigarh" },
            { name: "Panchkula Bus Stand", coords: [30.6915, 76.8577], city: "panchkula" },
            { name: "Mohali Bus Stand", coords: [30.7045, 76.7179], city: "mohali" },
            { name: "Sector 43 Bus Stand", coords: [30.7045, 76.7179], city: "chandigarh" },
            { name: "Airport", coords: [30.6705, 76.7881], city: "chandigarh" },
            { name: "Railway Station", coords: [30.7333, 76.7794], city: "chandigarh" }
        ];

        // Add bus stops to map
        busStops.forEach(stop => {
            const marker = L.marker(stop.coords).addTo(this.map);
            marker.bindPopup(`
                <div style="text-align: center;">
                    <h4>${stop.name}</h4>
                    <p>City: ${stop.city.charAt(0).toUpperCase() + stop.city.slice(1)}</p>
                </div>
            `);
        });

        // Add sample routes
        const routes = [
            {
                name: "Route 1",
                coords: [[30.7333, 76.7794], [30.7045, 76.7179], [30.6915, 76.8577]],
                color: "#0ea5e9"
            },
            {
                name: "Route 2", 
                coords: [[30.7333, 76.7794], [30.6705, 76.7881], [30.7045, 76.7179]],
                color: "#8b5cf6"
            }
        ];

        routes.forEach(route => {
            L.polyline(route.coords, {
                color: route.color,
                weight: 4,
                opacity: 0.7
            }).addTo(this.map).bindPopup(`<strong>${route.name}</strong>`);
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
        });
    }

    // Animations
    setupAnimations() {
        // Hero bus animation
        const heroBus = document.querySelector('.hero-bus-fallback .bus-icon');
        if (heroBus) {
            setInterval(() => {
                heroBus.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    heroBus.style.transform = 'translateX(0)';
                }, 1000);
            }, 5000);
        }
    }

    // Loading States
    showSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'flex';
            spinner.style.opacity = '1';
        }
    }

    hideSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.opacity = '0';
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 500);
        }
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#0ea5e9'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

    setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', (e) => {
                const newTheme = e.target.checked ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }

        // Page load
        window.addEventListener('load', () => {
            this.hideSpinner();
        });

        // Initial page load animation
        document.addEventListener('DOMContentLoaded', () => {
            this.showSpinner();
            setTimeout(() => {
                this.hideSpinner();
            }, 1500);
        });
    }
}

// Initialize the app
const app = new BusLensApp();

// Additional utility functions
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .notification i {
        font-size: 16px;
    }
`;
document.head.appendChild(notificationStyles);