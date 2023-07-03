"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];
    const StatusCode = 400;
    return {
        StatusCode,
        message: 'Cast Error',
        errorMessage: errors,
    };
};
exports.default = handleCastError;
