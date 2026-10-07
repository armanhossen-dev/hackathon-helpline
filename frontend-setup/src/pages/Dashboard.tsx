import { useOutletContext } from 'react-router-dom'
import { ApiClient } from '../lib/api'
import { StatsCard } from '../components/dashboard/StatsCard'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { QuickAction } from '../components/dashboard/QuickAction'

export default function Dashboard() {
  const { api } = useOutletContext() as { api: ApiClient }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your AI application</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value="1,234"
          change="+12%"
          trend="up"
        />
        <StatsCard
          title="Active Users"
          value="89"
          change="+5%"
          trend="up"
        />
        <StatsCard
          title="Avg. Response"
          value="1.2s"
          change="-0.3s"
          trend="down"
        />
        <StatsCard
          title="Success Rate"
          value="99.8%"
          change="+0.1%"
          trend="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <QuickAction
          title="Start New Chat"
          description="Open the AI chat interface"
          href="/chat"
        />
        <QuickAction
          title="View Results"
          description="Check recent outputs"
          href="/results"
        />
      </div>

      <RecentActivity />
    </div>
  )
}