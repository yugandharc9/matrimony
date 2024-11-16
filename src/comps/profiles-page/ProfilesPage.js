import React, { useState,useEffect } from 'react';
import ApplicationBar from '../application-bar/ApplicationBar';
import ProfileCard from '../profile-card/profileCard';
import { FilterAlt } from '@mui/icons-material';
import BottomBar2 from '../application-bar/BottomBar';
import {FilterMenu} from '../filter/FilterMenu';
import { getProfiles} from '../../services/apiService';
import { useAuth } from '../auth/authctx';
import { profileCompletionStatus } from '../../services/apiService';
import { Redirector } from '../routing/redirector';
import { useNavigate } from 'react-router-dom';

const ProfilesPage = () => {
  const [profiles,setProfiles] = useState([]);
  const {token,removeToken} = useAuth();
  const navigate = useNavigate();

 
  const loadProfiles= async (offset,limit,params) => { 
    let qp = `?offset=${offset}&limit=${limit}`
    const qParams = Object.entries(params).reduce((acc,[key,value]) => { return acc  + `&${key}=${value}`; },qp)

    try{
      console.log("about to send request");
      const response = await getProfiles(token,qParams);
      console.log("about to send request done");
      console.log("about to send request done");
      console.debug("response.data.data returned",response);
      //console.log(response.data.data);
      setProfiles([...profiles,...response.data.data]);
    } catch(e){   
      console.error('ProfilesPage loadProfiles err',e);
    }
  }

  const checkCompletion = async () => {
    try {
      const r = await profileCompletionStatus(token);
      let completionStat = r.data;
      Redirector(completionStat, navigate);
    } catch (e) {
      if (e.response.status == 401){
        console.log("profile completion it is  401 ");
        removeToken();
        navigate("/login");
      }
      let completionStat = e.response.data;
      Redirector(completionStat, navigate);
    }
  }

  useEffect(() => {
    console.log('<<<<<<<<<<<<<<<<<ProfilesPage useEffect() running');
    checkCompletion();
    loadProfiles(0, 3, {});
  }, []);

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
            userID={profile.userID}
            context="profiles"
          />
        ))}
        <button
          onClick={handleFilterButtonClick}
          aria-label="Open filters"
          className="fixed bottom-20 right-4 text-[#492533] bg-custom-c2 p-4 rounded-full shadow-lg hover:bg-custom-c3transition-colors"
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