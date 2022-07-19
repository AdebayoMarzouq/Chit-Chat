import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { useOutletContext, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useAppContext } from '../../context/context'
import { ErrorFallback, Errordisplay } from '../../components'
import { User } from './User'

const Userdetail = () => {
  const { userID } = useParams()
  // const navigate = useNavigate()
  const { loading, error, users, handleError } = useOutletContext()
  const { addFriend } = useAppContext()

  if (loading) {
    return <div className='sub-loading'></div>
  }

  console.log('usersfsjslg', users)
  const user = users.find((item) => {
    return userID === item.userID
  })

  return (
    <div className='flex flex-col space-y-4 p-8'>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={handleError}
        resetKeys={[error]}
      >
        {!error ? (
          <User addFriend={addFriend} {...user} />
        ) : (
          <Errordisplay
            error={{
              message:
                'An error occured while fetching users, E fit be your internet',
            }}
            resetErrorBoundary={handleError}
          />
        )}
      </ErrorBoundary>
    </div>
  )
}

export default Userdetail
