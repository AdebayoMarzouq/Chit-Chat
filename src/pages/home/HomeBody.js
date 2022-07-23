import { memo, useEffect } from 'react'
import { ChatPreview } from './ChatPreview'
import { RoomPreview } from './RoomPreview'

function ToHome({ tab, setModal }) {
  useEffect(() => {}, [])

  return (
    <>
      <ChatPreview tab={tab} />
      <RoomPreview tab={tab} setModal={setModal} />
    </>
  )
}

export const HomeBody = memo(ToHome)
