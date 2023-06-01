import { useAddTodoMutation, useGetTodoQuery, useUpdateTodoMutation } from '@/apis/todoApi'
import { Todo } from '@/models/todo.type'
import { isEntityError } from '@/utils/helpers'
import classNames from 'classnames'
import { Fragment, useEffect, useMemo, useState } from 'react'

const initialState: Omit<Todo, 'id'> = {
  description: '',
  dueDate: '',
  status: 0,
  title: ''
}

type FormError =
  | {
      [key in keyof typeof initialState]: string
    }
  | null

interface Props {
  onClose: Function
  todoId: string
}
export default function CreateTodo({ onClose, todoId }: Props) {
  const [formData, setFormData] = useState<Omit<Todo, 'id'> | Todo>(initialState)
  const [addTodo, addTodoResult] = useAddTodoMutation()
  const { data } = useGetTodoQuery(todoId, {
    skip: !todoId
  })
  const [updateTodo, updateTodoResult] = useUpdateTodoMutation()

  const errorForm: FormError = useMemo(() => {
    const errorResult = todoId ? updateTodoResult.error : addTodoResult.error
    if (isEntityError(errorResult)) {
      return errorResult.data.error as FormError
    }
    return null
  }, [todoId, updateTodoResult, addTodoResult])

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (todoId) {
        await updateTodo({
          body: formData as Todo,
          id: todoId
        }).unwrap()
      } else {
        await addTodo(formData).unwrap()
      }
      setFormData(initialState)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-6'>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Tiêu đề
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Nhập tiêu đề...'
          required
          value={formData.title}
          onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
        />
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Mô tả
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Mô tả công việc...'
            required
            value={formData.description}
            onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
      </div>
      <div className='mb-6 flex '>
        <div className='mr-2 w-1/2'>
          <label htmlFor='dueDate' className='mb-2 block text-sm font-medium  text-red-700 dark:text-gray-300'>
            Ngày hoàn thành
          </label>
          <input
            type='datetime-local'
            id='dueDate'
            className={classNames('block w-full rounded-lg border  p-2.5 text-sm  focus:outline-none ', {
              'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-blue-500':
                Boolean(errorForm?.dueDate),
              'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500': Boolean(
                errorForm?.dueDate
              )
            })}
            required
            value={formData.dueDate}
            onChange={(event) => setFormData((prev) => ({ ...prev, dueDate: event.target.value }))}
          />
          {errorForm?.dueDate && (
            <p className='mt-2 text-sm text-red-600'>
              <span className='font-medium'>Lỗi! </span>
              {errorForm.dueDate}
            </p>
          )}
        </div>
        <div className='w-1/2'>
          <label htmlFor='status' className='mb-2 block text-sm font-medium text-red-700 dark:text-gray-300'>
            Trạng thái
          </label>
          <select
            id='status'
            value={formData.status}
            onChange={(event) => setFormData((prev) => ({ ...prev, status: parseInt(event.target.value) }))}
            className={classNames('block w-full rounded-lg border  p-2.5 text-sm  focus:outline-none ', {
              'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-blue-500':
                Boolean(errorForm?.dueDate),
              'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500': Boolean(
                errorForm?.dueDate
              )
            })}
          >
            <option selected value={0}>
              Chưa hoàn thành
            </option>
            <option value={1}>Đã hoàn thành</option>
          </select>
        </div>
      </div>
      <div>
        {Boolean(todoId) && (
          <Fragment>
            <button
              type='submit'
              className='group relative mb-2 mr-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Cập nhật
              </span>
            </button>
            <button
              type='button'
              onClick={() => onClose()}
              className='group relative mb-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Huỷ
              </span>
            </button>
          </Fragment>
        )}
        {!Boolean(todoId) && (
          <Fragment>
            <button
              className='group relative mb-2 mr-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
              type='submit'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Thêm
              </span>
            </button>
            <button
              type='button'
              onClick={() => onClose()}
              className='group relative mb-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Huỷ
              </span>
            </button>
          </Fragment>
        )}
      </div>
    </form>
  )
}
