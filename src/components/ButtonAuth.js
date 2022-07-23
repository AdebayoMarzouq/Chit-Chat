import React from 'react'
export function ButtonAuth({ loading, handleSubmit, name }) {
  return (
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
        name
      )}
    </button>
  )
}
