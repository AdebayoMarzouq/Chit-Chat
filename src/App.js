import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ProtectedRoute } from './Protected'
import 'react-toastify/dist/ReactToastify.min.css'

const SignUp = lazy(() => import('./pages/signup/SignUp'))
const Login = lazy(() => import('./pages/login/Login'))
const Home = lazy(() => import('./pages/home/Home'))

const App = () => {
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <ErrorBoundary fallback={<p>error occured!</p>}>
        <Routes>
          {/* login */}
          <Route path='/login' element={<Login />} />
          {/* sign up */}
          <Route path='/signup' element={<SignUp />} />
          {/* home */}
          <Route
            index
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
