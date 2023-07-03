"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const student_constant_1 = require("../student/student.constant");
// req --> validation
// body --> object
// data --> object
const updateStudentZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .object({
            firstName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
            middleName: zod_1.default.string().optional(),
        })
            .optional(),
        gender: zod_1.default.enum([...student_constant_1.gender]).optional(),
        dateOfBirth: zod_1.default.string().optional(),
        email: zod_1.default.string().email().optional(),
        contactNo: zod_1.default.string().optional(),
        emergencyContactNo: zod_1.default.string().optional(),
        bloodGroup: zod_1.default.enum([...student_constant_1.bloodGroup]).optional(),
        presentAddress: zod_1.default.string().optional(),
        permanentAddress: zod_1.default.string().optional(),
        academicSemester: zod_1.default.string().optional(),
        academicDepartment: zod_1.default.string().optional(),
        academicFaculty: zod_1.default.string().optional(),
        guardian: zod_1.default
            .object({
            fatherName: zod_1.default.string().optional(),
            fatherOccupation: zod_1.default.string().optional(),
            fatherContactNo: zod_1.default.string().optional(),
            motherName: zod_1.default.string().optional(),
            motherOccupation: zod_1.default.string().optional(),
            motherContactNo: zod_1.default.string().optional(),
            address: zod_1.default.string().optional(),
        })
            .optional(),
        localGuardian: zod_1.default
            .object({
            name: zod_1.default.string().optional(),
            occupation: zod_1.default.string().optional(),
            contactNo: zod_1.default.string().optional(),
            address: zod_1.default.string().optional(),
        })
            .optional(),
        profileImage: zod_1.default.string().optional(),
    }),
});
exports.StudentValidation = {
    updateStudentZodSchema,
};
