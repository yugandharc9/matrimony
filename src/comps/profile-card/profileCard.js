import React from 'react';
import Slider from 'react-slick';

const ProfileCard = ({ name, age, current_city, occupation, education, height_ft, complexion, rashi, aboutme, pics }) => {
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
              src={pic}
              alt={`Profile ${index + 1}`}
              className="w-full h-60 object-cover transition-opacity duration-500 ease-in-out"
            />
          ))
        ) : (
          <img
            src="/images/default-profile.jpg"
            alt="Default profile"
            className="w-full h-60 object-cover"
          />
        )}
      </Slider>
  
      {/* Profile Information */}
      <div className="py-6 px-3 text-center">
        <h2 className="text-2xl font-bold text-[#492533]">{name}, {age}</h2>
        <p className="text-sm font-medium text-[#CBAE8E]">{current_city}</p>
        <p className="text-gray-700 mt-1 font-semibold">{occupation} - {education}</p>
        
        {/* Details Section */}
        <div className="flex flex-col gap-1 mt-4 text-left">
          <div className="flex items-center">
            <span className="font-semibold text-[#492533] w-24">Height:</span>
            <span className="text-gray-800">{height_ft}</span>
          </div>
          {complexion && (
            <div className="flex items-center">
              <span className="font-semibold text-[#492533] w-24">Complexion:</span>
              <span className="text-gray-800">{complexion}</span>
            </div>
          )}
          {rashi && (
            <div className="flex items-center">
              <span className="font-semibold text-[#492533] w-24">Rashi:</span>
              <span className="text-gray-800">{rashi}</span>
            </div>
          )}
        </div>
  
        {/* About Me Section */}
        {aboutme && <p className="text-gray-700 mt-3 italic">{aboutme}</p>}
      </div>
  
      {/* Stacked Action Buttons */}
      <div className="flex flex-col mt-6 space-y-3 pb-4 px-2">
        <button
          onClick={() => alert('Chat initiated')}
          className="bg-[#492533] hover:bg-[#CBAE8E] text-white font-semibold py-2 rounded-lg shadow-md transform transition-transform hover:scale-105"
        >
          Chat
        </button>
        <button
          onClick={() => alert('Saved')}
          className="bg-[#CBAE8E] hover:bg-[#492533] text-[#492533] hover:text-white font-semibold py-2 rounded-lg shadow-md transform transition-transform hover:scale-105"
        >
          Save
        </button>
      </div>
    </div>
  );
  
} 
export default ProfileCard;
