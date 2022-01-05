import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { HttpException } from "../exceptions/HttpException";
import { ApiLogRequest } from "../interfaces/http.interfaces";
import { ApiLog } from "../models/api-log.entity";

const logMiddleware = async (
  req: ApiLogRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ip } = req;
    const data = req.query;

    const newLog = getRepository(ApiLog).create({
      ip,
      data: JSON.stringify(data),
    });
    const savedLog = await newLog.save();
    req.apiLog = savedLog;
    next();
  } catch (error) {
    next(new HttpException(401, "c"));
  }
};

export default logMiddleware;
