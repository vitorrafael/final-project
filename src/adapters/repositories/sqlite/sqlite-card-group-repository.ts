import { CardGroupData } from "../../../use-cases/ports/card-group";
import { CardGroupRepository } from "../../../use-cases/ports/card-group-repository";
import { SQLiteHelper } from "./helpers/SQLiteHelper";

interface SQLiteCardGroup {
  id: string;
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
          `SELECT * FROM cardGroups WHERE theme = ?`,
          [theme],
          (error, results) => {
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

  public async findCardGroupById(id: String): Promise<CardGroupData> {
    const foundCardGroup: SQLiteCardGroup = await new Promise(
      (resolve, reject) => {
        SQLiteHelper.getClient().get(
          `SELECT * FROM cardGroups WHERE id = ?`,
          [id],
          (error, results) => {
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

  public async add(CardGroupData: CardGroupData): Promise<CardGroupData> {
    const { description, topic } = CardGroupData;
    Promise.resolve(
      SQLiteHelper.getClient().run(
        `INSERT INTO cardGroups (topic, description) VALUES (?, ?)`,
        [topic, description]
      )
    );

    return this.findCardGroupByTheme(topic);
  }

  public async updateTopic(
    id: string,
    updatedTopic: string
  ): Promise<CardGroupData> {
    Promise.resolve(
      SQLiteHelper.getClient().run(
        `UPDATE cardGroups SET topic = ? WHERE id = ?`,
        [updatedTopic, id]
      )
    );

    return this.findCardGroupById(id);
  }

  updateDescription(
    id: string,
    updatedDescription: string
  ): Promise<CardGroupData> {
    Promise.resolve(
      SQLiteHelper.getClient().run(
        `UPDATE cardGroups SET description = ? WHERE id = ?`,
        [updatedDescription, id]
      )
    );

    return this.findCardGroupById(id);
  }

  public async delete(id: any): Promise<void> {
    Promise.resolve(
      SQLiteHelper.getClient().run(`DELETE FROM cardGroups WHERE id = ?`, [id])
    );
  }

  private toCardGroup(sqliteCardGroup: SQLiteCardGroup): CardGroupData {
    return {
      id: sqliteCardGroup.id,
      topic: sqliteCardGroup.topic,
      description: sqliteCardGroup.description,
    };
  }
}
