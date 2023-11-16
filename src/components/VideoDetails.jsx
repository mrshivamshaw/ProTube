import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api.js";
import { MdDownload } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import SuggestionVideoCard from "./SuggestionVideoCard.jsx";

const VideoDetails = () => {
  const { setLoading } = useContext(Context);
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
      setLoading(false);
    });
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
    <div className="max-w-[100vw] h-[90vh] bg-black text-white ">
      <div className="flex justify-center items-start gap-5 px-10 ">
        <div className="feed w-[70vw] h-[90vh] flex flex-col gap-3 py-3 overflow-y-scroll ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            width="100%"
            height="100%"
            controls={true}
          />
          <div className="text-white text-lg font-semibold">{video?.title}</div>
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-3">
              <div>
                <img
                  className="h-[5vh] w-auto object-cover rounded-full"
                  src={video?.author?.avatar[0]?.url}
                />
              </div>
              <div>
                <div>{video?.author?.title}</div>
                <div className="text-xs text-[#d5d5d5]">
                  {video?.author?.stats?.subscribersText}
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
                  <span>{abbreviateNumber(video?.stats?.views)} </span>
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
          {/* <div className="feed rounded-xl text-sm font-light h-[50vh] bg-white/20 overflow-y-scroll">
            {video?.description}
          </div> */}
          <div className="w-full h-[10vh] flex flex-col py-10 gap-6 text-white ">
            <h1 className="bg-white/20 px-2 py-2 rounded-2xl text-center w-[10vw] h-auto">comments...</h1>
            {comments?.map((comment) => (
              <div className="flex justify-center items-start gap-3 ">
                <div className="h-5vh w-[4%] ">
                  <img
                    src={comment?.author?.avatar[0]?.url}
                    alt="avatar"
                    className="h-[5vh] w-auto object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-[96%]">
                  <div className="flex gap-2 justify-center items-center">
                    <span className="text-base">{comment?.author?.title}</span>
                    <span className="text-sm text-white/70">{comment.publishedTimeText}</span>
                  </div>
                  <p className="text-[.9rem] ">{comment?.content}</p>
                  <div className="flex justify-center items-center gap-3 flex-wrap">
                    <button>
                      <AiFillLike className="inline mr-2 text-sm" />
                      <span className="text-sm text-white/70">{abbreviateNumber(comment?.stats?.votes)} </span>
                    </button>
                    <button >
                      <AiFillDislike className="inline  mr-2 text-sm" />
                    </button>
                    <div className="text-sm text-white/70">{comment?.stats?.replies}reply</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-black text-black">heeloo</div>
          </div>
        </div>
        <div className="feed h-[90vh] overflow-y-scroll w-[30vw] pt-3">
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
