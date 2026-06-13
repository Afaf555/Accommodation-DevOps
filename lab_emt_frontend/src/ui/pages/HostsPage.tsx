import { useState } from 'react';
import { Box, CircularProgress, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useHosts from '../../hooks/useHosts';
import HostGrid from '../components/host/HostGrid';
import HostFormModal from '../components/host/HostFormModal';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import type { Host } from '../../api/types/host';
import { useAuth } from '../../contexts/AuthContext';

const HostsPage = () => {
    const { hosts, loading, onAdd, onEdit, onDelete } = useHosts();
    const { isAdmin } = useAuth();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState<Host | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleEdit = (host: Host) => {
        setSelectedHost(host);
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

    const handleFormSubmit = async (data: any) => {
        if (selectedHost) {
            await onEdit(selectedHost.id, data);
        } else {
            await onAdd(data);
        }
        setFormOpen(false);
    };

    return (
        <Container maxWidth='xl' sx={{ mt: 3, py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant='h4'>Hosts</Typography>
                {isAdmin && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedHost(null);
                            setFormOpen(true);
                        }}
                    >
                        Add New Host
                    </Button>
                )}
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && (
                <HostGrid
                    hosts={hosts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <HostFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
                host={selectedHost}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Host"
                message="Are you sure you want to delete this host?"
            />
        </Container>
    );
};

export default HostsPage;