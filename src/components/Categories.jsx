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
    <div className="scroll-container overflow-y-hidden h-[8vh] w-full flex gap-4 overflow-x-scroll cursor-pointer px-4 py-3 ">
      {keywords.map((item, index) => (
        <span
        onClick={()=>clickHandler(item)}
          key={index}
          className={activeCategory === item ? "active flex font-medium items-center justify-center border border-[#2a58a8] text-center rounded-2xl py-2 px-3 w-auto bg-[#2a58a8] text-black transition-all duration-500" : "flex font-medium text-white items-center justify-center border border-[#0101ff] text-center rounded-2xl py-2 px-3 w-auto"}
          style={{ whiteSpace: "nowrap" }}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Categories;
