import { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Custom hook for authentication operations
 * Provides easy access to auth state and methods
 */
export const useAuth = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAuth must be used within an AppContextProvider");
    }

    const {
        user,
        isAuthenticated,
        isLoading,
        authError,
        login,
        signup,
        logout,
        checkAuth,
        clearError,
        navigate,
    } = context;

    // Computed properties
    const isStudent = user?.role === "student";
    const isEducator = user?.role === "educator";
    const isAdmin = user?.role === "admin";

    return {
        // State
        user,
        isAuthenticated,
        isLoading,
        authError,

        // Computed
        isStudent,
        isEducator,
        isAdmin,

        // Navigation
        navigate,

        // Actions
        login,
        signup,
        logout,
        checkAuth,
        clearError,
    };
};

export default useAuth;
