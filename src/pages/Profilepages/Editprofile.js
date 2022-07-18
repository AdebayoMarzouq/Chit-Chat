import React from 'react'
import { PencilIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context'

const Editprofile = () => {
  const navigate = useNavigate()
  const { user_info, editUserInfo } = useAppContext()
  const [info, setInfo] = React.useState({
    username: '',
    firstname: '',
    lastname: '',
    about: '',
  })

  React.useEffect(() => {
    if (!user_info.username) return
    setInfo({
      username: user_info.username,
      firstname: user_info.firstname,
      lastname: user_info.lastname,
      about: user_info.about,
    })
  }, [user_info])

  if (!user_info.username) {
    return <div className='sub-loading'></div>
  }

  return (
    <main className='flex flex-col py-4 px-4'>
      {!user_info.username ? (
        <div>Could not fetch your info</div>
      ) : (
        <>
          <form
            className='text-light-text'
            onSubmit={(e) => e.preventDefault()}
          >
            <h4 className='pl-3 text-sm'>Username</h4>
            <div className='h-12 mb-2 border-b border-light-main'>
              <input
                type='text'
                placeholder='Enter username'
                value={info?.username}
                onChange={(e) =>
                  setInfo((prev) => {
                    return { ...prev, username: e.target.value }
                  })
                }
              />
            </div>
            <h4 className='pl-3 text-sm'>Firstname</h4>
            <div className='h-12 mb-2 border-b border-light-main'>
              <input
                type='text'
                placeholder='Enter firstname'
                value={info?.firstname}
                onChange={(e) =>
                  setInfo((prev) => {
                    return { ...prev, firstname: e.target.value }
                  })
                }
              />
            </div>
            <h4 className='pl-3 text-sm'>Lastname</h4>
            <div className='h-12 mb-2 border-b border-light-main'>
              <input
                type='text'
                placeholder='Enter lastname'
                value={info?.lastname}
                onChange={(e) =>
                  setInfo((prev) => {
                    return { ...prev, lastname: e.target.value }
                  })
                }
              />
            </div>
            <h4 className='pl-3 text-sm'>About</h4>
            <div className='h-28 border border-light-main'>
              <textarea
                placeholder='Write bio here'
                value={info?.about}
                onChange={(e) =>
                  setInfo((prev) => {
                    return { ...prev, about: e.target.value }
                  })
                }
              />
            </div>
          </form>
          <div className='mt-4 flex'>
            <button
              className='flex items-center border select-none py-1 px-2 rounded-xl text-sm ml-auto hover:text-white hover:bg-light-main border-light-main text-light-main'
              onClick={() => {
                editUserInfo(info)
                navigate(-1)
              }}
            >
              Save edit <PencilIcon className='ml-1 h-3 w-3' />
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default Editprofile
