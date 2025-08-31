# Grocery List App Frontend

A modern React frontend for the RideCo Grocery List application

## Overview

- Intuitive grocery list management interface for a family of 1
- Responsive design for desktop and mobile devices
- Real-time updates and seamless user experience

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library** - DaisyUI (Tailwind plugin with lots of pre-styled components.)
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Package Manager**: npm

## Architecture

This project follows modern React patterns with a focus on maintainability and testability.

### Directory Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (Button, Input, etc.)
│   │   └── grocery/      # Grocery-specific components
│   ├── pages/            # Page components and routing
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service layer
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── styles/           # Global styles and Tailwind config
├── public/               # Static assets
├── tests/                # Test suite
│   ├── __mocks__/       # Test mocks
│   ├── components/      # Component tests
│   └── integration/     # Integration tests
├── .env.example          # Environment variables template
└── ...
```

**Component Architecture**
- Atomic design principles for UI components
- Custom hooks for business logic and API interactions
- Separation of concerns between presentation and data fetching

**State Management**
- React Query for server state management
- Local component state for UI-specific state
- Context API for global application state when needed

**API Integration**
- Centralized API service layer
- Type-safe API calls with TypeScript
- Error handling and loading states

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm
- Backend API running (see [backend repository](https://github.com/KNMohamed/grocery-app-backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/KNMohamed/grocery-app-frontend.git
cd grocery-app-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
VITE_API_BASE_URL=http://localhost:5001/api/v1
```

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests in watch mode

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript type checking
```

## Testing

The project uses Vitest and React Testing Library for testing:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm run test -- components/GroceryList.test.tsx
```

### Test Structure

- **Unit Tests**: Individual component and utility function tests
- **Integration Tests**: Multi-component interaction tests

## Deployment

### Production Build

```bash
# Build the application
npm run build

# The build artifacts will be stored in the `dist/` directory
```

### Docker Deployment

```bash
# Build Docker image
docker build -t grocery-app-frontend .

# Run container
docker run -p 3000:80 grocery-app-frontend
```

## API Integration

This frontend integrates with the [Grocery List Backend API](https://github.com/KNMohamed/grocery-app-backend). Ensure the backend is running before starting the frontend development server.