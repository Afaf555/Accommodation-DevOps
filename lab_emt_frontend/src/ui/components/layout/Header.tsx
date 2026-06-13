import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component={Link} to='/' sx={{ flexGrow: 0, mr: 4, textDecoration: 'none', color: 'inherit' }}>
                    LAB EMT
                </Typography>

                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    <Button color='inherit' component={Link} to='/'>
                        HOME
                    </Button>
                    <Button color='inherit' component={Link} to='/accommodations'>
                        ACCOMMODATIONS
                    </Button>
                    <Button color='inherit' component={Link} to='/hosts'>
                        HOSTS
                    </Button>
                    <Button color='inherit' component={Link} to='/countries'>
                        COUNTRIES
                    </Button>

                    <Button color='inherit' component={Link} to='/users'>
                        USERS
                    </Button>
                </Box>

                {isAuthenticated && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant='body2'>
                            {user?.username} ({user?.role})
                        </Typography>
                        <Button color='inherit' onClick={handleLogout}>
                            LOGOUT
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;