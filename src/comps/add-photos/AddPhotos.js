import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const UploadPage = () => {
  const [idCard, setIdCard] = useState(null);  // Stores the selected government ID file
  const [photos, setPhotos] = useState([]);  // Stores the selected photos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle file change for photos (multiple files allowed)
  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPhotos(prevPhotos => [...prevPhotos, ...filePreviews]);  // Add new photos to the list
  };

  // Handle file change for government ID (only one file allowed)
  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdCard(URL.createObjectURL(file));  // Preview the selected government ID
    }
  };

  // Handle delete of photos
  const handleDeletePhoto = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));  // Remove photo by index
  };

  // Handle delete of government ID
  const handleDeleteIdCard = () => {
    setIdCard(null);  // Remove the selected government ID
  };

  // Handle form submission (upload files to the backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idCard) {
      setError('Please upload a government ID.');
      return;
    }

    const formData = new FormData();
    // Add the government ID to the form data
    formData.append('idCard', e.target.idCard.files[0]);

    // Add the photos to the form data
    photos.forEach((photo, index) => {
      formData.append('photos', e.target.photos.files[index]);
    });

    try {
      setLoading(true);
      setError(null);

      // API call to upload the files (replace with your actual backend URL)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred while uploading.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#FEF5EC' }}>
      <Typography variant="h4" sx={{ color: '#492533', marginBottom: 2 }}>
        Upload Photos and Government ID
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Upload Government ID Section */}
        <Typography variant="h6" sx={{ color: '#492533', marginBottom: 2 }}>
          Upload Your Government ID (One File)
        </Typography>
        <TextField
          type="file"
          onChange={handleIdCardChange}
          fullWidth
          margin="normal"
          sx={{ color: '#492533' }}
          inputProps={{ accept: 'image/*' }}
        />

        {/* Preview Government ID */}
        {idCard && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <img
              src={idCard}
              alt="Uploaded ID Card"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            />
            <IconButton
              onClick={handleDeleteIdCard}
              sx={{
                marginLeft: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
              }}
            >
              <Close />
            </IconButton>
          </Box>
        )}

        {/* Upload Photos Section */}
        <Typography variant="h6" sx={{ color: '#492533', marginTop: 4, marginBottom: 2 }}>
          Upload Your Photos (Multiple Files)
        </Typography>
        <TextField
          type="file"
          onChange={handlePhotosChange}
          fullWidth
          margin="normal"
          sx={{ color: '#492533' }}
          inputProps={{ accept: 'image/*', multiple: true }}
        />

        {/* Preview Uploaded Photos */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
          {photos.map((photo, index) => (
            <Box key={index} sx={{ position: 'relative', margin: 1 }}>
              <img
                src={photo}
                alt={`Uploaded Photo ${index}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              />
              <IconButton
                onClick={() => handleDeletePhoto(index)}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <Close />
              </IconButton>
            </Box>
          ))}
        </Box>

        {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
        {success && <Typography color="success" sx={{ marginTop: 2 }}>Files uploaded successfully!</Typography>}

        {/* Submit button */}
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#F5D0A6',
              color: '#492533',
              '&:hover': { backgroundColor: '#CBAE8E' },
            }}
            disabled={loading || !idCard || photos.length === 0}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Files'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UploadPage;
