import React from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { User } from './User'
import { useAddFriend } from '../../firebase/firebaseUtils'

const UsersDetail = () => {
  const { userID } = useParams()
  const { values } = useOutletContext()
  const { addFriend, loading, success } = useAddFriend()
  const user = values.find((item) => {
    return userID === item.userID
  })

  return (
    <div className='flex flex-col space-y-4 p-8'>
      <User add={{ addFriend, loading, success }} {...user} />
    </div>
  )
}

export default UsersDetail
