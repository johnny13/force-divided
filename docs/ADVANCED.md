# Advanced React Topics & Setup

This document covers advanced React concepts and the development setup used in this application.

## Table of Contents

1. [TypeScript Integration](#typescript-integration)
2. [Tailwind CSS Styling](#tailwind-css-styling)
3. [Build Tools - Vite](#build-tools---vite)
4. [Component Libraries](#component-libraries)
5. [State Management with Hooks](#state-management-with-hooks)
6. [Path Aliases](#path-aliases)
7. [Installation & Setup](#installation--setup)

---

## TypeScript Integration

### What is TypeScript?

TypeScript is JavaScript with **static type checking**. It adds type annotations that help catch errors before runtime and improves developer experience with autocomplete.

### TypeScript in React

**File:** `src/components/MovieCard.tsx`

```tsx
// Define the shape of props using an interface
interface MovieCardProps {
  title: string        // title must be a string
  episode: string      // episode must be a string
  year: number         // year must be a number
  posterUrl: string
  sentiment: number
  sentimentLabel: string
}

// Component uses the interface
export function MovieCard({ title, episode, year, ... }: MovieCardProps) {
  return <Card>{title}</Card>
}
```

### Benefits

- **Type Safety** - Prevents passing wrong prop types
- **Autocomplete** - IDE knows what props are available
- **Refactoring** - Easier to find all usages when changing prop names
- **Documentation** - Types serve as inline documentation

### TypeScript Configuration

**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]  // Path alias for imports
    }
  }
}
```

This allows imports like `@/components/MovieCard` instead of `../../../components/MovieCard`.

---

## Tailwind CSS Styling

### What is Tailwind CSS?

Tailwind is a **utility-first CSS framework**. Instead of writing custom CSS, you use pre-built utility classes directly in your JSX.

**Example from App.tsx:**
```tsx
<div className="min-h-screen bg-black text-gray-100 w-full relative">
  <div className="fixed inset-0 bg-[radial-gradient(...)]">
```

### How It Works

1. **Utility Classes** - Small, single-purpose classes
   - `bg-black` = `background-color: black`
   - `text-gray-100` = `color: rgb(243 244 246)`
   - `min-h-screen` = `min-height: 100vh`

2. **Responsive Design** - Prefix with breakpoint:
   - `sm:px-6` = padding on small screens and up
   - `md:grid-cols-2` = 2 columns on medium screens
   - `lg:px-8` = padding on large screens

3. **Dark Mode** - Uses `.dark` class:
   ```tsx
   <html class="dark">  // From index.html
   ```
   - Classes like `dark:bg-black` activate in dark mode

### Configuration

**File:** `src/index.css`
```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  /* Custom CSS variables for theming */
}
```

**File:** `vite.config.ts`
```ts
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],  // Tailwind plugin
})
```

### Why Tailwind?

- **Rapid development** - No context switching between CSS files
- **Consistent design** - Pre-defined spacing/colors
- **Small bundle size** - Only used classes are included
- **Highly customizable** - Easy to extend with custom values

---

## Build Tools - Vite

### What is Vite?

Vite (pronounced "veet") is a modern build tool that provides:
- **Fast development server** - Instant HMR (Hot Module Replacement)
- **Optimized production builds** - Uses Rollup for bundling
- **Native ES modules** - No bundling needed in dev mode

### Configuration

**File:** `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],  // React and Tailwind support
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Path alias
    },
  },
})
```

### Development vs Production

**Development (`npm run dev`):**
- Serves files directly via ES modules
- Fast startup (no bundling)
- HMR updates only changed modules

**Production (`npm run build`):**
- Bundles and minifies code
- Optimizes assets
- Tree-shakes unused code

---

## Component Libraries

### Radix UI

Radix UI provides **unstyled, accessible component primitives**. We use several:

**From package.json:**
```json
"@radix-ui/react-avatar": "^1.1.11"
"@radix-ui/react-dialog": "^1.1.15"
"@radix-ui/react-separator": "^1.1.8"
"@radix-ui/react-slider": "^1.3.6"
"@radix-ui/react-tabs": "^1.1.13"
```

**Example usage:**
```tsx
import { Card, CardContent } from "@/components/ui/card"

<Card>
  <CardContent>
    {/* Accessible, unstyled component */}
  </CardContent>
</Card>
```

### shadcn/ui Pattern

We're using the **shadcn/ui** pattern:
- Components live in your codebase (not in node_modules)
- Styled with Tailwind CSS
- Built on Radix UI primitives
- Fully customizable

**File structure:**
```
src/components/ui/
  ├── card.tsx      # Card component
  ├── button.tsx    # Button component
  ├── dialog.tsx    # Dialog component
  └── ...
