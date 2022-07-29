import {
  AtSymbolIcon,
  CheckCircleIcon,
  UserAddIcon,
} from '@heroicons/react/outline'

export const User = ({
  username,
  userID,
  about,
  firstname,
  lastname,
  email,
  profileUrl: photoUrl,
  add,
}) => {
  const { addFriend, loading, success } = add

  const handleAdd = () => {
    addFriend({
      username: username,
      friendID: userID,
      photoUrl: photoUrl,
      about: about,
    })
  }

  const SetIcon = () => {
    if (loading) return <div className='add-loading h-8 w-8'></div>
    else if (success)
      return (
        <CheckCircleIcon className='icon-list h-10 w-10 text-light-main drop-shadow' />
      )
    return (
      <UserAddIcon className='icon-list h-10 w-10 text-light-main drop-shadow' />
    )
  }

  return (
    <>
      <div className='relative flex items-center space-x-4'>
        <img
          className='h-24 w-24 shrink-0 rounded-full object-cover shadow-inner ring ring-light-main ring-offset-2'
          src={
            isNaN(parseInt(photoUrl))
              ? photoUrl
              : require(`../../assets/images/${photoUrl}.png`)
          }
          alt='profile_image'
        />
        <div className='grid-col grid space-y-[1px]'>
          <h2 className='text-xl text-light-title'>
            {firstname}
            <span> </span>
            {lastname}
          </h2>
          <h3 className='flex items-center text-light-main'>
            <AtSymbolIcon className='h-4 w-4 text-gray-400' />
            {username}
          </h3>
        </div>
        <button
          className='absolute top-1 right-2 flex h-10 w-10 items-center justify-center'
          onClick={handleAdd}
          // adjust docreference in addFriend
          // add add loading to let the user know it is loading by replacing the add icon
        >
          <SetIcon />
        </button>
      </div>
      <div className=''>
        <h4 className='text-sm text-light-chat'>Username</h4>
        <h2 className='text-xl text-light-title'>{username}</h2>
      </div>
      <div className=''>
        <h4 className='text-sm text-light-chat'>Email</h4>
        <h2 className='text-xl text-light-title'>{email}</h2>
      </div>
      <div className=''>
        <h4 className='text-sm text-light-chat'>About</h4>
        <h2 className='text-sm text-light-title'>{about}</h2>
      </div>
    </>
  )
}
