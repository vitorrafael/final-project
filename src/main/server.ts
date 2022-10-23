import { SQLiteHelper } from "../adapters/repositories/sqlite/helpers/SQLiteHelper";
import express, { json, Router } from "express";
import { setupCardGroupRoutes } from "./routes/card-group-routes";
import { setupCardRoutes } from "./routes/card-routes";

// Coupling = 3
class Main {
  public static start(): void {
    SQLiteHelper.connect("./db/srs-monolith.db").then(() => {
      const app = express();

      app.use(json());

      const router = Router();
      app.use("/api", router);

      setupCardGroupRoutes(router);
      setupCardRoutes(router);

      app.listen(8000, () => {
        console.log(`Server running on port: 8000`);
      });
    });
  }
}

Main.start();
