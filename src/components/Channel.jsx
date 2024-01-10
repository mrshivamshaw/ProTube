import React, { useContext, useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import Categories from "./Categories";
import { FiHeart } from "react-icons/fi";
import { Context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import ChannelVideo from "./ChannelVideo";
import ChannelPlaylist from "./ChannelPlaylist";
import ChannelCommunity from "./ChannelCommunity";
import { abbreviateNumber } from "js-abbreviation-number";

const Channel = () => {
  const { loading, setLoading } = useContext(Context);
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelPlaylist, setChannelPlaylist] = useState();
  const [channelCommunity, setChannelCommunity] = useState();
  const [channelcategory, setChannelCategory] = useState("videos");

  useEffect(() => {
    fetchChannelDetails();
    fetchVideoSection();
    fetchChannelCommunity();
    fetchChannelPlaylist();
  }, [id]);

  const fetchChannelDetails = () => {
    setLoading(true);
    fetchDataFromApi(`channel/details/?id=${id}`)?.then((res) => {
      setChannel(res);
      console.log("channel", res);
    });
    setLoading(false);
  };

  const fetchVideoSection = () => {
    setLoading(true);
    fetchDataFromApi(`channel/videos/?id=${id}`).then((res) => {
      setVideos(res.contents);
      console.log("channelvideo", res.contents);
      console.log("jj");
    });
    setLoading(false);
  };
  const fetchChannelPlaylist = () => {
    setLoading(true);
    fetchDataFromApi(`channel/playlists/?id=${id}`).then((res) => {
      setChannelPlaylist(res?.collections);
      console.log("channelPlaylist", res);
    });
    setLoading(false);
  };
  const fetchChannelCommunity = () => {
    setLoading(true);
    fetchDataFromApi(`channel/community/?id=${id}`).then((res) => {
      setChannelCommunity(res.contents);
      console.log("ChannelCommunity", res.contents);
    });
    setLoading(false);
  };

  return (
    <div className="h-[90vh] max-w-[100vw] bg-white flex overflow-hidden">
      <LeftNav />
      <div className=" xl:w-[85vw] h-[90vh] lg:w-[85vw] md:w-[85vw] w-[100vw] bg-black flex flex-col ">
        <Categories />
        <div className="feed pt-6 mx-auto w-full text-white h-[82vh] gap-4 flex flex-col items-center justify-start py-3 xl:px-4 lg:px-4 md:px-4 px-0 overflow-y-scroll overflow-x-hidden">
          {!loading && (
            <>
              <div className="w-full h-[20vh]">
                <img
                  src={channel?.banner?.desktop[0]?.url}
                  alt="banner"
                  className="w-[90%] h-[20vh] rounded-3xl mx-auto"
                />
              </div>
              <div className="flex xl:flex-row lg:flex-row md:flex-col flex-col justify-center items-start gap-3 w-[90%] mx-auto mt-10">
                <img
                  src={channel?.avatar[0]?.url}
                  alt="avatar"
                  className="h-[16vh] w-auto rounded-full"
                />
                {/* <Link to={`/channel/details/${video?.author?.channelId}`}>
                </Link> */}
                <div className="flex flex-col gap-1 items-start">
                  <h1 className="font-semibold text-2xl">{channel?.title}</h1>
                  <div>
                    <span className="text-sm text-white/75">
                      {channel?.stats.subscribersText} ●{" "}
                    </span>
                    <span className="text-sm text-white/75">
                      {abbreviateNumber(channel?.stats?.views)}
                    </span>
                  </div>
                  <div className="text-sm font-thin text-white/90 line-clamp-5">
                    {channel?.description}
                  </div>
                  <div>
                    <a href={channel?.links[2]?.targetUrl}></a>
                  </div>
                  <button className="bg-[#2a58a8] px-4 py-2 rounded-3xl">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="w-[50%] flex justify-center items-center gap-3 mx-auto">
                <span
                  className={
                    channelcategory === "videos"
                      ? "border-b-2 border-[#2a58a8] pb-2 cursor-pointer"
                      : "pb-2 cursor-pointer text-white/40"
                  }
                  onClick={() => setChannelCategory("videos")}
                >
                  Videos
                </span>
                <span
                  className={
                    channelcategory === "playlist"
                      ? "border-b-2 border-[#2a58a8] pb-2 cursor-pointer"
                      : "pb-2 cursor-pointer text-white/40"
                  }
                  onClick={() => setChannelCategory("playlist")}
                >
                  Playlist
                </span>
                <span
                  className={
                    channelcategory === "community"
                      ? "border-b-2 border-[#2a58a8] pb-2 cursor-pointer"
                      : "pb-2 cursor-pointer text-white/40"
                  }
                  onClick={() => setChannelCategory("community")}
                >
                  Community
                </span>
              </div>
              <hr />

              {channelcategory === "videos" ? (
                <ChannelVideo
                  videos={videos}
                  avatar={channel?.avatar[0]?.url}
                />
              ) : channelcategory === "playlist" ? (
                <ChannelPlaylist playlist={channelPlaylist} />
              ) : (
                <ChannelCommunity community={channelCommunity} />
              )}
            </>
          )}
        </div>
        <div className="text-white/75 py-3 text-md font-bold bg-black text-center border-t-[1px] rounded-lg border-[#2a58a8] sticky bottom-0">
          Made by SHIVAM with Love
          <FiHeart className="inline ml-1 fill-red-500" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Channel;
