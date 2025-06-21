# AeroEdit - Paddle Billing SaaS Starter Kit

A complete Next.js SaaS starter kit powered by **Paddle Billing**, **Clerk Authentication**, and **Prisma ORM**. Build and deploy a production-ready subscription-based application with modern tools and best practices.

> **Important:** This starter kit works with Paddle Billing. It does not support Paddle Classic. To work with Paddle Classic, see: [Paddle Classic API reference](https://developer.paddle.com/classic/api-reference/1384a288aca7a-api-reference?utm_source=dx&utm_medium=paddle-nextjs-starter-kit)

## Demo

See it in action: [https://paddle-billing.vercel.app/](https://paddle-billing.vercel.app/?utm_source=dx&utm_medium=paddle-nextjs-starter-kit)

![Illustration showing two screens from the starter kit. On the left is three-tier pricing page. On the right is a subscription page, showing an itemized list of products on the subscription, the next payment, and previous payments.](hero.png)

## ✨ Features

### 🔐 Authentication & User Management
- **Clerk Authentication** - Modern, secure authentication with social logins
- Pre-built sign-in/sign-up flows with customizable UI
- Session management and user profile handling
- Protected routes and middleware

### 💳 Payments & Billing
- **Paddle Billing** integration with secure checkout
- Three-tier pricing page with localized pricing for 200+ markets
- Subscription management and billing cycle handling
- Payment method updates and cancellation flows
- Webhook processing for real-time updates

### 🗄️ Database & ORM
- **Prisma ORM** for type-safe database operations
- PostgreSQL database with optimized schema
- Automated migrations and database management
- Customer and subscription data synchronization

### 🎨 UI & Design
- **shadcn/ui** component library with dark theme
- **Tailwind CSS** for responsive design
- Modern gradient backgrounds and animations
- Mobile-first responsive design

### 🚀 Developer Experience
- **TypeScript** for type safety
- **Next.js 15** with App Router
- Hot reload and development tools
- Comprehensive error handling

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Prisma ORM](https://prisma.io/) with PostgreSQL
- **Payments:** [Paddle Billing](https://www.paddle.com/billing?utm_source=dx&utm_medium=paddle-nextjs-starter-kit)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/) (recommended)

## 📋 Prerequisites

### Development Environment
- [Node.js](https://nodejs.org/) version ≥ 20
- [pnpm](https://pnpm.io/), [npm](https://www.npmjs.com/), or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) database

### Required Accounts
- [Clerk account](https://clerk.com/) for authentication
- [Paddle Billing account](https://sandbox-login.paddle.com/signup?utm_source=dx&utm_medium=paddle-nextjs-starter-kit) (sandbox recommended for development)
- [Vercel account](https://vercel.com/) for deployment (optional)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-username/paddle-nextjs-starter-kit.git
cd paddle-nextjs-starter-kit
pnpm install
```

### 2. Environment Setup

Copy the environment variables template:

```bash
cp .env.local.example .env.local
```

Fill in your environment variables in `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Paddle
PADDLE_API_KEY=your_paddle_api_key
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_paddle_client_token
NEXT_PUBLIC_PADDLE_ENV=sandbox
PADDLE_NOTIFICATION_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# (Optional) Open Prisma Studio
pnpm db:studio
```

### 4. Configure Services

#### Clerk Setup
1. Create a [Clerk application](https://dashboard.clerk.com/)
2. Configure sign-in/sign-up settings
3. Add your API keys to `.env.local`

#### Paddle Setup
1. Create products and prices in your [Paddle dashboard](https://sandbox-vendors.paddle.com/)
2. Update price IDs in `src/constants/pricing-tier.ts`
3. Add your domain to Paddle's approved domains
4. Set up webhook endpoint: `https://yourdomain.com/api/webhook`

### 5. Start Development

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

## 📁 Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/webhook/       # Paddle webhook handler
│   │   ├── checkout/          # Checkout pages
│   │   ├── dashboard/         # Protected dashboard
│   │   ├── sign-in/           # Clerk sign-in
│   │   └── sign-up/           # Clerk sign-up
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── checkout/          # Checkout components
│   │   └── home/              # Landing page components
│   ├── lib/                   # Utilities and configurations
│   ├── utils/                 # Helper functions
│   │   ├── auth.ts            # Authentication utilities
│   │   └── paddle/            # Paddle integration
│   ├── constants/             # App constants
│   └── styles/                # CSS styles
├── public/                    # Static assets
└── supabase/                  # Legacy migration files
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev                # Start development server
pnpm build             # Build for production
pnpm start             # Start production server

# Database
pnpm db:generate       # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run database migrations
pnpm db:studio        # Open Prisma Studio

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm prettier         # Format code
pnpm test             # Run tests
```

## 🔗 Key Integrations

### Paddle Billing
- Subscription management
- Payment processing
- Webhook handling
- Localized pricing

### Clerk Authentication
- User registration and login
- Session management
- Protected routes
- User profile management

### Prisma ORM
- Type-safe database queries
- Automated migrations
- Database schema management
- Real-time data synchronization

## 📚 Documentation

- [Detailed Setup Guide](./SETUP.md) - Complete setup instructions
- [Paddle API Documentation](https://developer.paddle.com/api-reference/overview?utm_source=dx&utm_medium=paddle-nextjs-starter-kit)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

This starter kit can be deployed to any platform that supports Node.js:
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/)

## 🔒 Security

- Environment variables for sensitive data
- Webhook signature verification
- Protected API routes
- Clerk authentication middleware
- Type-safe database operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- [GitHub Issues](https://github.com/your-username/paddle-nextjs-starter-kit/issues)
- [Paddle Support](mailto:sellers@paddle.com)
- [Clerk Support](https://clerk.com/support)

## 🙏 Acknowledgments

- [Paddle](https://paddle.com) for the billing platform
- [Clerk](https://clerk.com) for authentication
- [Prisma](https://prisma.io) for the ORM
- [Vercel](https://vercel.com) for hosting
- [shadcn](https://ui.shadcn.com) for the UI components

---

**Built with ❤️ by the Paddle team**