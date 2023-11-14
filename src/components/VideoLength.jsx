import React from 'react'
import moment from 'moment'

const VideoLength = ({time}) => {
    const length = moment()?.startOf('day')?.seconds(time)?.format("H:mm:ss")
  return (
    <div className='text-[10px] bg-black absolute text-white py-1 bottom-1 right-2 px-2 rounded-md'>
        {length}
    </div>
  )
}

export default VideoLength