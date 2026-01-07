<div align="center">

# E-commerce Product Management Dashboard

### Full-Stack Admin Platform with Server-Side Rendering & Real-Time Analytics

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.12-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A production-ready e-commerce admin dashboard featuring server-side rendering, interactive data visualization, secure authentication, and comprehensive CRUD operations for product management.**

**Deployed Website**: https://server-rendered-e-commerce-product-management-dashbo-7imn0s7ng.vercel.app/login 

---

### Administrator Access

```bash
Email: admin@demo.com
Password: admin123
```

> **Note:** Create additional admin accounts using the Admin Onboarding feature within the dashboard.

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [System Architecture](#️-system-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#️-deployment)
- [Security](#-security)
- [Performance](#-performance)
- [License](#-license)

---

## ✨ Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| **Server-Side Rendering** | Next.js 15 App Router with Server Components for optimal performance |
| **Product Management** | Complete CRUD operations with real-time updates |
| **Search & Filter** | Instant product search and category-based filtering |
| **Data Visualization** | Interactive charts and analytics with Recharts |
| **Authentication** | Secure login with NextAuth.js and bcrypt password hashing |
| **Role-Based Access** | Admin onboarding system with protected routes |

### 🔧 Technical Features

- ✅ **TypeScript** - Full type safety across the application
- ✅ **React Query** - Efficient data fetching and caching
- ✅ **Zod Validation** - Runtime type checking and form validation
- ✅ **Optimistic Updates** - Instant UI feedback for better UX
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Currency Support** - Indian Rupee (₹) formatting

---

## 🛠️ Technology Stack

### Frontend
```
Next.js 15.1.6      →  React framework with App Router
React 19.0.0        →  UI library  
TypeScript 5.7.2    →  Static typing
Tailwind CSS 3.4.17 →  Utility-first CSS
Recharts 2.15.0     →  Data visualization
React Query 5.62.8  →  Data fetching & caching
```

### Backend
```
Next.js API Routes  →  RESTful API endpoints
MongoDB 6.12.0      →  NoSQL database
NextAuth.js 4.24.11 →  Authentication
Zod 3.24.1          →  Schema validation
bcryptjs 2.4.3      →  Password hashing
```

### Deployment
```
Vercel              →  Cloud hosting platform
MongoDB Atlas       →  Cloud database service
```

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Client Browser] -->|HTTPS| B[Next.js App]
    B -->|Server Components| C[MongoDB Atlas]
    B -->|API Routes| D[RESTful Endpoints]
    D -->|Queries| C
    B -->|Authentication| E[NextAuth.js]
    E -->|Session| F[JWT Tokens]
    B -->|State Management| G[React Query]
```

### Application Flow

1. **Client Request** → User accesses dashboard
2. **Middleware Check** → Authentication validation
3. **Server Rendering** → Data fetched from MongoDB
4. **HTML Generation** → Complete page rendered on server
5. **Client Delivery** → Optimized HTML sent to browser
6. **Hydration** → React takes over for interactivity
7. **Data Updates** → React Query manages cache and refetching

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** ≥ 18.18.0
- **npm** ≥ 9.0.0
- **MongoDB Atlas** account (or local MongoDB)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

**2. Install dependencies**
```bash
npm install
```

**3. Environment configuration**

Create `.env.local` in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Authentication
NEXTAUTH_SECRET=your_secret_key_minimum_32_characters
NEXTAUTH_URL=http://localhost:3001

# Application
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

**4. Seed the database**
```bash
npm run seed
```

This creates:
- ✅ Admin user: `admin@demo.com` / `admin123`
- ✅ 10 sample products with realistic data

**5. Start development server**
```bash
npm run dev
```

Navigate to **http://localhost:3001** 🚀

---

## 📁 Project Structure

```
ecommerce-admin-dashboard/
│
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📂 api/                # API endpoints
│   │   │   ├── products/         # Product CRUD
│   │   │   ├── auth/             # Authentication
│   │   │   ├── admin/            # Admin management
│   │   │   └── upload/           # Image upload
│   │   ├── dashboard/            # Dashboard page (SSR)
│   │   ├── products/             # Products page (SSR)
│   │   ├── login/                # Login page
│   │   └── admin-onboarding/     # Admin creation
│   │
│   ├── 📂 components/             # React components
│   │   ├── ui/                   # Reusable UI elements
│   │   ├── forms/                # Form components
│   │   └── charts/               # Visualization
│   │
│   ├── 📂 lib/                    # Core utilities
│   │   ├── auth.ts               # NextAuth config
│   │   ├── mongodb.ts            # DB connection
│   │   └── validations.ts        # Zod schemas
│   │
│   └── 📂 types/                  # TypeScript definitions
│
├── 📂 public/                     # Static assets
├── 📂 scripts/                    # Utility scripts
│   └── seed.js                   # Database seeding
│
└── 📄 Configuration Files
    ├── next.config.js
    ├── tailwind.config.js
    └── tsconfig.json
```

---

## 🔌 API Documentation

### Products API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | List all products (with filters) | ✅ |
| `GET` | `/api/products/[id]` | Get single product | ✅ |
| `POST` | `/api/products` | Create new product | ✅ |
| `PUT` | `/api/products/[id]` | Update product | ✅ |
| `DELETE` | `/api/products/[id]` | Delete product | ✅ |

### Query Parameters (GET /api/products)
```
?search=laptop          # Search by name/SKU/description
?category=Electronics   # Filter by category
?page=1&limit=10       # Pagination
```

### Admin API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/admin/create` | Create new admin | Admin Only |

---

## ☁️ Deployment

### Deploy to Vercel

**1. Push to GitHub**
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

**2. Import to Vercel**
- Visit [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your repository

**3. Configure environment variables**

Add these in Vercel dashboard:
```
MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
NODE_ENV=production
```

**4. Deploy**

Vercel auto-deploys on every push to main branch.

**5. Seed production database**
```bash
MONGODB_URI=your_production_uri node scripts/seed.js
```

---

## 🔒 Security

### Authentication
- ✅ bcrypt password hashing (10 salt rounds)
- ✅ JWT session management (30-day expiry)
- ✅ HTTP-only secure cookies

### Authorization
- ✅ Middleware-based route protection
- ✅ Role-based access control (Admin/User)
- ✅ Server-side permission validation

### Data Protection
- ✅ Environment variables for sensitive data
- ✅ MongoDB connection with authentication
- ✅ Input validation (Zod schemas)
- ✅ XSS protection via React sanitization

---

## ⚡ Performance

### Optimization Techniques
- Server-side rendering for fast initial loads
- Code splitting and lazy loading
- React Query caching
- Optimistic UI updates
- Image optimization

### Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

## 👨‍💻 Developer

**Ameya Moharir**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:your.email@example.com)

---

### ⭐ If you found this project helpful, please consider giving it a star!

**Built with ❤️ using Next.js, React, and MongoDB**

</div>
