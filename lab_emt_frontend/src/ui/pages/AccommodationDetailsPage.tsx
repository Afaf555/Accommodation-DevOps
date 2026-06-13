import useAccommodationDetails from '../../hooks/useAccommodationDetails';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack, Category, Home } from '@mui/icons-material';

const AccommodationDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { accommodation, loading, error } = useAccommodationDetails(id!);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error || !accommodation) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography color="error">Error loading accommodation details</Typography>
                <Button startIcon={<ArrowBack/>} onClick={() => navigate('/accommodations')}>
                    Back to Accommodations
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link
                    to='/accommodations'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Accommodations
                </Link>
                <Typography color='text.primary'>{accommodation.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                            bgcolor: 'background.paper',
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 1
                        }}>
                            <Avatar
                                src='/placeholder-accommodation.jpg'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {accommodation.name}
                            </Typography>

                            <Typography variant='h5' color='primary.main' sx={{ mb: 3 }}>
                                {accommodation.condition}
                            </Typography>

                            <Typography variant='subtitle1' sx={{ mb: 3 }}>
                                {accommodation.numRooms} room(s) • {accommodation.isRented ? 'Rented' : 'Available'}
                            </Typography>

                            <Typography variant='body1' sx={{ mb: 3 }}>
                                Host: {accommodation.hostName} {accommodation.hostSurname}
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<Category/>}
                                    label={accommodation.category}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                                <Chip
                                    icon={<Home/>}
                                    label={`${accommodation.numRooms} Rooms`}
                                    color='secondary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant='outlined'
                            startIcon={<ArrowBack/>}
                            onClick={() => navigate('/accommodations')}
                        >
                            Back to Accommodations
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AccommodationDetailsPage;