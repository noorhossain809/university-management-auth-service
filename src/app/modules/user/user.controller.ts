import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { StatusCodes } from 'http-status-codes';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

export const UserController = {
  createStudent,
  createFaculty,
};
