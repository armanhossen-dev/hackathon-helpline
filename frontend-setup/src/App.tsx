import { useEffect } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import { TooltipProvider } from './components/ui/tooltip'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { createMockApiClient } from './lib/api'
import AppRouter from './router'
import './styles/globals.css'

// Create API client (swap with real backend when ready)
const api = createMockApiClient()

function App() {
  useEffect(() => {
    // Preload critical assets
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = '/logo.png'
    link.as = 'image'
    document.head.appendChild(link)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="hackathon-theme">
        <TooltipProvider>
          <Toaster />
          <AppRouter api={api} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App