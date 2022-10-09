import { CardGroupData } from "../../../use-cases/ports/card-group";
import { CardGroupRepository } from "../../../use-cases/ports/card-group-repository";
import { SQLiteHelper } from "./helpers/SQLiteHelper";

interface SQLiteCardGroup {
  id: number;
  topic: string;
  description;
}

export class SQLiteCardGroupRepository implements CardGroupRepository {
  public async findAllCardGroups(): Promise<CardGroupData[]> {
    const cardGroups: SQLiteCardGroup[] = await new Promise(
      (resolve, reject) => {
        SQLiteHelper.getClient().all(
          `SELECT * FROM cardGroups`,
          (error, results) => {
            /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      }
    );

    return cardGroups.map(this.toCardGroup) as CardGroupData[];
  }

  public async findCardGroupByTheme(theme: String): Promise<CardGroupData> {
    const foundCardGroup: SQLiteCardGroup = await new Promise(
      (resolve, reject) => {
        SQLiteHelper.getClient().get(
          `SELECT * FROM cardGroups WHERE topic = ?`,
          [theme],
          (error, results) => {
            /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      }
    );

    return this.toCardGroup(foundCardGroup) as CardGroupData;
  }

  public async findCardGroupById(id: number): Promise<CardGroupData> {
    const foundCardGroup: SQLiteCardGroup = await new Promise(
      (resolve, reject) => {
        SQLiteHelper.getClient().get(
          `SELECT * FROM cardGroups WHERE id = ?`,
          [id],
          (error, results) => {
            /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      }
    );

    return this.toCardGroup(foundCardGroup) as CardGroupData;
  }

  public async add(cardGroupData: CardGroupData): Promise<CardGroupData> {
    const { description, topic } = cardGroupData;
    await new Promise<void>((resolve, reject) =>
      SQLiteHelper.getClient().run(
        `INSERT INTO cardGroups (topic, description) VALUES (?, ?)`,
        [topic, description],
        (error) => {
          /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      )
    );

    return this.findCardGroupByTheme(topic);
  }

  public async updateTopic(
    id: number,
    updatedTopic: string
  ): Promise<CardGroupData> {
    await new Promise<void>((resolve, reject) =>
      SQLiteHelper.getClient().run(
        `UPDATE cardGroups SET topic = ? WHERE id = ?`,
        [updatedTopic, id],
        (error) => {
          /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      )
    );

    return this.findCardGroupById(id);
  }

  public async updateDescription(
    id: number,
    updatedDescription: string
  ): Promise<CardGroupData> {
    await new Promise<void>((resolve, reject) =>
      SQLiteHelper.getClient().run(
        `UPDATE cardGroups SET description = ? WHERE id = ?`,
        [updatedDescription, id],
        (error) => {
          /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      )
    );

    return this.findCardGroupById(id);
  }

  public async delete(id: any): Promise<void> {
    return new Promise((resolve, reject) => {
      SQLiteHelper.getClient().run(
        `DELETE FROM cardGroups WHERE id = ?`,
        [id],
        (error) => {
          /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  private toCardGroup(sqliteCardGroup: SQLiteCardGroup): CardGroupData {
    if (!sqliteCardGroup) return undefined;
    return {
      id: sqliteCardGroup.id,
      topic: sqliteCardGroup.topic,
      description: sqliteCardGroup.description,
    };
  }
}
