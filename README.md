# WhyImBroke - AI-Powered Financial Management Platform

<div align="center">
  <img src="public/images/hero-section-image.webp" alt="WhyImBroke Dashboard" width="600" />
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

  **Stop wondering why you're broke. Start making smart money moves.**
  
  [🚀 Live Demo](https://whyimbroke.tech) • [📧 Join Waitlist](#waitlist) • [🐛 Report Bug](https://github.com/your-username/whyimbroke/issues)
</div>

## 🌟 Overview

WhyImBroke is a modern, AI-powered financial management platform designed to help users track expenses, create budgets, and make informed financial decisions. Built with Next.js 14, TypeScript, and featuring a beautiful dark theme with smooth animations.

### ✨ Key Features

- 🎯 **Smart Expense Tracking** - AI-powered categorization and insights
- 📊 **Budget Planning** - Set realistic budgets with intelligent alerts
- 📈 **Financial Analytics** - Detailed charts and spending pattern analysis
- 🎯 **Goal Setting** - Personalized financial goal recommendations
- 🔒 **Bank-level Security** - Enterprise-grade data encryption
- 👨‍👩‍👧‍👦 **Family Sharing** - Collaborative budgeting for families
- 📱 **Responsive Design** - Perfect experience across all devices
- 🌙 **Dark Theme** - Modern, eye-friendly interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git (optional)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/whyimbroke.git
   cd whyimbroke
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library

### UI Components
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Fonts**: [Inter](https://rsms.me/inter/) - Optimized for UI

### Development Tools
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier (recommended)
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm/yarn

## 🔧 Configuration

### Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Database (when ready to connect)
DATABASE_URL="your-database-connection-string"

# Email Service (for waitlist notifications)
RESEND_API_KEY="your-resend-api-key"
MAILCHIMP_API_KEY="your-mailchimp-key"

# Analytics (optional)
GOOGLE_ANALYTICS_ID="your-ga-id"
VERCEL_ANALYTICS_ID="your-vercel-analytics-id"
\`\`\`

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended spacing scale
- Custom animations
- Dark mode support

## 📱 Features in Detail

### 🎯 Waitlist System
- **Email Collection**: Capture interested users before launch
- **Form Validation**: Client and server-side validation
- **Success States**: Animated confirmation messages
- **Social Proof**: Display waitlist statistics
- **Server Actions**: Modern form handling with Next.js

### 🎨 Animations
- **Page Transitions**: Smooth enter/exit animations
- **Scroll Animations**: Elements animate on scroll into view
- **Hover Effects**: Interactive button and card animations
- **Loading States**: Skeleton loaders and spinners

### 📊 Dashboard Preview
- **Financial Stats**: Mock financial data display
- **Transaction List**: Sample transaction history
- **Charts & Graphs**: Visual spending analytics
- **Responsive Cards**: Mobile-friendly layout

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Import your GitHub repository to Vercel
   - Vercel will auto-detect Next.js configuration

2. **Set environment variables**
   - Add your environment variables in Vercel dashboard
   - Configure production database connections

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Preview deployments for pull requests

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Use \`@netlify/plugin-nextjs\`
- **Railway**: Direct Next.js support
- **DigitalOcean App Platform**: Node.js applications
- **AWS Amplify**: Full-stack applications

## 🧪 Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
\`\`\`

### Code Quality

- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict mode enabled for better type safety
- **Prettier**: Recommended for consistent code formatting

### Adding New Components

1. Create component in appropriate directory
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Add proper exports in index files
5. Include JSDoc comments for complex components

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Make your changes
4. Commit your changes (\`git commit -m 'Add amazing feature'\`)
5. Push to the branch (\`git push origin feature/amazing-feature\`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - For the amazing utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - For beautiful animations
- [shadcn/ui](https://ui.shadcn.com/) - For the component library
- [Lucide](https://lucide.dev/) - For the beautiful icons
- [Vercel](https://vercel.com/) - For hosting and deployment

## 📞 Support

- 📧 Email: support@whyimbroke.tech
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/whyimbroke/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/whyimbroke/discussions)

---

<div align="center">
  <p>Built with ❤️ by Gurleen Wadhwa</p>
  <p>
    <a href="https://whyimbroke.tech">Website</a> •
    <a href="https://x.com/gurleenwadhwa1">X</a> •
    <a href="https://github.com/gurleenwadhwa-13/WhyImBroke">GitHub</a>
  </p>
</div>
