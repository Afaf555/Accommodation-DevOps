import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Country } from '../../../api/types/country';
import { CountryCreateRequest } from '../../../api/countryApi';

interface CountryFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CountryCreateRequest) => Promise<void>;
    country?: Country | null;
}

const CountryFormModal = ({ open, onClose, onSubmit, country }: CountryFormModalProps) => {
    const [name, setName] = useState('');
    const [continent, setContinent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (country) {
            setName(country.name);
            setContinent(country.continent);
        } else {
            setName('');
            setContinent('');
        }
    }, [country, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ name, continent });
            onClose();
        } catch (error) {
            console.error('Error submitting form', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {country ? 'Edit Country' : 'Add New Country'}
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Continent"
                        fullWidth
                        margin="normal"
                        value={continent}
                        onChange={(e) => setContinent(e.target.value)}
                        required
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Saving...' : country ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CountryFormModal;