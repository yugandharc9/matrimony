import { Popover, TextField, MenuItem, Checkbox } from '@mui/material';
import { useState,useEffect,useRef } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { heights, educationList, maritialStats } from '../../constants/constants';
import showNotification from '../notify/notify';
import { useFilter } from './filterctx';
import {useNavigate} from 'react-router-dom';


export const FilterMenu = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate();
  const {filterParams,saveParams,clearParams} = useFilter();
  const [nameSearch, setNameSearch] = useState('');
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');
  const [heightFrom, setHeightFrom] = useState('');
  const [heightTo, setHeightTo] = useState('');
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [education, setEducation] = useState([]);
  const [annualIncome, setAnnualIncome] = useState('');
  const [mangalDosh, setMangalDosh] = useState('');
  const [challenged, setChallenged] = useState('');

  console.log('filter params', filterParams);

  const handleClear = () => {
    setNameSearch('');
    setAgeFrom('');
    setAgeTo('');
    setHeightFrom('');
    setHeightTo('');
    setMaritalStatus([]);
    setEducation([]);
    setAnnualIncome('');
    setMangalDosh('');
    setChallenged('');
    clearParams();
    navigate("/profiles");
  };

  useEffect(() => {
    console.log('useEffect of FilterMenu');
    console.log('filterParams',filterParams);
    setNameSearch(filterParams.name_search || '');
    setAgeFrom(filterParams.age_from || '');
    setAgeTo(filterParams.age_to || '');
    setHeightFrom(filterParams.height_from || '');
    setHeightTo(filterParams.height_to || '');
    if (filterParams.maritial_status) {
      setMaritalStatus(filterParams.maritial_status.split(","));
    } else {      
      setMaritalStatus([]);
    }
    if (filterParams.education) {
      setEducation(filterParams.education.split(","));
    } else {
      setEducation([]);
    }
    setAnnualIncome(filterParams.annual_income || '');
    setMangalDosh(filterParams.mangal_dosh || '');
    setChallenged(filterParams.challenged || '');
    
  },[filterParams])

  const listToCommaSeperated = (prev, current, idx) => {
    if (idx == 0) {
      return current
    } else {
      return prev + ',' + current
    }
  }

  const lookUpLabel = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
      let ele = arr[i];
      if (ele?.value == value) {
        return ele?.label;
      }
    }
    return value;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ageTo < ageFrom) {
      showNotification("danger", "Please select correct range for age", `Upto age ${ageTo} is less than from age ${ageFrom}`, 3000)
      return
    }

    if (heightFrom > heightTo) {
      showNotification("danger", "Please select correct range for height", `Upto height ${lookUpLabel(heights, heightFrom)} is less than ${lookUpLabel(heights, heightTo)}`, 3000)
      return
    }
    const filteredObj = Object.entries({
      name_search: nameSearch,
      age_from: ageFrom,
      age_to: ageTo,
      height_from: heightFrom,
      height_to: heightTo,
      maritial_status: maritalStatus.reduce(listToCommaSeperated, ""),
      mangal_dosh: mangalDosh,
      challenged: challenged,
      annual_income: annualIncome,
      education: education.reduce(listToCommaSeperated, "")
    }).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    saveParams(filteredObj);
    navigate("/filtered/profiles");
    onClose();
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      PaperProps={{
        style: {
          backgroundColor: '#492533', // Light white background
          borderRadius: '16px', // Rounded corners
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Custom shadow
          padding: '16px', // Internal padding
        },
      }}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1300
      }} // Popup background color and z-index to ensure it appears above content
    >
      <header className="flex justify-center items-center h-8 bg-custom-c1 border border-white rounded-lg" onClick={handleClear}>
        <button onClick={handleClear} className="text-custom-c4">
          <RestartAltIcon />    Reset Filters
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10 text-custom-c4 bg-custom-c1">
        <div>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            placeholder="Enter Name"
            InputProps={{
              style: {
                backgroundColor: '#492533',
              },
            }}
            sx={{
              marginTop: 2,
              borderColor: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // White border
                },
                '&:hover fieldset': {
                  borderColor: 'white', // White border on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // White border when focused
                },
              },
              '& .MuiInputBase-input': {
                color: 'white', // White input text
              },
              '& .MuiFormLabel-root': {
                color: 'white', // White label
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'white', // White label when focused
              },
              '& .MuiSelect-icon': {
                color: 'white'
              }
            }}
          />
        </div>

        <div>
          <h2 className="mb-2 text-white">Age should be between</h2>
          <div className="flex space-x-4">
            {/* "From" TextField */}
            <TextField
              select
              label="From"
              value={ageFrom}
              onChange={(e) => setAgeFrom(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { backgroundColor: '#492533', color: 'white' }, // Background and text color
              }}
              InputLabelProps={{
                style: { color: 'white' }, // Label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Border color on focus
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Text color
                },
                '& .MuiFormLabel-root': {
                  color: 'white', // Label color
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: 'white', // Label color on focus
                },
                '& .MuiSelect-icon': {
                  color: 'white'
                }
              }}
            >
              {[...Array(61).keys()].map((age) => (
                <MenuItem key={age} value={age + 20} style={{ color: 'black' }}>
                  {age + 20} yrs
                </MenuItem>
              ))}
            </TextField>

            {/* Dash Separator */}
            <span className="text-[#FEF5EC]">-</span>

            {/* "To" TextField */}
            <TextField
              select
              label="To"
              value={ageTo}
              onChange={(e) => setAgeTo(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { backgroundColor: '#492533', color: 'white' }, // Background and text color
              }}
              InputLabelProps={{
                style: { color: 'white' }, // Label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Border color on focus
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Text color
                },
                '& .MuiFormLabel-root': {
                  color: 'white', // Label color
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: 'white', // Label color on focus
                },
                '& .MuiSelect-icon': {
                  color: 'white'
                }
              }}
            >
              {[...Array(61).keys()].map((age) => (
                <MenuItem key={age} value={age + 20} style={{ color: 'black' }}>
                  {age + 20} yrs
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>


        <div>
          <h2 className="mb-2">Height should be between</h2>
          <div className="flex space-x-4">
            <TextField
              select
              label="From"
              value={heightFrom}
              onChange={(e) => setHeightFrom(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { backgroundColor: '#492533' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Border color on focus
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Text color
                },
                '& .MuiFormLabel-root': {
                  color: 'white', // Label color
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: 'white', // Label color on focus
                },
                '& .MuiSelect-icon': {
                  color: 'white'
                }
              }}
            >
              {heights.map((i) => (
                <MenuItem key={i} value={i.value}>
                  {i.label}
                </MenuItem>
              ))
              }
            </TextField>
            <span className="text-[#FEF5EC]">-</span>
            <TextField
              select
              label="To"
              value={heightTo}
              onChange={(e) => setHeightTo(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { backgroundColor: '#492533' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Border color on focus
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Text color
                },
                '& .MuiFormLabel-root': {
                  color: 'white', // Label color
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: 'white', // Label color on focus
                },
                '& .MuiSelect-icon': {
                  color: 'white'
                }
              }}
            >
              {heights.map((i) => (
                <MenuItem key={i} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-white">Marital Status Preference</h2>
          <TextField
            select
            label="Marital Status"
            variant="outlined"
            fullWidth
            SelectProps={{
              multiple: true, // Enable multiple selection
              value: maritalStatus,
              onChange: (e) => setMaritalStatus(e.target.value),
              renderValue: (selected) => selected.join(', '), // Display selected values
              style: { backgroundColor: '#492533', color: 'white' }, // Style for dropdown
              MenuProps: {
                PaperProps: {
                  style: { backgroundColor: '#492533', color: 'white' }, // Style for dropdown menu
                },
              },
            }}
            InputLabelProps={{
              style: { color: 'white' }, // Label color
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Border color
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiFormLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'white', // Label color on focus
              },
              '& .MuiSelect-icon': {
                color: 'white', // Dropdown arrow color
              },
            }}
          >



            {maritialStats.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                <Checkbox
                  checked={maritalStatus.indexOf(status.value) > -1}
                  style={{ color: 'white' }} // Checkbox color
                />
                {status.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <h2 className="mb-2 text-white">Education</h2>
          <TextField
            select
            label="Education"
            variant="outlined"
            fullWidth
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => selected.join(', '),
              MenuProps: {
                PaperProps: {
                  style: { backgroundColor: '#492533', color: 'white' },
                },
              },
            }}
            InputProps={{
              style: { backgroundColor: '#492533', color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Focus border color
                },
              },
              '& .MuiSelect-icon': {
                color: 'white', // Dropdown arrow color
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Label color on focus
              },
            }}
          >
            {educationList.map((level) => (
              <MenuItem key={level.value} value={level.value}>
                <Checkbox
                  checked={education.indexOf(level.value) > -1}
                  style={{ color: 'white' }} // Checkbox color
                />
                {level.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <h2 className="mb-2">Annual Income</h2>
          <TextField
            select
            label="Annual Income"
            variant="outlined"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            fullWidth
            InputProps={{
              style: { backgroundColor: '#492533', color: 'white' }, // Make text white
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Focus border color
                },
              },
              '& .MuiSelect-icon': {
                color: 'white', // Dropdown arrow color
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Label color on focus
              },
            }}
          >
            <MenuItem value="1000000">More than 10 lakh</MenuItem>
            <MenuItem value="2000000">More than 20 lakh</MenuItem>
            <MenuItem value="3000000">More than 30 lakh</MenuItem>
            <MenuItem value="4000000">More than 40 lakh</MenuItem>
            <MenuItem value="5000000">More than 50 lakh</MenuItem>
            <MenuItem value="7500000">More than 75 lakh</MenuItem>
            <MenuItem value="10000000">More than 1 Crore</MenuItem>
          </TextField>
        </div>

        <div>
          <h2 className="mb-2 text-white">Mangal Dosh</h2>
          <TextField
            select
            label="Mangal Dosh"
            variant="outlined"
            fullWidth
            value={mangalDosh}
            onChange={(e) => setMangalDosh(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Label color
            }}
            InputProps={{
              style: { backgroundColor: '#492533', color: 'white' },
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: { backgroundColor: '#492533', color: 'white' }, // Dropdown menu styling
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Focus border color
                },
              },
              '& .MuiSelect-icon': {
                color: 'white', // Dropdown arrow color
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Label color on focus
              },
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </div>

        <div>
          <h2 className="mb-2 text-white">Challenged</h2>
          <TextField
            select
            label="Challenged"
            variant="outlined"
            fullWidth
            value={challenged}
            onChange={(e) => setChallenged(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Label color
            }}
            InputProps={{
              style: { backgroundColor: '#492533', color: 'white' },
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: { backgroundColor: '#492533', color: 'white' }, // Dropdown menu styling
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Focus border color
                },
              },
              '& .MuiSelect-icon': {
                color: 'white', // Dropdown arrow color
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Label color on focus
              },
              '&:hover fieldset': {
                borderColor: '#F0D0A6', // Hover border color
              },
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </div>


        <button type="submit" variant="contained" color="primary" className="w-full border-white border h-12 rounded-lg bg-custom-c1 text-white">
          Apply Filters
        </button>
      </form>
    </Popover>
  );
};
