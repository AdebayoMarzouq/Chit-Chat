import { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppContext } from '../../context'
import { SET_CURRENT_ROOM } from '../../context/action'

const Chatgroup = () => {
  const { roomID } = useParams()
  const {
    dispatch,
    getRoomInfo,
    getRoomUsers,
    getRoomMessages,
    user,
    user_currentRoom,
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
      dispatch({ type: SET_CURRENT_ROOM, payload: {} })
      unsubscribe1()
      unsubscribe2()
      unsubscribe3()
    }
    // eslint-disable-next-line
  }, [getRoomInfo, getRoomMessages, getRoomUsers, roomID])

  return (
    <Outlet
      context={{ roomID, user, user_currentRoom, sendMessage, loading }}
    />
  )
}

export default Chatgroup
