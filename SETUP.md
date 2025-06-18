# 🚀 Complete Setup Guide

This guide will walk you through setting up the AeroEdit Paddle Billing starter kit from scratch. Follow these steps carefully to get your SaaS application running.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Database Configuration](#database-configuration)
4. [Clerk Authentication Setup](#clerk-authentication-setup)
5. [Paddle Billing Setup](#paddle-billing-setup)
6. [Environment Variables](#environment-variables)
7. [Database Migration](#database-migration)
8. [Development Server](#development-server)
9. [Testing the Integration](#testing-the-integration)
10. [Production Deployment](#production-deployment)
11. [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Software

1. **Node.js** (version 20 or higher)
   ```bash
   # Check your Node.js version
   node --version
   
   # If you need to install/update Node.js
   # Visit: https://nodejs.org/
   ```

2. **Package Manager** (choose one)
   ```bash
   # pnpm (recommended)
   npm install -g pnpm
   
   # or npm (comes with Node.js)
   # or yarn
   npm install -g yarn
   ```

3. **PostgreSQL Database**
   - Local installation: [PostgreSQL Downloads](https://www.postgresql.org/download/)
   - Cloud options: [Supabase](https://supabase.com/), [Neon](https://neon.tech/), [Railway](https://railway.app/)

4. **Git**
   ```bash
   git --version
   ```

### Required Accounts

1. **Clerk Account** (Free tier available)
   - Sign up at: [https://clerk.com/](https://clerk.com/)

2. **Paddle Account** (Sandbox for development)
   - Sign up at: [https://sandbox-login.paddle.com/signup](https://sandbox-login.paddle.com/signup)

3. **Vercel Account** (Optional, for deployment)
   - Sign up at: [https://vercel.com/](https://vercel.com/)

## 📁 Project Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/paddle-nextjs-starter-kit.git
cd paddle-nextjs-starter-kit

# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### 2. Environment Variables Setup

```bash
# Copy the environment template
cp .env.local.example .env.local
```

Your `.env.local` file should look like this:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Paddle
## Private
PADDLE_API_KEY=
PADDLE_NOTIFICATION_WEBHOOK_SECRET=

## Public
NEXT_PUBLIC_PADDLE_ENV=sandbox # or `production`
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
```

## 🗄️ Database Configuration

### Option 1: Local PostgreSQL

1. **Install PostgreSQL** locally
2. **Create a database**:
   ```sql
   CREATE DATABASE aeroedit_dev;
   CREATE USER aeroedit_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE aeroedit_dev TO aeroedit_user;
   ```
3. **Update DATABASE_URL**:
   ```bash
   DATABASE_URL="postgresql://aeroedit_user:your_password@localhost:5432/aeroedit_dev"
   ```

### Option 2: Supabase (Recommended)

1. **Create a Supabase project**:
   - Go to [https://supabase.com/](https://supabase.com/)
   - Click "New Project"
   - Choose organization and enter project details

2. **Get connection string**:
   - Go to Settings → Database
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your database password

3. **Update DATABASE_URL**:
   ```bash
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

### Option 3: Neon

1. **Create a Neon project**:
   - Go to [https://neon.tech/](https://neon.tech/)
   - Create a new project

2. **Copy connection string**:
   - From your Neon dashboard
   - Use the "Prisma" connection string format

## 🔐 Clerk Authentication Setup

### 1. Create Clerk Application

1. **Sign up/Login** to [Clerk Dashboard](https://dashboard.clerk.com/)

2. **Create new application**:
   - Click "Add application"
   - Choose "Next.js"
   - Select authentication methods (Email, Google, GitHub, etc.)

### 2. Configure Clerk Settings

1. **Get API Keys**:
   - Go to "API Keys" in your Clerk dashboard
   - Copy "Publishable key" and "Secret key"

2. **Update environment variables**:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

3. **Configure URLs** (in Clerk Dashboard):
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`
   - **After sign-in URL**: `/dashboard`
   - **After sign-up URL**: `/dashboard`

### 3. Customize Authentication (Optional)

1. **Branding**: Upload your logo and customize colors
2. **Social Providers**: Enable Google, GitHub, etc.
3. **User Profile**: Configure required fields

## 💳 Paddle Billing Setup

### 1. Create Paddle Account

1. **Sign up** for [Paddle Sandbox](https://sandbox-login.paddle.com/signup)
2. **Complete verification** process
3. **Access dashboard** at [https://sandbox-vendors.paddle.com/](https://sandbox-vendors.paddle.com/)

### 2. Get API Credentials

1. **API Key**:
   - Go to "Developer tools" → "Authentication"
   - Create new API key
   - Copy the key

2. **Client Token**:
   - In the same section, create a client-side token
   - Copy the token

3. **Update environment variables**:
   ```bash
   PADDLE_API_KEY=your_api_key_here
   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_client_token_here
   NEXT_PUBLIC_PADDLE_ENV=sandbox
   ```

### 3. Create Products and Prices

1. **Go to Catalog** → **Products**

2. **Create three products** (matching the starter kit):

   **Product 1: Starter Plan**
   - Name: "Starter"
   - Description: "Ideal for individuals who want to get started with simple design tasks."

   **Product 2: Pro Plan**
   - Name: "Pro"
   - Description: "Enhanced design tools for scaling teams who need more flexibility."

   **Product 3: Advanced Plan**
   - Name: "Advanced"
   - Description: "Powerful tools designed for extensive collaboration and customization."

3. **Create prices for each product**:
   - Monthly price (e.g., $9/month, $29/month, $99/month)
   - Annual price (e.g., $90/year, $290/year, $990/year)

4. **Copy price IDs** and update `src/constants/pricing-tier.ts`:
   ```typescript
   export const PricingTier: Tier[] = [
     {
       name: 'Starter',
       id: 'starter',
       // ... other properties
       priceId: { 
         month: 'pri_your_monthly_price_id', 
         year: 'pri_your_annual_price_id' 
       },
     },
     // ... other tiers
   ];
   ```

### 4. Configure Webhooks

1. **Go to Developer tools** → **Notifications**

2. **Create notification destination**:
   - **Endpoint URL**: `https://yourdomain.com/api/webhook` (use ngrok for local development)
   - **Events**: Select all subscription and customer events

3. **Copy webhook secret**:
   ```bash
   PADDLE_NOTIFICATION_WEBHOOK_SECRET=your_webhook_secret
   ```

### 5. Domain Approval

1. **Go to Checkout** → **Website approval**
2. **Add your domain** (for production) or use ngrok URL (for development)
3. **Wait for approval** (instant for sandbox)

## 🔄 Database Migration

### 1. Generate Prisma Client

```bash
pnpm db:generate
```

### 2. Push Schema to Database

```bash
pnpm db:push
```

### 3. Verify Database Setup

```bash
# Open Prisma Studio to view your database
pnpm db:studio
```

You should see two tables:
- `customers`
- `subscriptions`

## 🚀 Development Server

### 1. Start the Development Server

```bash
pnpm dev
```

### 2. Access Your Application

- **Main site**: [http://localhost:3000](http://localhost:3000)
- **Sign in**: [http://localhost:3000/sign-in](http://localhost:3000/sign-in)
- **Sign up**: [http://localhost:3000/sign-up](http://localhost:3000/sign-up)
- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (requires authentication)

## 🧪 Testing the Integration

### 1. Test Authentication

1. **Sign up** for a new account
2. **Verify** you're redirected to dashboard
3. **Sign out** and **sign in** again
4. **Check** user info displays correctly

### 2. Test Paddle Integration

1. **Visit pricing page** at [http://localhost:3000](http://localhost:3000)
2. **Click "Get started"** on any plan
3. **Complete checkout** using test card details:
   - **Card**: `4242 4242 4242 4242`
   - **Expiry**: Any future date
   - **CVC**: `100`
   - **Name**: Any name

### 3. Test Webhook Processing

1. **Complete a test purchase**
2. **Check your database** (using Prisma Studio)
3. **Verify** customer and subscription records are created
4. **Check dashboard** shows subscription data

### 4. Local Webhook Testing (Optional)

If you want to test webhooks locally:

1. **Install ngrok**:
   ```bash
   npm install -g ngrok
   ```

2. **Expose local server**:
   ```bash
   ngrok http 3000
   ```

3. **Update Paddle webhook URL** to your ngrok URL:
   ```
   https://your-ngrok-url.ngrok.io/api/webhook
   ```

## 🌐 Production Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Environment Variables in Vercel**:
   - Add all variables from your `.env.local`
   - Update URLs to production values
   - Update `NEXT_PUBLIC_PADDLE_ENV` to `production` when ready

4. **Update Paddle Settings**:
   - Add your Vercel domain to approved domains
   - Update webhook URL to `https://yourdomain.vercel.app/api/webhook`

### Other Deployment Options

- **Railway**: [railway.app](https://railway.app)
- **Render**: [render.com](https://render.com)
- **DigitalOcean**: [digitalocean.com](https://digitalocean.com)

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Issues

**Error**: `Can't reach database server`

**Solutions**:
- Check DATABASE_URL format
- Verify database is running
- Check firewall settings
- Ensure database user has correct permissions

#### 2. Clerk Authentication Issues

**Error**: `Clerk: Missing publishable key`

**Solutions**:
- Verify NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set
- Check environment variable names (must start with NEXT_PUBLIC_)
- Restart development server after adding variables

#### 3. Paddle Integration Issues

**Error**: `Paddle: Invalid API key`

**Solutions**:
- Verify API key is correct
- Check you're using sandbox vs production keys correctly
- Ensure NEXT_PUBLIC_PADDLE_ENV matches your account type

#### 4. Webhook Issues

**Error**: `Webhook signature verification failed`

**Solutions**:
- Verify PADDLE_NOTIFICATION_WEBHOOK_SECRET is correct
- Check webhook URL is accessible
- Ensure webhook endpoint is configured in Paddle

### Debug Mode

Enable debug logging by adding to your `.env.local`:

```bash
DEBUG=true
NODE_ENV=development
```

### Getting Help

1. **Check logs** in your terminal and browser console
2. **Review Paddle dashboard** for webhook delivery status
3. **Check Clerk dashboard** for authentication logs
4. **Use Prisma Studio** to inspect database state
5. **Create GitHub issue** with detailed error information

## 📚 Next Steps

After successful setup:

1. **Customize branding** and styling
2. **Add your own features** and pages
3. **Configure email templates** in Clerk
4. **Set up monitoring** and analytics
5. **Add tests** for your custom functionality
6. **Configure CI/CD** pipeline
7. **Set up error tracking** (Sentry, LogRocket, etc.)

## 🔒 Security Checklist

Before going to production:

- [ ] Use production database with backups
- [ ] Enable Paddle production mode
- [ ] Configure proper CORS settings
- [ ] Set up SSL certificates
- [ ] Review and test all webhook endpoints
- [ ] Enable rate limiting
- [ ] Set up monitoring and alerting
- [ ] Review Clerk security settings
- [ ] Audit environment variables

---

**Need more help?** Check the [main README](./README.md) or create an issue on GitHub.