```

### Why This Approach?

- **Own your code** - Components are in your repo
- **Fully customizable** - Edit components directly
- **Accessible by default** - Radix UI handles a11y
- **Type-safe** - Full TypeScript support

---

## State Management with Hooks

### useState Hook

**Location:** `src/components/Header.tsx`

```tsx
const [isDark, setIsDark] = useState(true)
```

**What is useState?**
- **Hook** for adding state to functional components
- Returns an array: `[currentValue, setterFunction]`
- When setter is called, component **re-renders**

**Breaking it down:**
```tsx
// Destructure the array
const [isDark, setIsDark] = useState(true)
//  ^^^^^     ^^^^^^^^      ^^^^^^^^^^^^^
//  state    setter        initial value

// Later in the component:
setIsDark(false)  // Triggers re-render with new value
```

**Why hooks?**
- Previously, only class components could have state
- Hooks let functional components use state
- Cleaner, more reusable code

### useEffect Hook

**Location:** `src/components/Header.tsx`

```tsx
useEffect(() => {
  // Runs after component mounts
  const darkMode = document.documentElement.classList.contains('dark')
  setIsDark(darkMode)
}, [])  // Empty array = run once on mount
```

**What is useEffect?**
- **Hook** for side effects (API calls, DOM manipulation, subscriptions)
- Runs **after** render
- Can return a cleanup function

**Dependency Array:**
```tsx
useEffect(() => {
  // Effect code
}, [])           // [] = run once on mount
// [dep1, dep2]  // Run when dep1 or dep2 changes
// (no array)    // Run after every render
```

**Common patterns:**
- `[]` - Setup code that runs once (like API calls on mount)
- `[value]` - Run when `value` changes (like filtering when search changes)
- No array - Run after every render (rare, usually not desired)

### Rules of Hooks

1. **Only call hooks at the top level** - Not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Components or custom hooks
3. **Call hooks in the same order** - React relies on call order

**Good:**
```tsx
function Component() {
  const [state, setState] = useState()  // ✅ Top level
  useEffect(() => {}, [])                // ✅ Top level
  return <div>...</div>
}
```

**Bad:**
```tsx
function Component() {
  if (condition) {
    const [state, setState] = useState()  // ❌ Inside condition
  }
  return <div>...</div>
}
```

---

## Path Aliases

### What are Path Aliases?

Path aliases let you use shorter import paths instead of relative paths with `../`.

**Configuration:**

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**vite.config.ts:**
```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
}
```

**Usage:**
```tsx
// Instead of:
import { MovieCard } from "../../components/MovieCard"
import { Button } from "../../../components/ui/button"

// We can write:
import { MovieCard } from "@/components/MovieCard"
import { Button } from "@/components/ui/button"
```

### Benefits

- **Cleaner imports** - No counting `../` levels
- **Easier refactoring** - Move files without breaking imports
- **Better readability** - Clear where imports come from

---

## Installation & Setup

### Prerequisites

- **Node.js** (v22 or higher recommended)
- **npm** or **yarn** package manager

### Initial Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Structure

```
force-divided/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   └── MovieCard.tsx
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind configuration (if custom)
```

### Key Dependencies

**Runtime:**
- `react` & `react-dom` - React library
- `tailwindcss` - CSS framework
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icons

**Development:**
- `typescript` - Type checking
- `vite` - Build tool
- `@vitejs/plugin-react` - React support for Vite
- `eslint` - Code linting

### Environment Setup

No environment variables are currently required. The app runs standalone with:
- Static movie data in `App.tsx`
- Public API images (TMDB)
- Local state management

### Adding New Components

1. Create component file: `src/components/MyComponent.tsx`
2. Define TypeScript interface for props
3. Export component: `export function MyComponent() { ... }`
4. Import where needed: `import { MyComponent } from "@/components/MyComponent"`

### Styling Guidelines

- Use Tailwind utility classes in `className`
- Use CSS variables from `index.css` for theming
- Responsive: `sm:`, `md:`, `lg:` prefixes
- Dark mode: `.dark` class on `<html>`

---

## Interview Topics Summary

### Advanced React Concepts

| Topic | What to Know |
|-------|-------------|
| **TypeScript** | Type safety, interfaces, prop types |
| **Hooks** | useState, useEffect, rules of hooks |
| **State Management** | Component state, when to lift state up |
| **Performance** | Memoization, React.memo, useMemo, useCallback |
| **Build Tools** | Vite vs Webpack, HMR, bundling |
| **Styling** | CSS-in-JS, Tailwind, CSS modules |
| **Component Patterns** | Composition, compound components, render props |
| **Testing** | Jest, React Testing Library, unit vs integration |

### Common Interview Questions

1. **"What's the difference between useState and useEffect?"**
   - useState: manages component state, triggers re-render
   - useEffect: handles side effects, runs after render

2. **"Why use TypeScript with React?"**
   - Type safety catches errors early
   - Better IDE support and autocomplete
   - Self-documenting code

3. **"What is the component lifecycle?"**
   - Mount → Update → Unmount
   - Hooks replace lifecycle methods (useEffect = componentDidMount/Update)

4. **"How does React's reconciliation work?"**
   - Virtual DOM diffing algorithm
   - Keys help React identify changed items
   - Only updates what changed

5. **"What is JSX and how does it work?"**
   - Syntactic sugar for React.createElement()
   - Transpiled by Babel/Vite
   - Not HTML, it's JavaScript

