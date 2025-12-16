# Smart Job Tracker

A modern Next.js application for tracking job applications with real-time updates using Firebase Firestore.

## 🚀 Features

- **Dashboard**: Overview of all job applications with statistics
- **Job Management**: Add, view, edit, and track job applications
- **Real-time Sync**: Firebase integration for instant data updates
- **Authentication**: Secure user authentication with Firebase Auth
- **Responsive Design**: Mobile-friendly interface with Material-UI
- **Server Components**: Optimized data fetching with Next.js 14 App Router
- **TypeScript**: Full type safety across the application
- **Dark Mode**: Built-in dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **UI**: Material-UI (MUI v7)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Firebase project with Firestore enabled
- Vercel account (for deployment)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-job-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── jobs/route.ts         # API routes
│   ├── auth/                      # Authentication pages
│   ├── components/                # React components
│   ├── jobs/                      # Job-related pages
│   ├── actions.ts                 # Server actions
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── lib/
│   ├── auth-context.tsx           # Authentication context
│   ├── firebase.ts                # Firebase configuration
│   ├── firestore-service.ts       # Firestore operations
│   └── db.ts                      # Database utilities
├── types/
│   └── job.ts                     # TypeScript types
└── public/                        # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📖 Environment Variables

All Firebase configuration variables are prefixed with `NEXT_PUBLIC_` to make them accessible on the client side. These values should be obtained from your Firebase project settings.

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Add Environment Variables**
   - In Vercel project settings, add all `NEXT_PUBLIC_FIREBASE_*` variables
   - These should match your `.env.local` values

4. **Deploy**
   - Vercel will automatically build and deploy on push to main branch

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 🎯 Key Next.js 14 Concepts Used

### 1. **App Router**
The application uses the new `/app` directory structure instead of the deprecated `/pages` directory:
- File-based routing
- Layout hierarchy
- Nested routes with `[id]` dynamic segments

### 2. **Server vs Client Components**
- **Server Components** (default):
  - `JobsList` - Fetches data on the server
  - `app/layout.tsx` - Renders on server
  - `app/jobs/[id]/page.tsx` - Dynamic data fetching
  
- **Client Components** (marked with `"use client"`):
  - `JobForm` - Handles user input and interactivity
  - `StatusBadge` - Interactive UI elements
  - `error.tsx` - Error boundary with reset functionality

### 3. **API Routes**
```typescript
// app/api/jobs/route.ts
// GET /api/jobs - Fetch all jobs
// POST /api/jobs - Create a new job
```

### 4. **Server Actions**
```typescript
// app/actions.ts
// Used for secure server-side operations
// Automatically revalidates data after mutations
```

### 5. **Data Fetching**
- Server Components fetch data directly using in-memory storage
- No client-side data fetching overhead
- Automatic caching and revalidation

### 6. **Dynamic Metadata**
```typescript
export const metadata: Metadata = { /* ... */ }
export async function generateMetadata(props): Promise<Metadata> { /* ... */ }
```

### 7. **Suspense & Loading States**
```typescript
<Suspense fallback={<Loading />}>
  <JobsList />
</Suspense>
```

### 8. **Error Boundaries**
- Global error handling with `error.tsx`
- Custom 404 pages with `not-found.tsx`

## 🔧 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: In-memory array (no external database)
- **Forms**: React Hook Form patterns
- **Validation**: Basic client & server-side validation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation Steps

1. **Navigate to project directory**
```bash
cd smart-job-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🎮 Usage Guide

### Adding a Job Application

1. Go to the **Dashboard** (home page)
2. Fill in the form with:
   - **Company Name**: e.g., "Google"
   - **Job Role**: e.g., "Senior Software Engineer"
   - **Status**: Select from Applied, Interview, or Rejected
3. Click **Add Job**
4. The job is immediately added and the list refreshes using server actions

### Viewing Job Details

1. Click on any job card on the dashboard or jobs list
2. View complete details including:
   - Job title and company
   - Application status
   - Applied and last updated dates
   - Days since application

### API Endpoints

#### Get All Jobs
```bash
GET /api/jobs
```
Response: Array of job objects

#### Create a New Job
```bash
POST /api/jobs
Content-Type: application/json

{
  "companyName": "Microsoft",
  "role": "Full Stack Developer",
  "status": "Applied"
}
```

## 🎨 Styling & UI

- **Color Scheme**: Blue primary, with status-based colors
- **Badge Colors**:
  - 🔵 Applied: Blue
  - 🟡 Interview: Yellow
  - 🔴 Rejected: Red
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Animations**: Smooth transitions and hover effects

## 🔐 Best Practices Implemented

1. **Type Safety**: Full TypeScript with interfaces for all data
2. **Component Isolation**: Clear separation of Server and Client components
3. **Error Handling**: Comprehensive error boundaries
4. **Loading States**: Beautiful skeleton loaders
5. **SEO**: Metadata API for all pages
6. **Performance**: Server-side rendering and caching
7. **Code Comments**: Well-documented code explaining concepts
8. **Validation**: Input validation on both client and server

## 📚 Learning Resources

### App Router Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [File-based Routing](https://nextjs.org/docs/app/building-your-application/routing)

### Server Components
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

### Server Actions
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)

### API Routes
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🚀 Production Checklist

For deploying to production:

- [ ] Replace in-memory storage with a real database (PostgreSQL, MongoDB, etc.)
- [ ] Add authentication and authorization
- [ ] Implement rate limiting for API routes
- [ ] Add input validation and sanitization
- [ ] Set up environment variables
- [ ] Enable CORS if needed
- [ ] Add logging and monitoring
- [ ] Implement caching strategies
- [ ] Add tests (unit, integration, e2e)
- [ ] Set up CI/CD pipeline

## 📝 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is in use:
```bash
npm run dev -- -p 3001
```

### Clear Cache
```bash
npm run build
npm run dev
```

## 📄 License

This project is created as an educational example. Feel free to use it as a template for your own projects.

## 👨‍💻 Interview Talking Points

This project demonstrates:

1. **Understanding of Next.js 14 fundamentals**: App Router, file-based routing
2. **Server vs Client Components**: When and why to use each
3. **Data Fetching**: Server Components for optimal performance
4. **API Design**: RESTful API routes
5. **Server Actions**: Modern form handling in Next.js
6. **Error Handling**: Error boundaries and graceful error states
7. **TypeScript**: Strong typing with interfaces
8. **Tailwind CSS**: Responsive, utility-first styling
9. **UX/Design**: Clean, intuitive interface with loading states
10. **Best Practices**: Code organization, comments, and documentation

---

**Built with ❤️ using Next.js 14**
