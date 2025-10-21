# Social Support Portal

A modern, accessible government social support portal front-end application that allows citizens to apply for financial assistance through a multi-step form wizard with AI assistance integration.

## 🚀 Features

- **Multi-step Form Wizard**: Intuitive 3-step application process
- **AI-Powered Assistance**: OpenAI GPT-3.5-turbo integration for writing suggestions
- **Bilingual Support**: English and Arabic with RTL layout support
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Form Persistence**: Automatic saving to localStorage
- **Accessibility**: WCAG compliant with screen reader support
- **Type Safety**: Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Form Management**: React Hook Form + Zod validation
- **State Management**: React Context API
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **AI Integration**: OpenAI API
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, etc.)
│   ├── form/           # Form-specific components
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components
│   ├── Step1/          # Personal Information step
│   ├── Step2/          # Family & Financial Info step
│   └── Step3/          # Situation Descriptions step
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── utils/              # Utility functions and helpers
├── contexts/           # React Context providers
├── types/              # TypeScript type definitions
├── locales/            # i18n translation files
└── __tests__/          # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- OpenAI API key

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

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_OPENAI_MODEL=gpt-3.5-turbo
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_DEBUG_MODE=true
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🌐 Internationalization

The application supports English and Arabic languages with automatic RTL layout switching.

### Adding New Translations

1. Add new keys to `src/locales/en.json` and `src/locales/ar.json`
2. Use the `useTranslation` hook in components:
   ```typescript
   const { t } = useTranslation();
   return <div>{t('common.next')}</div>;
   ```

## 🤖 AI Integration

The application includes AI-powered writing assistance using OpenAI's GPT-3.5-turbo model.

### Features
- **Smart Suggestions**: Improve form text with AI-generated suggestions
- **Context-Aware**: Suggestions tailored to specific form fields
- **Multi-language Support**: Works in both English and Arabic
- **Confidence Scoring**: AI suggestions include confidence levels

### Usage
1. Fill out text fields in Step 3
2. Click the "AI Suggestions" button
3. Review and accept/edit suggestions
4. Apply improvements to your text

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Form flow and user interaction tests
- **Accessibility Tests**: Screen reader and keyboard navigation tests

## ♿ Accessibility

The application is built with accessibility in mind:

- **WCAG 2.1 AA Compliant**: Meets accessibility standards
- **Screen Reader Support**: Proper ARIA labels and roles
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Meets contrast ratio requirements
- **Focus Management**: Proper focus handling throughout the app

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for all screen sizes
- **Touch-Friendly**: Large touch targets and gestures
- **Cross-Browser**: Compatible with modern browsers

## 🔒 Security

- **Input Validation**: All user inputs are validated with Zod
- **XSS Protection**: Sanitized user inputs
- **Environment Variables**: Secure API key handling
- **HTTPS**: Secure communication (production)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```env
VITE_OPENAI_API_KEY=your_production_api_key
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_DEBUG_MODE=false
VITE_MOCK_API=false
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Container**: Docker deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- Multi-step form wizard
- AI assistance integration
- Bilingual support
- Responsive design
- Accessibility features

---

**Note**: This application serves citizens in need of financial assistance. Prioritize usability, accessibility, and reliability in all development decisions.
