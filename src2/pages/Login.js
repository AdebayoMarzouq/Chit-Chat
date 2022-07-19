import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent } from '../chat-conversation-svgrepo-com.svg'
import { useAppContext } from '../context'

const Login = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { authenticateUser, loading } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    authenticateUser('login', emailRef.current.value, passwordRef.current.value)
  }

  const handleGoogleAuth = () => {}

  return (
    <main className='flex flex-col items-center px-4 py-8'>
      <div className='space-y-8 flex flex-col items-center mb-4'>
        <ReactComponent className='fill-light-main h-32 w-32 drop-shadow-md' />
        <h2 className='text-light-main text-4xl font-bold'>ChitChat</h2>
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
        <button
          className={`bg-light-main rounded-full py-2 px-4 text-white w-1/2 self-center ${
            loading && 'cursor-wait'
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className='flex space-x-1 justify-around items-center'>
              <div className='button-loading'></div>
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
      <p className='text-xl text-light-main mb-2'>or</p>
      <button
        className='bg-light-main rounded-full py-2 px-4 text-white w-2/3'
        onClick={handleGoogleAuth}
      >
        Sign in with Google
      </button>
      <div className='text-light-text text-sm mt-2'>
        <p>
          Don't have an account?{' '}
          <Link to='/signup' className='underline text-light-main'>
            Sign up
          </Link>
        </p>
        <p>
          Forgot password?{' '}
          <a href='/' className='underline text-light-main'>
            click here
          </a>
        </p>
      </div>
    </main>
  )
}

export default Login
