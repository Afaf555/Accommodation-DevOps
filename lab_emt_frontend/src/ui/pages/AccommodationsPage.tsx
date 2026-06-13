import { useState } from 'react';
import { Box, CircularProgress, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useAccommodations from '../../hooks/useAccommodations';
import AccommodationGrid from '../components/accommodation/AccommodationGrid';
import AccommodationFormModal from '../components/accommodation/AccommodationFormModal';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import type { Accommodation } from '../../api/types/accommodation';
import { useAuth } from '../../contexts/AuthContext';

const AccommodationsPage = () => {
    const { accommodations, loading, onAdd, onEdit, onDelete } = useAccommodations();
    const { isAdmin } = useAuth();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleEdit = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
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
        if (selectedAccommodation) {
            await onEdit(selectedAccommodation.id, data);
        } else {
            await onAdd(data);
        }
        setFormOpen(false);
    };

    return (
        <Container maxWidth='xl' sx={{ mt: 3, py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant='h4'>Accommodations</Typography>
                {isAdmin && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedAccommodation(null);
                            setFormOpen(true);
                        }}
                    >
                        Add New Accommodation
                    </Button>
                )}
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && (
                <AccommodationGrid
                    accommodations={accommodations}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <AccommodationFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
                accommodation={selectedAccommodation}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Accommodation"
                message="Are you sure you want to delete this accommodation?"
            />
        </Container>
    );
};

export default AccommodationsPage;