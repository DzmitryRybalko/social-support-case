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
- **Build Tool**: Vite with manual chunk splitting
- **Styling**: Tailwind CSS v4 + SCSS
- **Form Management**: React Hook Form with Zod v4 validation
- **Routing**: React Router v7 with lazy loading
- **Internationalization**: react-i18next (English/Arabic support)
- **HTTP Client**: Axios with interceptors
- **Icons**: Font Awesome v7
- **State Management**: React hooks + localStorage persistence

### Architecture Pattern: Feature-Slice Design

This project follows the **Feature-Slice Design** pattern, organizing code by features rather than technical layers. Each feature contains its own API, model (business logic), and UI layers, promoting better maintainability and feature isolation.

### Project Structure

```
src/
├── features/                           # Feature-based modules
│   └── FinancialAssistance/            # Main application feature
│       ├── api/                        # External API communication
│       │   ├── applicationApi.ts        # Mock backend API
│       │   └── openAiApi.ts            # OpenAI integration
│       ├── model/                      # Business logic & domain
│       │   ├── constants/              # Form field definitions
│       │   │   └── formConstants.ts    # Field validation rules
│       │   ├── hooks/                  # Feature-specific hooks
│       │   │   ├── useApiKey.ts        # API key management
│       │   │   ├── useFamilyInfoTranslations.ts
│       │   │   └── useLocalStorage.ts  # Form persistence
│       │   ├── types/                  # TypeScript interfaces
│       │   │   ├── FamilyInfo.ts       # Family data types
│       │   │   ├── FinancialAssistanceStepper.ts
│       │   │   ├── MaritalStatus.ts    # Enum definitions
│       │   │   ├── PersonalInfo.ts     # Personal data types
│       │   │   └── SituationDescription.ts
│       │   └── utils/                  # Business logic utilities
│       │       └── formDataCollector.ts # Data aggregation
│       └── ui/                         # Presentation components
│           ├── components/             # Modal components
│           │   ├── AISuggestionModal.tsx
│           │   ├── ApiKeyModal.tsx
│           │   └── SuccessModal.tsx
│           ├── steps/                  # Multi-step form pages
│           │   ├── FamilyInfoStep.tsx
│           │   ├── PersonalInfoStep.tsx
│           │   └── SituationDescriptionStep.tsx
│           └── FinancialAssistanceStepper.tsx
├── shared/                             # Shared components & utilities
│   ├── components/                      # Global components
│   │   └── ErrorBoundary/              # Error handling
│   ├── contexts/                        # React contexts
│   │   └── RTLContext.tsx              # RTL/Language context
│   ├── layout/                         # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── ui-kit/                         # Reusable UI components
│       ├── SspButton/                  # Custom button component
│       ├── Stepper/                    # Progress stepper
│       ├── InputWithLabel/             # Form inputs
│       ├── TextareaWithLabel/
│       ├── RadioGroup/
│       ├── Modal/
│       ├── HelperText/
│       ├── Label/
│       └── Spinner/
├── pages/                              # Page components
│   └── FinancialAssistance/
├── router/                             # Routing configuration
│   └── AppRouter.tsx
├── config/                             # App configuration
│   └── i18n.ts                         # Internationalization setup
└── styles/                             # Global styles
    └── global.scss
```

## ✨ Key Features

### Multi-Step Form Wizard
- **Progressive Disclosure**: Three-step process (Personal Info → Family Info → Situation Description)
- **Step Navigation**: Users can navigate between completed steps with visual progress tracking
- **Form Persistence**: All form data automatically saved to localStorage for recovery
- **Validation**: Real-time validation with React Hook Form + Zod schemas

### AI-Powered Assistance
- **Smart Suggestions**: OpenAI integration for financial situation descriptions
- **Modal Interface**: Accept, edit, or discard AI suggestions with user-friendly modal
- **Flexible API Key Management**: Support for both environment variables and user-provided keys
- **Error Handling**: Comprehensive error handling for API failures, rate limits, and timeouts

### Bilingual Support
- **RTL/LTR Layout**: Full support for Arabic (RTL) and English (LTR) layouts
- **Language Switching**: Seamless language switching with persistent user preference
- **Context-Aware**: Automatic language detection from browser settings
- **Accessibility**: Proper ARIA labels and screen reader support

### Form Data Management
- **Centralized Collection**: Single utility (`formDataCollector.ts`) aggregates all form data
- **Type Safety**: Complete TypeScript interfaces for all form data structures
- **Data Validation**: Zod schemas ensure data integrity before submission
- **Recovery System**: Automatic form recovery on page reload

### Error Handling & UX
- **Error Boundaries**: Graceful error handling with React Error Boundaries
- **Loading States**: Comprehensive loading indicators for async operations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🏗️ Key Architectural Decisions

#### 1. Feature-Slice Design Pattern

- **Decision**: Organized code by features with API/Model/UI layers
- **Rationale**: 
  - Better maintainability and feature isolation
  - Clear separation of concerns within each feature
  - Easier testing and debugging
- **Implementation**: Each feature contains its own business logic, API calls, and UI components

#### 2. Model Layer Architecture

- **Decision**: Centralized business logic in the model layer
- **Rationale**:
  - Separation of business logic from presentation
  - Reusable hooks and utilities
  - Type-safe data structures
- **Components**: Types, hooks, constants, and utilities organized by domain

#### 3. Form State Management

- **Decision**: React Hook Form with Zod validation + localStorage persistence
- **Rationale**:
  - Type-safe form validation
  - Better performance with uncontrolled components
  - Automatic form state persistence across sessions
- **Implementation**: Multi-step form with centralized data collection

#### 4. AI Integration Strategy

- **Decision**: Direct OpenAI API integration with dual API key support
- **Rationale**:
  - Flexible deployment options (env vars or user-provided keys)
  - Real-time AI assistance for form fields
  - Comprehensive error handling for production reliability
- **Features**: Axios interceptors, timeout handling, rate limit management

#### 5. Internationalization Architecture

- **Decision**: react-i18next with RTL context provider
- **Rationale**:
  - Supports Arabic (RTL) and English (LTR) layouts
  - Automatic language detection and persistence
  - Context-aware RTL layout switching
- **Implementation**: Custom RTLContext with document direction management

#### 6. Component Design System

- **Decision**: Custom UI kit with Tailwind CSS v4
- **Rationale**:
  - Consistent design system across the application
  - Reusable, accessible components
  - Modern CSS with utility-first approach
- **Components**: Button, Input, Modal, Stepper, and form components


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
