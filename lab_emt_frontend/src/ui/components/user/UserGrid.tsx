
import { Grid } from '@mui/material';
import UserCard from './UserCard';
import type { User } from '../../../api/types/users';

interface UserGridProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

const UserGrid = ({ users, onEdit, onDelete }: UserGridProps) => {
    return (
        <Grid container spacing={3}>
            {users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <UserCard
                        user={user}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default UserGrid;