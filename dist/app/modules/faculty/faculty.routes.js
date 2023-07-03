"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middleweres/validateRequest"));
const faculty_controller_1 = require("./faculty.controller");
const faculty_validation_1 = require("./faculty.validation");
const auth_1 = __importDefault(require("../../../middleweres/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faculty_controller_1.FacultyController.getSingleFaculty)
    .get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY), faculty_controller_1.FacultyController.getAllFaculty);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.FacultyValidation.updateFacultyZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faculty_controller_1.FacultyController.updateFaculty);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), faculty_controller_1.FacultyController.deleteFaculty);
exports.FacultyRoute = router;
