import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../../middleweres/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validations';
const router = express.Router();

router
  .post(
    '/create-department',
    validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
    AcademicDepartmentController.createAcademicDepartment
  )
  .get('/', AcademicDepartmentController.getAcademicDepartment)
  .get('/:id', AcademicDepartmentController.singleAcademicDepartment)
  .patch(
    '/:id',
    validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
    AcademicDepartmentController.updateAcademicDepartment
  )
  .delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRouter = router;
