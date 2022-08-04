import React from 'react'
export function ButtonAuth({ error, loading, handleSubmit, name }) {
  return (
    <button
      className={`bg-light-main rounded-full py-2 px-4 text-white w-1/2 self-center ${
        loading && 'cursor-wait'
      }`}
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? (
        <div className='flex items-center justify-around space-x-1'>
          <div className='button-loading'></div>
        </div>
      ) : (
        name
      )}
    </button>
  )
}
