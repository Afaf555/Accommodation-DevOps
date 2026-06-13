import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import type { User } from '../../../api/types/users';

interface UserDetailsModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

const UserDetailsModal = ({ user, open, onClose }: UserDetailsModalProps) => {
    const isUserAdmin = user.role === 'ROLE_ADMIN';

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle>
                User Details
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                    {isUserAdmin ? (
                        <AdminPanelSettingsIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    ) : (
                        <PersonIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    )}

                    <Typography variant='h4' gutterBottom>
                        {user.username}
                    </Typography>

                    <Chip
                        label={isUserAdmin ? 'ADMINISTRATOR' : 'USER'}
                        color={isUserAdmin ? 'error' : 'default'}
                        sx={{ mb: 2 }}
                    />

                    <Typography variant='body2' color='text.secondary'>
                        User ID: {user.id}
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsModal;