import { useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import useUsers from '../../hooks/useUsers';
import UserGrid from '../components/user/UserGrid';
import UserFormModal from '../components/user/UserFormModal';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import type { User } from '../../api/types/users';

const UsersPage = () => {
    const { users, loading, onEdit, onDelete } = useUsers();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setFormOpen(true);
    };

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await onDelete(deleteId);
            setDeleteDialogOpen(false);
            setDeleteId(null);
        }
    };

    const handleFormSubmit = async (data: { username: string }) => {
        if (selectedUser) {
            await onEdit(selectedUser.id, data);
        }
        setFormOpen(false);
        setSelectedUser(null);
    };

    return (
        <Container maxWidth='xl' sx={{ mt: 3, py: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant='h4'>Users</Typography>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && (
                <UserGrid
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <UserFormModal
                open={formOpen}
                onClose={() => {
                    setFormOpen(false);
                    setSelectedUser(null);
                }}
                onSubmit={handleFormSubmit}
                user={selectedUser}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user?"
            />
        </Container>
    );
};

export default UsersPage;