import './App.css';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './comps/routing/routing';
import { AuthProvider } from './comps/auth/authctx';
import { SocketProvider } from './hooks/PhoenixHook'
import { FilterProvider } from './comps/filter/filterctx';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthProvider>
        <SocketProvider wsUrl='wss://levavivah.com/socket' >
            <FilterProvider >
          <div className="App">
            <ReactNotifications />
            <AppRouter />
          </div>
            </FilterProvider >
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
