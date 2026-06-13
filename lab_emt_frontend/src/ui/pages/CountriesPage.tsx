import { useState } from 'react';
import { Box, CircularProgress, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useCountries from '../../hooks/useCountries';
import CountryGrid from '../components/country/CountryGrid';
import CountryFormModal from '../components/country/CountryFormModal';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import type { Country } from '../../api/types/country';
import { useAuth } from '../../contexts/AuthContext';

const CountriesPage = () => {
    const { countries, loading, onAdd, onEdit, onDelete } = useCountries();
    const { isAdmin } = useAuth();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleEdit = (country: Country) => {
        setSelectedCountry(country);
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
        if (selectedCountry) {
            await onEdit(selectedCountry.id, data);
        } else {
            await onAdd(data);
        }
        setFormOpen(false);
    };

    return (
        <Container maxWidth='xl' sx={{ mt: 3, py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant='h4'>Countries</Typography>
                {isAdmin && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedCountry(null);
                            setFormOpen(true);
                        }}
                    >
                        Add New Country
                    </Button>
                )}
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && (
                <CountryGrid
                    countries={countries}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CountryFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
                country={selectedCountry}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Country"
                message="Are you sure you want to delete this country?"
            />
        </Container>
    );
};

export default CountriesPage;