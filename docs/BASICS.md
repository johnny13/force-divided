# React Basics - Core Concepts

This document explains the fundamental React concepts used in this application. These are essential topics you'll be asked about in React interviews.

## Table of Contents

1. [JSX - JavaScript XML](#jsx---javascript-xml)
2. [Components](#components)
3. [Props and Prop Spreading](#props-and-prop-spreading)
4. [Rendering Lists with `.map()`](#rendering-lists-with-map)
5. [React DOM Setup](#react-dom-setup)
6. [createRoot - React 18+ API](#createroot---react-18-api)
7. [StrictMode](#strictmode)
8. [Application Lifecycle](#application-lifecycle)

---

## JSX - JavaScript XML

**What is JSX?**
JSX is a syntax extension for JavaScript that lets you write HTML-like code in your JavaScript files. It's **not HTML** - it's JavaScript that gets transformed into `React.createElement()` calls.

**Example from `src/App.tsx`:**
```tsx
function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      <main>...</main>
    </div>
  )
}
```

**Key JSX Rules:**
1. **Must return a single parent element** (or use React Fragment `<>...</>`)
2. **Use `className` instead of `class`** (because `class` is a reserved word in JavaScript)
3. **Self-closing tags must have `/`** - `<img />`, `<br />`, not `<img>`
4. **Embed JavaScript expressions with `{}`** - `{movies.map(...)}`
5. **JavaScript expressions, not statements** - can't use `if/else` directly, use ternaries `condition ? a : b`

**Why JSX?**
- Makes component structure visually clear
- Combines markup and logic in one place
- Type-safe with TypeScript
- Compiles to optimized JavaScript

---

## Components

**What are Components?**
Components are the building blocks of React applications. They're reusable pieces of UI that can accept inputs (props) and return JSX to describe what should appear on screen.

**Function Component Example:**
```tsx
// src/components/MovieCard.tsx
export function MovieCard({ title, episode, year }: MovieCardProps) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
    </Card>
  )
}
```

**Component Characteristics:**
- **Must start with a capital letter** - React uses this to distinguish components from HTML elements
- **Must return JSX** (or `null` to render nothing)
- **Can be imported and used like HTML tags** - `<MovieCard />`
- **Reusable** - same component, different props = different UI

**In our app:**
```tsx
// App.tsx uses multiple components
<Header />      // Navigation header
<Logo />        // Logo component
<MovieCard />   // Movie display card
```

---

## Props and Prop Spreading

### What are Props?

**Props** (short for "properties") are how you pass data from a parent component to a child component. Props are **read-only** - components cannot modify their props.

**Example - Passing Props:**
```tsx
// In App.tsx (parent)
<MovieCard 
  title="The Force Awakens"
  episode="Episode VII"
  year={2015}
  posterUrl="https://..."
  sentiment={78}
  sentimentLabel="Positive"
/>
```

**Example - Receiving Props:**
```tsx
// In MovieCard.tsx (child)
interface MovieCardProps {
  title: string
  episode: string
  year: number
  // ... other props
}

export function MovieCard({ title, episode, year, ... }: MovieCardProps) {
  return <Card>{title}</Card>
}
```

### The Three Dots (`...`) - Prop Spreading

**Location in code:** `src/App.tsx:86`

```tsx
{movies.map((movie, index) => (
  <MovieCard {...movie} />
))}
```

**What `{...movie}` does:**
The spread operator (`...`) takes all properties from the `movie` object and passes them as individual props to `MovieCard`.

**Equivalent to:**
```tsx
// Instead of writing:
<MovieCard 
  title={movie.title}
  episode={movie.episode}
  year={movie.year}
  posterUrl={movie.posterUrl}
  sentiment={movie.sentiment}
  sentimentLabel={movie.sentimentLabel}
/>

// We can write:
<MovieCard {...movie} />
```

**Why use it?**
- **Less code** - cleaner and more maintainable
- **Dynamic** - automatically passes all properties
- **Flexible** - works when object structure changes

**Important:** The object keys must match the component's prop names exactly!

---

## Rendering Lists with `.map()`

**Location in code:** `src/App.tsx:78`

```tsx
{movies.map((movie, index) => (
  <div key={movie.title}>
    <MovieCard {...movie} />
  </div>
))}
```

### What is `.map()`?

`.map()` is a JavaScript array method that:
1. Takes an array (`movies`)
2. Transforms each item into something new (a JSX element)
3. Returns a new array of the transformed items

### Why `.map()` and not `.forEach()`?

- `.map()` **returns** a new array (what React needs to render)
- `.forEach()` returns `undefined` (can't render undefined)

### The `key` Prop

**Critical React concept!** When rendering lists, each item needs a unique `key` prop.

```tsx
<div key={movie.title}>  {/* ← Unique identifier */}
  <MovieCard {...movie} />
</div>
```

**Why keys are required:**
- Helps React identify which items changed, were added, or removed
- Improves performance (React can update only changed items)
- Prevents rendering bugs when list order changes

**Good keys:**
- ✅ Unique IDs from data: `key={movie.id}`
- ✅ Unique strings: `key={movie.title}` (if titles are unique)
- ❌ Array indices: `key={index}` (only if list never reorders)

**In our app:**
```tsx
const movies = [
  { title: "The Force Awakens", ... },
  { title: "The Last Jedi", ... },
  { title: "The Rise of Skywalker", ... }
]

// Each movie.title is unique, so it's a good key
{movies.map((movie) => (
  <div key={movie.title}>
    <MovieCard {...movie} />
  </div>
))}
```

---

## React DOM Setup

### The Entry Point

**File:** `index.html`

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

This is the **HTML anchor point** where React takes over. The `<div id="root">` is where React will mount the entire application.

### When is the DOM Setup?

The DOM setup happens **once** when:
1. Browser loads `index.html`
2. Script tag loads `main.tsx`
3. React initializes and renders into `#root`

This is the **mounting phase** - React attaches to the DOM element.

---

## createRoot - React 18+ API

**Location in code:** `src/main.tsx:2,6`

```tsx
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### What is `createRoot`?

`createRoot` is the **React 18+ way** to create a root and render an app. It replaces the old `ReactDOM.render()` method.

**Old way (React 17 and earlier):**
```tsx
// ❌ Deprecated
ReactDOM.render(<App />, document.getElementById('root'))
```

**New way (React 18+):**
```tsx
// ✅ Modern
const root = createRoot(document.getElementById('root')!)
root.render(<App />)

// Or shorthand:
createRoot(document.getElementById('root')!).render(<App />)
```

### Breaking it down:

1. **`document.getElementById('root')`** - Gets the DOM element from HTML
2. **`!` (non-null assertion)** - TypeScript operator saying "I'm sure this isn't null"
3. **`createRoot(...)`** - Creates a React root (the connection between React and DOM)
4. **`.render(<App />)`** - Renders the root component

### Why the new API?

- **Concurrent rendering** - Better performance with React 18's concurrent features
- **Multiple roots** - Can have multiple React apps on one page
- **Better error handling** - Improved error boundaries

---

## StrictMode

**Location in code:** `src/main.tsx:7`

```tsx
<StrictMode>
  <App />
</StrictMode>
```

### What is StrictMode?

`StrictMode` is a React component that helps identify potential problems in your application during development. It **doesn't render anything visible** but adds extra checks and warnings.

**What StrictMode does:**
1. **Identifies unsafe lifecycles** - Warns about deprecated lifecycle methods
2. **Detects unexpected side effects** - Components render twice in dev to catch bugs
3. **Warns about legacy APIs** - Alerts you to use modern React patterns
4. **Detects legacy string refs** - Encourages using `useRef()` hook

**Important:** StrictMode only runs in **development mode**. It has no effect in production builds.

**Why wrap the app?**
```tsx
// Good practice - catches issues early
<StrictMode>
  <App />
</StrictMode>
```

### Note: StrictMode vs `"use strict"`

- **`"use strict"`** - JavaScript strict mode (prevents common JS errors)
- **`<StrictMode>`** - React's development helper (catches React-specific issues)

They're different! React StrictMode is a component, not a JavaScript directive.

---

## Application Lifecycle

### The React App Lifecycle

Here's what happens when the app loads:

```
1. Browser loads index.html
   ↓
2. HTML parser finds <div id="root">
   ↓
3. Script loads: /src/main.tsx
   ↓
4. main.tsx executes:
   - Imports React, App component
   - Finds DOM element: document.getElementById('root')
   - Creates React root: createRoot(...)
   - Renders App inside StrictMode: .render(<StrictMode><App /></StrictMode>)
   ↓
5. React renders App component
   - App returns JSX with Header, Logo, movies.map(...)
   - Each MovieCard renders with its props
   ↓
6. React commits to DOM
   - Updates the #root div with all the JSX
   ↓
7. Browser displays the rendered HTML
```

### Component Render Cycle

1. **Initial Render** - Component renders for the first time
2. **Re-renders** - Component re-renders when:
   - Props change
   - State changes (using `useState`)
   - Parent component re-renders
3. **Cleanup** - When component unmounts (removed from DOM)

**Example from Header.tsx:**
```tsx
// Component renders
export function Header() {
  const [isDark, setIsDark] = useState(true)  // Initial state
  
  useEffect(() => {
    // Runs after render
    // Sets up theme checking
  }, [])  // Empty array = runs once on mount
  
  // Re-renders when setIsDark is called
  return <header>...</header>
}
```

### Key Takeaways

- **One-time setup** happens in `main.tsx`
- **Re-renders happen automatically** when data changes
- **React manages the DOM** - you don't manually update it
- **Components are pure functions** - same props in = same output out

---

## Quick Reference

| Concept | Location | Key Point |
|---------|----------|-----------|
| JSX | `App.tsx` | HTML-like syntax that compiles to JavaScript |
| Components | All `.tsx` files | Reusable UI pieces, must start with capital letter |
| Props | `MovieCard.tsx` | Data passed from parent to child, read-only |
| Prop Spreading | `App.tsx:86` | `{...obj}` passes all object properties as props |
| Array Mapping | `App.tsx:78` | `.map()` transforms arrays into JSX elements |
| Keys | `App.tsx:80` | Unique identifier required for list items |
| createRoot | `main.tsx:6` | React 18+ API for mounting apps |
| StrictMode | `main.tsx:7` | Development helper that catches React issues |
| DOM Setup | `index.html`, `main.tsx` | Happens once on page load |

