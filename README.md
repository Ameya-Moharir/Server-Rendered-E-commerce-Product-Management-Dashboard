# E-commerce Product Management Dashboard

> A production-ready, server-side rendered (SSR) admin dashboard for managing e-commerce products with real-time updates, interactive analytics, and secure authentication.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)


**Deployed Application:** https://server-rendered-e-commerce-product-management-dashbo-7imn0s7ng.vercel.app/login

**Administrator Credentials:**
```
Email: admin@demo.com
Password: admin123
```

---
## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Security](#security)
- [Performance](#performance)
- [License](#license)

---

## Features

### Core Functionality

**Server-Side Rendering**
- Implementation of Next.js 15 App Router with Server Components
- Pre-rendered HTML for optimal initial page load performance
- Enhanced SEO capabilities through server-side data fetching

**Product Management**
- Complete CRUD operations (Create, Read, Update, Delete)
- Real-time search functionality
- Category-based filtering
- Pagination support
- Stock management

**Data Visualization**
- Interactive line charts for sales and revenue trends
- Bar charts for product category distribution
- Real-time statistics dashboard
- Top products performance metrics

**Authentication & Authorization**
- Secure credential-based authentication using NextAuth.js
- Password encryption with bcrypt hashing algorithm
- JWT-based session management
- Role-based access control
- Protected routes via middleware

**Admin Management**
- Secure admin onboarding system
- Multi-admin support
- User role management
- Admin activity tracking

### Technical Features

- TypeScript for type safety
- Zod schema validation on client and server
- React Query for efficient data fetching and caching
- Optimistic UI updates for improved user experience
- Responsive design supporting all device sizes
- Indian Rupee currency formatting
- Image upload capabilities
- Form validation with real-time feedback

---

## Technology Stack

### Frontend Technologies
- **Next.js 15.1.6** - React framework with App Router architecture
- **React 19.0.0** - JavaScript library for building user interfaces
- **TypeScript 5.7.2** - Typed superset of JavaScript
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Recharts 2.15.0** - Composable charting library
- **React Query 5.62.8** - Data synchronization library
- **React Hook Form 7.54.2** - Performant form library
- **Framer Motion 11.15.0** - Animation library

### Backend Technologies
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 6.12.0** - NoSQL database
- **NextAuth.js 4.24.11** - Authentication solution
- **Zod 3.24.1** - TypeScript-first schema validation
- **bcryptjs 2.4.3** - Password hashing library

### Deployment Infrastructure
- **Vercel** - Cloud platform for static sites and serverless functions
- **MongoDB Atlas** - Cloud-hosted MongoDB service

---

## System Architecture

### Application Flow

1. Client requests a page
2. Next.js middleware validates authentication
3. Server Components fetch data from MongoDB
4. Page is rendered on the server with data
5. Complete HTML is sent to client
6. React hydrates the page for interactivity
7. Client-side navigation uses React Query cache

### Data Flow

1. User interaction triggers action
2. React Hook Form validates input
3. API route receives request
4. Server validates with Zod schema
5. MongoDB operation executes
6. Response sent to client
7. React Query updates cache
8. UI updates optimistically

---

## Getting Started

### Prerequisites

- Node.js version 18.18.0 or higher
- npm version 9.0.0 or higher
- MongoDB Atlas account (or local MongoDB installation)

### Installation Steps

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Authentication Configuration
NEXTAUTH_SECRET=your_secret_key_minimum_32_characters
NEXTAUTH_URL=http://localhost:3001

# Application Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

**4. Seed the database**

```bash
npm run seed
```

This command will:
- Create an administrator account (admin@demo.com / admin123)
- Insert 10 sample products with realistic data
- Set up initial database indexes

**5. Start the development server**

```bash
npm run dev
```

The application will be available at http://localhost:3001

---

## Project Structure

```
ecommerce-admin-dashboard/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API route handlers
│   │   │   ├── products/            # Product CRUD endpoints
│   │   │   │   ├── route.ts         # GET, POST /api/products
│   │   │   │   └── [id]/            # GET, PUT, DELETE /api/products/[id]
│   │   │   ├── auth/                # NextAuth configuration
│   │   │   ├── admin/               # Admin management endpoints
│   │   │   └── upload/              # Image upload endpoint
│   │   ├── dashboard/               # Dashboard page (SSR)
│   │   ├── products/                # Products management page (SSR)
│   │   ├── login/                   # Authentication page
│   │   ├── admin-onboarding/        # Admin creation page
│   │   ├── layout.tsx               # Root layout
│   │   └── providers.tsx            # Context providers
│   │
│   ├── components/                   # React components
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Navbar.tsx
│   │   ├── forms/                   # Form components
│   │   │   └── ProductForm.tsx
│   │   └── charts/                  # Chart components
│   │       └── SalesChart.tsx
│   │
│   ├── lib/                         # Utility libraries
│   │   ├── auth.ts                  # NextAuth configuration
│   │   ├── mongodb.ts               # Database connection
│   │   ├── validations.ts           # Zod validation schemas
│   │   └── aws.ts                   # AWS S3 utilities
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── index.ts
│   │   └── next-auth.d.ts
│   │
│   ├── utils/                       # Helper functions
│   │   └── helpers.ts
│   │
│   └── middleware.ts                # Route protection middleware
│
├── public/                          # Static assets
│   └── uploads/                     # Uploaded images directory
│
├── scripts/                         # Utility scripts
│   └── seed.js                      # Database seeding script
│
├── .env.local                       # Environment variables (not in repo)
├── .gitignore                       # Git ignore configuration
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Project dependencies
└── README.md                        # Project documentation
```

---

## API Documentation

### Products Endpoints

**GET /api/products**
- Description: Retrieve all products with optional filtering
- Query Parameters:
  - `search` (string): Search by name, SKU, or description
  - `category` (string): Filter by category
  - `page` (number): Page number for pagination
  - `limit` (number): Items per page
- Response: Array of product objects

**GET /api/products/[id]**
- Description: Retrieve a single product by ID
- Parameters: Product ID
- Response: Product object

**POST /api/products**
- Description: Create a new product
- Authentication: Required
- Body: Product data (name, SKU, price, stock, category, description)
- Response: Created product object

**PUT /api/products/[id]**
- Description: Update an existing product
- Authentication: Required
- Parameters: Product ID
- Body: Updated product data
- Response: Updated product object

**DELETE /api/products/[id]**
- Description: Delete a product
- Authentication: Required
- Parameters: Product ID
- Response: Success message

### Authentication Endpoints

**POST /api/auth/login**
- Description: Authenticate user credentials
- Body: Email and password
- Response: Session token

**POST /api/auth/logout**
- Description: Terminate user session
- Authentication: Required
- Response: Success message

### Admin Management Endpoints

**POST /api/admin/create**
- Description: Create a new administrator account
- Authentication: Required (Admin only)
- Body: Email, name, and password
- Response: Created admin object

### Upload Endpoints

**POST /api/upload**
- Description: Upload product image
- Authentication: Required
- Body: FormData with image file
- Response: Image URL

---

## Deployment

### Deploying to Vercel

**Step 1: Prepare repository**

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

**Step 2: Import to Vercel**

1. Visit https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings

**Step 3: Configure environment variables**

Add the following environment variables in Vercel dashboard:

```
MONGODB_URI=your_production_mongodb_uri
NEXTAUTH_SECRET=your_production_secret_key
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Step 4: Deploy**

Vercel will automatically build and deploy your application.

**Step 5: Seed production database**

```bash
MONGODB_URI=your_production_mongodb_uri node scripts/seed.js
```

---

## Security

### Authentication Security
- Password hashing using bcrypt with 10 salt rounds
- JWT-based session management with 30-day expiry
- HTTP-only cookies for session storage
- CSRF protection enabled

### Authorization
- Middleware-based route protection
- Role-based access control (Admin/User)
- Server-side permission validation
- Protected API endpoints

### Input Validation
- Client-side validation with Zod schemas
- Server-side validation on all API routes
- SQL injection prevention through parameterized queries
- XSS protection through React's built-in sanitization

### Data Security
- Environment variables for sensitive data
- Secure MongoDB connection with authentication
- HTTPS enforcement in production
- Regular security updates for dependencies




