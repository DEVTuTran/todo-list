import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo } from '@/models/todo.type'
import { CustomError } from '@/utils/helpers'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    prepareHeaders(headers) {
      const token = localStorage.getItem('token_todo')
      headers.set('authorization', 'Bearer ' + token)
      return headers
    }
  }),
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => 'todos',
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
            { type: 'Todos' as const, id: 'LIST' }
          ]
          return final
        }
        return [{ type: 'Todos', id: 'LIST' }]
      }
    }),
    addTodo: build.mutation<Todo, Omit<Todo, 'id'>>({
      query(body) {
        try {
          return {
            url: 'todos',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Todos', id: 'LIST' }])
    }),
    getTodo: build.query<Todo, string>({
      query: (id) => ({
        url: `todos/${id}`
      })
    }),
    updateTodo: build.mutation<Todo, { id: string; body: Todo }>({
      query(data) {
        return {
          url: `todos/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Todos', id: data.id }])
    }),
    deleteTodo: build.mutation<{}, string>({
      query(id) {
        return {
          url: `todos/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Todos', id }]
    })
  })
})

export const { useGetTodosQuery, useAddTodoMutation, useGetTodoQuery, useUpdateTodoMutation, useDeleteTodoMutation } =
  todoApi
