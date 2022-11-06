import { SQLiteHelper } from "../adapters/repositories/sqlite/helpers/SQLiteHelper";
import express, { json, Router } from "express";
import { CardGroupRouter } from "./routes/card-group-routes";
import { CardRouter } from "./routes/card-routes";

SQLiteHelper.connect("./db/srs-monolith.db").then(function startServer() {
  const app = express();

  app.use(json());

  const router = Router();
  app.use("/api", router);

  const cardGroupRouter = new CardGroupRouter(router);
  const cardRouter = new CardRouter(router);

  cardGroupRouter.start();
  cardRouter.start();

  app.listen(8000, () => {
    console.log(`Server running on port: 8000`);
  });
});
