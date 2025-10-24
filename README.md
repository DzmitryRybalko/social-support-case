# Social Support Case - Government Financial Assistance Portal

[![Live Preview](https://img.shields.io/badge/Live%20Preview-View%20App-blue?style=for-the-badge)](https://social-support-case.vercel.app/)

A modern React-based front-end application for citizens to apply for government financial assistance through a multi-step form wizard with AI-powered assistance integration.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **OpenAI API Key**: Required for AI assistance features

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd social-support-case
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_OPENAI_MODEL=gpt-3.5-turbo
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   The application will automatically open at `http://localhost:3000`

## 🔑 OpenAI API Key Setup

### Getting Your API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to the API section
4. Create a new API key
5. Copy the generated key

### Configuration

1. **Create environment file**

   ```bash
   # Create .env file in project root
   touch .env
   ```

2. **Add your API key**

   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   VITE_OPENAI_MODEL=gpt-3.5-turbo
   ```

3. **Security Notes**
   - Never commit your `.env` file to version control
   - The `.env` file is already included in `.gitignore`
   - Keep your API key secure and don't share it publicly

### API Usage

The application uses OpenAI's API to provide AI assistance for:

- **Financial Situation Descriptions**: Help users articulate their financial hardship
- **Employment Circumstances**: Assist with describing job situations
- **Application Reasoning**: Aid in explaining why assistance is needed

## 📁 Project Architecture

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + SCSS
- **Form Management**: React Hook Form with Zod validation
- **Routing**: React Router v7
- **Internationalization**: react-i18next (English/Arabic support)
- **HTTP Client**: Axios
- **Icons**: Font Awesome

### Project Structure

```
src/
├── features/                    # Feature-based modules
│   └── FinancialAssistance/     # Main application feature
│       ├── api/                 # API layer
│       ├── model/              # Business logic & types
│       └── ui/                 # UI components
├── shared/                      # Shared components & utilities
│   ├── contexts/               # React contexts
│   ├── layout/                 # Layout components
│   ├── ui-kit/                 # Reusable UI components
│   └── utils/                  # Utility functions
├── pages/                      # Page components
├── router/                     # Routing configuration
├── locales/                    # Translation files
├── config/                     # App configuration
└── styles/                     # Global styles
```

### Key Architectural Decisions

#### 1. Feature-Based Architecture

- **Decision**: Organized code by features rather than technical layers
- **Rationale**: Improves maintainability and makes features self-contained
- **Benefit**: Easier to locate and modify related functionality

#### 2. Form State Management

- **Decision**: React Hook Form with Zod validation
- **Rationale**:
  - Type-safe form validation
  - Better performance with uncontrolled components
  - Automatic form state persistence
- **Implementation**: Multi-step form with localStorage persistence

#### 3. Internationalization Strategy

- **Decision**: react-i18next with language detection
- **Rationale**:
  - Supports Arabic (RTL) and English (LTR)
  - Automatic language detection from browser/localStorage
  - Fallback to English for missing translations

#### 4. AI Integration Approach

- **Decision**: Direct OpenAI API integration with error handling
- **Rationale**:
  - Real-time AI assistance for form fields
  - Comprehensive error handling for API failures
  - Configurable model selection via environment variables

#### 5. Component Design System

- **Decision**: Custom UI kit with Tailwind CSS
- **Rationale**:
  - Consistent design across the application
  - Reusable components (Button, Input, Modal, etc.)
  - Accessibility-first approach

### Performance Optimizations

1. **Code Splitting**: Manual chunks for vendor libraries
2. **Bundle Optimization**: Separate chunks for React, Router, and Form libraries
3. **Lazy Loading**: Route-based code splitting
4. **Form Persistence**: localStorage for form data recovery

### Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **RTL Support**: Right-to-left layout for Arabic
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Proper focus handling in modals and forms

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development Guidelines

### Code Style

- TypeScript for all components
- Functional components with hooks
- ESLint + Prettier for formatting
- Named exports preferred over default exports

### Component Guidelines

- Single responsibility principle
- Proper TypeScript interfaces
- React.memo for performance optimization
- Accessibility-first development

### Form Handling

- React Hook Form for all forms
- Zod schemas for validation
- Real-time validation feedback
- Automatic form persistence

## 🚀 Deployment

The application builds to static files in the `dist/` directory:

```bash
npm run build
```

Deploy the contents of the `dist/` folder to any static hosting service.
