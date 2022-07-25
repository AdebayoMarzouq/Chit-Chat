import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { ErrorBoundary } from 'react-error-boundary'

import { firestoreDB } from '../../firebase/firebase'
import { ErrorFallbackCustom } from '../../components'
import { PageError1 } from '../../components'

const ChatContainer = () => {
  const { chatID } = useParams()
  const [reset, setReset] = useState(false)
  const [roomData, roomLoading, roomError] = useDocumentData(
    doc(firestoreDB, `chats/${chatID}`)
  )
  // const [friendData, friendLoading, friendError] = useDocumentData(
  //   doc(firestoreDB, `users/${friendID}`)
  // )
  if (roomLoading) return <div className='sub-loading'></div>
  if (roomError)
    return <PageError1 error='Oh oh an error occured' reset={setReset} />

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackCustom}
      onReset={() => {
        setReset((x) => !x)
      }}
      resetKeys={[reset]}
    >
      <Outlet context={{ chatID, roomData }} />
    </ErrorBoundary>
  )
}

export default ChatContainer
