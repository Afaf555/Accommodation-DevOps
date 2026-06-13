import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Accommodation } from '../../../api/types/accommodation';
import { useState } from 'react';
import AccommodationDetailsModal from './AccommodationDetailsModal';
import { useAuth } from '../../../contexts/AuthContext';

interface AccommodationCardProps {
    accommodation: Accommodation;
    onEdit: (accommodation: Accommodation) => void;
    onDelete: (id: number) => void;
}

const AccommodationCard = ({ accommodation, onEdit, onDelete }: AccommodationCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { isAdmin } = useAuth();

    return (
        <>
            <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                    <Typography variant='h5'>{accommodation.name}</Typography>
                    <Typography variant='subtitle1'>Category: {accommodation.category}</Typography>
                    <Typography variant='body2'>Rooms: {accommodation.numRooms}</Typography>
                    <Typography variant='body2'>Host: {accommodation.hostName} {accommodation.hostSurname}</Typography>
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
                            <Button startIcon={<EditIcon/>} color='warning' onClick={() => onEdit(accommodation)}>
                                Edit
                            </Button>
                            <Button startIcon={<DeleteIcon/>} color='error' onClick={() => onDelete(accommodation.id)}>
                                Delete
                            </Button>
                        </Box>
                    )}
                </CardActions>
            </Card>

            <AccommodationDetailsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                accommodationId={accommodation.id.toString()}
            />
        </>
    );
};

export default AccommodationCard;