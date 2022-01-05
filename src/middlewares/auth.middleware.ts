import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization =
      (req?.headers["authorization"] ?? "").split("Bearer ")[1] || null;
    if (Authorization) {
      if (Authorization === process.env.TOKEN) {
        next();
      } else {
        next(new HttpException(401, "Wrong token"));
      }
    } else {
      next(new HttpException(404, "Missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong token"));
  }
};

export default authMiddleware;
