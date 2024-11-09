import './App.css';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './comps/routing/routing';
import { AuthProvider } from './comps/auth/authctx';
import { initClient } from './services/apiService'

function App() {
  let token = localStorage.getItem("token");
  initClient(token);
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <ReactNotifications />
          <AppRouter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
