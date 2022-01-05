import { Router } from "express";
import { IndexController } from "../controllers/index.controller";
import { Routes } from "../interfaces/route.interface";
import authMiddleware from "../middlewares/auth.middleware";
import logMiddleware from "../middlewares/log.middleware";
import * as Queue from "bull";
import * as Redis from "ioredis";

class IndexRoute implements Routes {
  public path = "/";
  public router = Router();
  public indexController;

  constructor(
    private readonly hookQueue: Queue.Queue,
    private readonly redisClient: Redis.Redis
  ) {
    this.indexController = new IndexController(
      this.hookQueue,
      this.redisClient
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}echo`,
      authMiddleware,
      logMiddleware,
      this.indexController.echo
    );
    this.router.get(`${this.path}list`, this.indexController.list);
  }
}

export default IndexRoute;
