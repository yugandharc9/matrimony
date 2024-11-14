import React, { useState,useEffect } from 'react';
import ApplicationBar from '../application-bar/ApplicationBar';
import ProfileCard from '../profile-card/profileCard';
import { FilterAlt } from '@mui/icons-material';
import BottomBar2 from '../application-bar/BottomBar';
import {FilterMenu} from '../filter/FilterMenu';
import { getProfiles } from '../../services/apiService';

const ProfilesPage = () => {
  const [profiles,setProfiles] = useState([]);
  // setProfiles( [
  //   {
  //     name: "Yugandhar",
  //     lastName: "Chaudhari",
  //     age: 26,
  //     current_city: "Pune",
  //     occupation: "Software Engineer",
  //     education: "Bachelor of Engineering",
  //     height_ft: "5'3\"",
  //     complexion: "Fair",
  //     rashi: "वृषभ",
  //     aboutme: "Passionate about technology and outdoor adventures. Love hiking, coding, and exploring new places.",
  //     pics: [
  //       "https://picsum.photos/seed/yugandhar1/400/300",
  //       "https://picsum.photos/seed/yugandhar2/400/300",
  //       "https://picsum.photos/seed/yugandhar3/400/300"
  //     ]
  //   },
  // ]);

  const loadProfiles= async (offset,limit,params) => { 
    let qp = `?offset=${offset}&limit=${limit}`
    const qParams = Object.entries(params).reduce((acc,[key,value]) => { return acc  + `&${key}=${value}`; },qp)

    try{
      const response = await getProfiles(qParams);
      console.log("response.data.data");
      console.log(response.data.data);
      setProfiles([...profiles,...response.data.data]);
    } catch(e){   
      console.log(e.error);
    }
  }

  useEffect(() => {
    console.log("x");
    loadProfiles(0,3,{});
  },[ ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const isFilterMenuOpen = Boolean(anchorEl);

  return (
    <div className="h-screen bg-custom-c1">
      <ApplicationBar />
      <div className="min-h-screen pb-20 bg-custom-c1 flex flex-wrap justify-center gap-6">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            age={profile.age}
            lastName={profile.lastName}
            current_city={profile.current_city}
            occupation={profile.occupation}
            education={profile.education}
            height_ft={profile.height_ft}
            work={profile.work}
            pic={profile.pics}
            aboutme={profile.aboutme}
            pics={profile.pics}
            degree={profile.degree}
            totalpoints={profile.points.total}
            points={profile.points}
          />
        ))}
        <button
          onClick={handleFilterButtonClick}
          aria-label="Open filters"
          className="fixed bottom-20 right-4 text-[#492533] bg-custom-c2 p-4 rounded-full shadow-lg hover:bg-[#CBAE8E] transition-colors"
        >
          <FilterAlt fontSize="large" />
        </button>
      </div>
      <FilterMenu
        anchorEl={anchorEl}
        open={isFilterMenuOpen}
        onClose={handleClose}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <BottomBar2 />
    </div>
  );
};

export default ProfilesPage;