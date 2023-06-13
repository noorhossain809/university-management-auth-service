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
  .get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRoute = router;
