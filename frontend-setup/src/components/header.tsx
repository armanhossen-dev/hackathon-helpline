import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from './theme-provider'
import { Button } from './ui/button'
import { useState } from 'react'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 shadow-lg">
          <nav className="flex flex-col gap-2">
            <a href="/" className="px-3 py-2 rounded-md hover:bg-accent">Dashboard</a>
            <a href="/chat" className="px-3 py-2 rounded-md hover:bg-accent">Chat</a>
            <a href="/results" className="px-3 py-2 rounded-md hover:bg-accent">Results</a>
            <a href="/settings" className="px-3 py-2 rounded-md hover:bg-accent">Settings</a>
          </nav>
        </div>
      )}
    </div>
  )
}