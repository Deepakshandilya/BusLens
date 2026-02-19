# BusLens Frontend

A modern, responsive frontend for the BusLens bus route finder application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with dark/light theme support
- **Route Search**: Intelligent bus route search with autocomplete
- **Interactive Maps**: Real-time bus stop and route visualization
- **Analytics Dashboard**: Data visualization with charts and insights
- **Mobile-First**: Optimized for all device sizes
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized with Next.js 14 and modern React patterns

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI + Custom components
- **Charts**: Recharts
- **Maps**: Mapbox GL JS (ready for integration)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── navbar.tsx     # Navigation component
│   │   ├── hero.tsx       # Hero section
│   │   ├── route-search.tsx # Route search component
│   │   ├── map-section.tsx  # Map visualization
│   │   ├── insights.tsx   # Analytics dashboard
│   │   ├── features.tsx   # Features showcase
│   │   ├── about.tsx      # About section
│   │   └── footer.tsx     # Footer component
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── store/             # Zustand stores
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #8b5cf6)
- **Accent**: Purple, pink, orange, green variants
- **Neutral**: Comprehensive gray scale
- **Semantic**: Success, warning, error states

### Typography
- **Headings**: Poppins (700-800 weight)
- **Body**: Inter (400-600 weight)
- **Responsive**: Fluid typography scaling

### Components
- **Glassmorphism Cards**: Frosted glass effect
- **Gradient Buttons**: Eye-catching CTAs
- **Floating Labels**: Modern form inputs
- **Animated Icons**: Delightful interactions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🌐 API Integration

The frontend integrates with the Flask backend API:

- **Base URL**: `http://127.0.0.1:5000`
- **Endpoints**:
  - `POST /bus-routes` - Search for bus routes

### Example API Call

```typescript
const response = await fetch('http://127.0.0.1:5000/bus-routes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    stop1: 'Sector 17 Bus Stand', 
    stop2: 'Panchkula Bus Stand' 
  }),
})
```

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** mode support
- **Focus management** for modals and forms

## 🚀 Performance

- **Next.js 14** optimizations
- **Image optimization** with Next.js Image
- **Code splitting** and lazy loading
- **Bundle analysis** with webpack-bundle-analyzer
- **Core Web Vitals** optimized

## 🔮 Future Enhancements

- **Real-time tracking** with WebSocket integration
- **PWA features** for offline support
- **Push notifications** for route updates
- **User accounts** and favorites
- **Multi-language** support
- **Advanced filtering** and sorting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Recharts** - For beautiful data visualization
- **Lucide** - For the beautiful icon set

---

**Built with ❤️ for the Tricity community**