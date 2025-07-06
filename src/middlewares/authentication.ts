import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../utils/responseHelper";

interface CustomJwtPayload extends JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      errorResponse(
        res,
        401,
        "Unauthorized: No token provided",
        undefined,
        undefined
      );
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      errorResponse(
        res,
        500,
        "Internal Server Error: Missing JWT secret",
        undefined,
        undefined
      );
      return;
    }

    const decoded = jwt.verify(token, secret) as CustomJwtPayload;

    (req as any).user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.message === "jwt expired") {
        errorResponse(
          res,
          401,
          "Unauthorized: Token has expired",
          undefined,
          error
        );
        return;
      } else {
        errorResponse(
          res,
          401,
          "Unauthorized: Invalid token",
          undefined,
          error
        );
        return;
      }
    } else {
      console.error("Unknown error occurred", error);
      errorResponse(
        res,
        500,
        "Internal Server Error: Unknown error occurred",
        undefined,
        error
      );
      return;
    }
  }
};
