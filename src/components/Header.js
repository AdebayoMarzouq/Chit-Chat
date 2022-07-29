import React from 'react'
import { MenuIcon, XIcon, ExternalLinkIcon } from '@heroicons/react/solid'

const Header = ({ width, isOpen, setIsOpen, className, name, extra }) => {
  return (
    <div className={`flex flex-col py-5 ${className}`}>
      <div className='flex justify-between'>
        <div className='self-start'>{extra}</div>
        <h1 className='text-2xl capitalize tracking-widest text-light-main'>
          {name}
        </h1>
        {width < 768 && !isOpen ? (
          <button className='pr-2' onClick={() => setIsOpen(true)}>
            <MenuIcon className='w-8 text-gray-400' />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Header
