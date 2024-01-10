import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api.js";
import { MdDownload } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { AiFillLike, AiFillDislike, AiOutlineEye } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import SuggestionVideoCard from "./SuggestionVideoCard.jsx";
import VideoComments from "./VideoComments.jsx";
import LeftNav from "./LeftNav.jsx";

const VideoDetails = () => {
  const { setLoading,mobileMenu } = useContext(Context);
  const [video, setVideo] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const [comments, setComments] = useState();
  const { id } = useParams();

  useEffect(() => {
    videoDeatails();
    fetchSuggestedVideoDetails();
    fetchVideoComments();
  }, [id]);

  const videoDeatails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      // console.log(res);
      setVideo(res);
    });
    setLoading(false);
  };

  const fetchSuggestedVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      // console.log(res);
      setRelatedVideo(res);
      setLoading(false);
    });
  };

  const fetchVideoComments = () => {
    setLoading(true);
    fetchDataFromApi(`video/comments/?id=${id}`).then((res) => {
      console.log(res);
      setComments(res?.comments);
      console.log(comments);
    });
    setLoading(false);
  };

  return (
<div className={`${mobileMenu ? 'w-[100vw] h-[90vh] bg-black text-white z-10' : 'w-[100vw] h-[90vh] bg-black text-white z-10 overflow-hidden'}`}>
      <div className="block md:hidden lg:hidden xl:hidden ">

      <LeftNav/>
      </div>
      <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row justify-center items-start gap-5 xl:px-10 lg:px-10 px-0 bg-black">
        <div className="feed xl:w-[70vw] lg:w-[70vw] md:w-full w-full h-[90vh] flex flex-col gap-3 py-3 overflow-y-scroll overflow-x-hidden">
          <div className="w-full h-full mx-auto">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
          <div className="text-white text-lg font-semibold px-4">
            {video?.title}
          </div>
          <div className="flex xl:flow-row lg:flex-row md:flex-col flex-col justify-between items-start px-4">
            <div className="flex justify-center items-center gap-3">
              <Link to={`/channel/details/${video?.author?.channelId}`}>
                <div>
                  <img
                    className="h-[5vh] w-auto object-cover rounded-full"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </Link>
              <div>
              <Link to={`/channel/details/${video?.author?.channelId}`}>
                <div>{video?.author?.title}</div></Link>
                <div className="text-xs text-[#d5d5d5] flex flex-col justify-center items-start gap-2">
                  {video?.author?.stats?.subscribersText}
                  <div className="flex justify-center items-center text-lg gap-1">
                    <AiOutlineEye />
                    <span className="text-xs text-white font-semibold">
                      {abbreviateNumber(video?.stats?.views)} views
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-white/20 px-6 py-2 rounded-2xl ">
                <span className="text-sm font-semibold">Subscribe</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold  ">
              <div className="bg-white/20 px-4 py-2 rounded-2xl flex gap-2">
                <button className="">
                  <AiFillLike className="inline mr-2 text-lg" />
                  <span>{abbreviateNumber(video?.stats?.likes)} </span>
                </button>
                <span>|</span>
                <button className="">
                  <AiFillDislike className="inline  mr-2 text-lg" />
                </button>
              </div>
              <button className="bg-white/20 px-4 py-2 rounded-2xl">
                <FaShare className="inline  mr-2 text-lg" />
                <span>Share</span>
              </button>
              <button className="bg-white/20 px-4 py-2 rounded-2xl">
                <MdDownload className="inline  mr-2 text-lg" />
                <span>Download</span>
              </button>
            </div>
          </div>
          <div className="w-full">
            <VideoComments video={video} comments={comments} />
          </div>
        </div>
        <div className="feed h-[90vh] overflow-y-scroll lg:w-[30vw] xl:w-[30vw] w-full pt-3 bg-black">
          {relatedVideo?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
