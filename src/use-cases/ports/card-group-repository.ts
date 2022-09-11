import { CardGroupWithCards } from "../../entities/card-group/card-group";
import { CardGroupData } from "./card-group";

export interface CardGroupRepository {
  findCardGroupByTheme: (theme: String) => Promise<CardGroupWithCards>;
  add(cardGroup: CardGroupData): Promise<CardGroupData>;
}
