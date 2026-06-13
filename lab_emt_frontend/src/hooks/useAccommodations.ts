import { useContext } from 'react';
import AccommodationsContext, { type AccommodationsContextType } from '../contexts/accommodationsContext';

const useAccommodations = () => useContext<AccommodationsContextType>(AccommodationsContext);

export default useAccommodations;