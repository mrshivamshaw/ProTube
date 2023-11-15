import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api.js";
import { AiOutlineLike, AiFillEye } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import SuggestionVideoCard from "./SuggestionVideoCard.jsx";

const VideoDetails = () => {
  const { setLoading } = useContext(Context);
  const [video, setVideo] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const { id } = useParams();

  useEffect(() => {
    videoDeatails();
    fetchSuggestedVideoDetails();
  }, [id]);

  const videoDeatails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchSuggestedVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideo(res);
      setLoading(false);
    });
  };

  return (
    <div className="max-w-[100vw] h-[90vh] bg-black text-white ">
      <div className="flex justify-center items-start gap-5 px-10">
        <div className="w-[65vw] h-[65vh] flex flex-col gap-3 pt-3">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            width="100%"
            height="100%"
            controls={true}
            style={{ borderRadius: "25%",width:"70vw",height:"40vh" }}
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
            </div>
            <div className="flex gap-2 text-xs font-semibold">
              <button className="bg-white/20 px-8 py-2 rounded-2xl text-center ">
                <AiOutlineLike className="inline mr-2 text-lg" />
                <span>{abbreviateNumber(video?.stats?.likes)} Likes</span>
              </button>
              <button className="bg-white/20 px-8 py-2 rounded-2xl ">
                <AiFillEye className="inline  mr-2 text-lg" />
                <span>{abbreviateNumber(video?.stats?.views)} views</span>
              </button>
            </div>
          </div>
        </div>
        <div className="feed h-[90vh] overflow-y-scroll w-[45vw] pt-3">
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
