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
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return client;
};

const apiUpload = (token) => {
  if (!uploadClient) {
    uploadClient = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return uploadClient;
};

export const login = (data) =>
  axios
    .create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
      },
    })
    .post(`/api/v1/sign_in`, data);

export const register = (data) =>
  axios
    .create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
      },
    })
    .post(`/api/v1/sign_up`, data);

export const resetPassword = (data) =>
  axios
    .create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': process.env.REACT_APP_SERVER_HEADER,
      },
    })
    .post('/api/v1/resetpassword', data);

export const profileCompletionStatus = (token) =>
  apiClient(token).get('/api/v1/profile_completion');

export const createProfile = (token, data) =>
  apiClient(token).post('/api/v1/detail/profile', data);

export const aboutMeAndContact = (token, data) =>
  apiClient(token).post('/api/v1/contacts', data);

export const uploadVerificationDoc = (token, formData) =>
  apiUpload(token).post('/api/v1/verification/doc', formData);

// upload pics
export const uploadPics = (token, formData) =>
  apiUpload(token).post('/api/v1/bulk/picb', formData);

export const getProfiles = (token, qp) =>
  apiClient(token).get(`/api/v1/profiles${qp}`);

export const getProfile = (token, profileID) =>
  apiClient(token).get(`/api/v1/profiles/${profileID}`);

export const getMyProfile = (token) =>
  apiClient(token).get(`/api/v1/myprofile`);

export const getMyBioData = (token) => apiClient(token).get(`/api/v1/biodata`);

export const getBioDataOfProfile = (token, userID) =>
  apiClient(token).get(`/api/v1/profile/biodata?pid=${userID}`);

export const getSavedProfiles = (token) => {
  apiClient(token).get(`/api/v1/bookmarks/`);
};

export const unsaveProfile = (token, profileId) => {
  apiClient(token).delete(`/api/v1/bookmarks/${profileId}`);
};

export const saveProfile = (token, profileID) =>
  apiClient(token).post(`/api/v1/bookmarks`, { bookmark: { to: profileID } });

export const createChatRequest = (token, profileID) =>
  apiClient(token).post(`/api/v1/chatrequests`, {
    chat_request: { to: profileID },
  });

export const cancelChatRequest = (token, profileID) => {
  apiClient(token).delete(`/api/v1/chatrequests/` + profileID + '/');
};

export const listPendingChatRequest = (token) =>
  apiClient(token).get('/api/v1/chatrequests/?accepted=false&from=0');

export const acceptChatRequest = (token, profileId) =>
  apiClient(token).post('/api/v1/chatrequests/', {
    id: profileId,
    chat_request: { accepted: true, declined: false },
  });

export const declineChatRequest = (token, profileId) =>
  apiClient(token).post('/api/v1/chatrequests/', {
    id: profileId,
    chat_request: { accepted: false, declined: true },
  });

export const blockChatRequest = (token, profileId) =>
  apiClient(token).post('/api/v1/block/', {
    block_request: { profileId: profileId },
  });

export const unblockChatRequest = (token, profileId) =>
  apiClient(token).post('/api/v1/unblock/', {
    unblock_request: { profileId: profileId },
  });

export const isThisProfileBlocked = (token, profileId) =>
  apiClient(token).get(`/api/v1/isblock/?profileId=${profileId}`);

export const myPics = (token) => apiClient(token).get('/api/v1/pics');

export const getInvites = (token) => apiClient(token).get('/api/v1/invites');

export const sendMessageToUser = (token, to, payload) =>
  apiClient(token).post('/api/v1/message/', {
    message: { to: to, message: payload },
  });

export const getChatThreadForUser = (token, limit, offset) =>
  apiClient(token).get(`/api/v1/chat/threads?limit=${limit}&offset=${offset}`);

export const getChatForProfile = (token, profileId, offset) =>
  apiClient(token).get(`/api/v1/message/${profileId}*${offset}`);

export const triggerFirstCountOnLoad = (token) => {
  apiClient(token).get(`/api/v1/counts/subscribe`);
};

export const capturePayment = (token, payment_id, amount) =>
  apiClient(token).post(`/api/v1/payments/`, {
    payment: { payment_id: payment_id, amount: amount },
  });

export const createOrder = (token, amount) =>
  apiClient(token).get(`/api/v1/order?amount=${amount}`);

// to delete pic
export const deletePic = (token, id) =>
  apiClient(token).delete(`/api/v1/pics/` + id);

// to edit profile
export const updateProfile = (token, id, payload) =>
  apiClient(token).put(`/api/v1/profiles/` + id + '/', {
    id: id,
    profile: payload,
  });

// to set profile pic
export const setProfilePic = (token, id) => {
  apiClient(token).put(`/api/v1/set/profile/pic`, { id: id });
};

// get all plans
export const getAllPlansDetails = () => apiClient().get(`/all/plans`);

// getProfiles with only view access
export const getProfilesForView = (qp) =>
  apiClient().get(`/api/v1/view/profiles/${qp}`);

// getProfile by id with only view access
export const getProfileByIdForView = (profileID) =>
  apiClient().get(`/api/v1/view/profile?id=${profileID}`);


