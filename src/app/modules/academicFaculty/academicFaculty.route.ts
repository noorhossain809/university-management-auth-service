import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../../middleweres/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validations';
const router = express.Router();

router
  .post(
    '/create-faculty',
    validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
    AcademicFacultyController.createAcademicFaculty
  )
  .get('/', AcademicFacultyController.getAcademicFaculty)
  .get('/:id', AcademicFacultyController.singleAcademicFaculty)
  .patch(
    '/:id',
    validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
    AcademicFacultyController.updateAcademicFaculty
  )
  .delete('/:id', AcademicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRouter = router;
