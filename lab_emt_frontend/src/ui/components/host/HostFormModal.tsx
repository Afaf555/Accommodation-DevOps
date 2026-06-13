import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Host } from '../../../api/types/host';
import { HostCreateRequest } from '../../../api/hostApi';
import useCountries from '../../../hooks/useCountries';

interface HostFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: HostCreateRequest) => Promise<void>;
    host?: Host | null;
}

const HostFormModal = ({ open, onClose, onSubmit, host }: HostFormModalProps) => {
    const { countries } = useCountries();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [countryId, setCountryId] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (host) {
            setName(host.name);
            setSurname(host.surname);
            setCountryId(host.country.id);
        } else {
            setName('');
            setSurname('');
            setCountryId(countries[0]?.id || 0);
        }
    }, [host, countries, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ name, surname, countryId });
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
                    {host ? 'Edit Host' : 'Add New Host'}
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
                        label="Surname"
                        fullWidth
                        margin="normal"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                    <TextField
                        label="Country"
                        select
                        fullWidth
                        margin="normal"
                        value={countryId}
                        onChange={(e) => setCountryId(Number(e.target.value))}
                    >
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Saving...' : host ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default HostFormModal;