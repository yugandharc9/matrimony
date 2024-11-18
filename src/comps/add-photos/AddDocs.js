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
  useEffect(() =>{navigate("/profiles")},[]); 
  const [idCard, setIdCard] = useState(null);  // Stores the selected government ID file
  const [preview, setPreview] = useState(null); // Stores the preview URL
  const formRef = useRef();
  const btnRef = useRef();
  const fileRef = useRef();
  const {token} = useAuth();
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
      const response = await uploadVerificationDoc(token,formData);
      navigate("/profiles");
    } catch (e) {
      showNotification("danger","","Something went wrong",2000);
      navigate("/profiles");
    } finally {
      btnRef.current?.setLoadingOff();
    }
  };

  const handleDeleteIdCard = () => {
    fileRef.current.value = ""; // Clear the file input
    setIdCard(null);
    setPreview(null); // Remove the preview URL
  };

  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdCard(file); // Store the file
      setPreview(URL.createObjectURL(file)); // Create a preview URL
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
          className='text-white bg-custom-c1'
          ref={fileRef}
          placeholder='Hi'
          onChange={handleIdCardChange}
          required
        />

        <div className='flex flex-row mx-auto'>
          {preview && (
            <Box sx={{}}>
              <img
                src={preview}
                alt="Uploaded ID Card"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              />
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
