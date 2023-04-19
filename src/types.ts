export interface Task {
  id: number
  editable?: boolean
  title: string
  description: string
}

export interface TaskModalState {
  open: boolean
  task: Task | null
}
