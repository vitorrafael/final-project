import { CardData } from "./card-data";

export interface CardRepository {
  add(card: CardData): Promise<void>;
  delete(id: string): Promise<void>;
  exists(front: string, back: string): Promise<boolean>;
  findCardByFront(front: string): Promise<CardData>;
  findCardById(id: string): Promise<CardData>;
  findCardsByGroupId(groupId: string): Promise<CardData[]>;
  update(card: CardData): Promise<void>;
  updateCardFront(id: string, updatedFront: string): Promise<CardData>;
  updateCardBack(id: string, updatedBack: string): Promise<CardData>;
}
