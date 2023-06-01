import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TodoState {
  todoId: string
}

const initialState: TodoState = {
  todoId: ''
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    startEditTodo: (state, action: PayloadAction<string>) => {
      state.todoId = action.payload
    },
    cancelEditTodo: (state) => {
      state.todoId = ''
    }
  }
})

const todoReducer = todoSlice.reducer
export const { cancelEditTodo, startEditTodo } = todoSlice.actions
export default todoReducer
