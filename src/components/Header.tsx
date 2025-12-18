import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Logo } from "@/components/Logo"

export function Header() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check initial theme
    const darkMode = document.documentElement.classList.contains('dark') || 
                     (!document.documentElement.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDark(darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between max-w-7xl mx-auto">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-9 w-9 hover:bg-accent/50 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </Button>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

