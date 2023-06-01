export default function SkeletonTodo() {
  return (
    <div role='status' className='animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'>
      <div className='w-full'>
        <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700' />
        <div className='h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700' />
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
