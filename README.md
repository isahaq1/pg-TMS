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
client/
├── app/                                # Next.js app router (routes)
│   ├── create-new/                     # Create new password route
│   │   └── page.tsx                    # Create new password page
│   ├── favicon.ico                     # App favicon
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Home page (login)
├── components/                         # React components
│   ├── common/                         # Common reusable components
│   │   └── loading-screen.tsx          # Loading screen component
│   ├── features/                       # Feature-specific components
│   │   ├── auth/                       # Authentication components
│   │   │   ├── login-form.tsx          # Login, forgot password, check inbox
│   │   │   └── login-illustration.tsx  # Login illustration SVG
│   │   ├── dashboard/                  # Dashboard components
│   │   │   ├── dashboard-page.tsx      # Main dashboard page
│   │   │   └── empty-state.tsx         # Empty state component
│   │   └── workspace/                  # Workspace components
│   │       ├── workspace-card.tsx      # Workspace card component
│   │       └── workspace-selection.tsx # Workspace selection page
│   ├── layout/                         # Layout components
│   │   ├── dashboard-layout.tsx        # Dashboard layout wrapper
│   │   ├── header.tsx                  # Header component
│   │   └── sidebar.tsx                 # Sidebar component
│   └── ui/                             # shadcn/ui components
│       ├── button.tsx                  # Button component
│       ├── input.tsx                   # Input component
│       └── label.tsx                   # Label component
├── config/                             # Configuration files
│   └── site.ts                         # Site configuration
├── constants/                          # Application constants
│   └── index.ts                        # routes, API endpoints, etc.
├── hooks/                              # Custom React hooks
│   └── use-password-toggle.ts           # Password toggle hook
├── lib/                                # Utility functions
│   └── utils.ts                        # Helper functions (cn, etc.)
├── public/                             # Static assets
│   ├── canteen.png                     # Canteen workspace icon
│   ├── central-panel.png               # Control panel icon
│   ├── create-new.png                  # Create new password illustration
│   ├── dashboard.png                   # Dashboard workspace icon
│   ├── designer-working.png            # Login page illustration
│   ├── document.png                    # Document workspace icon
│   ├── jesser.png                      # Jesser workspace icon
│   ├── loading.png                     # Loading screen image
│   ├── logo.png                        # Paragon group logo
│   ├── paragon.png                     # Paragon workspace icon
│   ├── reset-pass.png                  # Reset password illustration
│   └── task-n-ticket.png               # Task & ticket icon
├── types/                              # TypeScript type definitions
│   ├── index.ts                        # General types
│   ├── navigation.ts                   # Navigation types
│   └── workspace.ts                    # Workspace types
├── components.json                     # shadcn/ui configuration
├── .eslintrc.cjs                       # ESLint configuration
├── next-env.d.ts                       # Next.js TypeScript declarations
├── next.config.mjs                     # Next.js configuration
├── package.json                        # Dependencies and scripts
├── postcss.config.cjs                  # PostCSS configuration
├── README.md                           # Project documentation
└── tsconfig.json                       # TypeScript configuration
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
