import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api'
import {Context} from '../context/contextApi'
import VideoCard from './VideoCard'
import LeftNav from './LeftNav'
import { FiHeart } from "react-icons/fi";



const SearchResult = () => {
  const [result, setResult] = useState([]);
  const { searchQuery } = useParams();
  console.log(searchQuery);
  const { setLoading } = useContext(Context);

  useEffect(() => {
    if (searchQuery !== undefined) {
      fetchSearchResults();
    }
  }, [searchQuery]);
  
  

  const fetchSearchResults = () => {
    setLoading(true);
    console.log('jn');
    fetchDataFromApi(`search/?q=${searchQuery}`)
      .then((res) => {
        console.log(res);
        setResult(res?.contents || []);
      })
      .catch((error) => {
        // Handle errors
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="h-[90vh] max-w-[100vw] bg-white flex overflow-hidden">
      <LeftNav />
      <div className=" xl:w-[90vw] lg:w-[90vw] md:w-[90vw] w-[100vw] bg-black flex flex-col">
        <div className="feed max-auto w-full grid sm:grid-cols-1 max-h-[90vh] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center py-3 px-4  align-middle gap-y-9 gap-x-4 overflow-y-scroll overflow-x-hidden">
        {result?.map((item) => {
                        if (item?.type !== "video") return false;
                        let video = item.video;
                        return (
                            <VideoCard
                            key={`item?.video?.videoId${Math.random()}`}
                                video={video}
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

export default SearchResult;
