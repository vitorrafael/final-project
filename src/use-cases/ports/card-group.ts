import { CardData } from "./card-data";

export interface CardGroupData {
  id?: string;
  topic: string;
  description: string;
}

export interface CardGroupWithCards extends CardGroupData {
  cards: CardData[];
}
