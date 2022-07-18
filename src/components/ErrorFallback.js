import { RefreshIcon } from '@heroicons/react/solid'

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      className='flex flex-col justify-center mx-4 mt-4 space-y-2'
      role='alert'
    >
      <p className='text-center'>Something went wrong:</p>
      <p className='text-red-500 text-center'>{error.message}</p>
      <div className='flex justify-center'>
        <button
          className='text-light-main flex items-center rounded-xl py-1 px-2'
          onClick={resetErrorBoundary}
        >
          Try again
          <RefreshIcon className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}
