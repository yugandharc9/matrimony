import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { BaseLayout, BaseForm } from '../layout/BaseLayout';
import { FormButton } from '../button/button';
import { uploadVerificationDoc } from '../../services/apiService';
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { useNavigate } from 'react-router-dom';

const UploadDocPage = () => {
  const [idCard, setIdCard] = useState(null);  // Stores the selected government ID file
  const [preview, setPreview] = useState(null); // Stores the preview URL
  const formRef = useRef();
  const btnRef = useRef();
  const fileRef = useRef();
  const { token } = useAuth();
  const [fileType, setFileType] = useState(null); // Track the type of file (image or PDF)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idCard) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("img_upload", idCard); // Directly add the file to FormData
    btnRef.current?.setLoadingOn();

    try {
      const response = await uploadVerificationDoc(token, formData);
      navigate("/login");
    } catch (e) {
      showNotification("danger", "", "Something went wrong", 2000);
      navigate("/login");
    } finally {
      btnRef.current?.setLoadingOff();
    }
  };

  const handleDeleteIdCard = () => {
    fileRef.current.value = null // Clear the file input
    setIdCard(null);
    setPreview(null); // Remove the preview URL
  };

  const handleIdCardChange = (e) => {
    setIdCard(null);
    setPreview(null); 
    setFileType(null);
    const file = e.target.files[0];
    console.log('file type is ', file.type);
    if (file) {
      if (file.type.startsWith('image/')) {
        setIdCard(file);
        setPreview(URL.createObjectURL(file)); // Create a preview URL
        setFileType('image');
      } else if (file.type.startsWith('application/pdf')) {
        setIdCard(file);
        setPreview(URL.createObjectURL(file)); // Create a preview URL
        setFileType('pdf');
      } else {
        showNotification("danger", "Invalid filetype ", "Image or pdf is allowed", 3000);
        setIdCard(null);
        fileRef.current.value = null;
      }
    }
  }

  return (
    <BaseLayout bottomBar={false}>
      <BaseForm ref={formRef} handleSubmit={handleSubmit} className="m-20">
        <h1 className="mr-auto ml-auto text-left text-xl text-custom-c2 mt-8 md:mt-12 lg:mt-16">Government ID Verification</h1>
        <hr className="w-4/5 h-2 border-custom-c2" />
        <input
          name="idPicker"
          type="file"
          accept="image/*,application/pdf"
          className='text-white bg-custom-c1'
          ref={fileRef}
          onChange={handleIdCardChange}
          required
        />

        <div className='flex flex-row mx-auto'>
          {preview && (
            <Box sx={{}}>
              {fileType == 'image' ? (<img
                src={preview}
                alt="Uploaded ID Card"
                className='text-custom-c4'
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              />) : (<embed
                src={preview}
                type="application/pdf"
                className="w-full max-w-xs h-60 border rounded"
              />)}
              <IconButton
                onClick={handleDeleteIdCard}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  edge: 'end',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <Close />
              </IconButton>
            </Box>
          )}
        </div>
        <FormButton name="Verify" ref={btnRef} onClick={() => { }} type="submit" />
      </BaseForm>
    </BaseLayout>
  );
};

export default UploadDocPage;
