"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const validateRequest_1 = __importDefault(require("../../../middleweres/validateRequest"));
const academicDepartment_validations_1 = require("./academicDepartment.validations");
const auth_1 = __importDefault(require("../../../middleweres/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .post('/create-department', (0, validateRequest_1.default)(academicDepartment_validations_1.AcademicDepartmentValidation.createDepartmentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), academicDepartment_controller_1.AcademicDepartmentController.createAcademicDepartment)
    .get('/', academicDepartment_controller_1.AcademicDepartmentController.getAcademicDepartment)
    .get('/:id', academicDepartment_controller_1.AcademicDepartmentController.singleAcademicDepartment)
    .patch('/:id', (0, validateRequest_1.default)(academicDepartment_validations_1.AcademicDepartmentValidation.updateDepartmentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), academicDepartment_controller_1.AcademicDepartmentController.updateAcademicDepartment)
    .delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), academicDepartment_controller_1.AcademicDepartmentController.deleteAcademicDepartment);
exports.AcademicDepartmentRouter = router;
