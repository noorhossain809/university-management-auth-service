import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../../middleweres/validateRequest';
import { StudentValidation } from './student.validation';
const router = express.Router();

router

  .get('/:id', StudentController.getSingleStudent)
  .patch(
    '/:id',
    validateRequest(StudentValidation.updateStudentZodSchema),
    StudentController.updateStudent
  )
  .get('/', StudentController.getAllStudents)
  .delete('/:id', StudentController.deleteStudent);

export const StudentRoute = router;
