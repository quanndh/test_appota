import * as dotenv from "dotenv";
import * as express from "express";
import { createConnection } from "typeorm";
import { dbConnection } from "./database";
import IndexRoute from "./routes/index.route";
import * as Queue from "bull";
import * as Redis from "ioredis";
dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL);

const hookQueue = new Queue(
  "hook queue",
  process.env.REDIS_URL ?? "redis://localhost:6379"
);

hookQueue
  .isReady()
  .then(() => {
    hookQueue.process((job, done) => {
      const { data } = job;
      fetch(
        `${process.env.WEBHOOK_URL ?? "url"}?data=${JSON.stringify(
          data.apiLog
        )}`
      );
      done();
    });
  })
  .catch((err) => console.log(err));

createConnection(dbConnection);

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(express.json());

const routes = [new IndexRoute(hookQueue, redisClient)];
routes.forEach((route) => {
  app.use("/", route.router);
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// type ModuleId = string | number;

// interface WebpackHotModule {
//   hot?: {
//     data: any;
//     accept(
//       dependencies: string[],
//       callback?: (updatedDependencies: ModuleId[]) => void
//     ): void;
//     accept(dependency: string, callback?: () => void): void;
//     accept(errHandler?: (err: Error) => void): void;
//     dispose(callback: (data: any) => void): void;
//   };
// }

// declare const module: WebpackHotModule;

// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(() => server.close());
// }
