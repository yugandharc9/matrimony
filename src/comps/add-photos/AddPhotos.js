import React, { useState, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { BaseLayout, BaseForm } from '../layout/BaseLayout';
import { FormButton } from '../button/button';
import { uploadPics, deletePic } from '../../services/apiService';
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { useNavigate } from 'react-router-dom';
import { useMyProfileData } from '../my-profile-data/myprofilectx';
import { ConfirmDialog } from '../dialog/ConfirmDialog';

const UploadPicsPage = () => {
  const [idCards, setIdCards] = useState([]); // Stores the selected files
  const [previews, setPreviews] = useState([]); // Stores the preview URLs
  const formRef = useRef();
  const btnRef = useRef();
  const fileRef = useRef();
  const currentDeletePicID = useRef();
  const deleteConfirmDialogRef = useRef();
  const { token } = useAuth();
  const { myProfileData, updateProfileData } = useMyProfileData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idCards.length === 0) {
      showNotification('danger', '', 'Please select at least one file.', 2000);
      return;
    }
    const formData = new FormData();
    idCards.forEach((file, index) => {
      formData.append(`img_upload_${index}`, file); // Add each file to FormData
    });

    btnRef.current?.setLoadingOn();

    try {
      const response = await uploadPics(token, formData);
      showNotification('success', '', 'Upload successful', 2000);
      navigate('/profiles');
    } catch (e) {
      navigate('/profiles');
      showNotification('danger', '', 'Something went wrong', 2000);
    } finally {
      updateProfileData();
      btnRef.current?.setLoadingOff();
    }
  };

  const handleDeleteIdCard = (index) => {
    setIdCards((prevIdCards) => {
      const updatedIdCards = prevIdCards.filter((_, i) => i !== index);
      if (updatedIdCards.length === 0) {
        fileRef.current.value = '';
      }
      return updatedIdCards;
    });

    setPreviews((prevPreviews) => {
      const updatedPreviews = prevPreviews.filter((_, i) => i !== index);
      return updatedPreviews;
    });
  };

  const handleIdCardChange = (e) => {
    const filesArray = Array.from(e.target.files);
    console.log(e);
    var err = false;
    for (let i = 0; i < filesArray.length; i++) {
      let fileObj = filesArray[i];
      console.log('file ext', fileObj.type);
      if (!fileObj.type.startsWith('image/')) {
        err = true;
        break;
      }
    }
    if (!err) {
      setIdCards((prevIdCards) => [...prevIdCards, ...filesArray]); // Update files array
      setPreviews((prevPreviews) => [
        ...prevPreviews,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ]); // Generate preview URLs
    } else {
      setIdCards([]);
      setPreviews([]);
      fileRef.current.value = '';
      showNotification(
        'danger',
        'Invalid filetype ',
        'Only images are allowed',
        3000
      );
    }
  };

  const confirmedDelete = async () => {
    console.log('Delete confirmed', currentDeletePicID.current);
    try {
      const response = await deletePic(token, currentDeletePicID.current);
      if (response.status === 204) {
        showNotification('success', '', 'Picture deleted successfully', 2000);
        updateProfileData();
      }
    } catch (e) {
      showNotification('danger', '', 'Something went wrong', 2000);
    } finally {
      currentDeletePicID.current = null;
    }
  };

  const handleDeletePicFromDb = (picId) => {
    if (picId) {
      currentDeletePicID.current = picId;
      deleteConfirmDialogRef.current.openDialog();
    }
  };

  return (
    <BaseLayout bottomBar={false}>
      <BaseForm ref={formRef} handleSubmit={handleSubmit} className='m-20'>
        <ConfirmDialog
          ref={deleteConfirmDialogRef}
          onConfirm={confirmedDelete}
          message={`Do you want to delete this picture?`}
        />
        <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2 mt-8 md:mt-12 lg:mt-16'>
          Upload your photos
        </h1>
        <hr className='w-4/5 h-2 border-custom-c2' />
        <input
          type='file'
          className='text-white bg-custom-c1'
          ref={fileRef}
          multiple
          placeholder='Hi'
          onChange={handleIdCardChange}
          required
        />

        <div className='flex gap-10 flex-col mx-auto'>
          {myProfileData?.pics.map((p) => (
            <Box key={p.id} sx={{}} className='flex'>
              <img
                src={p.url}
                alt='Uploaded ID Card'
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
                className='h-[35vh] w-[35vw] object-cover'
              />
              <div className='relative top-[-2px] right-[-4px]'>
                <IconButton
                  onClick={() => handleDeletePicFromDb(p.id)} // Pass the id to delete specific file
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    edge: 'end',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  <Close />
                </IconButton>
              </div>
            </Box>
          ))}
          {previews.map((p, index) => (
            <Box key={index} sx={{}} className='flex'>
              <img
                src={p}
                alt='Uploaded ID Card'
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
                className='h-[35vh] w-[35vw] object-cover'
              />
              <div className='relative top-[-2px] right-[-4px]'>
                <IconButton
                  onClick={() => handleDeleteIdCard(index)} // Pass the index to delete specific file
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    edge: 'end',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  <Close />
                </IconButton>
              </div>
            </Box>
          ))}
        </div>
        <FormButton
          name={previews.length > 1 ? 'Upload All' : 'Upload'}
          ref={btnRef}
          type='submit'
          onClick={() => ''}
        />
      </BaseForm>
    </BaseLayout>
  );
};

export default UploadPicsPage;


