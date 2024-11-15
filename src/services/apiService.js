// src/services/apiService.js
import axios from 'axios';
//import { AuthProvider } from '../comps/auth/authctx';
//import { useAuth } from '../comps/auth/authctx';

let apiClient = null; 
let apiClientUpload = null; 

export const initClient = (token) => { 
    apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
        'Authorization': `Bearer ${token}`
    },
});
    apiClientUpload = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    },
});
}

export const login = (data) => apiClient.post(`/api/v1/sign_in`, data);

export const register = (data) => apiClient.post(`/api/v1/sign_up`, data);

export const createProfile = (data) => apiClient.post('/api/v1/detail/profile', data);

export const aboutMeAndContact = (data) => apiClient.post('/api/v1/contacts', data);

export const resetPassword = (data) => apiClient.post('/api/v1/resetpassword', data);

export const profileCompletionStatus = () => apiClient.get('/api/v1/profile_completion');

export const uploadVerificationDoc = (formData) => apiClientUpload.post('/api/v1/verification/doc',formData);

export const uploadPics = (formData) => apiClientUpload.post('/api/v1/bulk/picb',formData);

export const getProfiles = (qp) => apiClient.get(`/api/v1/profiles${qp}`);
