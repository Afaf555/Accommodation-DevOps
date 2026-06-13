import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;