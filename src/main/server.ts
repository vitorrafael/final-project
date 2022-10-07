import { SQLiteHelper } from "../adapters/repositories/sqlite/helpers/SQLiteHelper";
import express, { Router } from "express";
import { setupCardGroupRoutes } from "./routes/card-group-routes";
import { setupCardRoutes } from "./routes/card-routes";

SQLiteHelper.connect("../db/srs-monolith.db").then(
  async function startServer() {
    const app = express();

    const router = Router();
    app.use("/api", router);

    setupCardGroupRoutes(router);
    setupCardRoutes(router);
  }
);
