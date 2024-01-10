import React, { useContext } from "react";
import LeftNav from "./LeftNav";
import { Context } from "../context/contextApi";
import VideoCard from "./VideoCard";
import { FiHeart } from "react-icons/fi";
import Categories from "./Categories";

const Feed = () => {
  const { searchResults, loading } = useContext(Context);
  return (
    <div className="realtive h-[90vh] max-w-[100vw] flex overflow-hidden">
      <LeftNav />
      <div className=" xl:w-[85vw] lg:w-[85vw] md:w-[85vw] w-[100vw] bg-black flex flex-col ">
        <Categories/>
        <div className="feed max-auto w-full flex flex-wrap h-[90vh]  justify-center py-3   items-center gap-5 overflow-y-scroll overflow-x-hidden">
          {!loading &&
            searchResults.map((item) => {
              if (item.type !== "video") return false;
              return (
                <VideoCard
                  key={`item?.video?.videoId${Math.random()}`}
                  video={item?.video}
                />
              );
            })}
        </div>
        <div className="text-white/75 py-3 text-md font-bold bg-black text-center border-t-[1px] rounded-lg border-[#2a58a8] sticky bottom-0">
          Made by SHIVAM with Love
          <FiHeart className="inline ml-1 fill-red-500" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Feed;
