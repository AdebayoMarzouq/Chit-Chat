import { Outlet, useParams } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { firestoreDB } from '../../firebase/firebase'

const RoomContainer = () => {
  const { roomID } = useParams()
  const [values, loading, error] = useDocumentData(
    doc(firestoreDB, `rooms/${roomID}`)
  )

  if (error) return <div className=''>could not fetch room</div>
  if (loading) return <div className='sub-loading'></div>

  return <Outlet context={{ roomID, values, loading, error }} />
}

export default RoomContainer
