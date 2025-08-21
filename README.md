# Pefoma Web Dashboard

A modern React web application for Pefoma's AI-powered inventory management solution. This dashboard provides comprehensive analytics, business intelligence, and management tools for small to medium retail businesses.

## 🚀 Features

### Analytics & Reporting Module
- **Monthly usage patterns** and busiest inventory days/times
- **Cost breakdown** and savings opportunities (time saved vs. cost)
- **Accuracy improvements** tracking for most scanned product categories
- **ROI calculator** showing labor cost savings vs. app usage costs
- **Payment analytics**: Per-scan costs vs. subscription value analysis
- **Seasonal trend identification** and inventory forecasting

### Business Intelligence Module
- **Interactive usage charts**: Daily/weekly/monthly scan patterns
- **Cost optimization suggestions** based on usage patterns
- **Subscription vs. pay-per-scan recommendations**
- **Time savings analytics**: Hours saved per inventory cycle
- **Accuracy improvement tracking** over time
- **Payment method performance analysis** (M-Pesa vs. card vs. other)

### Dashboard Features
- **Real-time metrics** and key performance indicators
- **Interactive charts** and data visualizations
- **Responsive design** for desktop and mobile devices
- **Modern UI/UX** with professional styling
- **Settings management** for user preferences

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Lucide React** for icons
- **clsx & tailwind-merge** for class name utilities

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pefoma-web-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with sidebar navigation
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard overview
│   ├── Analytics.tsx   # Analytics & reporting module
│   ├── BusinessIntelligence.tsx # Business intelligence module
│   └── Settings.tsx    # User settings and preferences
├── utils/              # Utility functions
│   └── cn.ts          # Class name utility
├── App.tsx             # Main app component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Design System

The application uses a consistent design system with:
- **Primary colors**: Blue (#3b82f6) for main actions and branding
- **Secondary colors**: Gray scale for text and backgrounds
- **Accent colors**: Green for success, red for errors, yellow for warnings
- **Typography**: Inter font family for clean, modern appearance
- **Components**: Reusable card, button, and form components

## 📊 Key Metrics Tracked

- **Scan Activity**: Daily, weekly, and monthly patterns
- **Cost Analysis**: Per-scan costs, subscription savings, ROI
- **Time Savings**: Hours saved per inventory cycle
- **Accuracy Rates**: Category-wise accuracy improvements
- **Payment Performance**: Success rates, processing times, user satisfaction
- **Usage Optimization**: Peak hours, efficiency recommendations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features

### Dashboard Overview
- Real-time scan statistics
- Quick action buttons
- Performance metrics cards
- Interactive charts for scan activity and category distribution

### Analytics & Reporting
- Comprehensive monthly trends analysis
- ROI comparison charts
- Payment method performance tables
- Seasonal trend forecasting
- Category accuracy tracking

### Business Intelligence
- Interactive usage pattern charts
- Cost optimization recommendations
- Time savings analytics
- Payment method analysis
- Peak usage insights

### Settings Management
- User profile configuration
- Notification preferences
- Security settings (2FA, password management)
- Billing and subscription management
- Integration settings
- Appearance customization

## 🚀 Deployment

The application is built with Vite and can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🔒 Security Features

- TypeScript for type safety
- Input validation and sanitization
- Secure routing with React Router
- Password strength requirements
- Two-factor authentication support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for Pefoma's inventory management solution.

## 📞 Support

For support and questions, please contact the Pefoma development team.

---

**Pefoma** - Revolutionizing inventory management through AI-powered computer vision technology.
