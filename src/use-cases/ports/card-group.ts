import { CardData } from "./card-data";

export interface CardGroupData {
  id?: number;
  topic: string;
  description: string;
}

export interface CardGroupWithCards extends CardGroupData {
  cards: CardData[];
}
