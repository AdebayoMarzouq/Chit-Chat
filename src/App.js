import { Routes, Route } from 'react-router-dom'
import {
  Login,
  Signup,
  Home,
  Chatroom,
  Chatgroup,
  Profile,
  Profilepage,
  Profilesettings,
  Editprofile,
  Alertstyle,
  Chatsettings,
  Chatpage,
  Groupsettings,
  Grouppage,
  Usercontainer,
  Users,
  Userdetail,
} from './pages'
import { ProtectedRoute } from './Protected'
import { useAppContext } from './context'

import 'react-toastify/dist/ReactToastify.min.css'

const App = () => {
  const { user } = useAppContext()
  // Remember to add netlify domain to firebase settings
  // add a redirect file for netlify
  // Add goggle auth later and forgot password feature
  // Write database rules in firebase console
  // create 404 page
  // Set all firebase configs in env vars
  // Handle deletions by changing message text to 'this message was deleted'
  // Add all error notifcation and action alerts
  // Add online or offline status colors and logic ** search how to track user in focus events for away status
  // Optimize app by watching renders and also cache chat data and limit re-renders
  // Hide group link from non-creator according to user settings
  // Separate out commot components between rooms and chats
  // Handle profile views by user and other viewers **
  // Assign user avatar during signup and allow users change avatar in settings

  return (
    <Routes>
      {/* login */}
      <Route path='/login' element={<Login />} />
      {/* sign up */}
      <Route path='/signup' element={<Signup />} />
      {/* home */}
      <Route
        index
        path='/'
        element={
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* chat */}
      <Route
        path='/chat/:chatID'
        element={
          <ProtectedRoute user={user}>
            <Chatroom />
          </ProtectedRoute>
        }
      >
        <Route
          path='/chat/:chatID/'
          element={
            <ProtectedRoute user={user}>
              <Chatpage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/chat/:chatID/settings'
          element={
            <ProtectedRoute user={user}>
              <Chatsettings />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* room */}
      <Route
        path='/room/:roomID'
        element={
          <ProtectedRoute user={user}>
            <Chatgroup />
          </ProtectedRoute>
        }
      >
        <Route
          path='/room/:roomID/'
          element={
            <ProtectedRoute user={user}>
              <Grouppage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/room/:roomID/settings'
          element={
            <ProtectedRoute user={user}>
              <Groupsettings />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* users */}
      <Route
        path='/users'
        element={
          <ProtectedRoute user={user}>
            <Usercontainer />
          </ProtectedRoute>
        }
      >
        <Route
          path='/users'
          element={
            <ProtectedRoute user={user}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path='/users/:userID/'
          element={
            <ProtectedRoute user={user}>
              <Userdetail />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* logged in user profile */}
      <Route
        path='/profile'
        element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>
        }
      >
        <Route
          path='/profile'
          element={
            <ProtectedRoute user={user}>
              <Profilepage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/settings'
          element={
            <ProtectedRoute user={user}>
              <Profilesettings />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/settings/edit'
          element={
            <ProtectedRoute user={user}>
              <Editprofile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/settings/alert'
          element={
            <ProtectedRoute user={user}>
              <Alertstyle />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='*' element={<p>Error</p>} />
    </Routes>
  )
}

export default App
