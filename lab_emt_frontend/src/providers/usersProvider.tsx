import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import userApi, { type UserUpdateRequest } from '../api/userApi';
import type { User } from '../api/types/users';
import UsersContext from '../contexts/usersContext';
import useSnackbar from '../hooks/useSnackbar';
import { useAuth } from '../contexts/AuthContext';
const UsersProvider = ({ children }: { children: React.ReactNode }) => {
    const { showSnackbar } = useSnackbar();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { isAuthenticated } = useAuth();
    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await userApi.findAll();
            setUsers(response.data);
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to load users.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    const onEdit = useCallback(async (id: number, data: UserUpdateRequest) => {
        try {
            await userApi.update(id, data);
            showSnackbar('User updated successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to edit user.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await userApi.delete(id);
            showSnackbar('User deleted successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to delete user.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    useEffect(() => {
        if (isAuthenticated) {
            void fetch();
        }
    }, [fetch, isAuthenticated]);

    const value = useMemo(
        () => ({ users, loading, onEdit, onDelete }),
        [users, loading, onEdit, onDelete]
    );

    return <UsersContext value={value}>{children}</UsersContext>;
};

export default UsersProvider;