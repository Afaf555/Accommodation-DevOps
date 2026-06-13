import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import type { User } from '../../../api/types/users';

interface UserFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { username: string }) => Promise<void>;
    user: User | null;
}

const UserFormModal = ({ open, onClose, onSubmit, user }: UserFormModalProps) => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        } else {
            setUsername('');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit({ username });
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    Edit User
                    <IconButton
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <TextField
                            label='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            required
                            margin='normal'
                        />

                        <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mt: 1 }}>
                            Note: Role cannot be changed
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type='submit' variant='contained' disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserFormModal;