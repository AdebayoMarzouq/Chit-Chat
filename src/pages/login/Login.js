import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { useMyAuthState } from '../../firebase/firebaseUtils'

import { ReactComponent } from '../../assets/chat-conversation-svgrepo-com.svg'

import { Button } from '../../components/Button'
import { ButtonAuth as LoginButton } from '../../components/ButtonAuth'
import { login } from '../../firebase/firebaseUtils'

const Login = () => {
  const [, , status, setStatus] = useMyAuthState()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = () => {
    setStatus((prev) => {
      return { ...prev, loading: true }
    })
    if (!emailRef.current.value || !passwordRef.current.value) {
      // Error Notification here
      return
    }
    login(emailRef.current.value, passwordRef.current.value)
  }
  const handleGoogleAuth = () => {}

  return (
    <main className='flex flex-col items-center min-h-screen px-4 py-8 border-x min'>
      <div className='flex flex-col items-center mb-4 space-y-8'>
        <ReactComponent
          className={`fill-light-main h-32 w-32 drop-shadow-sm`}
        />
        <h2 className={`text-light-main text-4xl font-bold`}>ChitChat</h2>
      </div>
      <form
        className='flex flex-col w-full px-4 pt-4 pb-2 space-y-8 sm:w-1/2'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='h-12'>
          <input type='email' ref={emailRef} placeholder='yourmail@gmail.com' />
        </div>
        <div className='h-12'>
          <input type='password' ref={passwordRef} placeholder='Password' />
        </div>
        <LoginButton
          loading={status.loading}
          handleSubmit={handleSubmit}
          name={'Sign in'}
        />
      </form>
      <p className={`text-xl text-light-main mb-2`}>or</p>
      <Button handleClick={handleGoogleAuth} name='Sign in with Google' />
      <div className='mt-2 text-sm text-light-text'>
        <p>
          Don't have an account?{' '}
          <Link to='/signup' className={`underline text-light-main`}>
            Sign up
          </Link>
        </p>
        <p>
          Forgot password?{' '}
          <a href='/' className={`underline text-light-main`}>
            click here
          </a>
        </p>
      </div>
    </main>
  )
}

export default Login
