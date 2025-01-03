import React, { useState, useEffect, useRef } from 'react';
import ApplicationBar from '../application-bar/ApplicationBar';
import ProfileCard from '../profile-card/profileCard';
import { FilterAlt } from '@mui/icons-material';
import BottomBar2 from '../application-bar/BottomBar';
import { FilterMenu } from '../filter/FilterMenu';
import { getProfiles, getProfilesForView } from '../../services/apiService';
import { useAuth } from '../auth/authctx';
import Skeleton from '@mui/material/Skeleton';
import SelectGenderDialog from '../select-gender-dialog/SelectGenderDialog';

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const { token, isAuthenticated } = useAuth();
  const [offset, setOffset] = useState(0);
  const observerRef = useRef(null); // Ref for the observer
  const [hasMore, setHasMore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genderModal, setGenderModal] = useState(false); // show gender selection dialog
  const [selectedGenderForView, setSelectedGenderForView] = useState('');
  const limit = 40;

  const loadProfiles = async () => {
    console.log('profiles after ', profiles);
    if (loading || (hasMore != null && !hasMore)) {
      console.log('returning due to loading');
      return;
    }
    let qp = `?offset=${offset}&limit=${limit}`;
    try {
      setLoading(true);
      const response = await getProfiles(token, qp);
      setProfiles((prevProfiles) => [...prevProfiles, ...response.data.data]);
      console.log(
        'setHasMore(offset < response.data.total)',
        response.data.total
      );
      setHasMore(response.data.total > offset);
      if (hasMore) {
        incrementOffset(offset);
      }
    } catch (e) {
      console.log('e is e', e);
    } finally {
      setLoading(false);
    }
  };

  const loadViewProfiles = async () => {
    if (
      loading ||
      (hasMore != null && !hasMore) ||
      selectedGenderForView === ''
    ) {
      console.log('returning due to loading');
      return;
    }
    let qp = `?gender=${selectedGenderForView}&offset=${offset}&limit=${limit}`;
    try {
      setLoading(true);
      const response = await getProfilesForView(qp);
      setProfiles((prevProfiles) => [...prevProfiles, ...response.data.data]);
      console.log(
        'setHasMore(offset < response.data.total)',
        response.data.total
      );
      setHasMore(response.data.total > offset);
      if (hasMore) {
        incrementOffset(offset);
      }
    } catch (e) {
      console.log('e is e', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProfiles();
    } else {
      const genderValue = window.localStorage.getItem('selectedGender');
      if (genderValue != null) {
        setSelectedGenderForView(genderValue === 'male' ? 'female' : 'male');
      } else {
        setGenderModal(true);
      }
    }
    setTimeout(() => {
      incrementOffset(offset);
    }, 1000);
  }, []);

  const incrementOffset = (prev) => {
    console.log('prev limit', prev, limit);
    setOffset(prev + limit);
  };

  useEffect(() => {
    console.log('useEffect [offset, hasMore] start');
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries);
        if (entries[0].isIntersecting) {
          console.log('loading more');
          if (isAuthenticated) {
            loadProfiles();
          } else {
            loadViewProfiles();
          }
        }
      },
      { threshold: 1.0 } // Fully visible element triggers
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // Cleanup
    };
  }, [offset, hasMore]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterButtonClick = (event) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      setGenderModal(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const isFilterMenuOpen = Boolean(anchorEl);

  const handleGenderSelectionForView = (selectedGender) => {
    window.localStorage.setItem('selectedGender', selectedGender);
    setSelectedGenderForView(selectedGender === 'male' ? 'female' : 'male');
    setProfiles([]);
    setOffset(0);
    setGenderModal(false);
  };

  useEffect(() => {
    if (selectedGenderForView !== '') {
      loadViewProfiles();
    }
  }, [selectedGenderForView]);

  return (
    <div className='h-screen bg-custom-c1'>
      <ApplicationBar />
      <SelectGenderDialog
        open={genderModal}
        setGenderModal={setGenderModal}
        selectedGenderForView={selectedGenderForView}
        onClose={handleGenderSelectionForView}
      />
      <div className='min-h-screen pb-20 bg-custom-c1 flex flex-wrap justify-center gap-limit'>
        {profiles.length == 0 && (
          <>
            <div className='flex flex-wrap justify-center gap-8'>
              {Array.from({ length: 30 }).map((_, idx) => (
                <div key={idx}>
                  <Skeleton
                    variant='text'
                    sx={{ fontSize: '1rem', backgroundColor: '#FEF5EC' }}
                  />
                  <Skeleton
                    variant='circular'
                    width={40}
                    height={40}
                    sx={{ backgroundColor: '#FEF5EC' }}
                  />
                  <Skeleton
                    variant='rectangular'
                    width={210}
                    height={60}
                    sx={{ backgroundColor: '#FEF5EC' }}
                  />
                  <Skeleton
                    variant='rounded'
                    width={210}
                    height={60}
                    sx={{ backgroundColor: '#FEF5EC' }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {profiles.map((profile, index) => (
          <React.Fragment key={index}>
            <ProfileCard
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
              totalpoints={profile.points?.total}
              points={profile.points}
              userID={profile.user_id}
              profileID={profile.id}
              context='profiles'
            />
            {index == profiles.length - 1 && hasMore && (
              <div
                ref={observerRef}
                style={{ height: '20px', background: 'transparent' }}
              />
            )}
          </React.Fragment>
        ))}

        <button
          onClick={handleFilterButtonClick}
          aria-label='Open filters'
          className='fixed bottom-20 right-4 text-[#492533] bg-custom-c2 p-4 rounded-full shadow-lg hover:bg-custom-c3transition-colors'
        >
          <FilterAlt fontSize='large' />
        </button>
      </div>
      {isAuthenticated && (
        <FilterMenu
          anchorEl={anchorEl}
          open={isFilterMenuOpen}
          onClose={handleClose}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      )}
      <BottomBar2 active='profiles' />
    </div>
  );
};

export default ProfilesPage;


