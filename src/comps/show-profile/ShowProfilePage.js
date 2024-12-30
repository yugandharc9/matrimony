import { useEffect, useState } from 'react';
import { getProfile, getProfileByIdForView } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authctx';
import ApplicationBar from '../application-bar/ApplicationBar';
import Slider from 'react-slick';
import ProfileBottomBar from '../application-bar/ProfileBottomBar';
import BottomBar2 from '../application-bar/BottomBar';

const settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  appendDots: (dots) => (
    <div
      style={{
        backgroundColor: 'transparent',
        borderRadius: '10px',
        padding: '40px',
        zIndex: '1',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ul
        style={{
          margin: '0px',
          width: 'fit-content',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          fontSize: '12px',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
        }}
      >
        {dots}
      </ul>
    </div>
  ),
};

export const ShowProfilePage = () => {
  const { pid } = useParams(); // Destructure `id` from the URL params
  console.log('bProfileId', pid);
  const [e, setR] = useState(null);
  const [bottomBarStatus, setBottomBarStatus] = useState(null);
  const profileId = atob(pid);
  const { token, isAuthenticated } = useAuth();

  const getProfileDataWithView = async () => {
    try {
      const response = await getProfileByIdForView(profileId);
      setR(response.data.data?.[0]);
      setBottomBarStatus({
        is_bookmarked: false,
        is_chat_requested: false,
      });
      // console.log('success resp', response);
    } catch (e) {
      console.log('error resp', e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProfileData();
    } else {
      getProfileDataWithView();
    }
  }, []);

  const getProfileData = async () => {
    try {
      const response = await getProfile(token, profileId);
      setR(response.data.data);
      setBottomBarStatus({
        is_bookmarked: response?.data?.is_bookmarked,
        is_chat_requested: response?.data?.is_chat_requested,
      });
      // console.log('success resp', response);
    } catch (e) {
      console.log('error resp', e);
    }
  };

  const getValidTime = (birthtime) => {
    let birthtimeValue = new Date(birthtime);
    if (isNaN(birthtimeValue.getTime())) {
      birthtimeValue = new Date(`1970-01-01T${birthtime}:00Z`);
    }
    birthtimeValue.setMinutes(
      birthtimeValue.getMinutes() - birthtimeValue.getTimezoneOffset()
    );
    if (!isNaN(birthtimeValue.getTime())) {
      return birthtimeValue.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } else {
      console.error('Invalid birthtime value:', birthtime);
    }
  };

  return (
    <div className='h-screen bg-custom-c1 overflow-auto'>
      <ApplicationBar />

      {e && (
        <div className='mb-40'>
          {/* Slider for profile images */}
          <Slider
            {...settings}
            infinite={e?.pics?.length > 1}
            dots={e?.pics?.length > 1}
            className='rounded-lg overflow-hidden relative my-5 mx-5 '
          >
            {e?.pics?.length > 0 ? (
              e.pics.map((pic, index) => (
                <div key={index}>
                  <img
                    key={index}
                    src={pic.url}
                    alt={`Profile ${index + 1}`}
                    className='w-full h-[45vh] object-contain transition-opacity duration-500 ease-in-out'
                  />
                </div>
              ))
            ) : (
              <img
                src={require('../../assets/default/female.jpg')}
                alt='Default profile'
                className='w-full h-[45vh] object-contain'
              />
            )}
          </Slider>

          {/* personal information */}
          <div className='flex flex-col items-center gap-5 mx-5 mb-10'>
            <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
              Personal Info
            </h1>
            <hr className='w-full h-2 border-custom-c2' />
            <h2 className='text-3xl font-bold text-[#fff]'>
              {e?.name} {e?.lastName}
            </h2>

            <div className='flex justify-center w-full gap-10'>
              <div className='flex flex-col'>
                <span className='font-semibold text-[#fff] text-left'>
                  Age:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Gender:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Height:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Marital Status:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Physically challenged:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  City:
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.age} years
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.gender}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.height_ft}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.maritial_status}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.challenged === 'yes' ? 'Yes' : 'No'}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.current_city}
                </span>
              </div>
            </div>
          </div>

          {/* about me and expectations */}
          <div className='flex justify-center gap-20 mx-5 mb-20 md:mb-10 flex-col md:flex-row'>
            <div className='flex flex-col items-center gap-5 flex-1'>
              <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
                About Me
              </h1>
              <hr className='w-full h-2 border-custom-c2' />
              <p className='text-[#fff] min-h-[10vh] max-h-[30vh] overflow-auto px-4 text-left '>
                {e?.aboutme}
              </p>
            </div>
            <div className='flex flex-col items-center gap-5 flex-1'>
              <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
                Expectations
              </h1>
              <hr className='w-full h-2 border-custom-c2' />
              <p className='text-[#fff] min-h-[10vh] max-h-[30vh] overflow-auto px-4 text-left'>
                {e?.expectation}
              </p>
            </div>
          </div>

          {/* education and work */}
          <div className='flex justify-center gap-20 mx-5 mb-20 md:mb-10 flex-col md:flex-row'>
            <div className='flex flex-col items-center gap-5 flex-1'>
              <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
                Education
              </h1>
              <hr className='w-full h-2 border-custom-c2' />
              <div className='flex justify-center w-full gap-10'>
                <div className='flex flex-col'>
                  <span className='font-semibold text-[#fff] text-left'>
                    Degree:
                  </span>
                  <span className='font-semibold text-[#fff] text-left'>
                    Qualification:
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='flex-1 text-[#fff] text-left'>
                    {e?.degree}
                  </span>
                  <span className='flex-1 text-[#fff] text-left'>
                    {e?.education}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center gap-5 flex-1'>
              <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
                Work
              </h1>
              <hr className='w-full h-2 border-custom-c2' />
              <div className='flex justify-center w-full gap-10'>
                <div className='flex flex-col'>
                  <span className='font-semibold text-[#fff] text-left'>
                    Occupation:
                  </span>
                  <span className='font-semibold text-[#fff] text-left'>
                    Annual Income:
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='flex-1 text-[#fff] text-left'>
                    {e?.occupation} at {e?.work}
                  </span>
                  <span className='flex-1 text-[#fff] text-left'>
                    ₹
                    {e?.annual_income
                      ? e.annual_income.toLocaleString('en-IN')
                      : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* astrology information */}
          <div className='flex flex-col items-center gap-5 mx-5 mb-10'>
            <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
              Astrological Info
            </h1>
            <hr className='w-full h-2 border-custom-c2' />

            <div className='flex justify-center w-full gap-10'>
              <div className='flex flex-col'>
                <span className='font-semibold text-[#fff] text-left'>
                  Birth Date:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Birth Time:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Birth Name:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Rashi:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Gotra:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Mangalik:
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.birthdate}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.birthtime ? getValidTime(e?.birthtime) : ''}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.birthname}
                </span>
                <span className='flex-1 text-[#fff] text-left'>{e?.rashi}</span>
                <span className='flex-1 text-[#fff] text-left'>{e?.gotra}</span>
                <span className='flex-1 text-[#fff] text-left capitalize'>
                  {e?.mangal_dosh}
                </span>
              </div>
            </div>
          </div>

          {/* contact information */}
          <div className='flex flex-col items-center gap-5 mx-5 mb-10'>
            <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
              Contact Info
            </h1>
            <hr className='w-full h-2 border-custom-c2' />

            <div className='flex justify-center w-full gap-10'>
              <div className='flex flex-col'>
                <span className='font-semibold text-[#fff] text-left'>
                  Contact name:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Contact phone:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Relation with contact:
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.contact?.name}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.contact?.phone}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.contact?.relation}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ProfileBottomBar
        userId={atob(pid)}
        userData={e}
        bottomBarStatus={bottomBarStatus}
      />
      <BottomBar2 active='profiles' />
    </div>
  );
};


