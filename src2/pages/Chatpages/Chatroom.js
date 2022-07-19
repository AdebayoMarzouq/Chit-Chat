import { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppContext } from '../../context'
import { SET_CURRENT_CHAT } from '../../context/action'

const Chatroom = () => {
  const { friendID } = useParams()
  const {
    dispatch,
    getChatInfo,
    getChatMessages,
    getFriendInfo,
    user,
    user_currentChat,
    sendChatMessage,
  } = useAppContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const unsubscribe1 = getChatInfo(friendID)
    const unsubscribe3 = getFriendInfo(friendID)
    const unsubscribe2 = getChatMessages(friendID)

    setLoading(false)

    return () => {
      dispatch({ type: SET_CURRENT_CHAT, payload: {} })
      unsubscribe1()
      unsubscribe2()
      unsubscribe3()
    }
    // eslint-disable-next-line
  }, [getChatInfo, getChatMessages, getFriendInfo, friendID])

  return (
    <>
      <Outlet
        context={{
          friendID,
          user,
          user_currentChat,
          sendChatMessage,
          loading,
        }}
      />
    </>
  )
}

export default Chatroom
