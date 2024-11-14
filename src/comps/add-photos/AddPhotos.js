import React, { useState, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { BaseLayout, BaseForm } from '../layout/BaseLayout';
import { FormButton } from '../button/button';
import { uploadPics, uploadVerificationDoc } from '../../services/apiService';
import showNotification from '../notify/notify';

const UploadPicsPage = () => {
    const [idCards, setIdCards] = useState([]);  // Stores the selected files
    const [previews, setPreviews] = useState([]); // Stores the preview URLs
    const formRef = useRef();
    const btnRef = useRef();
    const fileRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (idCards.length === 0) {
            showNotification("danger", "", "Please select at least one file.",2000);
            return;
        }
        const formData = new FormData();
        idCards.forEach((file, index) => {
            formData.append(`img_upload_${index}`, file); // Add each file to FormData
        });

        btnRef.current?.setLoadingOn();

        try {
            const response = await uploadPics(formData);
            showNotification("success", "", "Upload successful",2000);
        } catch (e) {
            showNotification("danger", "", "Something went wrong",2000);
        } finally {
            btnRef.current?.setLoadingOff();
        }
    };

    const handleDeleteIdCard = (index) => {
        setIdCards((prevIdCards) => prevIdCards.filter((_, i) => i !== index));
        setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    const handleIdCardChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setIdCards(filesArray); // Update files array
        setPreviews(filesArray.map((file) => URL.createObjectURL(file))); // Generate preview URLs
    };

    return (
        <BaseLayout bottomBar={false}>
            <BaseForm ref={formRef} handleSubmit={handleSubmit} className="m-20">
                <h1 className="mr-auto ml-auto text-left text-xl text-custom-c2 mt-8 md:mt-12 lg:mt-16">Upload your photos</h1>
                <hr className="w-4/5 h-2 border-custom-c2" />
                <input
                    type="file"
                    className='text-white bg-custom-c1'
                    ref={fileRef}
                    multiple
                    placeholder='Hi'
                    onChange={handleIdCardChange}
                    required
                />

                <div className='flex flex-col mx-auto'>
                    {previews.map((p, index) => (
                        <Box key={index} sx={{}}>
                            <img
                                src={p}
                                alt="Uploaded ID Card"
                                style={{
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                }}
                            />
                            <IconButton
                                onClick={() => handleDeleteIdCard(index)}  // Pass the index to delete specific file
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
                    ))}
                </div>
                <FormButton name={previews.length > 1 ? "Upload All" : "Upload"} ref={btnRef} onClick={() => { }} type="submit" />
            </BaseForm>
        </BaseLayout>
    );
};

export default UploadPicsPage;
