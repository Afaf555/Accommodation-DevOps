import { createContext } from 'react';
import type { User } from '../api/types/users';
import type { UserUpdateRequest } from '../api/userApi';

export interface UsersContextType {
    users: User[];
    loading: boolean;
    onEdit: (id: number, data: UserUpdateRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const UsersContext = createContext<UsersContextType>({} as UsersContextType);

export default UsersContext;