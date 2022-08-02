import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { query, collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useStoreState } from 'easy-peasy'

import { firestoreDB } from '../../firebase/firebase'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorFallback, PageError1 } from '../../components'
import { PreviewPlaceholder } from './PreviewPlaceholder'

export function RoomPreview() {
  const { uid } = useStoreState((state) => state.user)
  const [retry, setRetry] = useState(false)
  const [roomsSnapshot, loading, error] = useCollection(
    collection(firestoreDB, `users/${uid}/rooms`)
  )
  let empty = true
  let values = []

  if (error) {
    return (
      <PageError1
        error='Unable to fetch data, check your internet connection'
        reset={setRetry}
      />
    )
  }

  if (roomsSnapshot) {
    empty = roomsSnapshot.empty
    roomsSnapshot.forEach((doc) => values.push(doc.data()))
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setRetry((x) => !x)
      }}
      resetKeys={[retry]}
    >
      <div className='p-1 space-y-2 overflow-y-auto'>
        {loading ? (
          Array.from({ length: 6 }).map((item, index) => (
            <PreviewPlaceholder key={index} />
          ))
        ) : empty ? (
          <p className='m-8 text-center text-light-textmuted dark:text-dark-textmuted'>
            You have not joined any room yet, join some and they will appear
            here
          </p>
        ) : (
          values.map((room) => <PreviewItem key={room.roomID} {...room} />)
        )}
      </div>
    </ErrorBoundary>
  )
}

const PreviewItem = ({ roomName, roomID, roomPath, roomPic, roomInfo }) => (
  <Link
    to={`/room/${roomID}`}
    className='flex justify-start rounded-xl bg-light-mainalt p-4 hover:bg-gray-200 dark:bg-dark-mainalt dark:hover:bg-[#3a3b3c]'
  >
    <div className='relative flex-shrink-0 w-12 h-12 rounded-full'>
      <img
        // src={require(`../../assets/images/${roomPic}.png`)}
        src={require(`../../assets/landscape.png`)}
        alt='profile'
        className='flex-shrink-0 w-12 h-12 rounded-full bg-sky-300'
      />
      {/* <p className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-light-main text-[9px] font-bold text-gray-100'>
        <span className='-mb-[3px]'>12</span>
      </p> */}
    </div>
    <div className='grid flex-grow ml-4 mr-6 grid-col'>
      <h2 className='text-sm font-bold text-light-text dark:text-dark-text sm:text-base'>
        {roomName}
      </h2>
      <p className='row-span-2 h-6 truncate whitespace-pre-wrap text-[10px] leading-[0.75rem] text-light-textmuted dark:text-dark-textmuted sm:text-[12px]'>
        {/* {roomInfo} */}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa natus
        eum, alias provident velit ad modi accusamus, iure ipsam perspiciatis
        sit nisi! Dolore voluptatibus expedita similique explicabo, animi ut
        illum velit unde? Quas tempore velit accusamus. Minima laboriosam
        reprehenderit a! Assumenda neque sint rerum? Deleniti voluptas quas
        cumque doloremque, fuga eligendi modi culpa eius? Quo sapiente enim
        harum quas eius, eveniet corporis dolores quam culpa quisquam reiciendis
        consectetur fuga ullam cupiditate distinctio quidem inventore atque
        necessitatibus consequatur ipsum. Quam perferendis deserunt non saepe
        nemo, ducimus culpa autem enim ipsam veniam sit, distinctio architecto
        dolores perspiciatis est veritatis dolorum eum. Sit dolorem obcaecati
        veritatis, debitis provident aliquam ut reprehenderit natus. Pariatur
        enim hic explicabo similique, nisi odit ipsam nulla. Alias
        exercitationem accusantium id deleniti illo delectus sint voluptatem ad
        aliquam, consectetur, aut debitis consequuntur officia aperiam.
        Laudantium delectus dolor ad! Quisquam, repellat incidunt nisi
        repellendus quidem provident illum illo ex, quam ab dicta laudantium
        iste alias, eos corporis iure suscipit pariatur ducimus maiores
        doloremque. Doloremque numquam facilis expedita maxime veritatis ipsum
        asperiores fugiat quas error molestias adipisci, culpa minima provident
        voluptatem laborum quibusdam. Repellendus laborum in, voluptatibus est
        ullam ex quis asperiores temporibus exercitationem inventore tempora
        beatae at omnis eaque neque.
      </p>
    </div>
    <p className='text-[10px] font-bold text-gray-400'>11:54</p>
  </Link>
)
