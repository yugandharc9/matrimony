import LoginPage from "../login-page/LoginPage"
import RegisterPage from "../register-page/RegisterPage"
import AddProfileInfoPage  from "../add-profile-info/AddProfileInfoPage"
import { Routes, Route } from 'react-router-dom';
import ProfilesPage from "../profiles-page/ProfilesPage";
import ChatPage from "../chat-page/ChatPage";
import FeaturedAdvertisingPage from "../advt-page/AdvtPage";
import SentChatRequestsPage from "../sent-chat/SentChat";
import ReceivedChatRequestsPage from "../recv-chat/RecvChat";
import MyChatsPage from "../my-chats/MyChats";
import SubscriptionsPage from "../subscriptions/subscriptions";
import UploadDocPage from "../add-photos/AddDocs";
import UploadPicsPage from "../add-photos/AddPhotos";
import {FilterMenu} from "../filter/FilterMenu";

const AppRouter = () => {
   return ( <div>
    <Routes>
      <Route path="/" element={<FilterMenu open={true} />} /> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/info" element={<AddProfileInfoPage operation="create" />} />
      <Route path="/update/info" element={<AddProfileInfoPage operation="update" />} />
      <Route path="/profiles" element={<ProfilesPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/featured" element={<FeaturedAdvertisingPage />} />
      <Route path="/my-chats" element={<MyChatsPage />} />
      <Route path="/received-requests" element={<ReceivedChatRequestsPage />} />
      <Route path="/sent-requests" element={<SentChatRequestsPage />} /> 
      <Route path="/subscription" element={<SubscriptionsPage />} /> 
      <Route path="/upload/doc" element={<UploadDocPage />} /> 
      <Route path="/upload/pics" element={<UploadPicsPage />} /> 
    </Routes>
  </div>)
}

export default AppRouter;