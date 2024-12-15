import { useEffect, useState } from 'react';
import { getProfile } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authctx';
import ApplicationBar from '../application-bar/ApplicationBar';
import Slider from 'react-slick';
import ProfileBottomBar from '../application-bar/ProfileBottomBar';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export const ShowProfilePage = () => {
  const { pid } = useParams(); // Destructure `id` from the URL params
  console.log('bProfileId', pid);
  const [e, setR] = useState(null);
  const profileId = atob(pid);
  const { token } = useAuth();

  const getProfileData = async () => {
    try {
      const response = await getProfile(token, profileId);
      setR(response.data.data);
      // console.log('success resp', response.data.data);
    } catch (e) {
      console.log('error resp', e);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className='h-screen bg-custom-c1 overflow-auto'>
      <ApplicationBar />

      {e && (
        <div className='mb-20'>
          {/* Slider for profile images */}
          <Slider
            {...settings}
            infinite={e?.pics?.length > 1}
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
                  Marital Status:
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
                  {e?.maritial_status}
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
                  Birthdate:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Another feild:
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='flex-1 text-[#fff] text-left'>
                  {e?.birthdate}
                </span>
                <span className='flex-1 text-[#fff] text-left'>
                  Test example
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
                  Name:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Number:
                </span>
                <span className='font-semibold text-[#fff] text-left'>
                  Relation:
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
      <ProfileBottomBar />
    </div>
  );
};


