import { useRef } from 'react'
import { ReactComponent } from '../chat-conversation-svgrepo-com.svg'
import { useAppContext } from '../context'
import { toast } from 'react-toastify'

const Signup = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmRef = useRef(null)
  const { authenticateUser, loading, dispatch, errorNotify } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== confirmRef.current.value) {
      //Set error notifivation here
      dispatch({
        type: 'ERROR',
        payload: { show: true, msg: "Passwords don't match" },
      })
      errorNotify(toast.error, "Passwords don't match")
      console.log("passwords don't match")
      return
    }
    authenticateUser(
      'signup',
      emailRef.current.value,
      passwordRef.current.value
    )
  }

  return (
    <main className='flex flex-col items-center px-4 py-8'>
      <div className='space-y-8 flex flex-col items-center mb-4'>
        <ReactComponent className='fill-[#3ed7ee] h-32 w-32 drop-shadow-md' />
        <h2 className='text-[#3ed7ee] text-4xl font-bold'>ChitChat</h2>
      </div>
      <form
        className='flex flex-col px-4 pt-4 pb-2 space-y-8 w-full'
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className='h-12'>
          <input type='email' placeholder='yourmail@gmail.com' ref={emailRef} />
        </div>
        <div className='h-12'>
          <input type='password' placeholder='Password' ref={passwordRef} />
        </div>
        <div className='h-12'>
          <input
            type='password'
            placeholder='Confirm password'
            ref={confirmRef}
          />
        </div>
        <button
          className={`bg-[#3ed7ee] rounded-full py-2 px-4 text-white w-1/2 self-center ${
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
            'Sign up'
          )}
        </button>
      </form>
    </main>
  )
}

export default Signup
