import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createAUserService(user);

    next();

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }
);

export const UserController = {
  createUserController,
};
