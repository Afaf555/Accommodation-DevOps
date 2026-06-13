import {
    Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Chip, Stack, Avatar, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Person, LocationOn } from '@mui/icons-material';
import useHostDetails from '../../../hooks/useHostDetails';

interface HostDetailsModalProps {
    open: boolean;
    onClose: () => void;
    hostId: string;
}

const HostDetailsModal = ({ open, onClose, hostId }: HostDetailsModalProps) => {
    const { host, loading, error } = useHostDetails(hostId);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Host Details</Typography>
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
                    <Typography color="error">Error loading host details</Typography>
                )}

                {!loading && !error && host && (
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Avatar
                                src="/placeholder-host.jpg"
                                variant="rounded"
                                sx={{ width: 200, height: 200 }}
                            />
                        </Box>

                        <Typography variant="h4" gutterBottom align="center">
                            {host.name} {host.surname}
                        </Typography>

                        <Typography variant="h6" color="primary" gutterBottom align="center">
                            Host
                        </Typography>

                        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mt: 3 }}>
                            <Chip icon={<Person />} label={`${host.name} ${host.surname}`} color="primary" />
                            <Chip icon={<LocationOn />} label={host.country.name} color="info" />
                        </Stack>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default HostDetailsModal;