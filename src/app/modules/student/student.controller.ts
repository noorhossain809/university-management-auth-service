import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constains/paginationFields';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  console.log(paginationOptions);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.singleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Student retrieve successfully',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log('updateData', updateData);
  const result = await StudentService.updateStudent(id, updateData);
  console.log('result', result);
  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Updated Successfully!',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

// 01731927209
