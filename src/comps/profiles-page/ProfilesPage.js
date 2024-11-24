import React, { useState,useEffect,useRef } from 'react';
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
import Skeleton from '@mui/material/Skeleton';


const ProfilesPage = () => {
  const [profiles,setProfiles] = useState([]);
  const {token,removeToken} = useAuth();
  const navigate = useNavigate();
  const [offset,setOffset] = useState(0);
  const observerRef = useRef(null); // Ref for the observer
  const [hasMore,setHasMore] = useState(null);
  const [loading,setLoading] = useState(false);
  const limit = 6;


 
  const loadProfiles = async (params) => { 
    if (loading || (hasMore != null && !hasMore)) {
      console.log('returning due to loading');
      return
    }
    let qp = `?offset=${offset}&limit=${limit}`
    const qParams = Object.entries(params).reduce((acc,[key,value]) => { return acc  + `&${key}=${value}`; },qp)

    try{
      setLoading(true);
      const response = await getProfiles(token,qParams);
      setProfiles([...profiles,...response.data.data]);
      console.log('setHasMore(offset < response.data.total)',response.data.total);
      setHasMore(offset < response.data.total);
      if (hasMore){   
          incrementOffset(offset);
      }
    } catch(e){   
      console.log('e is e',e);
    } finally{
      setLoading(false);
    }
  }

  const checkCompletion = async () => {
    try {
      const r = await profileCompletionStatus(token);
      let completionStat = r.data;
      Redirector(completionStat, navigate);
    } catch (e) {
      if (e.response.status == 401){
        removeToken();
        navigate("/login");
      }
      let completionStat = e.response.data;
      Redirector(completionStat, navigate);
    }
  }
  
  

useEffect(() => {
  checkCompletion();
  loadProfiles({});
  incrementOffset(offset);
}
,[]);



  const incrementOffset = (prev) => { console.log('prev limit', prev,limit);;setOffset(prev+ limit); };

   useEffect(() => {
    //checkCompletion();
    console.log('offset is',offset);
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries',entries);
        if (entries[0].isIntersecting ) {
          console.log("loading more");
          loadProfiles({});
        }
      },
      { threshold: 1.0 } // Fully visible element triggers
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // Cleanup
    };

  }, [offset,hasMore,loading]);

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
      <div className="min-h-screen pb-20 bg-custom-c1 flex flex-wrap justify-center gap-limit">

        {
        profiles.length == 0 &&
          <>
            <div className='flex flex-wrap justify-center gap-8'>
              { 
              Array.from({length: 30}).map((_,idx) => (<div>
                <Skeleton variant="text" sx={{ fontSize: '1rem', backgroundColor: '#FEF5EC' }} />
                <Skeleton variant="circular" width={40} height={40} sx={{ backgroundColor: '#FEF5EC' }} />
                <Skeleton variant="rectangular" width={210} height={60} sx={{ backgroundColor: '#FEF5EC' }} />
                <Skeleton variant="rounded" width={210} height={60} sx={{ backgroundColor: '#FEF5EC' }} />
              </div>)
            
            )}
            </div>
          </>
          }

        {profiles.map((profile, index) => (
          <>
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
              userID={profile.user_id}
              profileID={profile.id}
              context="profiles"
            />
            {index == profiles.length - 1 && (<div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />)}
          </>
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
      <BottomBar2 active="profiles" />
    </div>
  );
};

export default ProfilesPage;