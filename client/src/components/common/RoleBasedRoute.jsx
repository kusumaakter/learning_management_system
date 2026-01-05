import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES, ROLES } from "../../constants/routes";

/**
 * Role-Based Route Component
 * Restricts access based on user roles
 * 
 * @param {Array} allowedRoles - Array of roles allowed to access this route
 * @param {React.ReactNode} children - Child components to render
 */
const RoleBasedRoute = ({ allowedRoles = [], children }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Only show loading during initial auth check
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    // Check if user has required role
    const hasRequiredRole = allowedRoles.includes(user?.role);

    // Admin always has access
    const isAdmin = user?.role === ROLES.ADMIN;

    if (!hasRequiredRole && !isAdmin) {
        // Redirect to appropriate page based on user role
        if (user?.role === ROLES.EDUCATOR) {
            return <Navigate to={ROUTES.EDUCATOR} replace />;
        }
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <>{children}</>;
};

export default RoleBasedRoute;
