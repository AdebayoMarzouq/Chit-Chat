import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatPreview } from './ChatPreview'
import { RoomPreview } from './RoomPreview'

import Header from '../../components/Header'
import Modal from './Modal'
import { PlusIcon, LinkIcon } from '@heroicons/react/outline'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../components'
import { useUserContext } from '../../context'

const Home = () => {
  const { pathname } = useLocation()
  const [modal, setModal] = useState(false)
  const [retry, setRetry] = useState(false)
  const { width, isOpen, setIsOpen } = useUserContext()

  return (
    <section className='relative h-full overflow-x-hidden bg-light-bg dark:bg-dark-bg'>
      <div className='px-4 space-y-2 sm:px-8'>
        <div className='dark:bg-dark -mx-6 border-b px-6 dark:border-[#404040]'>
          <Header
            width={width}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            name={pathname === '/' ? 'chats' : 'rooms'}
            className=''
          />
        </div>
        {pathname === '/rooms' && (
          <div className='flex justify-end gap-4 text-light-textmuted dark:text-dark-textmuted'>
            <button
              className='hover:text-light-text dark:hover:text-dark-text'
              onClick={() => {
                setModal({ type: 'join', show: true })
              }}
            >
              Join <LinkIcon className='inline w-3 -ml-1' />
            </button>
            <button
              className='hover:text-light-text dark:hover:text-dark-text'
              onClick={() => {
                setModal({ type: 'create', show: true })
              }}
            >
              Create <PlusIcon className='inline w-3 -ml-1' />
            </button>
          </div>
        )}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setRetry((x) => !x)
          }}
          resetKeys={[retry]}
        >
          {pathname === '/' ? <ChatPreview /> : <RoomPreview />}
        </ErrorBoundary>
      </div>
      {modal.show && <Modal type={modal.type} setModal={setModal} />}
    </section>
  )
}

export default Home
