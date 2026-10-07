import { Card } from './card'

const activities = [
  { id: 1, action: 'Generated response', model: 'GPT-4', time: '2 min ago', status: 'success' },
  { id: 2, action: 'Image analysis', model: 'Claude 3', time: '5 min ago', status: 'success' },
  { id: 3, action: 'Code generation', model: 'GPT-4o', time: '8 min ago', status: 'pending' },
  { id: 4, action: 'Text summarization', model: 'Claude 3.5', time: '12 min ago', status: 'success' },
]

export function RecentActivity() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <a href="/results" className="text-sm text-primary hover:underline">View all</a>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-2 w-2 rounded-full",
                activity.status === 'success' ? "bg-green-500" : "bg-yellow-500"
              )} />
              <div>
                <div className="text-sm font-medium">{activity.action}</div>
                <div className="text-xs text-muted-foreground">{activity.model}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{activity.time}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}