import { CardData } from "../ports/card-data";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export class DeleteCard implements UseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(cardData: CardData): Promise<void> {
    if (await this.cardRepository.exists(cardData.front, cardData.back)) {
      await this.cardRepository.delete(cardData.id);
    } else {
      throw new Error();
    }
  }
}
