export const COMMON_MESSAGES = {
  SUCCESS: "Successful.",
  EMAIL_NOT_FOUND: "Please check email",
  ADMIN_LOGIN: "Login successfully.",
  FETCH_ERROR: "An error occurred while fetching data.",
  UPLOAD_PROMPT: "Please upload file.",
  UPLOAD_SUCCESS: "File uploaded successfully.",
  UPLOAD_ERROR: "An error occurred while uploading the file.",
  VALIDATION_FAILED: "Validation failed",
  INCORRECT_PASSWORD: "Incorrect password",
  USER_NOT_FOUND: "User not found.",
  INVALID: "InvaliD",
  UNAUTHORIZED: "Unauthorized",
  INVALID_TODO: "Invalid Todo ID",
  INTERNAL_SERVER_ERROR:
    "There was some technical error processing this request. Please try again.",
  UPLOAD_FAILED: "File upload failed. Please try again or contact support",
} as const;

export enum ErrorType {
  SUCCESS = "SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  UPLOAD_PROMPT = "UPLOAD_PROMPT",
  UPLOAD_SUCCESS = "UPLOAD_SUCCESS",
  UPLOAD_ERROR = "UPLOAD_ERROR",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  INCORRECT_PASSWORD = "INCORRECT_PASSWORD",
  INVALID = "INVALID",
  UNAUTHORIZED = "UNAUTHORIZED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UPLOAD_FAILED = "UPLOAD_FAILED",
}

export type CommonMessageKey = keyof typeof COMMON_MESSAGES;
