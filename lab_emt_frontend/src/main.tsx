import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import SnackbarProvider from './providers/snackbarProvider';
import AccommodationsProvider from './providers/accommodationsProvider';
import HostsProvider from './providers/hostsProvider';
import CountriesProvider from './providers/countriesProvider';
import UsersProvider from './providers/usersProvider';  // ← ДОДАЈ ГО ОВА!

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SnackbarProvider>
            <AuthProvider>
                <AccommodationsProvider>
                    <HostsProvider>
                        <CountriesProvider>
                            <UsersProvider>  {}
                                <App />
                            </UsersProvider>
                        </CountriesProvider>
                    </HostsProvider>
                </AccommodationsProvider>
            </AuthProvider>
        </SnackbarProvider>
    </StrictMode>,
);