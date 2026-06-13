import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import type { User } from '../../../api/types/users';
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';
import UserDetailsModal from './UserDetailsModal';

interface UserCardProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
    const { isAdmin } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);

    const isUserAdmin = user.role === 'ROLE_ADMIN';

    return (
        <>
            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {isUserAdmin ? (
                            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                        ) : (
                            <PersonIcon sx={{ fontSize: 40, color: 'text.secondary', mr: 1 }} />
                        )}
                        <Typography variant='h5'>{user.username}</Typography>
                    </Box>

                    <Chip
                        label={isUserAdmin ? 'ADMIN' : 'USER'}
                        color={isUserAdmin ? 'error' : 'default'}
                        size='small'
                    />
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<InfoIcon />}
                        onClick={() => setModalOpen(true)}
                    >
                        Info
                    </Button>
                    {isAdmin && (
                        <Box>
                            <Button
                                startIcon={<EditIcon />}
                                color='warning'
                                onClick={() => onEdit(user)}
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<DeleteIcon />}
                                color='error'
                                onClick={() => onDelete(user.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}
                </CardActions>
            </Card>

            <UserDetailsModal
                user={user}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
};

export default UserCard;