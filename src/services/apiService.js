import axios from 'axios';

let client = null;

let uploadClient = null;

const apiClient = (token) => {
    if (!client) {
        client = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
                'Authorization': `Bearer ${token}`
            },
        })
    }
    return client;
}

const apiUpload = (token) => {
    if (!uploadClient) {
        uploadClient = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
                'Authorization': `Bearer ${token}`
            },
        })
    }
    return uploadClient;
}

export const login = (data) => axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
    },
}).post(`/api/v1/sign_in`, data);

export const register = (data) => axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
    },
}).post(`/api/v1/sign_up`, data);

export const resetPassword = (data) => axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
    },
}).post('/api/v1/resetpassword', data);

export const profileCompletionStatus = (token) => apiClient(token).get('/api/v1/profile_completion');

export const createProfile = (token, data) => apiClient(token).post('/api/v1/detail/profile', data);

export const aboutMeAndContact = (token, data) => apiClient(token).post('/api/v1/contacts', data);

export const uploadVerificationDoc = (token, formData) => apiUpload(token).post('/api/v1/verification/doc', formData);

export const uploadPics = (token, formData) =>  apiUpload(token).post('/api/v1/bulk/picb', formData);

export const getProfiles = (token, qp) => apiClient(token).get(`/api/v1/profiles${qp}`);

export const getMyBioData = (token,) => apiClient(token).get(`/api/v1/biodata`);

export const getBioDataOfProfile = (token, pid) => apiClient(token).get(`/api/v1/profiles/biodata?pid=${pid}`);

export const getSavedProfiles = (token) => { apiClient(token).get(`/api/v1/bookmarks/`) };

export const unsaveProfile = (token, profileId) => { apiClient(token).delete(`/api/v1/bookmarks/${profileId}`) };

export const saveProfile = (token, userId) => { apiClient(token).post(`/api/v1/bookmarks`, { bookmark: { to: userId } }) };

export const createChatRequest = (token, id) => { apiClient(token).post(`/api/v1/chatrequests/`, { chat_request: { to: id } }) };

export const cancelChatRequest = (token, id) => { apiClient(token).delete(`/api/v1/chatrequests/` + id + "/") }

export const listPendingRejectedChatRequest = (token) => { apiClient(token).get("/api/v1/chatrequests/?accepted=false&from=0"); }

export const acceptChatRequest = (token, profileId) => { apiClient(token).post("/api/v1/chatrequests/", { id: profileId, chat_request: { accepted: true, declined: false } }); }

export const declineChatRequest = (token, profileId) => { apiClient(token).post("/api/v1/chatrequests/", { id: profileId, chat_request: { accepted: false, declined: true } }); }

export const blockChatRequest = (token, profileId) => { apiClient(token).post("/api/v1/block/", { block_request: { profileId: profileId } }); }

export const unblockChatRequest = (token, profileId) => { apiClient(token).post("/api/v1/unblock/", { unblock_request: { profileId: profileId } }) };

export const isThisProfileBlocked = (token, profileId) => { apiClient(token).get(`/api/v1/isblock/?profileId=${profileId}`); }

export const myPics = (token,) => apiClient(token).get('/api/v1/pics');

export const getInvites = (token,) => apiClient(token).get('/api/v1/invites');

export const sendMessageToUser = (token, to, payload) => { apiClient(token).post("/api/v1/message/", { message: { to: to, message: payload } }) };

export const getChatThreadForUser = (token,) => { apiClient(token).get("/api/v1/message/") };

export const getChatForProfile = (token, profileId, offset) => { apiClient(token).get(`/api/v1/message/${profileId}/*/${offset}`) };

export const triggerFirstCountOnLoad = (token,) => { apiClient(token).get(`/api/v1/counts/subscribe`) };

export const capturePayment = (token, payment_id, amount) => { apiClient(token).post(`/api/v1/payments/`, { payment: { payment_id: payment_id, amount: amount } }) }