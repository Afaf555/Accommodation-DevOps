import useCountryDetails from '../../hooks/useCountryDetails';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack, Public, LocationOn } from '@mui/icons-material';

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { country, loading, error } = useCountryDetails(id!);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error || !country) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography color="error">Error loading country details</Typography>
                <Button startIcon={<ArrowBack/>} onClick={() => navigate('/countries')}>
                    Back to Countries
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link
                    to='/countries'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Countries
                </Link>
                <Typography color='text.primary'>{country.name}</Typography>
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
                                src='/placeholder-country.jpg'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {country.name}
                            </Typography>

                            <Typography variant='h5' color='primary.main' sx={{ mb: 3 }}>
                                {country.continent}
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<LocationOn/>}
                                    label={country.name}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                                <Chip
                                    icon={<Public/>}
                                    label={country.continent}
                                    color='info'
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
                            onClick={() => navigate('/countries')}
                        >
                            Back to Countries
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CountryDetailsPage;