import React from 'react'

export const UserCard = ({
  photoUrl,
  username,
  firstname,
  lastname,
  about,
}) => {
  return (
    <>
      <div className='flex place-content-center'>
        <img
          src={require(`../../assets/images/${photoUrl}.png`)}
          alt='profile'
          className='h-32 w-32'
        />
      </div>
      <div className=''>
        <h2 className='text-center text-3xl text-light-title'>{username}</h2>
        <h4 className='text-center text-gray-400'>{firstname}</h4>
        <h4 className='text-center text-gray-400'>{lastname}</h4>
        <h4 className='text-center text-gray-400'>{about}</h4>
      </div>
    </>
  )
}
