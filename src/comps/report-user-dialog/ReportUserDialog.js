import React, { useRef } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { InputArea } from '../input/input';

function ReportUserDialog({ open, onClose, onSubmit }) {
  const reportText = useRef();

  const handleSubmit = async () => {
    if (reportText.current.getVal() === '') return;
    else {
      onSubmit(reportText.current.getVal());
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
      <DialogTitle>Report User</DialogTitle>
      <DialogContent sx={{ paddingBottom: '0px' }}>
        <InputArea
          placeholder='Enter your report here'
          ref={reportText}
          isRequired={false}
          rows={4}
          labelName=''
        />
      </DialogContent>
      <DialogActions sx={{ padding: '10px 24px' }}>
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
            margin: '10px 0px',
          }}
        >
          Submit
        </Button>
        <Button
          onClick={onClose}
          sx={{
            border: '1px solid #fff',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              border: '1px solid #fff',
              color: '#fff',
            },
            margin: '10px 0px',
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReportUserDialog;


