import React, { useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

function SelectGenderDialog({ open, onClose, selectedGenderForView }) {
  const [gender, setGender] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    if (selectedGenderForView !== '') {
      // this is opposite as we store the value that needs to be fetched i.e the opposite gender so in setting in drop we set what was selected
      setGender(selectedGenderForView === 'male' ? 'Female' : 'Male');
    }
  }, [selectedGenderForView]);

  const handleChange = (event) => {
    setIsError(false);
    setGender(event.target.value);
  };

  const handleSubmit = async () => {
    if (gender === '') {
      setIsError(true);
      return;
    }
    onClose(gender.toLowerCase());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select your gender</DialogTitle>
      <DialogContent sx={{ paddingBottom: '0px' }}>
        <FormControl fullWidth>
          <Select
            error={isError}
            displayEmpty
            labelId='selected-gender-label'
            value={gender}
            label='Gender'
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select Gender</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value=''>
              <em>Select Gender</em>
            </MenuItem>
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
          </Select>
          {isError && (
            <FormHelperText error={true} sx={{ margin: '5px 0px' }}>
              This is required!
            </FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color='primary'>
          Fetch Profile
        </Button>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectGenderDialog;

