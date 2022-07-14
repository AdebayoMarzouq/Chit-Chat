import React from 'react'
import { PencilIcon } from '@heroicons/react/outline'
import { useAppContext } from '../../context'

const Editprofile = () => {
  const { user } = useAppContext()
  return (
    <main className='flex flex-col py-4 px-4'>
      <form className='text-light-text' onSubmit={(e) => e.preventDefault()}>
        <h4 className='pl-3 text-sm'>Username</h4>
        <div className='h-12 mb-2 border-b border-[#3ed7ee]'>
          <input
            type='text'
            placeholder='Enter username'
            value={user.username}
          />
        </div>
        <h4 className='pl-3 text-sm'>Firstname</h4>
        <div className='h-12 mb-2 border-b border-[#3ed7ee]'>
          <input
            type='text'
            placeholder='Enter firstname'
            value={user.firstname}
          />
        </div>
        <h4 className='pl-3 text-sm'>Lastname</h4>
        <div className='h-12 mb-2 border-b border-[#3ed7ee]'>
          <input
            type='text'
            placeholder='Enter lastname'
            value={user.lastname}
          />
        </div>
        <h4 className='pl-3 text-sm'>About</h4>
        <div className='h-28 border border-[#3ed7ee]'>
          <textarea placeholder='Enter username' value={user.about} />
        </div>
        <div className='mt-4 flex'>
          <button className='flex items-center border select-none py-1 px-2 rounded-xl text-sm ml-auto hover:text-white hover:bg-[#3ed7ee] border-[#3ed7ee] text-[#3ed7ee]'>
            Save edit <PencilIcon className='ml-1 h-3 w-3' />
          </button>
        </div>
      </form>
    </main>
  )
}

export default Editprofile
