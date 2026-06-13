import type { Host } from '../../../api/types/host';
import { Grid } from '@mui/material';
import HostCard from './HostCard';

interface HostGridProps {
    hosts: Host[];
    onEdit: (host: Host) => void;
    onDelete: (id: number) => void;
}

const HostGrid = ({ hosts, onEdit, onDelete }: HostGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {hosts.map((host) => (
                <Grid key={host.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <HostCard
                        host={host}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default HostGrid;