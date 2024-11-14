import { Popover, TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import { useState } from 'react';

export const FilterMenu = ({ anchorEl, open, onClose }) => {
  console.log('rendering FilterMenu');
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit filter data
    console.log({
      nameSearch,
      ageFrom,
      ageTo,
      heightFrom,
      heightTo,
      maritalStatus,
      education,
      annualIncome,
      mangalDosh,
      challenged,
    });
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      className="p-6 rounded-lg shadow-lg max-w-lg"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        zIndex: 1300 }} // Popup background color and z-index to ensure it appears above content
    >
      <header className="flex justify-between items-center mb-4">
        <button onClick={handleClear} className="text-[#F5D0A6]">
          Clear All
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 text-custom-c4 bg-custom-c1">
        {/* Name Search */}
        <div>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            placeholder="Enter Name"
            InputProps={{
              style: { backgroundColor: '#492533' },
            }}
          />
        </div>

        {/* Age Filter */}
        <div>
          <h2 className="mb-2">Age should be between</h2>
          <div className="flex space-x-4">
            <TextField
              select
              label="From"
              value={ageFrom}
              onChange={(e) => setAgeFrom(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { backgroundColor: '#492533' },
              }}
            >
              {[...Array(61).keys()].map((age) => (
                <MenuItem key={age} value={age + 20}>
                  {age + 20} yrs
                </MenuItem>
              ))}
            </TextField>
            <span className="text-[#FEF5EC]">-</span>
            <TextField
              select
              label="To"
              value={ageTo}
              onChange={(e) => setAgeTo(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { backgroundColor: '#492533' },
              }}
            >
              {[...Array(61).keys()].map((age) => (
                <MenuItem key={age} value={age + 20}>
                  {age + 20} yrs
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        {/* Height Filter */}
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
            >
              {[...Array(21).keys()].map((i) => (
                <MenuItem key={i} value={(i + 4.5).toFixed(1)}>
                  {(i + 4.5).toFixed(1)} feet
                </MenuItem>
              ))}
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
            >
              {[...Array(21).keys()].map((i) => (
                <MenuItem key={i} value={(i + 4.5).toFixed(1)}>
                  {(i + 4.5).toFixed(1)} feet
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        {/* Marital Status Filter */}
        <div>
          <h2 className="mb-2">Marital Status Preference</h2>
          <TextField
            select
            label="Marital Status"
            multiple
            value={maritalStatus}
            onChange={(e) => setMaritalStatus([...e.target.selectedOptions].map(option => option.value))}
            variant="outlined"
            fullWidth
            InputProps={{
              style: { backgroundColor: '#492533' },
            }}
          >
            <MenuItem value="Unmarried">Unmarried</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
            <MenuItem value="Widowed">Widowed</MenuItem>
          </TextField>
        </div>

        {/* Education Filter */}
        <div>
          <h2 className="mb-2">Education</h2>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Education</InputLabel>
            <Select
              multiple
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              renderValue={(selected) => selected.join(', ')}
              style={{ backgroundColor: '#492533' }}
            >
              <MenuItem value="Undergraduate">Undergraduate</MenuItem>
              <MenuItem value="Graduate">Graduate</MenuItem>
              <MenuItem value="Post Graduate">Post Graduate</MenuItem>
              <MenuItem value="Masters">Masters</MenuItem>
              <MenuItem value="Doctorate">Doctorate</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Annual Income Filter */}
        <div>
          <h2 className="mb-2">Annual Income</h2>
          <TextField
            label="Annual Income"
            variant="outlined"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            placeholder="Enter Annual Income"
            fullWidth
            InputProps={{
              style: { backgroundColor: '#492533',textColor: 'white' },
            }}
          />
        </div>

        {/* Mangal Dosh Filter */}
        <div>
          <h2 className="mb-2">Mangal Dosh</h2>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Mangal Dosh</InputLabel>
            <Select
              value={mangalDosh}
              onChange={(e) => setMangalDosh(e.target.value)}
              style={{ backgroundColor: '#492533' }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Challenged Filter */}
        <div>
          <h2 className="mb-2">Challenged</h2>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Challenged</InputLabel>
            <Select
              value={challenged}
              onChange={(e) => setChallenged(e.target.value)}
              style={{ backgroundColor: '#492533' }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Submit Filter Button */}
        <Button type="submit" variant="contained" color="primary" className="mt-4 w-full">
          Apply Filters
        </Button>
      </form>
    </Popover>
  );
};
