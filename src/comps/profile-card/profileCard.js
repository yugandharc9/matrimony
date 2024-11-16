import React from 'react';
import Slider from 'react-slick';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatIcon from '@mui/icons-material/Chat';
import { Tooltip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRef } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { ConfirmDialog } from '../dialog/ConfirmDialog';

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const ProfileCard = ({ name, lastName, age, current_city, occupation, degree, height_ft, userID, aboutme, pics, work, totalpoints, points, context }) => {
  const superLikeRef = useRef();
  const chatReqRef = useRef();
  const acceptChatReqRef = useRef();
  const rejectChatReqRef = useRef();
  const acceptInterestReqRef = useRef();
  const rejectInterestReqRef = useRef();
  const saveProfileRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openSuperLikeDialog = (e) => {
    superLikeRef.current?.openDialog(true);
  }

  const openChatRequestDialog = (e) => {
    chatReqRef.current?.openDialog(true);
  }

  const openAcceptChatRequestDialog = (e) => {
    acceptChatReqRef.current?.openDialog(true);
  }

  const openRejectChatRequestDialog = (e) => {
    rejectChatReqRef.current?.openDialog(true);
  }

  const openAcceptInterestRequestDialog = (e) => {
    acceptInterestReqRef.current?.openDialog(true);
  }

  const openRejectInterestRequestDialog = (e) => {
    rejectInterestReqRef.current?.openDialog(true);
  }

  const openSaveProfileDialog = (e) => {
    saveProfileRef.current?.openDialog(true);
  }

  const handleSuperLikeConfirm = ({ actionConfirmed, userID }) => {
    if (actionConfirmed) {
      console.log(`Action confirmed for user ID: ${userID}`);
      // Additional logic after confirmation
    }
  };

  const handleChatReqConfirm = ({ actionConfirmed, userID }) => {
    if (actionConfirmed) {
      console.log(`Action confirmed for user ID: ${userID}`);
      // Additional logic after confirmation
    }
  };

  const handleSaveProfileConfirm = ({ actionConfirmed, userID }) => {
    if (actionConfirmed) {
      console.log(`Action confirmed for user ID: ${userID}`);
      // Additional logic after confirmation
    }
  };


  const handleAcceptInterestReqConfirm = ({ actionConfirmed, userID }) => {
    if (actionConfirmed) {
      console.log(`Action confirmed for user ID: ${userID}`);
      // Additional logic after confirmation
    }

  };
  const handleRejectInterestConfirm = ({ actionConfirmed, userID }) => {
    if (actionConfirmed) {
      console.log(`Action confirmed for user ID: ${userID}`);
      // Additional logic after confirmation
    }
  };

  const handleAcceptChatReqConfirm = ({ actionConfirmed, userID }) => {
    if (actionConfirmed) {
      console.log(`Action confirmed for user ID: ${userID}`);
      // Additional logic after confirmation
    }

  };
  const handleRejectChatReqConfirm = ({ actionConfirmed, userID }) => {
    if (actionConfirmed) {
      console.log(`Action confirmed for user ID: ${userID}`);
      // Additional logic after confirmation
    }
  };
  return (
    <div className="max-w-sm mt-2 rounded-lg overflow-hidden shadow-lg border border-[#492533] bg-[#FEF5EC] p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl">
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
        < FavoriteBorderIcon sx={{ color: "#FF4F58", fontSize: "50px" }} onClick={openSuperLikeDialog} />
        <ConfirmDialog ref={superLikeRef} userID={userID} onConfirm={handleSuperLikeConfirm} message={`Do you want to send interest ${name}? If ${name} is interested you will be a match`} />
        <h2 className="text-2xl font-bold text-[#492533]">{name} {lastName}</h2>
        <p className="text-sm font-medium text-[#CBAE8E]">{current_city}</p>
        <p className="text-gray-700 mt-1 font-semibold">{occupation} at {work}</p>


        <div className="flex flex-col gap-1 mt-4 text-left items-center">
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
        {aboutme && <p className="text-gray-700 mt-3 italic">{aboutme}</p>}
        <div className='inline space-x-6'>

          <ConfirmDialog ref={saveProfileRef} userID={userID} onConfirm={handleSaveProfileConfirm} message={`Do you want to save ${name}'s profile?`} />
          < VisibilityIcon sx={{
            color: "",
            fontSize: "50px",
          }} />

          {context == "chatRequests" && (<>
            <DoneIcon sx={{
              transform: 'scale(1)',
              fontSize: "50px",
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2) rotate(20deg)',  // Slight scale and rotate on hover
              }
            }}
              alt="Yes"
              onClick={openAcceptChatRequestDialog} />
            <ConfirmDialog ref={acceptChatReqRef} userID={userID} onConfirm={handleAcceptChatReqConfirm} message={`Do you want accept ${name}'s chat request?`} />
            <CloseIcon sx={{
              transform: 'scale(1)',
              fontSize: "50px",
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2) rotate(20deg)',  // Slight scale and rotate on hover
              }
            }}
              alt="No"
              onClick={openRejectChatRequestDialog} />
            <ConfirmDialog ref={rejectChatReqRef} userID={userID} onConfirm={handleRejectChatReqConfirm} message={`Do you want decline ${name}'s chat request?`} />

          </>

          )}

          {context == "interests" && (<>
            <FavoriteIcon sx={{
              transform: 'scale(1)',
              fontSize: "50px",
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2) rotate(20deg)',  // Slight scale and rotate on hover
              }
            }}
              alt="Yes"
              onClick={openAcceptInterestRequestDialog} />
            <ConfirmDialog ref={acceptInterestReqRef} userID={userID} onConfirm={handleAcceptInterestReqConfirm} message={`Do you want show interest in ${name}?`} />
            <CloseIcon sx={{
              transform: 'scale(1)',
              fontSize: "50px",
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2) rotate(20deg)',  // Slight scale and rotate on hover
              }
            }}
              alt="No"
              onClick={openRejectInterestRequestDialog} />
            <ConfirmDialog ref={rejectInterestReqRef} userID={userID} onConfirm={handleRejectInterestConfirm} message={`Do you want decline interest by ${name}?`} />

          </>

          )}

          {context == "profiles" && (<><ChatIcon sx={{
            transform: 'scale(1)',
            fontSize: "50px",
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2) rotate(20deg)',  // Slight scale and rotate on hover
            }
          }}
            alt="Chat"
            onClick={openChatRequestDialog} />
            <ConfirmDialog ref={chatReqRef} userID={userID} onConfirm={handleChatReqConfirm} message={`Do you want to send chat request to ${name}? You can chat after ${name} accepts.`} />
            <StarBorderIcon sx={{
              color: "",
              fontSize: "50px",
            }} onClick={openSaveProfileDialog} />
            < DownloadIcon sx={{
              color: "",
              fontSize: "50px",
            }} /> </>)}

        </div>

      </div>

      {/* Stacked Action Buttons */}
    </div>
  );

}
export default ProfileCard;
