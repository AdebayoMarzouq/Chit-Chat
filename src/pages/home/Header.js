import React from 'react'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { ReactComponent } from '../../assets/chat-conversation-svgrepo-com.svg'

const Header = ({ className, name }) => {
  return (
    <div className={`py-4 flex flex-col ${className}`}>
      <div className='flex justify-between'>
        <h1 className='flex items-center font-bold text-light-main text-lg tracking-widest truncate'>
          <ReactComponent className='h-6 w-6 fill-light-main mr-1' />
          {name}
        </h1>
        <p className='flex items-center text-light-text text-sm font-semibold'>
          The dev <ExternalLinkIcon className='h-4 w-4 ml-1' />
          {/* put link to website here later */}
        </p>
      </div>
    </div>
  )
}

export default Header
