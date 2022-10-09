import { CardData } from "./card-data";

export interface CardRepository {
  add(card: CardData): Promise<void>;
  findCardByFront(front: string): Promise<CardData>;
  findCardById(id: number): Promise<CardData>;
  findCardsByGroupId(groupId: number): Promise<CardData[]>;
  update(card: CardData): Promise<void>;
  updateCardFront(id: number, updatedFront: string): Promise<CardData>;
  updateCardBack(id: number, updatedBack: string): Promise<CardData>;
  delete(id: number): Promise<void>;
  deleteByGroupId(groupId: number): Promise<void>;
}
