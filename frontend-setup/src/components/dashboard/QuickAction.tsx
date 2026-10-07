import { ArrowRight } from 'lucide-react'
import { Card } from './card'

interface QuickActionProps {
  title: string
  description: string
  href: string
}

export function QuickAction({ title, description, href }: QuickActionProps) {
  return (
    <a href={href} className="block group">
      <Card className="p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Card>
    </a>
  )
}