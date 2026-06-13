import axiosInstance from '../axios/axios';
import type { Host } from './types/host';

export interface HostCreateRequest {
    name: string;
    surname: string;
    countryId: number;
}

const hostApi = {
    findAll: async () => {
        return await axiosInstance.get<Host[]>('/hosts');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Host>(`/hosts/${id}`);
    },
    create: async (data: HostCreateRequest) => {
        return await axiosInstance.post<Host>('/hosts', data);
    },
    update: async (id: number, data: HostCreateRequest) => {
        return await axiosInstance.put<Host>(`/hosts/${id}`, data);
    },
    delete: async (id: number) => {
        return await axiosInstance.delete(`/hosts/${id}`);
    }
};

export default hostApi;