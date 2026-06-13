import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Accommodation } from '../../../api/types/accommodation';
import type { Host } from '../../../api/types/host';
import { AccommodationCreateRequest } from '../../../api/accommodationApi';
import useHosts from '../../../hooks/useHosts';

interface AccommodationFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: AccommodationCreateRequest) => Promise<void>;
    accommodation?: Accommodation | null;
}

const AccommodationFormModal = ({ open, onClose, onSubmit, accommodation }: AccommodationFormModalProps) => {
    const { hosts } = useHosts();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('HOUSE');
    const [condition, setCondition] = useState('GOOD');
    const [hostId, setHostId] = useState<number>(0);
    const [numRooms, setNumRooms] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (accommodation) {
            setName(accommodation.name);
            setCategory(accommodation.category);
            setCondition(accommodation.condition);
            setNumRooms(accommodation.numRooms);
            // hostId will need to be fetched from accommodation details if needed
        } else {
            setName('');
            setCategory('HOUSE');
            setCondition('GOOD');
            setHostId(hosts[0]?.id || 0);
            setNumRooms(1);
        }
    }, [accommodation, hosts, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ name, category, condition, hostId, numRooms });
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
                    {accommodation ? 'Edit Accommodation' : 'Add New Accommodation'}
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
                        label="Category"
                        select
                        fullWidth
                        margin="normal"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="HOUSE">House</MenuItem>
                        <MenuItem value="FLAT">Flat</MenuItem>
                        <MenuItem value="APARTMENT">Apartment</MenuItem>
                        <MenuItem value="HOTEL">Hotel</MenuItem>
                        <MenuItem value="MOTEL">Motel</MenuItem>
                        <MenuItem value="ROOM">Room</MenuItem>
                    </TextField>
                    <TextField
                        label="Condition"
                        select
                        fullWidth
                        margin="normal"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    >
                        <MenuItem value="EXCELLENT">Excellent</MenuItem>
                        <MenuItem value="GOOD">Good</MenuItem>
                        <MenuItem value="FAIR">Fair</MenuItem>
                        <MenuItem value="POOR">Poor</MenuItem>
                    </TextField>
                    <TextField
                        label="Host"
                        select
                        fullWidth
                        margin="normal"
                        value={hostId}
                        onChange={(e) => setHostId(Number(e.target.value))}
                    >
                        {hosts.map((host) => (
                            <MenuItem key={host.id} value={host.id}>
                                {host.name} {host.surname}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Number of Rooms"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={numRooms}
                        onChange={(e) => setNumRooms(Number(e.target.value))}
                        inputProps={{ min: 1 }}
                        required
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Saving...' : accommodation ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AccommodationFormModal;