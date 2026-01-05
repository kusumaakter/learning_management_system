/**
 * Validate signup input
 * @param {Object} data - Signup data
 * @returns {Object} { isValid, errors }
 */
export const validateSignup = (data) => {
    const errors = {};

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = "Please provide a valid email address";
    }

    // Password validation
    if (!data.password || data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    // Role validation
    const validRoles = ["student", "educator"];
    if (data.role && !validRoles.includes(data.role)) {
        errors.role = "Invalid role. Must be 'student' or 'educator'";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate login input
 * @param {Object} data - Login data
 * @returns {Object} { isValid, errors }
 */
export const validateLogin = (data) => {
    const errors = {};

    // Email validation
    if (!data.email || data.email.trim() === "") {
        errors.email = "Email is required";
    }

    // Password validation
    if (!data.password || data.password.trim() === "") {
        errors.password = "Password is required";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
