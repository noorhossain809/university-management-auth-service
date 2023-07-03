import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../../middleweres/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validations';
import auth from '../../../middleweres/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router
  .post(
    '/create-department',
    validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicDepartmentController.createAcademicDepartment
  )
  .get('/', AcademicDepartmentController.getAcademicDepartment)
  .get('/:id', AcademicDepartmentController.singleAcademicDepartment)
  .patch(
    '/:id',
    validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicDepartmentController.updateAcademicDepartment
  )
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN),
    AcademicDepartmentController.deleteAcademicDepartment
  );

export const AcademicDepartmentRouter = router;
