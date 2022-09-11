import { CardData } from "../../entities/card/card";

export interface RepositoryCardData extends CardData {
  id?: string;
}
export interface CardRepository {
  add: (card: CardData) => Promise<void>;
  exists: (front: string, back: string) => Promise<boolean>;
  findCardByFront: (front: string) => Promise<CardData>;
  findCardById: (id: string) => Promise<CardData>;
  update: (card: CardData) => Promise<void>;
  updateCardFront: (id: string, updatedFront: string) => Promise<CardData>;
  updateCardBack: (id: string, updatedBack: string) => Promise<CardData>;
}
