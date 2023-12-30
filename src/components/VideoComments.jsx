import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";
import Comments from "./Comments";

const VideoComments = ({video,comments}) => {
  return (
    <div className="w-full h-[10vh] flex flex-col py-10 gap-6 text-white ">
      <div className="xl:block lg:block md:hidden hidden ">
        <h1 className="bg-white/20 px-2 py-2 rounded-2xl text-center w-[10vw] h-auto mb-8">
          comments...
        </h1>
        <Comments comments={comments} video = {video}/>
      </div>
      <details className="xl:hidden lg:hidden md:block block px-2">
        <summary>comments...</summary>
      
        <Comments comments={comments} video = {video}/>
      </details>
    </div>
  );
};

export default VideoComments;
