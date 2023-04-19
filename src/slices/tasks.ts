import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types'
import { RootState } from '../store'
import { TaskStatuses } from '../enums'

const savedTasks = localStorage.getItem('tasksState')
const tasksFromLocalStorage = savedTasks && JSON.parse(savedTasks)

const initialState = Object.fromEntries(
  Object.values(TaskStatuses)?.map((taskStatus, index) => [
    taskStatus,
    (Object.values(tasksFromLocalStorage)[index] || []) as Task[],
  ])
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state[Object.keys(state)[0]].unshift({ ...action.payload, editable: true })
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const { id, title, description } = action.payload
      const taskIndex = state[Object.keys(state)[0]].findIndex((task: Task) => task.id === id)
      if (taskIndex !== -1) {
        state[Object.keys(state)[0]][taskIndex].title = title
        state[Object.keys(state)[0]][taskIndex].description = description
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state[Object.keys(state)[0]] = state[Object.keys(state)[0]].filter((task: Task) => task.id !== action.payload)
    },
    moveTask: (
      state,
      action: PayloadAction<{
        sourceId: number
        destinationId: number
        sourceColumn: keyof typeof state
        destinationColumn: keyof typeof state
      }>
    ) => {
      const { sourceId, destinationId, sourceColumn, destinationColumn } = action.payload
      const taskIndex = state[sourceColumn]?.findIndex((_, index) => index === sourceId)
      if (taskIndex !== -1) {
        const task = state[sourceColumn]?.splice(taskIndex, 1)[0]
        task.editable = destinationColumn === Object.keys(state)[0]
        const destinationIndex = state[destinationColumn]?.findIndex((_, index) => index === destinationId)
        if (destinationIndex !== -1) {
          state[destinationColumn]?.splice(destinationIndex, 0, task)
        } else {
          state[destinationColumn]?.push(task)
        }
      }
    },
  },
})

export const saveTasksStateMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (Object.values(tasksSlice.actions).some((actionType) => action.type === actionType.type)) {
    next(action)
    localStorage.setItem('tasksState', JSON.stringify(store.getState().tasks))
  } else {
    next(action)
  }
}

export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
