import type { Country } from '../../../api/types/country';
import { Grid } from '@mui/material';
import CountryCard from './CountryCard';

interface CountryGridProps {
    countries: Country[];
    onEdit: (country: Country) => void;
    onDelete: (id: number) => void;
}

const CountryGrid = ({ countries, onEdit, onDelete }: CountryGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {countries.map((country) => (
                <Grid key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CountryCard
                        country={country}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CountryGrid;