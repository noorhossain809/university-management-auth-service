import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constains/paginationFields';
import { AcademicDepartmentService } from './academicDepartment.service';
import { IAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentFilterableField } from './academicDepartment.constant';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartment(
      academicFacultyData
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department created successfully!',
      data: result,
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
    });
  }
);

const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableField);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicDepartmentService.getAcademicDepartment(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department retrieve successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const singleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.singleAcademicDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single Academic Department retrieve successfully!',
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
      data: result,
    });
  }
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      id,
      updateData
    );
    sendResponse<IAcademicDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department successfully updated!',
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
      data: result,
    });
  }
);

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.deleteAcademicDepartment(id);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department successfully deleted!',
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  singleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
