import type { Host } from './host';

export interface Accommodation {
    id: number;
    name: string;
    category: string;
    condition: string;
    hostName: string;
    hostSurname: string;
    numRooms: number;
    isRented: boolean;
}

export interface AccommodationDetails {
    id: number;
    name: string;
    category: string;
    condition: string;
    host: Host;
    numRooms: number;
    isRented: boolean;
}