import express from 'express';
import validateRequest from '../../../middleweres/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import auth from '../../../middleweres/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router
  .post(
    '/create-semester',
    validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicSemesterController.createSemester
  )
  .get(
    '/:id',
    auth(
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.FACULTY,
      ENUM_USER_ROLE.STUDENT
    ),
    AcademicSemesterController.getSingleSemester
  )
  .patch(
    '/:id',
    validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicSemesterController.updateSemester
  )
  .get(
    '/',
    auth(
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.FACULTY,
      ENUM_USER_ROLE.STUDENT
    ),
    AcademicSemesterController.getAllSemester
  )
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicSemesterController.deleteSemester
  );

export const AcademicSemesterRoute = router;
