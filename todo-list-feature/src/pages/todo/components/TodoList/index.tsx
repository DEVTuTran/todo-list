import TodoItem from '../TodoItem'
import { useDeleteTodoMutation, useGetTodosQuery } from '@/apis/todoApi'
import { startEditTodo } from '@/slices/todo.slice'
import { useDispatch } from 'react-redux'
import SkeletonTodo from '../TodoSkeleton'
import { Fragment, useState } from 'react'
import { Todo } from '@/models/todo.type'
import CreateTodo from '../CreateTodo'

export default function TodoList() {
  const { data, isLoading, isFetching } = useGetTodosQuery()
  const [showModal, setShowModal] = useState(false)

  const [deleteTodo] = useDeleteTodoMutation()
  const dispatch = useDispatch()

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId)
  }

  const handleStartEditing = (todoId: string) => {
    dispatch(startEditTodo(todoId))
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
            Danh sách công việc.
          </h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Con người chẳng bao giờ lên kế hoạch để thất bại, chỉ đơn giản là họ đã thất bại trong việc lên kế hoạch để
            thành công.
          </p>
        </div>
        <button
          className='mb-10 mr-1 rounded   bg-green-400 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600'
          type='button'
          onClick={() => setShowModal(true)}
        >
          Thêm công việc
        </button>
        {showModal ? (
          <>
            <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
              <div className='relative mx-auto my-6 w-1/3 max-w-4xl'>
                {/*content*/}
                <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
                    <h3 className='text-3xl font-semibold'>Form tạo mới</h3>
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
                    <CreateTodo todoId='' onClose={() => setShowModal(false)} />
                  </div>
                </div>
              </div>
            </div>
            <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
          </>
        ) : null}
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {(isFetching || isLoading) && (
            <Fragment>
              <SkeletonTodo />
              <SkeletonTodo />
              <SkeletonTodo />
              <SkeletonTodo />
            </Fragment>
          )}
          {!isFetching &&
            !isLoading &&
            data?.map((todo: Todo) => (
              <TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} handleStartEditing={handleStartEditing} />
            ))}
        </div>
      </div>
    </div>
  )
}
