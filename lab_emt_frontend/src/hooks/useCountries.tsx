import { useContext } from 'react';
import CountriesContext, { type CountriesContextType } from '../contexts/countriesContext';

const useCountries = () => useContext<CountriesContextType>(CountriesContext);

export default useCountries;