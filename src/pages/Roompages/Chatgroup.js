import { useState, useEffect } from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import { useAppContext } from '../../context'

const Chatgroup = () => {
  const { roomID } = useParams()
  const {
    getRoomInfo,
    getRoomUsers,
    getRoomMessages,
    user,
    currentRoom,
    sendMessage,
  } = useAppContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const unsubscribe1 = getRoomInfo(roomID)
    const unsubscribe2 = getRoomMessages(roomID)
    const unsubscribe3 = getRoomUsers(roomID)

    setLoading(false)

    return () => {
      unsubscribe1()
      unsubscribe2()
      unsubscribe3()
    }
  }, [getRoomInfo, getRoomMessages, getRoomUsers, roomID])
  return (
    <Outlet context={{ roomID, user, currentRoom, sendMessage, loading }} />
  )
}

export default Chatgroup
