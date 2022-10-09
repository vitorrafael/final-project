import { CardData } from "../../../use-cases/ports/card-data";
import { CardRepository } from "../../../use-cases/ports/card-repository";
import { SQLiteHelper } from "./helpers/SQLiteHelper";

interface SQLiteCardData {
  id: number;
  front: string;
  back: string;
  next_review_due: string;
  review_count: number;
  e_factor: number;
  group_id: number;
}

export class SQLiteCardRepository implements CardRepository {
  public async add(card: CardData): Promise<void> {
    const { front, back, nextReviewDue, reviewCount, eFactor, groupId } = card;
    return new Promise((resolve, reject) => {
      SQLiteHelper.getClient().run(
        `INSERT INTO cards (front, back, next_review_due, review_count, e_factor, group_id) VALUES(?, ?, ?, ?, ?, ?)`,
        [front, back, nextReviewDue.toISOString(), reviewCount, eFactor, groupId],
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

  public async delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      SQLiteHelper.getClient().run(
        `DELETE FROM cards WHERE id = ?`,
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

  public async findCardByFront(front: string): Promise<CardData> {
    const foundCard: SQLiteCardData = await new Promise((resolve, reject) => {
      SQLiteHelper.getClient().get(
        `SELECT * FROM cards WHERE front = ?`,
        [front],
        (error, results) => {
          /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    return this.toCardData(foundCard);
  }

  public async findCardById(id: number): Promise<CardData> {
    const foundCard: SQLiteCardData = await new Promise((resolve, reject) => {
      SQLiteHelper.getClient().get(
        `SELECT * FROM cards WHERE id = ?`,
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
    });

    return this.toCardData(foundCard);
  }

  public async findCardsByGroupId(groupId: number): Promise<CardData[]> {
    const cards: SQLiteCardData[] = await new Promise((resolve, reject) => {
      SQLiteHelper.getClient().all(
        `SELECT * FROM cards WHERE group_id = ?`,
        [groupId],
        (error, results) => {
          /* istanbul ignore if - This means that an error occurred with the database which will not be tested */
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    return cards.map(this.toCardData);
  }

  public async update(card: CardData): Promise<void> {
    return new Promise((resolve, reject) => {
      SQLiteHelper.getClient().run(
        `UPDATE cards SET front = ?, back = ?, next_review_due = ?, review_count = ?, e_factor = ? WHERE id = ?`,
        [
          card.front,
          card.back,
          card.nextReviewDue.toISOString(),
          card.reviewCount,
          card.eFactor,
          card.id,
        ],
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

  public async updateCardFront(
    id: number,
    updatedFront: string
  ): Promise<CardData> {
    await new Promise<void>((resolve, reject) => {
      SQLiteHelper.getClient().run(
        `UPDATE cards SET front = ? WHERE id = ?`,
        [updatedFront, id],
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

    return this.findCardById(id);
  }

  public async updateCardBack(
    id: number,
    updatedBack: string
  ): Promise<CardData> {
    await new Promise<void>((resolve, reject) => {
      SQLiteHelper.getClient().run(
        `UPDATE cards SET back = ? WHERE id = ?`,
        [updatedBack, id],
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
    return this.findCardById(id);
  }

  public async deleteByGroupId(groupId: number): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      SQLiteHelper.getClient().run(
        "DELETE FROM cards WHERE group_id = ? ",
        [groupId],
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

  private toCardData(sqliteCard: SQLiteCardData): CardData {
    if (!sqliteCard) return undefined;
    return {
      id: sqliteCard.id,
      front: sqliteCard.front,
      back: sqliteCard.back,
      nextReviewDue: new Date(sqliteCard.next_review_due),
      reviewCount: sqliteCard.review_count,
      eFactor: sqliteCard.e_factor,
      groupId: sqliteCard.group_id,
    };
  }
}
