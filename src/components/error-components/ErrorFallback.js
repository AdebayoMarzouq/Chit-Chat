import React from 'react'
import { ExclamationIcon } from '@heroicons/react/solid'
import { useLocation, useNavigate } from 'react-router-dom'

function ErrorFallback({ error, resetErrorBoundary }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div
      role='alert'
      className='flex flex-col items-center justify-center mt-12 space-y-4 text-light-textmuted dark:text-dark-textmuted'
    >
      <ExclamationIcon className='w-36 icon-list text-light-main dark:text-dark-main' />
      <p className='text-center max-w-[70%] text-light-textmuted dark:text-dark-textmuted'>
        Something went wrong, please make sure you are connected to the internet
      </p>
      <div className='flex items-center justify-center gap-2'>
        <button
          onClick={resetErrorBoundary}
          className='flex items-center gap-1 px-3 py-1 border rounded-lg border-light-main dark:border-dark-main text-light-main dark:text-dark-main'
        >
          Retry
        </button>
        {pathname !== '/' && (
          <button
            onClick={() => {
              navigate('/')
            }}
            className='flex items-center gap-1 px-3 py-1 border rounded-lg border-light-main dark:border-dark-main text-light-main dark:text-dark-main'
          >
            Home
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorFallback
