"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRouter = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const validateRequest_1 = __importDefault(require("../../../middleweres/validateRequest"));
const academicFaculty_validations_1 = require("./academicFaculty.validations");
const auth_1 = __importDefault(require("../../../middleweres/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .post('/create-faculty', (0, validateRequest_1.default)(academicFaculty_validations_1.AcademicFacultyValidation.createFacultyZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), academicFaculty_controller_1.AcademicFacultyController.createAcademicFaculty)
    .get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.STUDENT), academicFaculty_controller_1.AcademicFacultyController.getAcademicFaculty)
    .get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.FACULTY), academicFaculty_controller_1.AcademicFacultyController.singleAcademicFaculty)
    .patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.FACULTY), (0, validateRequest_1.default)(academicFaculty_validations_1.AcademicFacultyValidation.updateFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.updateAcademicFaculty)
    .delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), academicFaculty_controller_1.AcademicFacultyController.deleteAcademicFaculty);
exports.AcademicFacultyRouter = router;
