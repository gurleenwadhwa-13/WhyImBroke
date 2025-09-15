# 💰 WhyImBroke

<div align="center">
  <img src="public/images/hero-section-image.webp" alt="WhyImBroke Dashboard" width="600" />

  [![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.2.1-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square)](https://clerk.com/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

  **Your AI-Powered Financial Management Platform**
  > Take control of your finances with intelligent expense tracking, smart budgeting, and insightful analytics.

  [🚀 Live Demo](https://whyimbroke.tech) · [📧 Join Waitlist](#waitlist) · [🐛 Report Bug](https://github.com/your-username/whyimbroke/issues)
</div>

---

## 🌟 What is WhyImBroke?

WhyImBroke is a modern, AI-powered financial management platform designed to help you understand your spending patterns, create effective budgets, and achieve your financial goals. Built with cutting-edge technologies, it offers a seamless experience across all devices with bank-level security.

### ✨ Key Features

- **🤖 Smart Expense Tracking** - AI-powered categorization of transactions
- **📊 Intelligent Budgeting** - Create budgets with personalized recommendations
- **📈 Financial Analytics** - Deep insights into spending patterns and trends
- **🎯 Goal Setting** - Set and track financial objectives with progress monitoring
- **👥 Family Sharing** - Collaborative financial management for households
- **🔒 Bank-Level Security** - Enterprise-grade security for your financial data
- **📱 Responsive Design** - Seamless experience on desktop, tablet, and mobile
- **🌙 Dark Theme** - Modern, eye-friendly interface

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **Bun** (recommended) or npm/yarn
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gurleenwadhwa-13/whyimbroke.git
   cd whyimbroke
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 15.3.2](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5.0+](https://www.typescriptlang.org/) - Type-safe JavaScript
- **ORM**: [Prisma 6.2.1](https://www.prisma.io/) - Database toolkit
- **Authentication**: [Clerk](https://clerk.com/) - Authentication as a service
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
- **Package Manager**: Bun/npm/yarn

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your-database-connection-string"

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# Email Service (for waitlist notifications)
RESEND_API_KEY="your-resend-api-key"
MAILCHIMP_API_KEY="your-mailchimp-key"

# Analytics (optional)
GOOGLE_ANALYTICS_ID="your-ga-id"
VERCEL_ANALYTICS_ID="your-vercel-analytics-id"

# AI Services (if applicable)
OPENAI_API_KEY="your-openai-key"
```

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
- **Netlify**: Use `@netlify/plugin-nextjs`
- **Railway**: Direct Next.js support
- **DigitalOcean App Platform**: Node.js applications
- **AWS Amplify**: Full-stack applications

## 🧪 Development

### Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run type-check   # Run TypeScript compiler
```

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
2. Create a feature branch (`git checkout -b username:amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin username:amazing-feature`)
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
- [Clerk](https://clerk.com/) - For authentication
- [Prisma](https://www.prisma.io/) - For database operations

## 📞 Support

- 📧 Reach out: DM me on X: @gurleenwadhwa
- 🐛 Issues: [GitHub Issues](https://github.com/gurleenwadhwa-13/whyimbroke/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/gurleenwadhwa-13/whyimbroke/discussions)

---

<div align="center">
  <p>Built with ❤️ by Gurleen Wadhwa</p>
  <p>
    <a href="https://whyimbroke.tech">Website</a> •
    <a href="https://x.com/gurleenwadhwa1">X</a> •
    <a href="https://github.com/gurleenwadhwa-13/WhyImBroke">GitHub</a>
  </p>
</div>
