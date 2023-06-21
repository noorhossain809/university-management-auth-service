import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handleZodError = (error: ZodError) => {
  console.log(
    'eta zod error ',
    error.issues.map(issue => issue.path)
  );
  const errors: IGenericErrorMessage[] = error.issues.map(issue => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Error',
    errorMessages: errors,
  };
};

export default handleZodError;
