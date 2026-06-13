import { createContext } from 'react';
import type { Country } from '../api/types/country';
import type { CountryCreateRequest } from '../api/countryApi';

export interface CountriesContextType {
    countries: Country[];
    loading: boolean;
    onAdd: (data: CountryCreateRequest) => Promise<void>;
    onEdit: (id: number, data: CountryCreateRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const CountriesContext = createContext<CountriesContextType>({} as CountriesContextType);

export default CountriesContext;