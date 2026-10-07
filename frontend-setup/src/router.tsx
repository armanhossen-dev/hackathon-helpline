import { createRoutesFromElements, Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Results from './pages/Results'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

interface AppRouterProps {
  api: ReturnType<typeof createMockApiClient>
}

export default function AppRouter({ api }: AppRouterProps) {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout api={api} />}>
        <Route index element={<Dashboard api={api} />} />
        <Route path="chat" element={<Chat api={api} />} />
        <Route path="results" element={<Results api={api} />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}