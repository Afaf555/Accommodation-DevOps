import { createContext } from 'react';
import type { Accommodation } from '../api/types/accommodation';
import type { AccommodationCreateRequest } from '../api/accommodationApi';

export interface AccommodationsContextType {
    accommodations: Accommodation[];
    loading: boolean;
    onAdd: (data: AccommodationCreateRequest) => Promise<void>;
    onEdit: (id: number, data: AccommodationCreateRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const AccommodationsContext = createContext<AccommodationsContextType>({} as AccommodationsContextType);

export default AccommodationsContext;