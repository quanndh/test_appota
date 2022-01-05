import { Request, Response } from "express";
import * as Queue from "bull";
import { ApiLogRequest } from "../interfaces/http.interfaces";
import * as Redis from "ioredis";
import { getRepository } from "typeorm";
import { ApiLog } from "../models/api-log.entity";

export class IndexController {
  constructor(
    private readonly hookQueue: Queue.Queue,
    private readonly redisClient: Redis.Redis
  ) {}
  echo = async (req: ApiLogRequest, res: Response) => {
    this.hookQueue.add({ apiLog: req.apiLog });
    res.json({ ip: req.ip });
  };

  list = async (req: Request, res: Response) => {
    try {
      const cachedData = await this.redisClient.get("logs");
      if (!cachedData) {
        const data = await getRepository(ApiLog).find();
        //cache 10s
        await this.redisClient.set("logs", JSON.stringify(data), "EX", 10);
        res.json({
          code: 200,
          data,
        });
      } else {
        res.json({
          code: 200,
          data: JSON.parse(cachedData),
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        code: 500,
        error,
      });
    }
  };
}
