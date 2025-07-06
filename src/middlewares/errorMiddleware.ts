import { NextFunction, Response, Request } from "express";
import { HttpStatus } from "../utils/httpStatus";
import { COMMON_MESSAGES, ErrorType } from "../constants/messages";
import { errorResponse } from "../utils/responseHelper";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errorResult = await getErrorResult(err);

  errorResponse(
    res,
    errorResult.statusCode,
    errorResult.errorKey,
    errorResult.errorCode
  );
};

export async function getErrorResult(error: any): Promise<any> {
  const Error_name: string = error.name;
  let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  let errorKey: string = COMMON_MESSAGES.FETCH_ERROR;
  let errorCode: string = Error_name;

  switch (Error_name) {
    case ErrorType.INCORRECT_PASSWORD:
      statusCode = HttpStatus.UNAUTHORIZED;
      errorKey = COMMON_MESSAGES.INCORRECT_PASSWORD;
      break;
    case ErrorType.EMAIL_NOT_FOUND:
      statusCode = HttpStatus.NOT_FOUND;
      errorKey = COMMON_MESSAGES.EMAIL_NOT_FOUND;
      break;

    case ErrorType.UNAUTHORIZED:
      statusCode = HttpStatus.UNAUTHORIZED;
      errorKey = COMMON_MESSAGES.UNAUTHORIZED;
      break;
    case ErrorType.UPLOAD_PROMPT:
      statusCode = HttpStatus.BAD_REQUEST;
      errorKey = COMMON_MESSAGES.UPLOAD_PROMPT;
      break;
    case ErrorType.UPLOAD_FAILED:
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorKey = COMMON_MESSAGES.UPLOAD_FAILED;
      break;
    default:
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorKey = COMMON_MESSAGES.INTERNAL_SERVER_ERROR;
      errorCode = ErrorType.INTERNAL_SERVER_ERROR;
      break;
  }
  return { statusCode, errorKey, errorCode };
}

export const throwError = (type: string) => {
  const error = new Error();
  error.name = type;
  throw error;
};
