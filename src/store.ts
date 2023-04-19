import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { taskModalReducer, tasksReducer, saveTasksStateMiddleware } from './slices'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  modal: taskModalReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveTasksStateMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
