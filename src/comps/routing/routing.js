import LoginPage from "../login-page/LoginPage"
import RegisterPage from "../register-page/RegisterPage"
import AddProfileInfoPage  from "../add-profile-info/AddProfileInfoPage"
import { Routes, Route } from 'react-router-dom';
import AboutMePage from "../about-me-page/AboutMePage";

const AppRouter = () => {
   return ( <div>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/add-profile-info" element={<AddProfileInfoPage />} />
      <Route path="/aboutme" element={<AboutMePage />} />
    </Routes>
  </div>)
}

export default AppRouter;