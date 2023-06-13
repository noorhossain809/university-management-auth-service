import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constains/paginationFields';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    // res.status(200).json({
    //   status: 'success',
    //   message: 'Academic semester is created successfully!',
    //   data: result,
    // });

    sendResponse<IAcademicSemester>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };

    const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);

    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions);

    const result = await AcademicSemesterService.getAllSemester(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester retrieve successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
