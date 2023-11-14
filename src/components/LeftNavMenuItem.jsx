import React from 'react'

const LeftNavMenuItem = ({type,icon,action,className}) => {
  return (
    <div className={`text-white/75 flex gap-2 py-2 pl-4 cursor-pointer justify-start items-baseline ${className} rounded-md hover:bg-white/20`} onClick={action}>
      <div>{icon}</div>
      <span className='text-[14px] font-thin'>{type}</span>
    </div>
  )
}

export default LeftNavMenuItem