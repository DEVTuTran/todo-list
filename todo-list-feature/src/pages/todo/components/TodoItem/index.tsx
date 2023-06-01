import { Todo } from '@/models/todo.type'
import CreateTodo from '../CreateTodo'
import { useState } from 'react'
import { DueStatus, checkStatus } from '@/utils'

interface TodoItemType {
  todo: Todo
  handleDelete: (todoId: string) => void
  handleStartEditing: (todoId: string) => void
}
export default function TodoItem({ todo, handleDelete, handleStartEditing }: TodoItemType) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex flex-col items-center overflow-hidden rounded-lg border md:flex-row'>
      <div className='flex flex-col gap-2 p-4 lg:p-6'>
        <div className='flex'>
          <span className='mr-10 text-sm text-gray-400'>{todo.dueDate}</span>
          <span className={`text-sm ${checkStatus(todo.dueDate, todo.status)}`}>{DueStatus[todo.status]}</span>
        </div>
        <h2 className='text-xl font-bold text-gray-800'>{todo.title}</h2>
        <p className='text-gray-500'>{todo.description}</p>
        <div>
          <div className='inline-flex rounded-md shadow-sm' role='group'>
            <button
              type='button'
              className='rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
              onClick={() => setShowModal(true)}
            >
              Sửa
            </button>

            {showModal ? (
              <>
                <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
                  <div className='relative mx-auto my-6 w-auto max-w-3xl'>
                    {/*content*/}
                    <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                      {/*header*/}
                      <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
                        <h3 className='text-3xl font-semibold'>Form chỉnh sửa</h3>
                        <button
                          className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none'
                          onClick={() => setShowModal(false)}
                        >
                          <span className='block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none'>
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className='relative flex-auto p-6'>
                        <CreateTodo todoId={todo.id} onClose={() => setShowModal(false)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
              </>
            ) : null}
            <button
              type='button'
              className='rounded-r-lg border-b border-r border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
              onClick={() => handleDelete(todo.id)}
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
