import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/layout/Layout';
import HomePage from './ui/pages/HomePage';
import AccommodationsPage from './ui/pages/AccommodationsPage';
import AccommodationDetailsPage from './ui/pages/AccommodationDetailsPage';
import HostsPage from './ui/pages/HostsPage';
import HostDetailsPage from './ui/pages/HostDetailsPage';
import CountriesPage from './ui/pages/CountriesPage';
import CountryDetailsPage from './ui/pages/CountryDetailsPage';
import LoginPage from './ui/pages/LoginPage';
import RegisterPage from './ui/pages/RegisterPage';
import UsersPage from './ui/pages/UsersPage';
import ProtectedRoute from './ui/components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {}
                    <Route index element={<HomePage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />

                    {}
                    <Route element={<ProtectedRoute />}>
                        <Route path='accommodations' element={<AccommodationsPage />} />
                        <Route path='accommodations/:id' element={<AccommodationDetailsPage />} />

                        <Route path='hosts' element={<HostsPage />} />
                        <Route path='hosts/:id' element={<HostDetailsPage />} />

                        <Route path='countries' element={<CountriesPage />} />
                        <Route path='countries/:id' element={<CountryDetailsPage />} />

                        {}
                        <Route path='users' element={<UsersPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;