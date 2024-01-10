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
  const {selectedCategory,setSelectedCategory,mobileMenu} = useContext(Context)
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

  const itemHandler = (name) =>{
    if(name === 'New')
      navigate(`/`);
    else
    navigate(`/searchResult/${name}`);
  }

  return (
    <>
      <div className='hidden lg:block md:block z-50 border-[#2a58a8] border-r-[1px] xl:block h-full bg-black w-[15vw]'>
        <div className='py-3 flex flex-col '>
          {categories.map((item) =>{
            return(
              <React.Fragment
              key={item.name}>
              <LeftNavMenuItem
                type = {item.type === 'New'? "home" : item.name}
                icon = {item.icon}
                action = {()=>{
                  clickHandler(item.name,item.type);
                  if(item.type !== 'menu')
                    itemHandler(item.name)
                }}
                className = {selectedCategory === `${item.name}` ? "bg-white/20":""}
              />
              {item.divider && <hr className='border-[#2a58a8]'/>}
              </React.Fragment>)
          })}
          <hr className='border-[#2a58a8]'/>
        </div>
      </div>
      {
        !mobileMenu && 
      <div className='block absolute z-50 xl:hidden md:hidden lg:hidden border-[#2a58a8] border-r-[1px]  bg-black w-[100vw] h-[90vh] '>
        <div className='py-3 flex flex-col overflow-y-hidden'>
          {categories.map((item) =>{
            return(
              <React.Fragment
              key={item.name}>
              <LeftNavMenuItem
                type = {item.type === 'New'? "home" : item.name}
                icon = {item.icon}
                action = {()=>{
                  clickHandler(item.name,item.type);
                  if(item.type !== 'menu')
                    itemHandler(item.name)
                }}
                className = {selectedCategory === `${item.name}` ? "bg-white/20 text-white":""}
              />
              {item.divider && <hr className='border-[#2a58a8]'/>}
              </React.Fragment>)
          })}
          <hr className='border-[#2a58a8]'/>
        </div>
      </div>
      }
    </>
  )
}

export default LeftNav