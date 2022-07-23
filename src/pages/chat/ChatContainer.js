import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { doc, collection } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { firestoreDB } from '../../firebase/firebase'

const ChatContainer = () => {
  const { friendID } = useParams()
  const [friendData, friendLoading, friendError] = useDocumentData(
    doc(firestoreDB, `users/${friendID}`)
  )

  return (
    <Outlet context={{ friendID, friendData, friendLoading, friendError }} />
  )
}

export default ChatContainer
