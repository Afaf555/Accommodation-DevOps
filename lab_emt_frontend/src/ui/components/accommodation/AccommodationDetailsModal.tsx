import {
    Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Chip, Stack, Avatar, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Category, Home, LocationOn } from '@mui/icons-material';
import useAccommodationDetails from '../../../hooks/useAccommodationDetails';

interface AccommodationDetailsModalProps {
    open: boolean;
    onClose: () => void;
    accommodationId: string;
}

const AccommodationDetailsModal = ({ open, onClose, accommodationId }: AccommodationDetailsModalProps) => {
    const { accommodation, loading, error } = useAccommodationDetails(accommodationId);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Accommodation Details</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography color="error">Error loading accommodation details</Typography>
                )}

                {!loading && !error && accommodation && (
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Avatar
                                src="/placeholder-accommodation.jpg"
                                variant="rounded"
                                sx={{ width: 200, height: 200 }}
                            />
                        </Box>

                        <Typography variant="h4" gutterBottom align="center">
                            {accommodation.name}
                        </Typography>

                        <Typography variant="h6" color="primary" gutterBottom align="center">
                            {accommodation.condition}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 2 }} align="center">
                            {accommodation.numRooms} room(s) • {accommodation.isRented ? 'Rented' : 'Available'}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3 }} align="center">
                            Host: {accommodation.hostName} {accommodation.hostSurname}
                        </Typography>

                        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                            <Chip icon={<Category />} label={accommodation.category} color="primary" />
                            <Chip icon={<Home />} label={`${accommodation.numRooms} Rooms`} color="secondary" />
                        </Stack>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AccommodationDetailsModal;