import { createContext } from 'react';
import type { Host } from '../api/types/host';
import type { HostCreateRequest } from '../api/hostApi';

export interface HostsContextType {
    hosts: Host[];
    loading: boolean;
    onAdd: (data: HostCreateRequest) => Promise<void>;
    onEdit: (id: number, data: HostCreateRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const HostsContext = createContext<HostsContextType>({} as HostsContextType);

export default HostsContext;