import { CardGroupWithCards } from "../../../entities/card-group/card-group";

export interface CardGroupRepository {
  findCardGroupByTheme: (theme: String) => Promise<CardGroupWithCards>;
}
