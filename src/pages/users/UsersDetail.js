import React, { useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { User } from './User'
import { useAddFriend } from '../../firebase/firebaseUtils'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallbackCustom } from '../../components'

const UsersDetail = () => {
  const { userID } = useParams()
  const [retry, setRetry] = useState(false)
  const { values } = useOutletContext()
  const { addFriend, loading, success } = useAddFriend()
  const user = values.find((item) => {
    return userID === item.userID
  })

  return (
    <div className='flex flex-col space-y-6 p-8'>
      <ErrorBoundary
        FallbackComponent={ErrorFallbackCustom}
        onReset={() => {
          setRetry((x) => !x)
        }}
        resetKeys={[retry]}
      >
        <User add={{ addFriend, loading, success }} {...user} />
      </ErrorBoundary>
    </div>
  )
}

export default UsersDetail
