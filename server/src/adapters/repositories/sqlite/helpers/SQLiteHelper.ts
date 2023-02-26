import { Database } from "sqlite3";

export class SQLiteHelper {
  private static client: Database = null;

  public static async connect(databaseUri: string): Promise<void> {
    SQLiteHelper.client = new Database(databaseUri);
  }

  public static closeConnection(): void {
    SQLiteHelper.client.close();
  }

  public static getClient(): Database {
    return SQLiteHelper.client;
  }

  public static async clearTable(tableName): Promise<void> {
    return new Promise((resolve, reject) => {
      SQLiteHelper.getClient().run(`DELETE FROM ${tableName}`, (res, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(res);
        }
      });
    });
  }
}
