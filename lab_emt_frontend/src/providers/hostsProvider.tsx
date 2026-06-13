import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import hostApi, { type HostCreateRequest } from '../api/hostApi';
import type { Host } from '../api/types/host';
import HostsContext from '../contexts/hostsContext';
import useSnackbar from '../hooks/useSnackbar';

const HostsProvider = ({ children }: { children: React.ReactNode }) => {
    const { showSnackbar } = useSnackbar();

    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await hostApi.findAll();
            setHosts(response.data);
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to load hosts.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    const onAdd = useCallback(async (data: HostCreateRequest) => {
        try {
            await hostApi.create(data);
            showSnackbar('Host created successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to add host.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    const onEdit = useCallback(async (id: number, data: HostCreateRequest) => {
        try {
            await hostApi.update(id, data);
            showSnackbar('Host updated successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to edit host.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await hostApi.delete(id);
            showSnackbar('Host deleted successfully!', 'success');
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to delete host.', 'error');
            throw err;
        }
    }, [fetch, showSnackbar]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    const value = useMemo(
        () => ({ hosts, loading, onAdd, onEdit, onDelete }),
        [hosts, loading, onAdd, onEdit, onDelete]
    );

    return <HostsContext value={value}>{children}</HostsContext>;
};

export default HostsProvider;