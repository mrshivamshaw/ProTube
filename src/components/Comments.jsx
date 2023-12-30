import React from 'react'
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";

const Comments = ({comments,video}) => {
  return (
    <div className=' flex flex-col justify-start items-start gap-5'>
        {comments?.map((comment) => (
        <div className="flex justify-center items-start gap-3 ">
          <Link to={`/channel/details/${video?.author?.channelId}`}>
            <div className="h-5vh w-auto ">
              <img
                src={comment?.author?.avatar[0]?.url}
                alt="avatar"
                className="h-[5vh] w-full object-cover rounded-full"
              />
            </div>
          </Link>
          <div className="flex flex-col justify-start items-start w-[96%]">
            <div className="flex gap-2 justify-center items-center">
              <span className="text-base">{comment?.author?.title}</span>
              <span className="text-sm text-white/70">
                {comment.publishedTimeText}
              </span>
            </div>
            <p className="text-[.9rem] ">{comment?.content}</p>
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <button>
                <AiFillLike className="inline mr-2 text-sm" />
                <span className="text-sm text-white/70">
                  {abbreviateNumber(comment?.stats?.votes)}{" "}
                </span>
              </button>
              <button>
                <AiFillDislike className="inline  mr-2 text-sm" />
              </button>
              <div className="text-sm text-white/70">
                {comment?.stats?.replies} reply
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments