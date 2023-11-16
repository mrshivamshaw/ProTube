import React, { useContext } from "react";
import LeftNav from "./LeftNav";
import { Context } from "../context/contextApi";
import VideoCard from "./VideoCard";
import { FiHeart } from "react-icons/fi";
import Categories from "./Categories";

const Feed = () => {
  const { searchResults, loading } = useContext(Context);
  return (
    <div className="h-[90vh] max-w-[100vw] bg-white flex overflow-hidden">
      <LeftNav />
      <div className=" xl:w-[90vw] lg:w-[90vw] md:w-[90vw] w-[100vw] bg-black flex flex-col">
        <Categories/>
        <div className="feed max-auto w-full grid sm:grid-cols-1 h-[90vh] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center py-3 px-4  align-middle gap-y-9 gap-x-4 overflow-y-scroll overflow-x-hidden">
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
