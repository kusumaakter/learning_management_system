// Application route paths
export const ROUTES = {
    // Public routes
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    COURSE_LIST: "/course-list",
    COURSE_DETAILS: "/course/:id",

    // Student routes
    MY_ENROLLMENTS: "/my-enrollments",
    PLAYER: "/player/:courseId",
    COURSE_DOCS: "/course/:id/docs",
    COURSE_QUIZ: "/course/:id/quiz",

    // Educator routes
    EDUCATOR: "/educator",
    EDUCATOR_DASHBOARD: "/educator",
    EDUCATOR_ADD_COURSES: "/educator/add-courses",
    EDUCATOR_MY_COURSES: "/educator/my-courses",
    EDUCATOR_STUDENTS: "/educator/students-enrolled",

    // Admin routes
    ADMIN: "/admin",
    ADMIN_DASHBOARD: "/admin",
    ADMIN_USERS: "/admin/users",
    ADMIN_COURSES: "/admin/courses",

    // Utility routes
    LOADING: "/loading/:path",
    NOT_FOUND: "*",
};

// User roles
export const ROLES = {
    STUDENT: "student",
    EDUCATOR: "educator",
    ADMIN: "admin",
};

// Role-based redirect paths after login
export const ROLE_REDIRECTS = {
    [ROLES.STUDENT]: ROUTES.HOME,
    [ROLES.EDUCATOR]: ROUTES.EDUCATOR,
    [ROLES.ADMIN]: ROUTES.ADMIN,
};
