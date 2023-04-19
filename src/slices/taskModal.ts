import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TaskModalState, Task } from '../types'

const initialState: TaskModalState = {
  open: false,
  task: null,
}

const taskModalSlice = createSlice({
  name: 'taskModal',
  initialState,
  reducers: {
    showTaskModal(state, action: PayloadAction<Task | null>) {
      state.open = true
      state.task = action.payload || null
    },
    hideTaskModal(state) {
      state.open = false
      state.task = null
    },
  },
})

export const { showTaskModal, hideTaskModal } = taskModalSlice.actions
export const taskModalReducer = taskModalSlice.reducer
