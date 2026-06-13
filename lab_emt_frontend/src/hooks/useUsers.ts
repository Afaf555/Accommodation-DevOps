import { useContext } from 'react';
import UsersContext, { type UsersContextType } from '../contexts/usersContext';

const useUsers = () => useContext<UsersContextType>(UsersContext);

export default useUsers;