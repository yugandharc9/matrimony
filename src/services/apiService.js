// src/services/apiService.js
import axios from 'axios';
//import { AuthProvider } from '../comps/auth/authctx';
//import { useAuth } from '../comps/auth/authctx';

let apiClient = null; 

export const initClient = (token) => { 
    apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
        'Authorization': `Bearer ${token}`
    },
});
}

export const login = (data) => apiClient.post(`/api/v1/sign_in`, data);

export const register = (data) => apiClient.post(`/api/v1/sign_up`, data);

export const createProfile = (data) => apiClient.post('/api/v1/detail/profile', data);

export const aboutMeAndContact = (data) => apiClient.post('/api/v1/contacts', data);

export const resetPassword = (data) => apiClient.post('/api/v1/resetpassword', data);

export const profileCompletionStatus = () => apiClient.get('/api/v1/profile_completion');
