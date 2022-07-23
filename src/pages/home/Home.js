import { useState } from 'react'
import { useStoreState } from 'easy-peasy'
import { ChatsTab } from './ChatsTab'
import { HomeBody } from './HomeBody'
import { Menu } from './Menu'
import { RoomTab } from './RoomTab'

import Header from './Header'
import Modal from './Modal'

const Home = () => {
  const [tab, setTab] = useState('chats')
  const [modal, setModal] = useState(false)
  const user = useStoreState((state) => state.user)

  return (
    <main className='min-h-screen grid grid-cols-1'>
      <section className='space-y-2 px-4'>
        <div className='flex items-end space-x-2 py-2'>
          <Header name='Home' className='flex-grow' />
        </div>
        <div className='grid grid-cols-2 pt-2 pb-4'>
          <ChatsTab tab={tab} setTab={setTab} />
          <RoomTab tab={tab} setTab={setTab} />
          <Menu tab={tab} setModal={setModal} />
        </div>
        {<HomeBody tab={tab} setModal={setModal} />}
      </section>
      <div className='flex justify-end'>
        {modal.show && <Modal type={modal.type} setModal={setModal} />}
      </div>
    </main>
  )
}

export default Home
