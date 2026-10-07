import { TrendingUp, Users, Clock, CheckCircle } from 'lucide-react'
import { Card } from './card'

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export function StatsCard({ title, value, change, trend }: StatsCardProps) {
  const isUp = trend === 'up'
  const Icon = isUp ? TrendingUp : Clock
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        <div className={cn("text-xs", isUp ? "text-green-500" : "text-blue-500")}>
          {change} from last period
        </div>
      </div>
    </Card>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}