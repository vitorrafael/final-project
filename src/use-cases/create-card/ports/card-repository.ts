import { CardData } from "../../../entities/card/card";

export interface CardRepository {
  add: (card: CardData) => Promise<void>;
  exists: (front: string, back: string) => Promise<boolean>;
  findCardByFront: (front: string) => Promise<CardData>;
  update: (card: CardData) => Promise<void>;
}
