# BusLens - Intelligent Transit Platform

A modern, real-time bus tracking and route planning application for the Tricity region (Chandigarh, Panchkula, Mohali).

## 🚀 Features

- **Real-time Bus Tracking** - Live bus locations and status updates
- **Smart Route Planning** - AI-powered route suggestions with multiple options
- **Interactive Map** - Visual representation of bus routes and stops
- **Station Search** - Comprehensive station database with autocomplete
- **Analytics Dashboard** - System insights and performance metrics
- **Mobile-First Design** - Optimized for all device sizes
- **Dark Mode** - Beautiful dark and light themes

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Leaflet** - Interactive maps
- **Recharts** - Data visualization
- **Framer Motion** - Smooth animations
- **Socket.IO** - Real-time communication

### Backend
- **Flask** - Python web framework
- **MySQL** - Database for persistent storage
- **Flask-SocketIO** - WebSocket support for real-time updates
- **MySQL Connector** - Python MySQL driver

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- MySQL 8.0+

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd frontend/backend

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python start.py
```

The backend will be available at `http://localhost:5000`

### Database Setup

1. Start MySQL service
2. Create database:
   ```sql
   CREATE DATABASE buslensdb;
   ```
3. The application will automatically create tables and insert sample data

## 🎨 Design Philosophy

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Modular scale with perfect ratios
- **Weights**: 100-900 for maximum flexibility

### Color System
- **Primary**: Indigo (#6366f1) - Trust and reliability
- **Secondary**: Emerald (#10b981) - Success and growth
- **Accent**: Amber (#f59e0b) - Energy and attention
- **Danger**: Red (#ef4444) - Alerts and warnings

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px
- **Responsive**: Mobile-first approach

### Components
- **Cards**: Rounded corners (12px-24px)
- **Buttons**: Rounded (8px-16px)
- **Shadows**: Layered shadow system
- **Animations**: 200ms-300ms transitions

## 🔧 API Endpoints

### Stations
- `GET /api/stations/search?q={query}` - Search stations
- `GET /api/stations/{id}` - Get station details

### Routes
- `GET /api/routes/search?from={from}&to={to}` - Search routes
- `GET /api/routes/{id}` - Get route details
- `GET /api/routes` - Get all routes

### Buses
- `GET /api/buses/locations` - Get bus locations
- `GET /api/buses/locations?route={id}` - Get buses for specific route
- `GET /api/buses/{id}` - Get bus details

### Analytics
- `GET /api/analytics/system` - Get system statistics
- `GET /api/analytics/routes/{id}` - Get route analytics

### WebSocket
- `ws://localhost:5000/ws` - Real-time updates
- Events: `bus_update`, `route_update`, `system_update`

## 📱 Mobile Optimization

- **Touch Targets**: Minimum 44px for accessibility
- **Gestures**: Swipe, pinch, tap optimized
- **Performance**: Lazy loading and code splitting
- **Offline**: Service worker for basic functionality

## 🌙 Dark Mode

- **System Preference**: Automatic detection
- **Manual Toggle**: User-controlled switching
- **Persistence**: localStorage for preference
- **Smooth Transitions**: 200ms color transitions

## 🚌 Real-time Features

- **Live Bus Tracking**: 10-second update intervals
- **WebSocket Connection**: Persistent real-time updates
- **Status Updates**: On-time, delayed, early indicators
- **Passenger Counts**: Real-time occupancy data

## 📊 Analytics

- **Ridership Patterns**: Hourly, daily, weekly trends
- **Route Performance**: On-time statistics
- **System Health**: Active buses, routes, stations
- **User Insights**: Search patterns and preferences

## 🔒 Security

- **CORS**: Configured for development and production
- **Input Validation**: Server-side validation
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Content sanitization

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
# Add Procfile
web: python app.py
```

### Database (PlanetScale/AWS RDS)
- Use connection string in environment variables
- Enable SSL for production

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Deepak Shandilya**
- GitHub: [@deepakshandilya](https://github.com/deepakshandilya)
- LinkedIn: [@deepakshandilyaa](https://linkedin.com/in/deepakshandilyaa)

## 🙏 Acknowledgments

- Tricity Transport Department for route data
- OpenStreetMap for map tiles
- React and Tailwind communities
- All contributors and testers

---

**Built with ❤️ for the Tricity region**
