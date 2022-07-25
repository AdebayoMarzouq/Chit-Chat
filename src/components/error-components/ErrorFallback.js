import React from 'react'
import { RefreshIcon } from '@heroicons/react/solid'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role='alert'
      className='flex flex-col items-center justify-center text-gray-400 space-y-4'
    >
      <img
        src='https://media.giphy.com/media/keamSClApOmrii5HEt/giphy.gif'
        alt='pepe the frog sad face'
        className='w-40 object-cover'
      />
      <p className='text-center text-gray-500'>Something went wrong</p>
      <button
        onClick={resetErrorBoundary}
        className='flex gap-1 items-center text-light-text border border-light-main py-2 px-4 rounded-lg text-light-main'
      >
        <RefreshIcon className='h-5 w-5' />
        Retry
      </button>
    </div>
  )
}

export default ErrorFallback
