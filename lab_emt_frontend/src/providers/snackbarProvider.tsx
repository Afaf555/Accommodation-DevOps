import { useMemo, useState } from 'react';
import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';
import SnackbarContext, { type SnackbarSeverity } from '../contexts/snackbarContext';

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<SnackbarSeverity>('info');

    const showSnackbar = (message: string, severity: SnackbarSeverity = 'info') => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const value = useMemo(() => ({ showSnackbar }), []);

    return (
        <SnackbarContext value={value}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext>
    );
};

export default SnackbarProvider;