import { lazy, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import { ProtectedRoute } from './Protected'
import { useUserContext } from './context'
import { useStoreState } from 'easy-peasy'

import { ErrorFallback, Sidebar } from './components'

const SignUp = lazy(() => import('./pages/signup/SignUp'))
const Login = lazy(() => import('./pages/login/Login'))
const Home = lazy(() => import('./pages/home/Home'))
const ProfileContainer = lazy(() => import('./pages/profile/ProfileContainer'))
const Profile = lazy(() => import('./pages/profile/Profile'))
// const ProfileSettings = lazy(() => import('./pages/profile/ProfileSettings'))
const ProfileEdit = lazy(() => import('./pages/profile/ProfileEdit'))
const UsersContainer = lazy(() => import('./pages/users/UsersContainer'))
const Users = lazy(() => import('./pages/users/Users'))
const UsersDetail = lazy(() => import('./pages/users/UsersDetail'))
const RoomContainer = lazy(() => import('./pages/room/RoomContainer'))
const RoomChat = lazy(() => import('./pages/room/RoomChat'))
const RoomInfo = lazy(() => import('./pages/room/RoomInfo'))
const UserCardPage = lazy(() => import('./pages/room/UserCardPage'))
const ChatContainer = lazy(() => import('./pages/chat/ChatContainer'))
const ChatChat = lazy(() => import('./pages/chat/ChatChat'))
const ChatInfo = lazy(() => import('./pages/chat/ChatInfo'))
const Error = lazy(() => import('./pages/Error'))

const App = () => {
  const [resetApp, setResetApp] = useState(false)
  const user = useStoreState((state) => state.user)
  const { theme, closeNav, width, isOpen, setIsOpen } = useUserContext()

  return (
    <main
      className={`max-w-5xl mx-auto overflow-x-hidden h-screen w-screen ${theme} bg-light-bg dark:bg-dark-bg sm:border-r border-neutral-200 dark:border-[#404040]`}
    >
      {user?.uid && (
        <Sidebar
          closeNav={closeNav}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          width={width}
          className='fixed'
        />
      )}
      <section className={`overflow-y-auto ${user && 'sm:ml-[288px]'}`}>
        <Suspense fallback={<div className='sub-loading'></div>}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              setResetApp((x) => !x)
            }}
            resetKeys={[resetApp]}
          >
            <Routes>
              {/* login */}
              <Route path='/login' element={<Login />} />
              {/* sign up */}
              <Route path='/signup' element={<SignUp />} />
              {/* home */}
              <Route
                path='/'
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              >
                <Route path='/' element={<Home />} />
                <Route path='/rooms' element={<Home />} />
              </Route>
              {/* logged in user profile */}
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <ProfileContainer />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Profile />} />
                {/* <Route path='/profile/settings' element={<ProfileSettings />} /> */}
                <Route path='edit' element={<ProfileEdit />} />
              </Route>
              {/* users */}
              <Route
                path='/users'
                element={
                  <ProtectedRoute>
                    <UsersContainer />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Users />} />
                <Route path=':userID' element={<UsersDetail />} />
              </Route>
              {/* room */}
              <Route
                path='/room/:roomID'
                element={
                  <ProtectedRoute user={user}>
                    <RoomContainer />
                  </ProtectedRoute>
                }
              >
                <Route index element={<RoomChat />} />
                <Route path='info' element={<RoomInfo />} />
                <Route path=':userID/info' element={<UserCardPage />} />
              </Route>
              {/* chat */}
              <Route
                path='/chat/:chatID'
                element={
                  <ProtectedRoute user={user}>
                    <ChatContainer />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ChatChat />} />
                <Route path='info' element={<ChatInfo />} />
              </Route>
              <Route path='*' element={<Error />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </section>
    </main>
  )
}

export default App
