import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Country } from '../../../api/types/country';
import { useState } from 'react';
import CountryDetailsModal from './CountryDetailsModal';
import { useAuth } from '../../../contexts/AuthContext';

interface CountryCardProps {
    country: Country;
    onEdit: (country: Country) => void;
    onDelete: (id: number) => void;
}

const CountryCard = ({ country, onEdit, onDelete }: CountryCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { isAdmin } = useAuth();

    return (
        <>
            <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                    <Typography variant='h5'>{country.name}</Typography>
                    <Typography variant='subtitle1'>Continent: {country.continent}</Typography>
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
                            <Button startIcon={<EditIcon/>} color='warning' onClick={() => onEdit(country)}>
                                Edit
                            </Button>
                            <Button startIcon={<DeleteIcon/>} color='error' onClick={() => onDelete(country.id)}>
                                Delete
                            </Button>
                        </Box>
                    )}
                </CardActions>
            </Card>

            <CountryDetailsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                countryId={country.id.toString()}
            />
        </>
    );
};

export default CountryCard;