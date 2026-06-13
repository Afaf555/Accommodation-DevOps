import axiosInstance from '../axios/axios';
import type { Country } from './types/country';

export interface CountryCreateRequest {
    name: string;
    continent: string;
}

const countryApi = {
    findAll: async () => {
        return await axiosInstance.get<Country[]>('/countries');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<Country>(`/countries/${id}`);
    },
    create: async (data: CountryCreateRequest) => {
        return await axiosInstance.post<Country>('/countries', data);
    },
    update: async (id: number, data: CountryCreateRequest) => {
        return await axiosInstance.put<Country>(`/countries/${id}`, data);
    },
    delete: async (id: number) => {
        return await axiosInstance.delete(`/countries/${id}`);
    }
};

export default countryApi;