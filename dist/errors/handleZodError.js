"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    console.log('eta zod error ', error.issues.map(issue => issue.path));
    const errors = error.issues.map(issue => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Error',
        errorMessages: errors,
    };
};
exports.default = handleZodError;
