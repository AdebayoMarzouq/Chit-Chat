import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatPreview } from './ChatPreview'
import { RoomPreview } from './RoomPreview'

import Header from '../../components/Header'
import Modal from './Modal'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../components'
import { useUserContext } from '../../context'

const Home = () => {
  const { pathname } = useLocation()
  const [modal, setModal] = useState(false)
  const [retry, setRetry] = useState(false)
  const { width, isOpen, setIsOpen } = useUserContext()

  return (
    <div className=''>
      <section className='space-y-2 px-4 md:px-8'>
        <div className='-mx-6 border-b bg-neutral-100 px-6'>
          <Header
            width={width}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            name={pathname === '/' ? 'chats' : 'rooms'}
            className=''
          />
        </div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setRetry((x) => !x)
          }}
          resetKeys={[retry]}
        >
          {pathname === '/' ? <ChatPreview /> : <RoomPreview />}
        </ErrorBoundary>
      </section>
      <div className='flex justify-end'>
        {modal.show && <Modal type={modal.type} setModal={setModal} />}
      </div>
    </div>
  )
}

export default Home
