import { CardGroupWithCards } from "../../entities/card-group/card-group";
import { CardGroupRepository } from "./ports/card-group-repository";

export class StartCardGroupReview {
  constructor(private cardGroupRepository: CardGroupRepository) {}

  public async startReview(topic: string): Promise<CardGroupWithCards> {
    const cardGroup = await this.cardGroupRepository.findCardGroupByTheme(
      topic
    );
    if (!cardGroup) {
      throw new Error("Card Group not found for selected topic");
    }
    return cardGroup;
  }
}
