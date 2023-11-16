import React from 'react'
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdShare,MdComment } from 'react-icons/md';
import { abbreviateNumber } from 'js-abbreviation-number';

const ChannelCommunity = ({community}) => {
  return (
    <div className='w-full h-auto flex flex-col gap-9'>
      {
        community?.map((item,index)=>(
          item?.post?.attachment?.type === "images" &&
          <div key={index} className='text-white shadow-md rounded-md shadow-[#2a58a8] w-[80%] mx-auto p-7'>
            <div className='mx-auto flex justify-start items-start gap-3'>
              <img src={item?.post?.author?.avatar[0]?.url} alt="" className='h-[7vh] w-auto rounded-full'/>
              <div className='flex flex-col justify-center items-start gap-3'>
                <div className='flex gap-2 justify-center items-center'>
                  <div className='font-semibold'>
                  {item?.post?.author?.title}
                  </div>
                  <div className='text-xs text-white/50'>
                    {item?.post?.publishedTimeText}
                  </div>
                </div>
                <p className='text-sm font-light text-white/90  '>
                  {item?.post?.text}
                </p>
                <div className='w-full h-auto my-6'>
                  <img src={item?.post?.attachment?.images[0]?.source[0]?.url} alt="gg" className='w-[70%]  rounded-md'/>
                </div>
                <div className='flex justify-center items-center gap-4 text-lg'>
                  <div className='cursor-pointer flex justify-center items-center gap-1'><AiFillLike className='inline'/><span className='text-xs text-white/50 '>{abbreviateNumber(item?.post?.stats?.likes)}</span></div>
                  <div className='cursor-pointer'><AiFillDislike/></div>
                  <div className='cursor-pointer'><MdShare/></div>
                  <div className='cursor-pointer flex justify-center items-center gap-1 '><MdComment className='inline'/><span className='text-xs text-white/50'>{abbreviateNumber(item?.post?.stats?.comments)}</span></div>
                </div>
              </div>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default ChannelCommunity