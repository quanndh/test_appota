import { Request } from "express";
import { ApiLog } from "../models/api-log.entity";

export interface ApiLogRequest extends Request {
  apiLog?: ApiLog;
}
