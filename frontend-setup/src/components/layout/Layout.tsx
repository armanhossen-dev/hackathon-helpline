import { Outlet } from 'react-router-dom'
import { ThemeToggle } from './header'
import { ApiClient } from '../lib/api'

interface LayoutProps {
  api: ApiClient
}

export default function Layout({ api }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold">
              AI
            </div>
            <span className="ml-2 font-semibold">Hackathon</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="/" className="transition-colors hover:text-primary">Dashboard</a>
            <a href="/chat" className="transition-colors hover:text-primary">Chat</a>
            <a href="/results" className="transition-colors hover:text-primary">Results</a>
          </nav>
          
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container py-6">
        <Outlet context={{ api }} />
      </main>
      
      <footer className="border-t border-border/40 py-6">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <p>Built at AI Dev Hackathon</p>
          <p>© 2026</p>
        </div>
      </footer>
    </div>
  )
}