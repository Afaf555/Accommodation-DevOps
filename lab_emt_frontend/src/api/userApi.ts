import axiosInstance from '../axios/axios';
import type { User } from './types/users';

export interface UserUpdateRequest {
    username: string;
}

const userApi = {
    findAll: async () => {
        return await axiosInstance.get<User[]>('/user');
    },
    findById: async (id: string) => {
        return await axiosInstance.get<User>(`/user/${id}`);
    },
    update: async (id: number, data: UserUpdateRequest) => {
        return await axiosInstance.put<User>(`/user/${id}`, data);
    },
    delete: async (id: number) => {
        return await axiosInstance.delete(`/user/${id}`);
    }
};

export default userApi;