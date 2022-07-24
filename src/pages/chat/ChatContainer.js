import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { doc, collection } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { firestoreDB } from '../../firebase/firebase'
import { useStoreState } from 'easy-peasy'

const ChatContainer = () => {
  const { chatID } = useParams()
  // const user = useStoreState((state) => state.user)
  const [roomData, roomLoading, roomError] = useDocumentData(
    doc(firestoreDB, `chats/${chatID}`)
  )
  // const [friendData, friendLoading, friendError] = useDocumentData(
  //   doc(firestoreDB, `users/${friendID}`)
  // )
  if (roomLoading) return <div className='sub-loading'></div>
  if (roomError) return <div>An error occured while fetching messages</div>
  return <Outlet context={{ chatID, roomData }} />
}

export default ChatContainer
