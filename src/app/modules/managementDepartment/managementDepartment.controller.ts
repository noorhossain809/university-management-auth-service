import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { ManagementDepartmentService } from './managementDepartment.service';
import catchAsync from '../../../shared/catchAsync';
import { IManagementDepartment } from './managementDepartment.interface';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constains/paginationFields';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await ManagementDepartmentService.createDepartment(
    departmentData
  );

  sendResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Management department created successfully',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ManagementDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Management departments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.getSingleDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Management department retieved successfully',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
    });
  })
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.deleteDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
