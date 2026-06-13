import axiosInstance from '../axios/axios';
import type { Accommodation } from './types/accommodation';

export interface AccommodationCreateRequest {
    name: string;
    category: string;
    condition: string;
    hostId: number;
    numRooms: number;
}

const accommodationApi = {
    findAll: async () => {
        return await axiosInstance.get<Accommodation[]>('/accommodations');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Accommodation>(`/accommodations/${id}`);
    },
    create: async (data: AccommodationCreateRequest) => {
        return await axiosInstance.post<Accommodation>('/accommodations/add', data);
    },
    update: async (id: number, data: AccommodationCreateRequest) => {
        return await axiosInstance.put<Accommodation>(`/accommodations/${id}/edit`, data);
    },
    delete: async (id: number) => {
        return await axiosInstance.delete(`/accommodations/${id}/delete`);
    }
};

export default accommodationApi;