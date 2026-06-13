import useHostDetails from '../../hooks/useHostDetails';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack, LocationOn, Person } from '@mui/icons-material';

const HostDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { host, loading, error } = useHostDetails(id!);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error || !host) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography color="error">Error loading host details</Typography>
                <Button startIcon={<ArrowBack/>} onClick={() => navigate('/hosts')}>
                    Back to Hosts
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link
                    to='/hosts'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Hosts
                </Link>
                <Typography color='text.primary'>{host.name} {host.surname}</Typography>
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
                                src='/placeholder-host.jpg'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {host.name} {host.surname}
                            </Typography>

                            <Typography variant='h5' color='primary.main' sx={{ mb: 3 }}>
                                Host
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<Person/>}
                                    label={`${host.name} ${host.surname}`}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                                <Chip
                                    icon={<LocationOn/>}
                                    label={host.country.name}
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
                            onClick={() => navigate('/hosts')}
                        >
                            Back to Hosts
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default HostDetailsPage;