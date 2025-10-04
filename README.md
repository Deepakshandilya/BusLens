# 🚌 BusLens - Smart Bus Route Finder for Tricity

A cutting-edge, comprehensive web application for finding bus routes across Chandigarh, Mohali, and Panchkula with real-time information, 3D visualizations, and advanced analytics.

## ✨ Features

### 🎯 **Core Functionality**
- **Smart Route Search** - Find the best bus routes between any two stops with intelligent autocomplete
- **Interactive Tricity Map** - Visualize bus routes and stops on an interactive map with real-time data
- **Real-time Information** - Live bus tracking and arrival information
- **Comprehensive Database** - 65+ bus routes and 700+ bus stops across 3 cities

### 🎨 **Modern Design**
- **Glassmorphism UI** - Beautiful frosted glass effects and modern aesthetics
- **Responsive Design** - Perfect experience on all devices
- **Dark/Light Themes** - Seamless theme switching
- **Smooth Animations** - Delightful micro-interactions and transitions

### 🚀 **Advanced Features**
- **3D Bus Models** - Interactive Three.js 3D bus visualization in hero section
- **Advanced Analytics** - Real-time insights with Chart.js data visualization
- **GSAP Animations** - Smooth, professional animations throughout the site
- **Particle System** - Dynamic particle effects for enhanced visual appeal
- **Smart Autocomplete** - Intelligent search suggestions with keyboard navigation
- **Route Visualization** - Detailed route maps with stop markers
- **Mobile-First** - Optimized for mobile devices with touch-friendly interface
- **Progressive Web App** - Offline capabilities and app-like experience

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript ES6+** - Modern JavaScript with classes and async/await
- **Three.js** - 3D graphics and WebGL rendering
- **GSAP** - Professional animations and scroll triggers
- **Chart.js** - Data visualization and analytics
- **Particles.js** - Dynamic particle effects
- **Leaflet.js** - Interactive maps and geospatial visualization

### Backend
- **Flask** - Python web framework
- **MySQL** - Database for storing route and stop information
- **RESTful API** - Clean API design for data exchange

### Design System
- **Inter & Poppins** - Modern typography
- **CSS Custom Properties** - Consistent theming
- **Glassmorphism** - Modern UI design trend
- **Responsive Grid** - Mobile-first layout system

## 🚀 Getting Started

### Prerequisites
- Python 3.7+
- MySQL 5.7+
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/buslens.git
cd buslens
```

2. **Set up Python environment**
```bash
python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Configure database**
   ```bash
   cp config_template.txt .env
   # Edit .env with your database credentials
   ```

4. **Run the application**
```bash
python app.py
```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## 📱 Website Sections

### 🏠 **Hero Section**
- Compelling landing area with animated bus
- Quick search functionality
- Key statistics and features
- Call-to-action buttons

### 🗺️ **Interactive Map**
- Real-time tricity map with Leaflet.js
- Bus route visualization
- Stop markers with popups
- Filter by city (Chandigarh, Mohali, Panchkula)

### 🔍 **Route Search**
- Advanced search with autocomplete
- Real-time suggestions
- Keyboard navigation
- Detailed route information

### 📊 **Features Showcase**
- Smart route planning
- Real-time updates
- Interactive maps
- Mobile optimization

### ℹ️ **About Section**
- Company information
- Feature highlights
- Visual elements

### 📞 **Contact Section**
- Contact information
- Contact form
- Social media links

## 🎨 Design System

### Colors
- **Primary**: Modern blue gradient (#0ea5e9 to #8b5cf6)
- **Accent**: Purple and pink gradients
- **Neutral**: Comprehensive gray scale
- **Semantic**: Success, warning, error states

### Typography
- **Headings**: Poppins (700-800 weight)
- **Body**: Inter (400-600 weight)
- **Responsive**: Fluid typography scaling

### Components
- **Glassmorphism Cards** - Frosted glass effect
- **Gradient Buttons** - Eye-catching CTAs
- **Floating Labels** - Modern form inputs
- **Animated Icons** - Delightful interactions

## 📱 Mobile Experience

- **Touch-Friendly** - Optimized for mobile interactions
- **Responsive Grid** - Adapts to all screen sizes
- **Mobile Navigation** - Hamburger menu for mobile
- **Progressive Web App** - App-like experience

## 🔧 API Endpoints

### Search Routes
```http
POST /bus-routes
Content-Type: application/json

{
  "stop1": "Sector 17 Bus Stand",
  "stop2": "Panchkula Bus Stand"
}
```

### Response
```json
[
  {
    "route_number": "1",
    "start_point": "Sector 17 Bus Stand",
    "end_point": "Panchkula Bus Stand",
    "start_time": "06:00:00",
    "end_time": "22:00:00",
    "frequency": "15 minutes",
    "num_buses": "8",
    "route_length": "12.5"
  }
]
```

## 🚀 Performance Features

- **Lazy Loading** - Images and content load as needed
- **Optimized Animations** - Hardware-accelerated CSS animations
- **Efficient JavaScript** - Modern ES6+ with minimal dependencies
- **Responsive Images** - Optimized for different screen sizes

## 🎯 SEO & Accessibility

- **Semantic HTML** - Proper heading structure and landmarks
- **ARIA Labels** - Screen reader compatibility
- **Keyboard Navigation** - Full keyboard accessibility
- **Meta Tags** - Proper SEO optimization
- **Alt Text** - Descriptive image alternatives

## 🔮 Future Enhancements

- **Real-time Tracking** - Live bus location updates
- **User Accounts** - Personalized experience
- **Favorites** - Save frequently used routes
- **Notifications** - Bus arrival alerts
- **Offline Mode** - Full offline functionality
- **Multi-language** - Support for regional languages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenStreetMap** - For map data
- **Leaflet.js** - For interactive maps
- **Font Awesome** - For icons
- **Google Fonts** - For typography

## 📞 Support

For support, email info@buslens.com or create an issue on GitHub.

---

**Built with ❤️ for the Tricity community**