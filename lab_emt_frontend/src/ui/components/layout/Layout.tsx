import { Outlet } from 'react-router';
import { Container, Box } from '@mui/material';
import Header from './Header';

const Layout = () => {
    return (
        <Box sx={{ m: 0, p: 0 }}>
            <Header />
            <Container maxWidth='xl' sx={{ mt: 3, py: 3 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;