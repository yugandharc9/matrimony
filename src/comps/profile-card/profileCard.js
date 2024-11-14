import React from 'react';
import Slider from 'react-slick';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatIcon from '@mui/icons-material/Chat';
import { Tooltip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import VisibilityIcon from '@mui/icons-material/Visibility';

const ProfileCard = ({ name, lastName, age, current_city, occupation, degree, height_ft,  rashi, aboutme, pics,work,totalpoints,points }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-[#492533] bg-[#FEF5EC] p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Carousel for Profile Pictures */}
      <Slider {...settings} className="h-60 rounded-lg overflow-hidden relative">
        {pics && pics.length > 0 ? (
          pics.map((pic, index) => (
            <img
              key={index}
              src={pic.url}
              alt={`Profile ${index + 1}`}
              className="w-full h-60 object-cover transition-opacity duration-500 ease-in-out"
            />
          ))
        ) : (
          <img
            src={require("../../assets/default/female.jpg")}
            alt="Default profile"
            className="w-full h-60 object-cover"
          />
        )}
      </Slider>
  
      {/* Profile Information */}
      <div className="py-6 px-3 text-center">
        <h2 className="text-2xl font-bold text-[#492533]">{name} {lastName}</h2>
        <p className="text-sm font-medium text-[#CBAE8E]">{current_city}</p>
        <p className="text-gray-700 mt-1 font-semibold">{occupation} at {work}</p>
        
        <div className="grid grid-cols-2">

        <div className="flex flex-col gap-1 mt-4 text-left">
          <div className="flex items-center">
            <span className="font-semibold text-[#492533] w-24">Age:</span>
            <span className="text-gray-800">{age} years</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-[#492533] w-24">Height:</span>
            <span className="text-gray-800">{height_ft}</span>
          </div>
          {degree && (
            <div className="flex items-center">
              <span className="font-semibold text-[#492533] w-24">Education:</span>
              <span className="text-gray-800">{degree}</span>
            </div>
          )}
          {totalpoints && (
            <div className="flex items-center">
              <span className="font-semibold text-[#492533] w-24">गुणमिलन:</span>
              <span className="text-gray-800">{totalpoints}/36 
            <Tooltip  
            title={
              <div>
                <div>वर्ण - {points.info.varna}</div>
                <div>वश्य - {points.info.vasya}</div>
                <div>तारा - {points.info.tara}</div>
                <div>योन - {points.info.yoni}</div>
                <div>ग्रह मैत्री - {points.info.grahamaitri}</div>
                <div>गण - {points.info.gana}</div>
                <div>भकूट - {points.info.rashi}</div>
                <div>नाडी - {points.info.naadi}</div>
              </div>
            }
            placement="right">
             <HelpOutlineIcon />
            </Tooltip>
                 </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-4 text-left">
      <div className="flex flex-col space-y-3 pb-8 px-12 mt-1">
    <ChatIcon sx={{
      transform: 'scale(1)',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.2) rotate(20deg)',  // Slight scale and rotate on hover
      }}} 
    alt="Chat"
    onClick={() => alert('Chat initiated')}/> 
    <StarBorderIcon sx={{color: "green"}} onClick={() => alert('Chat initiated')}/> 
    < VisibilityIcon />
    
      </div>
        </div>
  
    </div>
    < FavoriteBorderIcon sx={{ color: "#FF4F58", fontSize: "50px"}} />
        {/* About Me Section */}
        {aboutme && <p className="text-gray-700 mt-3 italic">{aboutme}</p>}
      </div>
  
      {/* Stacked Action Buttons */}
    </div>
  );
  
} 
export default ProfileCard;
