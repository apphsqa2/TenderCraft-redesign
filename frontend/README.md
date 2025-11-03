# TenderCraft - Tender Management Platform

A modern, responsive web application for discovering and managing public procurement tenders. Built with React, Tailwind CSS, and Shadcn/UI components.

![TenderCraft](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.18-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔍 Tender Discovery
- **Advanced Search** - Search tenders by keywords, location, and budget
- **Smart Filters** - Filter by CPV codes, buyer, announcement type, dates, and more
- **Dual View Modes** - Switch between grid and list views
- **Real-time Results** - Instant feedback with 9 sample tenders

### 📋 Tender Details
- **Complete Information** - View all tender details including deadlines, budgets, and locations
- **AI Insights** - Get instant AI-powered analysis of tender requirements
- **Document Access** - Access tender documents and buyer information
- **Award Criteria** - Expandable sections showing evaluation criteria

### 🤖 AI Assistant
- **Tender Expert** - Ask questions about tender requirements
- **Deadline Tracking** - Get reminders and submission tips
- **Smart Recommendations** - AI-powered tender matching

### 📱 Responsive Design
- **Mobile-First** - Fully responsive on all devices
- **Professional UI** - Clean, modern design following procurement industry standards
- **Accessible** - WCAG compliant with proper contrast and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.x or higher ([Download](https://nodejs.org/))
- **Yarn** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/apphsqa2/TenderCraft-redesign.git
cd TenderCraft-redesign

# Install dependencies
yarn install
# or
npm install

# Start development server
yarn start
# or
npm start
```

The application will open at **http://localhost:3000**

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.jsx     # Navigation sidebar
│   │   ├── tenders/
│   │   │   ├── TenderCard.jsx  # Individual tender card
│   │   │   ├── TenderGrid.jsx  # Tender grid/list view
│   │   │   ├── TenderFilters.jsx # Advanced filter modal
│   │   │   ├── SearchBar.jsx   # Search component
│   │   │   └── AIAssistantWidget.jsx # AI assistant
│   │   └── ui/                 # Shadcn UI components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── badge.jsx
│   │       └── ... (30+ components)
│   ├── pages/
│   │   ├── DiscoverTenders.jsx # Main tender listing page
│   │   └── TenderDetails.jsx   # Tender detail page
│   ├── data/
│   │   └── mockTenders.js      # Sample tender data
│   ├── lib/
│   │   └── utils.js            # Utility functions
│   ├── App.js                  # Main app component
│   ├── index.css               # Global styles & design tokens
│   └── index.js                # Entry point
├── package.json
├── tailwind.config.js          # Tailwind configuration
└── .env                        # Environment variables
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary: 217 91% 60%;      /* Professional Blue */
--accent: 245 58% 65%;       /* Purple (AI Features) */
--secondary: 214 32% 91%;    /* Light Blue-Gray */

/* Status Colors */
--success: 142 71% 45%;      /* Green */
--warning: 38 92% 50%;       /* Orange */
--destructive: 0 84% 60%;    /* Red */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Semibold (600)
- **Body**: Regular (400)
- **Scale**: 12px to 36px

## 🛠️ Built With

- **[React 19.2.0](https://react.dev/)** - UI Framework
- **[React Router 7.9.5](https://reactrouter.com/)** - Routing
- **[Tailwind CSS 3.4.18](https://tailwindcss.com/)** - Styling
- **[Shadcn/UI](https://ui.shadcn.com/)** - Component Library
- **[Lucide React](https://lucide.dev/)** - Icons
- **[date-fns](https://date-fns.org/)** - Date formatting

## 📝 Available Scripts

```bash
# Development
yarn start          # Start dev server at http://localhost:3000
yarn build          # Build for production
yarn test           # Run tests

# Code Quality
yarn lint           # Run ESLint (if configured)
```

## 🎯 Key Features Implementation

### Routing
```javascript
/ - Discover Tenders (Main page with grid/list view)
/tender/:id - Tender Details (Full tender information)
```

### State Management
- **Local State**: Using React Hooks (useState, useEffect)
- **Mock Data**: 9 sample tenders in `/src/data/mockTenders.js`
- **No Backend**: Frontend-only prototype with client-side filtering

### Responsive Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Tailwind Configuration
Customize colors, fonts, and breakpoints in `tailwind.config.js`

## 🚀 Deployment

### Build for Production
```bash
yarn build
```

The optimized build will be in the `build/` folder, ready to deploy to:
- **Vercel** - `vercel --prod`
- **Netlify** - Drag & drop the `build/` folder
- **GitHub Pages** - Configure in repository settings
- **AWS S3** - Upload `build/` folder

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [apphsqa2](https://github.com/apphsqa2)

## 🙏 Acknowledgments

- Design inspiration from modern procurement platforms
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- Romanian procurement data structure

---

**Made with ❤️ using React and Tailwind CSS**
