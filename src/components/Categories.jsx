import React, { useState } from "react";
import "./categories.css";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const keywords = [
    "All",

    "React js",

    "Angular js",

    "React Native",

    "use of API",

    "Redux",

    "Music",

    "Algorithm Art",

    "Guitar",

    "Bengali Songs",

    "Coding",

    "Cricket",

    "Football",

    "Real Madrid",

    "Gatsby",

    "Poor Coder",

    "Shwetabh",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate()
  const clickHandler = (item) => {
    setActiveCategory(item);
    if(item === "All")
        navigate(`/`)
    else
        navigate(`/searchResult/${item}`)
  };
  return (
    <div className="flex justify-center items-center xl:h-[8vh] lg:h-[8vh] md:h-[8vh] h-[10vh]">
      <div className="scroll-container overflow-y-hidden  w-[95vw] flex gap-4 overflow-x-scroll cursor-pointer px-4 py-4 xl:py-3 md:py-3 lg:py-3 ">
        {keywords.map((item, index) => (
          <span
          onClick={()=>clickHandler(item)}
            key={index}
            className={activeCategory === item ? "active flex font-medium items-center justify-center border border-[#2a58a8] text-center rounded-3xl py-2 px-3 w-auto bg-[#2a58a8] text-black transition-all duration-500" : "flex font-medium text-white items-center justify-center border border-[#0101ff] text-center rounded-3xl py-2 px-3 w-auto"}
            style={{ whiteSpace: "nowrap" }}
          >
            {item}
          </span>
        ))}
      </div>
      <div className=" w-[5vw] text-center rounded-full  pt-2 border-2 border-black border-l-[#2a58a8] h-[80%]  text-xl"></div>
    </div>
  );
};

export default Categories;
