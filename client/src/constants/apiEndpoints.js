// API endpoints
export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        SIGNUP: "/api/auth/signup",
        LOGIN: "/api/auth/login",
        LOGOUT: "/api/auth/logout",
        ME: "/api/auth/me",
        CHECK: "/api/auth/check",
        PROFILE: "/api/auth/profile",
    },

    // Courses (for future use)
    COURSES: {
        LIST: "/api/courses",
        SINGLE: "/api/courses/:id",
        CREATE: "/api/courses",
        UPDATE: "/api/courses/:id",
        DELETE: "/api/courses/:id",
        ENROLL: "/api/courses/:id/enroll",
    },

    // Educator (for future use)
    EDUCATOR: {
        DASHBOARD: "/api/educator/dashboard",
        COURSES: "/api/educator/courses",
        STUDENTS: "/api/educator/students",
    },

    // Admin (for future use)
    ADMIN: {
        USERS: "/api/admin/users",
        COURSES: "/api/admin/courses",
        STATS: "/api/admin/stats",
    },
};
