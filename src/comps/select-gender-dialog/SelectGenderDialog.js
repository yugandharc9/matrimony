import React, { useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

function SelectGenderDialog({
  open,
  onClose,
  setGenderModal,
  selectedGenderForView,
}) {
  const [gender, setGender] = React.useState('male');

  useEffect(() => {
    if (selectedGenderForView !== '') {
      // this is opposite as we store the value that needs to be fetched i.e the opposite gender so in setting in drop we set what was selected
      setGender(selectedGenderForView === 'male' ? 'female' : 'male');
    }
  }, [selectedGenderForView]);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async () => {
    const previousSelectedGender =
      selectedGenderForView !== ''
        ? selectedGenderForView === 'male'
          ? 'female'
          : 'male'
        : '';

    if (previousSelectedGender !== gender) {
      onClose(gender);
    } else {
      setGenderModal(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose();
        }
      }}
      PaperProps={{ style: { backgroundColor: '#492533', color: '#fff' } }}
    >
      <DialogTitle>Select your gender</DialogTitle>
      <DialogContent sx={{ paddingBottom: '0px' }}>
        <FormControl>
          <RadioGroup
            aria-labelledby='selected-gender-label'
            name='radio-buttons-group'
            value={gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value='male'
              control={
                <Radio
                  sx={{ color: '#fff', '&.Mui-checked': { color: '#f0d0a6' } }}
                />
              }
              label={
                <span style={{ color: gender === 'male' ? '#f0d0a6' : '#fff' }}>
                  Male
                </span>
              }
            />
            <FormControlLabel
              value='female'
              control={
                <Radio
                  sx={{ color: '#fff', '&.Mui-checked': { color: '#f0d0a6' } }}
                />
              }
              label={
                <span
                  style={{ color: gender === 'female' ? '#f0d0a6' : '#fff' }}
                >
                  Female
                </span>
              }
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          sx={{
            border: '1px solid #fff',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              border: '1px solid #fff',
              color: '#fff',
            },
          }}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectGenderDialog;


