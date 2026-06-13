import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Host } from '../../../api/types/host';
import { useState } from 'react';
import HostDetailsModal from './HostDetailsModal';
import { useAuth } from '../../../contexts/AuthContext';

interface HostCardProps {
    host: Host;
    onEdit: (host: Host) => void;
    onDelete: (id: number) => void;
}

const HostCard = ({ host, onEdit, onDelete }: HostCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { isAdmin } = useAuth();

    return (
        <>
            <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                    <Typography variant='h5'>{host.name} {host.surname}</Typography>
                    <Typography variant='subtitle1'>Country: {host.country.name}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<InfoIcon/>}
                        onClick={() => setModalOpen(true)}
                    >
                        Info
                    </Button>
                    {isAdmin && (
                        <Box>
                            <Button startIcon={<EditIcon/>} color='warning' onClick={() => onEdit(host)}>
                                Edit
                            </Button>
                            <Button startIcon={<DeleteIcon/>} color='error' onClick={() => onDelete(host.id)}>
                                Delete
                            </Button>
                        </Box>
                    )}
                </CardActions>
            </Card>

            <HostDetailsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                hostId={host.id.toString()}
            />
        </>
    );
};

export default HostCard;