import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { paginationFields } from '../../../constains/paginationFields';
import { FacultyService } from './faculty.service';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import { StatusCodes } from 'http-status-codes';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculty(filters, paginationOptions);

  sendResponse<IFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'faculty retrieved successfully !',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'faculty updated successfully !',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'faculty deleted successfully !',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
