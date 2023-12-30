import React, { useContext } from 'react'
import { Context } from '../context/contextApi'
import VideoCard from './VideoCard'
import ChannelVideoCard from './ChannelVideoCard'

const ChannelVideo = ({videos,avatar}) => {
    const {loading} = useContext(Context)
  return (
    <div className="w-full grid grid-cols-1 h-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center py-3 gap-y-9 gap-x-4 ">
    {
      
      videos.map((video)=>(
        <ChannelVideoCard videoo={video} avatar ={avatar} key={`item?.video?.videoId${Math.random()}`}/>
      ))
    }
    
  </div>
  )
}

export default ChannelVideo