# Task Management Client

A modern task management application built with Next.js 14, React 18, and TypeScript.

## Technology Stack

### Core Framework
- **Next.js** `14.2.3` - React framework with App Router
- **React** `18.2.0` - UI library
- **React DOM** `18.2.0` - React DOM rendering
- **TypeScript** `~5` - Type-safe JavaScript

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **tw-animate-css** `~1.4.0` - Tailwind CSS animations
- **tailwind-merge** `~2.3.0` - Merge Tailwind classes
- **clsx** `~2.1.1` - Conditional class names
- **class-variance-authority** `~0.7.1` - Component variants

### UI Components
- **shadcn/ui** - Reusable UI component library
- **Radix UI (Label)** `~2.1.0` - Accessible label component
- **Radix UI (Slot)** `~1.2.4` - Primitive slot component
- **Lucide React** `~0.342.0` - Icon library

### Development Tools
- **ESLint** - Code linting
- **eslint-config-next** `14.2.3` - Next.js ESLint config
- **PostCSS** - CSS transformations
- **@types/node** `~20` - Node.js type definitions
- **@types/react** `~18` - React type definitions
- **@types/react-dom** `~18` - React DOM type definitions

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                                  # Next.js app router
│   ├── (admin)/                          # Admin protected routes
│   │   ├── blank/                        # Blank page
│   │   ├── companies/                    # Company management
│   │   ├── dashboard/                    # Dashboard view
│   │   ├── projects/                     # Project management
│   │   ├── sectors/                      # Sector management
│   │   ├── tasks/                        # Task management
│   │   └── layout.tsx                    # Admin layout
│   ├── auth/                             # Authentication routes
│   │   └── login/                        # Login page
│   ├── create-new/                       # Create new entry route
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # Root layout
│   └── page.tsx                          # Landing/Entry page
├── components/                           # React components
│   ├── common/                           # Shared common components
│   ├── features/                         # Feature-specific component
│   │   ├── auth/                         # Authentication features
│   │   ├── company/                      # Company features
│   │   ├── dashboard/                    # Dashboard features
│   │   ├── projects/                     # Project features
│   │   ├── sector/                       # Sector features
│   │   ├── tasks/                        # Task features
│   │   └── workspace/                    # Workspace features
│   ├── layout/                           # Layout components
│   ├── table/                            # Table components
│   ├── ui/                               # Reusable UI components
│   └── theme-provider.tsx                # Theme provider
├── config/                               # Configuration files
├── constants/                            # Constants
├── hooks/                                # Custom hooks
├── lib/                                  # Utility functions
├── public/                               # Static assets
├── services/                             # API services
├── types/                                # TypeScript type definitions
├── .env.local                            # Local environment variables
├── components.json                       # shadcn/ui configuration
├── next.config.mjs                       # Next.js configuration
├── package.json                          # Dependencies and scripts
├── tailwind.config.ts                    # Tailwind CSS configuration
└── tsconfig.json                         # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
"# pg-TMS" 

## 🐳 Run Using Docker Compose

Build and start the container:

```bash
docker-compose up --build
