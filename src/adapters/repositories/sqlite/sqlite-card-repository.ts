import { CardData } from "../../../use-cases/ports/card-data";
import { CardRepository } from "../../../use-cases/ports/card-repository";

export class SQLiteCardRepository implements CardRepository {
  add(card: CardData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(front: string, back: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findCardByFront(front: string): Promise<CardData> {
    throw new Error("Method not implemented.");
  }
  findCardById(id: string): Promise<CardData> {
    throw new Error("Method not implemented.");
  }
  update(card: CardData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateCardFront(id: string, updatedFront: string): Promise<CardData> {
    throw new Error("Method not implemented.");
  }
  updateCardBack(id: string, updatedBack: string): Promise<CardData> {
    throw new Error("Method not implemented.");
  }
  
}