import React from 'react'
import { PencilIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'

const Editprofile = () => {
  const navigate = useNavigate()
  const [updateUser, saveUser] = useStoreActions((actions) => [
    actions.addEditUserInfo,
    actions.saveUserToDB,
  ])
  const { username, firstname, lastname, about } = useStoreState(
    (state) => state.user
  )
  const [info, setInfo] = React.useState({
    username: username,
    firstname: firstname,
    lastname: lastname,
    about: about,
  })

  return (
    <main className='flex flex-col py-4 px-4'>
      <form
        className='space-y-10 text-light-textmuted dark:text-dark-textmuted'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='relative h-12 border-b border-light-main'>
          <input
            type='text'
            placeholder='Enter username'
            value={info.username}
            onChange={(e) =>
              setInfo((prev) => {
                return { ...prev, username: e.target.value }
              })
            }
          />
          <h4 className='absolute top-3 right-0 text-sm'>Username</h4>
        </div>
        <div className='relative h-12 border-b border-light-main'>
          <input
            type='text'
            placeholder='Enter firstname'
            value={info.firstname}
            onChange={(e) =>
              setInfo((prev) => {
                return { ...prev, firstname: e.target.value }
              })
            }
          />
          <h4 className='absolute top-3 right-0 text-sm'>Firstname</h4>
        </div>
        <div className='relative h-12 border-b border-light-main'>
          <input
            type='text'
            placeholder='Enter lastname'
            value={info.lastname}
            onChange={(e) =>
              setInfo((prev) => {
                return { ...prev, lastname: e.target.value }
              })
            }
          />
          <h4 className='absolute top-3 right-0 text-sm'>Lastname</h4>
        </div>
        <div className='relative h-28 border border-light-main'>
          <textarea
            placeholder='Write bio here'
            value={info.about}
            onChange={(e) =>
              setInfo((prev) => {
                return { ...prev, about: e.target.value }
              })
            }
          />
          <h4 className='absolute -top-6 right-0 text-sm'>About</h4>
        </div>
      </form>
      <div className='mt-4 flex'>
        <button
          className='ml-auto flex select-none items-center rounded-xl border border-light-main py-1 px-2 text-sm text-light-main hover:bg-light-main hover:text-white'
          onClick={() => {
            navigate(-1)
            updateUser(info)
            saveUser()
          }}
        >
          Save edit <PencilIcon className='ml-1 h-3 w-3' />
        </button>
      </div>
    </main>
  )
}

export default Editprofile
