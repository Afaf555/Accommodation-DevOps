import {
    Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Chip, Stack, Avatar, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {LocationOn, Public} from '@mui/icons-material';
import useCountryDetails from '../../../hooks/useCountryDetails';

interface CountryDetailsModalProps {
    open: boolean;
    onClose: () => void;
    countryId: string;
}

const CountryDetailsModal = ({open, onClose, countryId}: CountryDetailsModalProps) => {
    const {country, loading, error} = useCountryDetails(countryId);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h5">Country Details</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                {loading && (
                    <Box sx={{display: 'flex', justifyContent: 'center', py: 4}}>
                        <CircularProgress/>
                    </Box>
                )}

                {error && (
                    <Typography color="error">Error loading country details</Typography>
                )}

                {!loading && !error && country && (
                    <Box>
                        <Box sx={{display: 'flex', justifyContent: 'center', mb: 3}}>
                            <Avatar
                                src="/placeholder-country.jpg"
                                variant="rounded"
                                sx={{width: 200, height: 200}}
                            />
                        </Box>

                        <Typography variant="h4" gutterBottom align="center">
                            {country.name}
                        </Typography>

                        <Typography variant="h6" color="primary" gutterBottom align="center">
                            {country.continent}
                        </Typography>

                        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{mt: 3}}>
                            <Chip icon={<LocationOn/>} label={country.name} color="primary"/>
                            <Chip icon={<Public/>} label={country.continent} color="info"/>
                        </Stack>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CountryDetailsModal;