import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { useMyAuthState } from '../../firebase/firebaseUtils'

import { ReactComponent } from '../../assets/chat-conversation-svgrepo-com.svg'

import { auth } from '../../firebase/firebase'
import { login } from '../../firebase/firebaseUtils'
import { Button } from '../../components/Button'
import { ButtonAuth as LoginButton } from '../../components/ButtonAuth'

const Login = () => {
  const [, loading, error] = useMyAuthState(auth)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      // Error Notification here
      return
    }
    login(emailRef.current.value, passwordRef.current.value)
  }
  const handleGoogleAuth = () => {}
  if (error) {
    // return Some Error messsage
    return <div>Error</div>
  }

  return (
    <main className='min-h-screen flex flex-col items-center px-4 py-8'>
      <div className='space-y-8 flex flex-col items-center mb-4'>
        <ReactComponent
          className={`fill-light-main h-32 w-32 drop-shadow-md`}
        />
        <h2 className={`text-light-main text-4xl font-bold`}>ChitChat</h2>
      </div>
      <form
        className='flex flex-col px-4 pt-4 pb-2 space-y-8 w-full'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='h-12'>
          <input type='email' ref={emailRef} placeholder='yourmail@gmail.com' />
        </div>
        <div className='h-12'>
          <input type='password' ref={passwordRef} placeholder='Password' />
        </div>
        <LoginButton
          loading={loading}
          handleSubmit={handleSubmit}
          name={'Sign in'}
        />
      </form>
      <p className={`text-xl text-light-main mb-2`}>or</p>
      <Button handleClick={handleGoogleAuth} name='Sign in with Google' />
      <div className='text-light-text text-sm mt-2'>
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
