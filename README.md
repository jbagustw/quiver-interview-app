# Quiver Interview App

A modern, AI-powered interview platform built with React, TypeScript, and Vite. This application provides voice-based interview capabilities with real-time recording, playback, and analytics.

## Features

- 🎤 **Voice Recording**: Real-time audio recording with MediaRecorder API
- 📊 **Analytics Dashboard**: Performance metrics and score analysis
- 🎨 **Modern UI**: Beautiful, responsive design with glassmorphism effects
- 🔄 **Interview Flow**: Structured question-based interview process
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Development**: Built with Vite for rapid development

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: CSS with modern design patterns
- **Audio**: Web Audio API (MediaRecorder)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiver-interview-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx     # Navigation component
│   └── Navbar.css
├── pages/              # Page components
│   ├── Home.tsx       # Landing page
│   ├── Home.css
│   ├── Interview.tsx  # Interview interface
│   ├── Interview.css
│   ├── Results.tsx    # Analytics dashboard
│   └── Results.css
├── App.tsx            # Main app component
├── App.css            # Global styles
├── main.tsx           # Application entry point
└── index.css          # Base styles
```

## Features Overview

### Home Page
- User authentication (simple name-based login)
- Feature showcase
- Welcome interface for returning users

### Interview Page
- Voice recording with real-time timer
- Question navigation
- Audio playback functionality
- Progress tracking
- Interview reset capability

### Results Page
- Performance analytics
- Score breakdown (confidence, clarity)
- Interview history
- Download and share capabilities

## Browser Compatibility

The application requires modern browser support for:
- MediaRecorder API (for voice recording)
- ES6+ features
- CSS Grid and Flexbox

## Development Notes

### Audio Recording
The app uses the MediaRecorder API for voice recording. Users must grant microphone permissions for the interview functionality to work.

### State Management
Currently uses React's built-in state management. For larger applications, consider implementing Redux or Zustand.

### Styling
The app uses a custom CSS approach with:
- CSS custom properties for theming
- Glassmorphism effects
- Responsive design patterns
- Modern color schemes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Backend integration for data persistence
- [ ] Real-time AI analysis of responses
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Interview templates and customization
- [ ] Export functionality for reports
- [ ] User management and authentication
- [ ] Interview scheduling system 