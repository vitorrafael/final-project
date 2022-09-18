import { Database } from "sqlite3";

export const SQLiteHelper = {
  _client: null as Database,

  async connect(databaseUri: string): Promise<void> {
    this._client = new Database(databaseUri);
  },

  closeConnection() {
    this._client.close();
  },

  getClient(): Database {
    return this._client;
  },

  clearTable(tableName: string): void {
    Promise.resolve(this._client.run(`DELETE FROM ${tableName}`));
  },
};
