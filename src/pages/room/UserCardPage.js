import { ChevronLeftIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { firestoreDB } from '../../firebase/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { User, ErrorFallbackCustom } from '../../components'

import { PageError1 } from '../../components'

const UserCardPage = () => {
  const { userID } = useParams()
  const navigate = useNavigate()
  const [reset, setReset] = useState(false)
  const [user, loading, error] = useDocumentData(
    doc(firestoreDB, 'users', userID)
  )

  if (error)
    return <PageError1 error='Error while fetching users' reset={setReset} /> // render fallback component here
  return (
    <div className='flex flex-col px-4 py-4 space-y-4'>
      <div className='flex items-center -ml-2'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className='w-8 h-8 text-light-main' />
        </button>
      </div>
      <ErrorBoundary
        FallbackComponent={ErrorFallbackCustom}
        onReset={() => {
          setReset((x) => !x)
        }}
        resetKeys={[reset]}
      >
        {loading ? <div className='sub-loading'></div> : <User {...user} />}
      </ErrorBoundary>
    </div>
  )
}

export default UserCardPage
