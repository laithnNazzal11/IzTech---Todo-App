import { Star, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Task {
  id: string
  title: string
  description: string
  status: string
  isFavorite: boolean
}

interface TaskTableProps {
  tasks: Task[]
}

function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[24px_2fr_3fr_.5fr_10px] gap-4 pb-2">
        <div className="font-primary text-sm font-[700] text-foreground"></div>
        <div className="font-primary text-sm font-[700] text-foreground">Title</div>
        <div className="font-primary text-sm font-[700] text-foreground">Description</div>
        <div className="font-primary text-sm font-[700] text-foreground flex items-center justify-center w-full">Status</div>
        <div className="font-primary text-sm font-[700] text-foreground flex"></div>

      </div>

      {/* Table Rows */}
      <div className="flex flex-col">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-[24px_2fr_3fr_.5fr_10px] gap-4 py-4 "
          >
            <div className="flex items-center justify-center" style={{ width: '24px' }}>
              {task.isFavorite ? (
                <Star className="h-6 w-6 fill-primary text-primary opacity-100" />
              ) : (
                <Star className="h-6 w-6 text-primary opacity-100" />
              )}
            </div>
            <div className="font-primary text-sm text-foreground flex items-center">{task.title}</div>
            <div className="font-primary text-sm text-muted-foreground">{task.description}</div>
            <div className="flex items-center justify-center gap-[10px]">
              <span
                className="w-[104px] h-[38px] rounded-md flex items-center justify-center opacity-100"
                style={{
                  background: 'hsla(255, 83%, 62%, 0.1)',
                }}
              >
                <p
                  className="font-primary text-xs font-[700]"
                  style={{
                    color: 'hsla(255, 83%, 62%, 1)',
                  }}
                >
                  {task.status}
                </p>
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-8" />
              </Button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskTable

