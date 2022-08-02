import React from 'react'

export const PreviewPlaceholder = () => (
  <div className='flex justify-start p-4 rounded-xl bg-light-mainalt dark:bg-dark-mainalt'>
    <div className='relative flex-shrink-0 w-12 h-12 rounded-full animate-pulse'>
      <div className='flex-shrink-0 w-12 h-12 rounded-full bg-gray-300 dark:bg-[#3a3b3c]' />
    </div>
    <div className='grid flex-grow grid-cols-1 ml-4 mr-6 space-y-2'>
      <div className='animate-pulse'>
        <div className='w-7/12 h-3 sm:h-4 rounded-xl bg-gray-300 dark:bg-[#3a3b3c]'></div>
      </div>
      <div className='space-y-1 animate-pulse'>
        <div className='h-2 sm:h-3 w-full rounded-xl bg-gray-300 dark:bg-[#3a3b3c]'></div>
        <div className='h-2 sm:h-3 w-10/12 rounded-xl bg-gray-300 dark:bg-[#3a3b3c]'></div>
      </div>
    </div>
    <div className='animate-pulse'>
      <p className='w-6 h-3 rounded-lg bg-gray-300 dark:bg-[#3a3b3c]'></p>
    </div>
  </div>
)
