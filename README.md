# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# ⚽ FIFA Match Generator

<div align="center">

![FIFA Match Generator](https://img.shields.io/badge/FIFA-Match%20Generator-brightgreen?style=for-the-badge&logo=fifa)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)

**A modern, interactive FIFA match preview generator with real-time team statistics and head-to-head analysis**

[✨ Features](#-features) • [🚀 Getting Started](#-getting-started) • [🎮 Usage](#-usage) • [🛠️ Tech Stack](#️-tech-stack) • [📸 Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 🏆 **Team Selection & Analysis**
- **5+ Major Leagues**: Premier League, La Liga, Serie A, Bundesliga, MLS
- **Real Team Data**: Authentic team logos, names, and information
- **Smart Team Caching**: Optimized performance with intelligent data management

### 📊 **Advanced Statistics**
- **Live Team Ratings**: Dynamic 0-100 rating system based on real performance
- **Win Percentage Analysis**: Historical win rates with comparative visualization
- **Attacking Potential**: Goals scored, consistency, and penalty efficiency metrics
- **Defensive Strength**: Clean sheets, goals conceded, and defensive stability

### 🔥 **Head-to-Head Analysis**
- **Historical Matchups**: Real historical match data between selected teams
- **Win/Loss Records**: Comprehensive head-to-head statistics
- **Smart Fallbacks**: Graceful handling when data is unavailable

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful backdrop blur effects and transparency
- **Responsive Layout**: Perfect on mobile, tablet, and desktop
- **Smooth Animations**: 1-second transition effects and loading states
- **Dark Theme**: Eye-friendly dark interface with gradient accents

### ⚡ **Performance & Reliability**
- **API Integration**: Football-API v3 with RapidAPI headers
- **Error Handling**: Comprehensive error boundaries and fallback systems
- **Loading States**: Visual feedback for all async operations
- **TypeScript**: Full type safety and enhanced developer experience

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Football API Key** from [RapidAPI](https://rapidapi.com/api-sports/api/football)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fifa-match-generator.git
   cd fifa-match-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   echo "VITE_FOOTBALL_API_KEY=your_rapidapi_key_here" > .env
   echo "VITE_FOOTBALL_API_BASE_URL=https://v3.football.api-sports.io" >> .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🎮 Usage

### Basic Workflow
1. **Select League**: Choose from Premier League, La Liga, Serie A, Bundesliga, or MLS
2. **Pick Teams**: Select two teams from the chosen league
3. **View Analysis**: See comprehensive match preview with:
   - Team ratings displayed prominently below logos
   - Head-to-head historical record
   - Win percentage comparison bars
   - Attacking and defensive potential metrics

### Understanding the Statistics

| Metric | Description | Calculation |
|--------|-------------|-------------|
| **Rating** | Overall team performance (0-100) | Win% (40%) + Goal difference (30%) + Goals scored (20%) + Clean sheets (10%) |
| **Win%** | Historical win percentage | Total wins / Total matches played |
| **ATT** | Attacking potential | Goals per game (50%) + Scoring consistency (30%) + Penalty efficiency (20%) |
| **DEF** | Defensive strength | Goals conceded inverted (60%) + Clean sheet percentage (40%) |

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.6.2** - Static type checking and enhanced development
- **Vite 7.0.4** - Lightning-fast build tool and dev server

### Styling & UI
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Custom Components** - Modular, reusable component architecture
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### API & Data Management
- **Football API v3** - Real-time football data from api-sports.io
- **RapidAPI Integration** - Secure API key management
- **Smart Caching** - Team data caching for improved performance

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript Strict Mode** - Enhanced type safety
- **Vite Environment Variables** - Secure configuration management

---

## 📸 Screenshots

### 🏠 League Selection
*Choose from 5 major football leagues with beautiful flag representations*

### ⚔️ Team Selection
*Pick two teams with real logos and comprehensive information*

### 📊 Match Preview
*Detailed analysis with ratings, statistics, and head-to-head data*

---

## 🔧 API Configuration

### Required Environment Variables
```env
# Football API Configuration
VITE_FOOTBALL_API_KEY=your_rapidapi_key_here
VITE_FOOTBALL_API_BASE_URL=https://v3.football.api-sports.io

# Optional: Custom API Headers
VITE_RAPIDAPI_HOST=v3.football.api-sports.io
```

### Supported Leagues
```typescript
const LEAGUE_IDS = {
  'premier-league': 39,
  'la-liga': 140,
  'serie-a': 71,
  'bundesliga': 78,
  'major-league-soccer': 253
}
```

---

## 🎯 Key Features in Detail

### 🔄 Real-Time Data Integration
- **Live API Calls**: Fetches current team statistics and historical data
- **Fallback System**: Intelligent fallbacks when API data is unavailable
- **Error Boundaries**: Graceful error handling for network issues

### 📱 Responsive Design
- **Mobile Optimized**: Enhanced bar heights and touch-friendly interfaces
- **Tablet Support**: Optimized layouts for medium-screen devices
- **Desktop Experience**: Full-featured interface with enhanced visual elements

### ⚡ Performance Optimizations
- **Component Memoization**: Optimized re-renders with React.memo
- **Lazy Loading**: Efficient loading of team data and images
- **Bundle Optimization**: Tree-shaking and code splitting with Vite

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript strict mode requirements
- Use Tailwind CSS for styling consistency
- Add proper error handling for new features
- Include responsive design considerations

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Football API** by API-Sports for providing comprehensive football data
- **React Team** for the amazing framework and concurrent features
- **Tailwind CSS** for the utility-first CSS framework
- **Vite Team** for the lightning-fast build tool

---

<div align="center">

**Made with ❤️ and ⚽ by [Your Name]**

[⭐ Star this repo](https://github.com/yourusername/fifa-match-generator) if you found it helpful!

</div>

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
