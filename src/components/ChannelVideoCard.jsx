import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import VideoLength from "./VideoLength";
import { Link } from "react-router-dom";

const ChannelVideoCard = ({ videoo,avatar }) => {
  const video = videoo.video
  return (
    
    <Link to={`/video/${video?.videoId}`}>
      <div className="text-white flex flex-col justify-start items-start h-auto  w-auto rounded-lg gap-2 overflow-hidden">
        <div className="h-auto w-full flex items-center justify-center relative">
          <img
            src={video.thumbnails[2].url}
            alt="jn"
            className="xl:h-[24vh] lg:h-[28vh] md:h-[28vh] h-[32vh] w-full rounded-md"
          />
          <div className="">
            {video?.lengthSeconds ? (
              <span>
                <VideoLength time={video?.lengthSeconds} />
              </span>
            ) : (
              <div className="text-xs bg-[#f43d3d] absolute text-white py-[1px] bottom-1 right-2 px-4 rounded-sm">
                Live
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-start gap-2 px-2">
          <Link to={`/channel/details/${video?.author?.channelId}`}>
                <div>
                    <img
                    src={avatar}
                    alt="autho"
                    className="w-8 h-8 rounded-full"
                    />
                </div>
            </Link>
          <div className="flex flex-col gap-1 truncate">
            <p className="text-[13px] flex flex-wrap">{video?.title}</p>
            <p className="text-[12px] text-white/75">{video?.author?.title}</p>
            <p className="text-[12px] text-white/75">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span> ●  
              <span> {video.publishedTimeText}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
    
  );
};

export default ChannelVideoCard;
