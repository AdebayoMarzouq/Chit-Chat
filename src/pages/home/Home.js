import { useState } from 'react'
import { useStoreState } from 'easy-peasy'
import { ChatsTab } from './ChatsTab'
import { HomeBody } from './HomeBody'
import { Menu } from './Menu'
import { RoomTab } from './RoomTab'

import Header from './Header'
import Modal from './Modal'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../components'

const Home = () => {
  const [tab, setTab] = useState('chats')
  const [modal, setModal] = useState(false)
  const [retry, setRetry] = useState(false)

  return (
    <main className='min-h-screen grid grid-cols-1'>
      <section className='space-y-2 px-4'>
        <div className='header-bg flex items-end space-x-2 py-2 px-4 -mx-4'>
          <Header name='Home' className='flex-grow text-white' />
        </div>
        <div className='grid grid-cols-2 pt-2 pb-4'>
          <ChatsTab tab={tab} setTab={setTab} />
          <RoomTab tab={tab} setTab={setTab} />
          <Menu tab={tab} setModal={setModal} />
        </div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setRetry((x) => !x)
          }}
          resetKeys={[retry]}
        >
          {<HomeBody tab={tab} setModal={setModal} />}
        </ErrorBoundary>
      </section>
      <div className='flex justify-end'>
        {modal.show && <Modal type={modal.type} setModal={setModal} />}
      </div>
    </main>
  )
}

export default Home
