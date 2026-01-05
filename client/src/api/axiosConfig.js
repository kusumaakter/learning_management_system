import axios from "axios";

// Create axios instance with defaults
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    withCredentials: true, // Send cookies with requests
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add auth headers here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                // Unauthorized - could redirect to login
                console.log("Unauthorized access - redirecting to login");
            }

            if (status === 403) {
                // Forbidden - user doesn't have permission
                console.log("Access forbidden");
            }

            if (status === 500) {
                console.error("Server error");
            }
        }

        return Promise.reject(error);
    }
);

export default api;
