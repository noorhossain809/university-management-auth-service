import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../../middleweres/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validations';
import auth from '../../../middleweres/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router
  .post(
    '/create-faculty',
    validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicFacultyController.createAcademicFaculty
  )
  .get(
    '/',
    auth(
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.STUDENT
    ),
    AcademicFacultyController.getAcademicFaculty
  )
  .get(
    '/:id',
    auth(
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.FACULTY
    ),
    AcademicFacultyController.singleAcademicFaculty
  )
  .patch(
    '/:id',
    auth(
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.FACULTY
    ),
    validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
    AcademicFacultyController.updateAcademicFaculty
  )
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    AcademicFacultyController.deleteAcademicFaculty
  );

export const AcademicFacultyRouter = router;
