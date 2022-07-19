import React from 'react'
export function Button({ handleClick, name }) {
  return (
    <button
      className={`bg-light-main rounded-full py-2 px-4 text-white w-2/3`}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}
