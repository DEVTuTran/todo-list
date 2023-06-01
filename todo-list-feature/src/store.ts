import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '@/slices/todo.slice'
import { todoApi } from '@/apis/todoApi'
import { rtkQueryErrorLogger } from './middleware'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware, rtkQueryErrorLogger)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
