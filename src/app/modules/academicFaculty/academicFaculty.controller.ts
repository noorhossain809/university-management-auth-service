import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constains/paginationFields';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(
      academicFacultyData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty created successfully!',
      data: result,
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
    });
  }
);

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicFacultyService.getAcademicFaculty(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty retrieve successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const singleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.singleAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single Academic Faculty retrieve successfully!',
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
      data: result,
    });
  }
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updateData
    );
    sendResponse<IAcademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty successfully updated!',
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicFaculty(id);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty successfully deleted!',
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  singleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
