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
}

export class SQLiteCardRepository implements CardRepository {
  public async add(card: CardData): Promise<void> {
    const { front, back, nextReviewDue, reviewCount, eFactor } = card;
    Promise.resolve(
      SQLiteHelper.getClient().run(
        `INSERT INTO cards (front, back, next_review_due, review_count, e_factor) VALUES(?, ?, ?, ?, ?)`,
        [front, back, nextReviewDue, reviewCount, eFactor]
      )
    );
  }

  public async exists(front: string, back: string): Promise<boolean> {
    const foundCard: SQLiteCardData = await new Promise((resolve, reject) => {
      SQLiteHelper.getClient().get(
        `SELECT * FROM cards WHERE front = ? AND back = ?`,
        [front, back],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    return Boolean(foundCard);
  }

  public async findCardByFront(front: string): Promise<CardData> {
    const foundCard: SQLiteCardData = await new Promise((resolve, reject) => {
      SQLiteHelper.getClient().get(
        `SELECT * FROM cards WHERE front = ?`,
        [front],
        (error, results) => {
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

  public async findCardById(id: string): Promise<CardData> {
    const foundCard: SQLiteCardData = await new Promise((resolve, reject) => {
      SQLiteHelper.getClient().get(
        `SELECT * FROM cards WHERE id = ?`,
        [id],
        (error, results) => {
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

  public async findCardsByGroupId(groupId: string): Promise<CardData[]> {
    const cards: SQLiteCardData[] = await new Promise((resolve, reject) => {
      SQLiteHelper.getClient().all(
        `SELECT * FROM cards WHERE group_id = ?`,
        [groupId],
        (error, results) => {
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
    Promise.resolve(
      SQLiteHelper.getClient().run(
        `UPDATE cards SET front = ?, back = ?, next_review_due = ?, review_count = ?, e_factor = ? WHERE id = ?`,
        [
          card.front,
          card.back,
          card.nextReviewDue,
          card.reviewCount,
          card.eFactor,
          card.id,
        ]
      )
    );
  }

  public async updateCardFront(
    id: string,
    updatedFront: string
  ): Promise<CardData> {
    await Promise.resolve(
      SQLiteHelper.getClient().run(`UPDATE cards SET front = ? WHERE id = ?`, [
        updatedFront,
        id,
      ])
    );

    return this.findCardById(id);
  }

  public async updateCardBack(
    id: string,
    updatedBack: string
  ): Promise<CardData> {
    await Promise.resolve(
      SQLiteHelper.getClient().run(`UPDATE cards SET back = ? WHERE id = ?`, [
        updatedBack,
        id,
      ])
    );
    return this.findCardById(id);
  }

  private toCardData(sqliteCard: SQLiteCardData): CardData {
    return {
      id: sqliteCard.id.toString(),
      front: sqliteCard.front,
      back: sqliteCard.back,
      nextReviewDue: new Date(sqliteCard.next_review_due),
      reviewCount: sqliteCard.review_count,
      eFactor: sqliteCard.e_factor,
    };
  }
}
