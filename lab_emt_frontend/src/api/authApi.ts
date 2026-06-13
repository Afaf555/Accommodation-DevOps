import axiosInstance from '../axios/axios';

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

interface RegisterRequest {
    username: string;
    password: string;
    role: string;
}

interface RegisterResponse {
    username: string;
    role: string;
}

const authApi = {
    login: async (data: LoginRequest) => {
        return await axiosInstance.post<LoginResponse>('/user/login', data);
    },
    register: async (data: RegisterRequest) => {
        return await axiosInstance.post<RegisterResponse>('/user/register', data);
    }
};

export default authApi;