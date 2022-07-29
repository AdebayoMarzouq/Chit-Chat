import { lazy, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import { ProtectedRoute } from './Protected'
import { useUserContext } from './context'
import { useStoreState, useStoreActions } from 'easy-peasy'

import { useWindowDimensions } from './utils'

import { Sidebar } from './components'

const SignUp = lazy(() => import('./pages/signup/SignUp'))
const Login = lazy(() => import('./pages/login/Login'))
const Home = lazy(() => import('./pages/home/Home'))
const ProfileContainer = lazy(() => import('./pages/profile/ProfileContainer'))
const Profile = lazy(() => import('./pages/profile/Profile'))
const ProfileSettings = lazy(() => import('./pages/profile/ProfileSettings'))
const ProfileEdit = lazy(() => import('./pages/profile/ProfileEdit'))
const UsersContainer = lazy(() => import('./pages/users/UsersContainer'))
const Users = lazy(() => import('./pages/users/Users'))
const UsersDetail = lazy(() => import('./pages/users/UsersDetail'))
const RoomContainer = lazy(() => import('./pages/room/RoomContainer'))
const RoomChat = lazy(() => import('./pages/room/RoomChat'))
const RoomInfo = lazy(() => import('./pages/room/RoomInfo'))
const ChatContainer = lazy(() => import('./pages/chat/ChatContainer'))
const ChatChat = lazy(() => import('./pages/chat/ChatChat'))
const ChatInfo = lazy(() => import('./pages/chat/ChatInfo'))
const Error = lazy(() => import('./pages/Error'))

const App = () => {
  const user = useStoreState((state) => state.user)
  const { width, isOpen, setIsOpen } = useUserContext()

  console.log(width)

  return (
    <main
      className={`grid min-h-screen grid-cols-1 md:flex  ${'theme-orange'}`}
    >
      {user?.uid && (
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          width={width}
          className='fixed md:static'
        />
      )}
      <section className={`flex-grow`}>
        <Suspense fallback={<div className='sub-loading'></div>}>
          <ErrorBoundary fallback={<p>error occured!</p>}>
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
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/settings' element={<ProfileSettings />} />
                <Route
                  path='/profile/settings/edit'
                  element={<ProfileEdit />}
                />
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
                <Route path='/users' element={<Users />} />
                <Route path='/users/:userID' element={<UsersDetail />} />
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
                <Route path='/room/:roomID/' element={<RoomChat />} />
                <Route path='/room/:roomID/info' element={<RoomInfo />} />
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
                <Route path='/chat/:chatID/' element={<ChatChat />} />
                <Route path='/chat/:chatID/settings' element={<ChatInfo />} />
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
