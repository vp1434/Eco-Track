# AI-based College Waste & Energy Monitoring System

A full-stack web application for monitoring college energy consumption and waste management using simulated data. Built with React, Node.js, Express, and Recharts.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

### 📊 Dashboard Overview
- Real-time energy and waste metrics
- Interactive charts (Line & Pie charts)
- Sustainability score tracking
- Active alerts monitoring

### ⚡ Energy Monitoring
- Department-wise energy consumption tracking (CSE, Hostel, Library, Labs)
- Bar chart visualization
- Detailed consumption logs
- High usage alerts

### ♻️ Waste Monitoring
- Waste categorization (Organic, Recyclable, Non-Recyclable)
- Pie chart distribution
- Daily waste logs
- Overflow warnings

### 🤖 AI Predictions
- Next-day energy consumption forecasting
- Confidence levels
- Smart optimization suggestions
- Historical pattern analysis

### 📈 Reports
- Date-wise data filtering
- Comprehensive analytics
- Download functionality (UI ready)
- Key insights and metrics

### 🔐 Authentication
- Role-based access (Admin/Viewer)
- Protected routes
- Session management

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18.2.0) with Vite
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **REST API** architecture
- **CORS** enabled
- **Dummy data generators** (scalable for real IoT integration)

## 📁 Project Structure

```
Ai-Based-energy-and-waste-monetring-System/
├── backend/
│   ├── data/
│   │   └── dummyData.js          # Data generators
│   ├── routes/
│   │   ├── energyRoutes.js       # Energy API
│   │   ├── wasteRoutes.js        # Waste API
│   │   └── dashboardRoutes.js    # Dashboard API
│   ├── server.js                 # Express server
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EnergyMonitoring.jsx
│   │   │   ├── WasteMonitoring.jsx
│   │   │   ├── AIPrediction.jsx
│   │   │   └── Reports.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Ai-Based-energy-and-waste-monetring-System
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

3. **Access the Application**
Open your browser and navigate to `http://localhost:3000`

### Login Credentials
**Demo Mode:** Use any username and password to login
- Select role: Admin or Viewer
- Both roles have full access in this demo version

## 📡 API Endpoints

### Energy APIs
- `GET /api/energy` - Get all energy data
- `GET /api/energy?block=CSE` - Filter by block
- `GET /api/energy?date=2026-02-15` - Filter by date
- `POST /api/energy` - Add new energy data

### Waste APIs
- `GET /api/waste` - Get all waste data
- `GET /api/waste?date=2026-02-15` - Filter by date
- `POST /api/waste` - Add new waste data

### Dashboard APIs
- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/alerts` - Get active alerts
- `GET /api/dashboard/predictions` - Get AI predictions

### Health Check
- `GET /api/health` - Server health status

## 🎨 Design Features

- **Glassmorphism UI** - Modern frosted glass effect
- **Dark Mode** - Premium dark theme
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Fade-in and hover effects
- **Interactive Charts** - Recharts with custom styling
- **Color-coded Data** - Easy visual distinction

## 🔮 Future Enhancements

- [ ] Real IoT sensor integration
- [ ] MongoDB database integration
- [ ] JWT-based authentication
- [ ] Email notifications for alerts
- [ ] PDF report generation
- [ ] Advanced ML models for predictions
- [ ] Multi-campus support
- [ ] Mobile app (React Native)

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for sustainable campus management

## 🙏 Acknowledgments

- Recharts for beautiful chart components
- Tailwind CSS for utility-first styling
- Vite for blazing fast development

---

**Note:** This is a Phase 1 implementation using dummy data. The architecture is designed to be scalable for real IoT sensor integration in future phases.
