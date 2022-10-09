import { SQLiteHelper } from "../adapters/repositories/sqlite/helpers/SQLiteHelper";
import express, { json, Router } from "express";
import { setupCardGroupRoutes } from "./routes/card-group-routes";
import { setupCardRoutes } from "./routes/card-routes";

SQLiteHelper.connect("./db/srs-monolith.db").then(
  function startServer() {
    const app = express();

    app.use(json())

    const router = Router();
    app.use("/api", router);

    setupCardGroupRoutes(router);
    setupCardRoutes(router);

    app.listen(8000, () => {
      console.log(`Server running on port: 8000`)
    })
  }
);