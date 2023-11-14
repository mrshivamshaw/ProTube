import React, { useContext } from 'react'
import LeftNavMenuItem from './LeftNavMenuItem'
import { Context } from '../context/contextApi';
import { useNavigate } from 'react-router-dom';

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle,FiHeart } from "react-icons/fi";


const categories = [
    { name: "New", icon: <AiFillHome />, type: "home" },
    { name: "Trending", icon: <MdLocalFireDepartment />, type: "category" },
    { name: "Music", icon: <CgMusicNote />, type: "category" },
    { name: "Films", icon: <FiFilm />, type: "category" },
    { name: "Live", icon: <MdLiveTv />, type: "category" },
    { name: "Gaming", icon: <IoGameControllerSharp />, type: "category" },
    { name: "News", icon: <ImNewspaper />, type: "category" },
    { name: "Sports", icon: <GiDiamondTrophy />, type: "category" },
    { name: "Learning", icon: <RiLightbulbLine />, type: "category" },
    {
        name: "Fashion & beauty",
        icon: <GiEclipse />,
        type: "category",
        divider: true,
    },
    { name: "Settings", icon: <FiSettings />, type: "menu" },
    { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
    { name: "Help", icon: <FiHelpCircle />, type: "menu" },
    { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
];

const LeftNav = () => {
  const {selectedCategory,setSelectedCategory} = useContext(Context)
  const navigate = useNavigate()

  const clickHandler = (name,type) =>{
    switch (type) {
      case "home":
        return setSelectedCategory(name)
      case "category":
        return setSelectedCategory(name)
      case "menu":
        return false
      default:
        break
    }
  }


  return (
    <div className='hidden lg:block md:block xl:block h-full bg-black w-[10vw]'>
      <div className='py-3 flex flex-col '>
        {categories.map((item) =>{
          return(
            <React.Fragment
            key={item.name}>
            <LeftNavMenuItem
              type = {item.type === 'New'? "home" : item.name}
              icon = {item.icon}
              action = {()=>{
                clickHandler(item.name,item.type)
                navigate('/')
              }}
              className = {selectedCategory === `${item.name}` ? "bg-white/20":""}
            />
            {item.divider && <hr className='border-[#2a58a8]'/>}
            </React.Fragment>)
        })}
        <hr className='border-[#2a58a8]'/>
      </div>
    </div>
  )
}

export default LeftNav