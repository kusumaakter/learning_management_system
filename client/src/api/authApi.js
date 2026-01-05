import api from "./axiosConfig";

/**
 * Sign up a new user
 * @param {Object} userData - { name, email, password, role }
 */
export const signupApi = async (userData) => {
    const response = await api.post("/api/auth/signup", userData);
    return response.data;
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 */
export const loginApi = async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
};

/**
 * Logout user
 */
export const logoutApi = async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
};

/**
 * Get current user data
 */
export const getCurrentUserApi = async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
};

/**
 * Check if user is authenticated
 */
export const checkAuthApi = async () => {
    const response = await api.get("/api/auth/check");
    return response.data;
};

/**
 * Update user profile
 * @param {Object} profileData - { name, bio, phone, imageUrl, expertise }
 */
export const updateProfileApi = async (profileData) => {
    const response = await api.put("/api/auth/profile", profileData);
    return response.data;
};
