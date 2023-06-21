import express from 'express';
import validateRequest from '../../../middleweres/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router
  .post(
    '/create-semester',
    validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    AcademicSemesterController.createSemester
  )
  .get('/:id', AcademicSemesterController.getSingleSemester)
  .patch(
    '/:id',
    validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
    AcademicSemesterController.updateSemester
  )
  .get('/', AcademicSemesterController.getAllSemester)
  .delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoute = router;
