import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './middleweres/globalErrorHandler';
import { UserRoute } from './app/modules/user/user.route';
import ApiError from './errors/ApiError';
import { AcademicSemesterRoute } from './app/modules/academicSemester/academicSemester.route';
import router from './app/routes';
import { StatusCodes } from 'http-status-codes';

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

// // Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('unhandled promise rejection'))
// })

// global error handle
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
