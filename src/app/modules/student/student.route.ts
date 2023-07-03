import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../../middleweres/validateRequest';
import { StudentValidation } from './student.validation';
import auth from '../../../middleweres/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router

  .get(
    '/:id',
    auth(
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.FACULTY,
      ENUM_USER_ROLE.STUDENT
    ),
    StudentController.getSingleStudent
  )
  .patch(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(StudentValidation.updateStudentZodSchema),
    StudentController.updateStudent
  )
  .get(
    '/',
    auth(
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.FACULTY,
      ENUM_USER_ROLE.STUDENT
    ),
    StudentController.getAllStudents
  )
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN),
    StudentController.deleteStudent
  );

export const StudentRoute = router;
