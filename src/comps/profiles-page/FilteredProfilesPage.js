
import React, { useState,useEffect,useRef } from 'react';
import ApplicationBar from '../application-bar/ApplicationBar';
import ProfileCard from '../profile-card/profileCard';
import { FilterAlt } from '@mui/icons-material';
import BottomBar2 from '../application-bar/BottomBar';
import {FilterMenu} from '../filter/FilterMenu';
import { getProfiles} from '../../services/apiService';
import { useAuth } from '../auth/authctx';
import Skeleton from '@mui/material/Skeleton';
import { useFilter } from '../filter/filterctx';
import { Chip, Stack } from "@mui/material";



const FilteredProfilesPage = () => {
  const {filterParams,removeFilter} = useFilter();
  const [profiles,setProfiles] = useState([]);
  const {token} = useAuth();
  const [offset,setOffset] = useState(0);
  const observerRef = useRef(null); // Ref for the observer
  const [hasMore,setHasMore] = useState(null);
  const [loading,setLoading] = useState(false);
  const limit = 40;
  

  const loadFilteredProfiles = async () => { 
    console.log('profiles after ',profiles);
    if (loading ) {
      console.log('returning due to loading');
      return
    }

    const qp = Object.entries(filterParams).reduce((acc, [key, value]) => { return acc + `&${key}=${value}`; },  
        `?offset=${offset}&limit=${limit}`);

    try{
      setLoading(true);
      const response = await getProfiles(token,qp);
      setProfiles((prevProfiles) => [...prevProfiles, ...response.data.data]);
      console.log('setHasMore(offset < response.data.total)',response.data.total);
      setHasMore(response.data.total > offset);
      if (hasMore){   
          incrementOffset(offset);
      }
    } catch(e){   
      console.log('e is e',e);
    } finally{
      setLoading(false);
    }
  }

useEffect(() => {
  console.log('useEffect of mutating filterParams');
  setProfiles([]);
  loadFilteredProfiles(); 
  setOffset((prev) => { return 0 });
  setHasMore(false);
  setLoading(false);
} ,[filterParams]);


const incrementOffset = (prev) => { console.log('prev limit', prev,limit);;setOffset(prev+ limit); };


 useEffect(() => {
  console.log('useEffect [offset, hasMore] start');
  const observer = new IntersectionObserver(
    (entries) => {
      console.log('entries',entries);
      if (entries[0].isIntersecting ) {
        console.log("loading more");
        loadFilteredProfiles();
      }
    },
    { threshold: 1.0 } // Fully visible element triggers
  );
  if (observerRef.current) observer.observe(observerRef.current);

  return () => {
    if (observerRef.current) observer.unobserve(observerRef.current); // Cleanup
  };

}, [offset,hasMore]);

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

  const handleDelete = (keyToRemove) => {
    console.log('key to remove', keyToRemove);
    removeFilter(keyToRemove);
    console.log('filter params',filterParams);
  };

  const formatLabel = (key,value) => {
    let formattedValue = value;

    return `${key
      .split("_") // Split snake_case into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ")}: ${formattedValue}` ; // Join words with a space
  };

  return (
    <div className="h-screen bg-custom-c1">
      <ApplicationBar />
      <div className="min-h-screen pb-20 bg-custom-c1 flex flex-wrap justify-center gap-limit">

      <Stack direction="row" spacing={1} marginTop={5}
      sx={{
        flexWrap: "wrap", // Allow wrapping for responsiveness
        justifyContent: "center", // Center items on smaller screens
        gap: 1, // Add spacing between chips for better wrapping
        '@media (max-width:600px)': {
          justifyContent: "flex-start", // Align items to the left on smaller screens
        },
      }}
      >
      {Object.entries(filterParams).map(([key, value]) => (
        <Chip
          key={key}
          label={formatLabel(key,value)}
          sx = {{
            backgroundColor:  "#F0D0A6",
              color: "#492533",
            '& .MuiChip-deleteIcon': {
              color: '#492533', // Set close icon color
            },
            '& .MuiChip-deleteIcon:hover': {
              color: 'darkred', // Set close icon hover color
            },

          }}
          onDelete={() => handleDelete(key)}
        />
      ))}
    </Stack>
        {
        profiles.length == 0 &&
          <>
            <div className='flex flex-wrap justify-center gap-8'>
              { 
              Array.from({length: 30}).map((_,idx) => (<div key={idx}>
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
            {index == profiles.length - 1 && hasMore && (<div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />)}
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

export default FilteredProfilesPage;